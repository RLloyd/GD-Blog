// src/components/blog-components/InteractiveChartPost.tsx
"use client";
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function InteractiveChartPost() {
	const [timeframe, setTimeframe] = useState("1y");

	// Sample data - in real usage, this would be passed as props
	const data = {
		"1m": [
			{ date: "1/1", users: 1200, revenue: 5400 },
			{ date: "1/8", users: 1400, revenue: 6200 },
			{ date: "1/15", users: 1800, revenue: 7800 },
			{ date: "1/22", users: 1600, revenue: 7200 },
		],
		"6m": [
			{ date: "Jul", users: 1000, revenue: 4000 },
			{ date: "Aug", users: 1500, revenue: 6000 },
			{ date: "Sep", users: 2000, revenue: 8000 },
			{ date: "Oct", users: 2500, revenue: 10000 },
			{ date: "Nov", users: 3000, revenue: 12000 },
			{ date: "Dec", users: 3500, revenue: 14000 },
		],
		"1y": [
			{ date: "Jan", users: 1000, revenue: 4000 },
			{ date: "Mar", users: 2000, revenue: 8000 },
			{ date: "Jun", users: 3000, revenue: 12000 },
			{ date: "Sep", users: 4000, revenue: 16000 },
			{ date: "Dec", users: 5000, revenue: 20000 },
		],
	};

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Growth Metrics</h2>
				<div className='flex gap-2'>
					{["1m", "6m", "1y"].map((period) => (
						<button
							key={period}
							onClick={() => setTimeframe(period)}
							className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${timeframe === period ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"}`}
						>
							{period}
						</button>
					))}
				</div>
			</div>

			<div className='h-80'>
				<ResponsiveContainer
					width='100%'
					height='100%'
				>
					<LineChart
						data={data[timeframe]}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke='#374151'
						/>
						<XAxis
							dataKey='date'
							stroke='#9CA3AF'
							tick={{ fill: "#9CA3AF" }}
						/>
						<YAxis
							yAxisId='left'
							stroke='#9CA3AF'
							tick={{ fill: "#9CA3AF" }}
						/>
						<YAxis
							yAxisId='right'
							orientation='right'
							stroke='#9CA3AF'
							tick={{ fill: "#9CA3AF" }}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "#1F2937",
								border: "none",
								borderRadius: "0.5rem",
								color: "#F3F4F6",
							}}
						/>
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='users'
							stroke='#3B82F6'
							strokeWidth={2}
							dot={{ fill: "#3B82F6", strokeWidth: 2 }}
							activeDot={{ r: 8 }}
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#10B981'
							strokeWidth={2}
							dot={{ fill: "#10B981", strokeWidth: 2 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className='space-y-4 text-gray-600 dark:text-gray-300'>
				<p>This interactive chart shows our growth in users and revenue over time. You can toggle between different timeframes to see the trends.</p>
				<ul className='list-disc pl-5 space-y-2'>
					<li>The blue line represents active users</li>
					<li>The green line represents revenue in USD</li>
					<li>Hover over data points to see exact values</li>
				</ul>
			</div>
		</div>
	);
}
