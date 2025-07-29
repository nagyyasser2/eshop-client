import type { Order } from "../types";

export const fetchUserOrders = async (userId: number): Promise<Order[]> => {
  // Simulated API call
  const mockOrders: Order[] = [
    {
      id: "12345",
      status: "Shipped",
      items: [
        {
          id: 1,
          name: "Laptop",
          price: 999.99,
          quantity: 1,
          image: "laptop.jpg",
          description: "High-performance laptop",
        },
        {
          id: 2,
          name: "Headphones",
          price: 89.99,
          quantity: 2,
          image: "headphones.jpg",
          description: "Wireless headphones",
        },
      ],
      total: 1179.97,
      date: "2025-07-28",
      estimatedDelivery: "2025-08-02",
      userId,
    },
    {
      id: "67890",
      status: "Processing",
      items: [
        {
          id: 2,
          name: "Smartphone",
          price: 499.99,
          quantity: 1,
          image: "smartphone.jpg",
          description: "Latest model smartphone",
        },
      ],
      total: 499.99,
      date: "2025-07-29",
      estimatedDelivery: "2025-08-05",
      userId,
    },
    {
      id: "98765",
      status: "Delivered",
      items: [
        {
          id: 3,
          name: "Tablet",
          price: 299.99,
          quantity: 1,
          image: "tablet.jpg",
          description: "Portable tablet",
        },
      ],
      total: 299.99,
      date: "2025-07-20",
      estimatedDelivery: "2025-07-25",
      userId,
    },
  ];

  // Return orders filtered by userId (in a real app, this would be an API call)
  return mockOrders.filter((order) => order.userId === userId);
};
