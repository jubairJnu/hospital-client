// types.ts
export type TOrderItem = {
  itemId: {
    itemId: string;
    _id: string;
    price: number;
    title: string;
  };
};

export type TOrder = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  name: string;
  orderId: string;
  orderItem: TOrderItem[];
  status: string;
  __v: number;
};

export type TItems = {
  data: {
    meta: {
      total: number;
      page: number;
      totalPage: number;
      limit: number;
    };
    result: TOrder[];
  };
};
