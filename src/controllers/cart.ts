import { RequestHandler } from "express";
import { Product, Cart, CartItem, User } from "@/db";
import { type Cart as CartType } from "@/modles/cart";
import { ResCode } from "@/constant";

// 共享函数用于计算购物车信息
const calculateCartInfo = (cart: CartType) => {
  const cartItems = cart.CartItems.map((cartItem) => ({
    productId: cartItem.Product.id,
    productName: cartItem.Product.name,
    image: cartItem.Product.image,
    quantity: cartItem.quantity,
    price: cartItem.Product.price,
    selected: cartItem.selected,
    totalPrice: cartItem.Product.price * cartItem.quantity,
  }));

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const selectedAll = cartItems.every((item) => item.selected);

  return { cartItems, totalCartPrice, selectedAll };
};

export const addCart: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.auth as UserInfo;
    const { productId } = req.body;
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    let cart = await Cart.findOne({ where: { userId: userId } });

    if (!user || !product) {
      return res.status(404).json({ error: "User or product not found" });
    }

    if (!cart) {
      cart = await Cart.create({
        userId: userId,
      });
    }

    let cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });

    if (!cartItem) {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId: product.id,
      });
    } else {
      cartItem.quantity += 1;
      await cartItem.save();
    }
    console.log(
      "cart.totalPrice + product.price;",
      cart.totalPrice,
      product.price
    );
    cart.totalPrice = cart.totalPrice + product.price;
    await cart.save();

    res.send({
      code: ResCode.SUCCESS,
      msg: "success",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCart: RequestHandler = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Cart,
        include: [
          {
            model: CartItem,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const cart = user.Cart;
  const { cartItems, totalCartPrice, selectedAll } = calculateCartInfo(cart);

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      cartItems,
      totalCartPrice,
      selectedAll,
    },
  });
};

// 更新购物车商品数量和选择状态的接口
export const updateCartItem: RequestHandler = async (req, res) => {
  const { userId, productId, quantity, selected } = req.body;

  // 查找指定用户的购物车项
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Cart,
        include: [
          {
            model: CartItem,
            where: { productId },
            include: [{ model: Product }],
          },
        ],
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const cartItem = user.Cart.CartItems[0];

  if (!cartItem) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  // 更新购物车项的数量和选择状态
  cartItem.quantity = quantity;
  cartItem.selected = selected;
  await cartItem.save();

  // 重新计算购物车信息
  const updateCart = await Cart.findByPk(user.Cart.id, {
    include: [
      {
        model: CartItem,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  });
  const { cartItems, totalCartPrice, selectedAll } = calculateCartInfo(
    updateCart!
  );

  if (user.Cart)
    res.send({
      code: ResCode.SUCCESS,
      msg: "success",
      data: {
        cartItems,
        totalCartPrice,
        selectedAll,
      },
    });
};

export const toggleSelectAll: RequestHandler = async (req, res) => {
  const { userId, selectedAll } = req.body;
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Cart,
        include: [
          {
            model: CartItem,
            include: [{ model: Product }],
          },
        ],
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const cart = user.Cart;
  cart.CartItems.forEach(async (cartItem) => {
    cartItem.selected = selectedAll;
    await cartItem.save();
  });

  const { cartItems, totalCartPrice } = calculateCartInfo(cart);

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      cartItems,
      totalCartPrice,
      selectedAll,
    },
  });
};

export const removeCartItem: RequestHandler = async (req, res) => {
  const { userId, productId } = req.body;

  // 查找指定用户的购物车项
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Cart,
        include: [
          {
            model: CartItem,
            where: { productId },
          },
        ],
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const cartItem = user.Cart.CartItems[0]; // 假设只有一个购物车项

  if (!cartItem) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  // 从购物车中移除商品
  await cartItem.destroy();

  // 重新查询购物车信息
  const updatedCart = await Cart.findByPk(user.Cart.id, {
    include: [
      {
        model: CartItem,
        include: [{ model: Product }],
      },
    ],
  });

  // 重新计算购物车信息
  const { cartItems, totalCartPrice, selectedAll } = calculateCartInfo(
    updatedCart!
  );

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      cartItems,
      totalCartPrice,
      selectedAll,
    },
  });
};
