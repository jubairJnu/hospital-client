export const getOrders = async () => {
  const response = await fetch(
    "https://hospital-server-weld.vercel.app/order",
    {
      next: {
        tags: ["orders"],
      },
    }
  );

  const orders = await response.json();
  return orders; // Adjust according to your data structure
};
