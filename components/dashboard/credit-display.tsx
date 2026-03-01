import { getUserCredits } from '@/lib/credits';
import { Lock } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { Suspense } from 'react';

async function CreditsContent() {

    const user = await currentUser();

	if(!user){
		return (
			<div className="rounded-lg border bg-background p-2">
				<div className="text-sm font-medium text-muted-foreground">
					残りクレジット
				</div>
				<div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
					<Lock className="size-4" />
					<span className="font-medium">ログインが必要です</span>
				</div>
			</div>
		);
	}
	const credits = await getUserCredits();
	return (
		<div className="rounded-lg border bg-background p-4">
			<div className="text-sm font-medium text-muted-foreground">
				残りクレジット
			</div>
			<div className="mt-2 font-bold">{credits}クレジット</div>
		</div>
	);
}

const CreditDisplay = async() => {
  return (
	<Suspense fallback="Loading...">
        <CreditsContent />
	</Suspense>
  )
}

export default CreditDisplay