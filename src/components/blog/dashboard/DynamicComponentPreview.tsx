// src/components/blog/dashboard/DynamicComponentPreview.tsx
import dynamic from "next/dynamic";

type DynamicComponentPreviewProps = {
	componentName: string;
	props?: Record<string, unknown>;
};

export function DynamicComponentPreview({ componentName, props = {} }: DynamicComponentPreviewProps) {
	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
		loading: () => (
			<div className='flex items-center justify-center h-full bg-gray-800'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500' />
			</div>
		),
		ssr: true,
	});

	return <Component {...props} />;
}
