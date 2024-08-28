// Import your client component

import { getOrders } from "./action/Action";
import Order from "./component/Order";

const Main = async () => {
  const orders = await getOrders();

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      home
      {/* {orders?.data?.result?.map((item) => (
        <ul>
          <li>{item.name}</li>
        </ul>
      ))} */}
      <Order items={orders} />
    </div>
  );
};

export default Main;
