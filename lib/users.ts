import { prisma } from "./prisma";
import { NextResponse } from "next/server";

type PrismaWithUser = {
	user: {
		findUnique: (args: { where: { clearkId: string } }) => Promise<{ id: string } | null>;
		findFirst: (args: { where: { email: string } }) => Promise<{ id: string; clearkId: string } | null>;
		create: (args: unknown) => Promise<{ id: string }>;
		update: (args: { where: { clearkId: string }; data: { email?: string; clearkId?: string } }) => Promise<{ id: string }>;
		delete: (args: { where: { clearkId: string } }) => Promise<{ id: string }>;
	};
};
const db = prisma as unknown as PrismaWithUser;

/** DB にユーザーを 1 件作成する（既存の場合はエラー）。Webhook 用。 */
export async function createUser(clerkId: string, email: string) {
	const user = await db.user.create({
		data: {
			clearkId: clerkId,
			email: email,
			credits: 5,
			subscriptionStatus: "FREE",
		},
	});
	return user;
}

/** Clerk ユーザーを TiDB に同期する。いなければ作成、いればメールを更新して返す。メール重複時は既存レコードに clearkId を紐づけて返す。 */
export async function syncUser(clerkId: string, email: string) {
	const existing = await db.user.findUnique({ where: { clearkId: clerkId } });
	if (existing) {
		return db.user.update({
			where: { clearkId: clerkId },
			data: { email },
		});
	}
	try {
		return await createUser(clerkId, email);
	} catch (error: unknown) {
		const isDuplicate = error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2002";
		if (!isDuplicate) throw error;
		const byClerkId = await db.user.findUnique({ where: { clearkId: clerkId } });
		if (byClerkId) return db.user.update({ where: { clearkId: clerkId }, data: { email } });
		const byEmail = await db.user.findFirst({ where: { email } });
		if (byEmail) {
			return db.user.update({
				where: { clearkId: byEmail.clearkId },
				data: { email, clearkId: clerkId },
			});
		}
		throw error;
	}
}

/** ユーザーのメールを更新する。 */
export async function updateUser(clerkId: string, email: string) {
	const user = await db.user.update({
		where: { clearkId: clerkId },
		data: { email },
	});
	return user;
}

/** ユーザーを削除する。TiDB に存在しない場合はエラーを返す（冪等）。 */
export async function deleteUser(clerkId: string) {
	try {
        const user = await prisma.$transaction(async (tx) => {
			await tx.subscription.deleteMany({
				where: {
					user: {
						clearkId: clerkId,
					},
				},
			});
			const user = await tx.user.delete({
				where: {
					clearkId: clerkId,
				},
			});
			console.log(`User ${clerkId} deleted successfully`);
			return user;
		});

        return NextResponse.json({ user }, { status: 200 });
	} catch (error: unknown) {
		const isNotFound = error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2025";
		if (isNotFound) return null;
		throw error;
	}
}