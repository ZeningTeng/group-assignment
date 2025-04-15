export const orders = [
	{
		id: 1,
		productLists: [
			{ productId: 1, count: 2, productName: "Diamond Whale Tail" },
			{ productId: 2, count: 1, productName: "Lovely Cat Face" },
		],
		refundable: true,
		expense: 35.0,
	},
	{
		id: 2,
		productLists: [
			{ productId: 1, count: 2, productName: "Diamond Whale Tail" },
			{ productId: 3, count: 2, productName: "Fortune Tiger Lord" },
		],
		refundable: true,
		expense: 65.0,
	},
	{
		id: 3,
		productLists: [
			{ productId: 3, count: 2, productName: "Fortune Tiger Lord" },
			{ productId: 1, count: 1, productName: "Diamond Whale Tail" },
		],
		refundable: true,
		expense: 70.0,
	},
];
