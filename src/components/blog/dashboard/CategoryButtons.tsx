// src/components/blog/dashboard/CategoryButtons.tsx
import { categories, CategoryId } from "@/data/categories";

type CategoryButtonsProps = {
	activeCategory: CategoryId | null;
	onCategoryChange: (category: CategoryId | null) => void;
};

export function CategoryButtons({ activeCategory, onCategoryChange }: CategoryButtonsProps) {
	// Get background color based on active state
	const getBackgroundColor = (isActive: boolean) => {
		return isActive ? "bg-primary-600 hover:bg-primary-700" : "bg-gray-800 hover:bg-gray-700";
	};

	// const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
	// 	const category = categories.find((c) => c.id === categoryId);
	// 	return isActive ? `bg-${category?.id}-600` : `bg-primary-800 hover:bg-gray-700`;
	// };

	// const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
	// 	if (isActive) return "text-white";
	// 	const category = categories.find((c) => c.id === categoryId);
	// 	return `text-${category?.id}-300`;
	// };
	// Get text color based on active state
	const getTextColor = (isActive: boolean) => {
		return isActive ? "text-white" : "text-gray-300 hover:text-white";
	};

	// Get icon color based on active state
	const getIconColor = (isActive: boolean) => {
		return isActive ? "text-white" : "text-primary-400 group-hover:text-primary-300";
	};

	return (
		<div className='categoryButtonsContainer grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4'>
			{categories.map((category) => {
				const Icon = category.icon;
				const isActive = activeCategory === category.id;
				return (
					// 	<button
					// 		key={category.id}
					// 		onClick={() => onCategoryChange(activeCategory === category.id ? null : category.id)}
					// 		className={`p-3 sm:p-4 rounded-lg flex items-center justify-center sm:justify-start
					//   space-x-2 transition-all ${getCategoryColor(category.id, isActive)}`}
					// 	>
					// 		<Icon
					// 			size={20}
					// 			className={getTextColor(category.id, isActive)}
					// 		/>
					// 		<span className={`hidden sm:inline font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
					// 	</button>
					<button
						key={category.id}
						onClick={() => onCategoryChange(activeCategory === category.id ? null : category.id)}
						className={`group p-3 sm:p-4 rounded-lg flex items-center justify-center sm:justify-start
              space-x-2 transition-all ${getBackgroundColor(isActive)}`}
					>
						<Icon
							size={20}
							className={getIconColor(isActive)}
						/>
						<span className={`hidden sm:inline font-medium ${getTextColor(isActive)}`}>{category.name}</span>
					</button>
				);
			})}
		</div>
	);
}
