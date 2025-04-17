export const orders = [
	{
		orderId: 1,
		productLists: [
			{ productId: 1, count: 2, productName: "Diamond Whale Tail" },
			{ productId: 2, count: 1, productName: "Lovely Cat Face" },
		],
		date: "2024.05.06",
		refundable: true,
		expense: 35.0,
	},
	{
		orderId: 2,
		productLists: [
			{ productId: 1, count: 2, productName: "Diamond Whale Tail" },
			{ productId: 3, count: 2, productName: "Fortune Tiger Lord" },
		],
		date: "2024.05.07",
		refundable: true,
		expense: 65.0,
	},
	{
		orderId: 3,
		productLists: [
			{ productId: 3, count: 2, productName: "Fortune Tiger Lord" },
			{ productId: 1, count: 1, productName: "Diamond Whale Tail" },
		],
		date: "2024.05.08",
		refundable: true,
		expense: 70.0,
	},
];
