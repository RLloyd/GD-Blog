// app/blog/drafts/page.tsx
import StagingArea from "@/components/StagingArea";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DraftsPage() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/auth/signin");
	}

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Manage Drafts</h1>
			<StagingArea />
		</div>
	);
}
