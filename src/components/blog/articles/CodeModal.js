// src/components/blog/articles/CodeModal.js
import React, { useState } from "react";

function CodeModal() {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			{/* ... other content */}
			<button
				id='showModal'
				onClick={handleShowModal}
			>
				Show Code
			</button>

			{showModal && (
				<div className='modal'>
					<div className='modal-content'>
						{/* Your code snippet or other content here */}
						<pre>
							<code>
								{/* Your code snippet */}
								<div
									id='codeModal'
									style='display: none;'
								>
									<h2>Code Snippet</h2>
									<pre>
										```html
										<div class='loader'></div>
										```
                              ```css
                              .loader {
                                    border: 16px solid #f3f3f3; /* Light grey */
                                    border-top: 16px solid #3498db; /* Blue */
                                    border-radius: 50%;
                                    width: 120px;
                                    height: 120px;
                                    animation: spin 2s linear infinite;
                                    }

                                    @keyframes spin {
                                    0% { transform: rotate(0deg); }
                                    100% { transform: rotate(360deg); }
                                    }
										```
									</pre>
									<button id='closeModal'>Close</button>
								</div>
							</code>
						</pre>
						<button onClick={handleCloseModal}>Close</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CodeModal;
