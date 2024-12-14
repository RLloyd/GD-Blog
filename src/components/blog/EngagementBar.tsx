/*-= src/components/blog/EngagementBar.tsx =-*/
import { Reactions } from "@/components/Reactions";

type EngagementBarProps = {
	postId: string;
};

export function EngagementBar({ postId }: EngagementBarProps) {
	return (
		<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
			<Reactions postId={postId} />
		</div>
	);
}
