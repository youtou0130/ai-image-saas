"use server";
import { revalidatePath } from "next/cache";
import { GenerateImageState, RemoveBackgroundState } from "@/types/actions";
import { currentUser } from "@clerk/nextjs/server";
import { decrementUserCredits } from "@/lib/credits";
import { redirect } from "next/navigation";
import { getUserCredits } from "@/lib/credits";

export async function generateImage(
	state: GenerateImageState,
	formData: FormData
): Promise<GenerateImageState> {

	const user = await currentUser();
	if(!user){
		throw new Error("認証が必要です。");
	}

	const credits = await getUserCredits();
	if(credits < 1 || credits === null){
		redirect("/dashboard/plan?reason=insufficient_credits");
	}

	try{

		const keyword = formData.get("keyword") as string;


		if (!keyword.trim()) {
			return {
				...state,
				status: "error",
				error: "キーワードを入力してください",
			};
		}

		try{
			const response = await fetch(`${process.env.BASE_URL}/api/generate-image`,
			{
				method: "POST",
				headers:{
				"Content-Type": "application/json",
				},
				body: JSON.stringify({ keyword }),
			}
			);
			
			const data = await response.json();

			await decrementUserCredits(user.id);
			revalidatePath("/dashboard");

			return {
				imageUrl: data.imageUrl,
				keyword: keyword,
				status: "success",
			};
		}catch(error){
		console.error("Generate Image Error:", error);
		return {
			...state,
			status: "error",
			error: "画像生成に失敗しました",
		};
		}
	} catch (error) {
		console.error("Generate Image get user Error:", error);
		return {
			...state,
			status: "error",
			error: "認証が必要です。",
		};
	}
}

export async function removeBackground(
	state: RemoveBackgroundState,
	formData: FormData
): Promise<RemoveBackgroundState> {

	const user = await currentUser();
	if(!user){
		throw new Error("認証が必要です。");
	}

	const credits = await getUserCredits();
	if(credits <= 0 || credits === undefined){
		redirect("/dashboard/plan?reason=insufficient_credits");
	}

	const image = formData.get("image") as File;

    if (!image.size) {
        return {
            ...state,
            status: "error",
            error: "画像を選択してください",
        };
    }

	try{
		const response = await fetch(`${process.env.BASE_URL}/api/remove-background`,
		  {
			method: "POST",
			body: formData,
		  }
		);
        if(!response.ok){
            throw new Error(`API Error: ${response.status}: ${response.statusText}`);
        }

		const data = await response.json();
		await decrementUserCredits(user.id);
		revalidatePath("/dashboard");
		
		return {
			processedImage: data.imageUrl,
			status: "success",
		};
	}catch(error){
	  console.error("Remove Background Error:", error);
	  return {
		...state,
		status: "error",
		error: "背景削除に失敗しました",
	  };
	}
}