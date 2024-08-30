import Order from "./component/Order";
import OrderSearch from "./component/OrderSearch";

const Main = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-5 mt-10">
      <Order />
      <OrderSearch />
    </div>
  );
};

export default Main;
