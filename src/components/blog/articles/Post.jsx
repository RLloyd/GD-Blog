import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Modal from "./Modal"; // Reusable Modal Component
import markdownContent from "./post.md"; // Your Markdown file

const Post = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div>
			{/* Render Markdown */}
			<ReactMarkdown
				children={markdownContent}
				components={{
					button: ({ node, ...props }) => (
						<button
							{...props}
							onClick={openModal}
						>
							{props.children}
						</button>
					),
				}}
			/>

			{/* Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
			>
				<h2>Modal Header</h2>
				<p>This is the content inside the modal.</p>
			</Modal>
		</div>
	);
};

export default Post;
