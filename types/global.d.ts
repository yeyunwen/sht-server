declare global {
  interface UserInfo {
    userId: number;
    username: string;
    roles?: string[];
    // 其他字段...
  }
  type CartItem = {
    productId: number;
    productName: string;
    image: string;
    price: number;
    quantity: number;
    selected: boolean;
    totalPrice: number;
  };
}

export {};
