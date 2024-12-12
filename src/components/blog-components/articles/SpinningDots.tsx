"use client";
import { motion } from "framer-motion";

const SpinningDots = () => {
	const rotations = [
		{ speed: 2, color: "magenta" }, // 2 seconds per rotation
		{ speed: 3, color: "cyan" }, // 3 seconds per rotation
		{ speed: 5, color: "yellow" }, // 5 seconds per rotation
		{ speed: 7, color: "black" }, // 7 seconds per rotation
	];

	return (
		<svg
			width='300'
			height='300'
			viewBox='0 0 300 300'
		>
			<circle
				cx='150'
				cy='150'
				r='110'
				stroke='grey'
				strokeWidth='2'
				fill='transparent'
			/>
			{rotations.map((item, index) => (
				<motion.circle
					key={index}
					cx='100' // Origin X coordinate
					cy='50' // Y coordinate above origin
					r='20' // Circle radius
					fill={item.color}
					style={{
						originX: "50%", // Rotate around the center of the canvas
						originY: "50%",
					}}
					animate={{
						rotate: 360,
					}}
					transition={{
						repeat: Infinity,
						duration: item.speed,
						ease: "linear",
					}}
				/>
			))}
		</svg>
	);
};

export default SpinningDots;
