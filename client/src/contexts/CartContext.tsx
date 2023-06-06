
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { Cart, Product } from '../services';
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../services/CartService';

export type AddToCartHandler = (product: Product) => {error?: string} | undefined;
export type ProductInCartHandler = (product: Product) => boolean;
export type RemoveFromCartHandler = (product: Product) => boolean;
export type ChangeQuantityHandler = (product: Product, quantity: number) => void;

export type CartContextData = {
  addToCart: AddToCartHandler | null
  productInCart: ProductInCartHandler | null;
  removeFromCart: RemoveFromCartHandler | null;
  changeQuantity: ChangeQuantityHandler | null;
  cart: Cart;
  totalPrice: number;
}

const CartContext = createContext<CartContextData>({
  addToCart: null,
  productInCart: null,
  removeFromCart: null,
  changeQuantity: null,
  cart: {},
  totalPrice: 0,
});

export const CartContextWrapper: FC<PropsWithChildren> = ({ children }) => {

  const [cart, setCart] = useState<Cart>(loadCartFromLocalStorage());
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product: Product) => {

    const productId = Object.keys(cart)[0];
    if (productId !== undefined) {
      if (cart[productId].product.shopId !== product.shopId) {
        return {error: "Only products from one shop can be added"};
      }
    }

    const newCart = { ...cart, [product.id]: { product, quantity: 1 } };
    setCart(newCart);
    saveCartToLocalStorage(newCart);

  };

  const removeFromCart = (product: Product) => {
    let result = false;

    const newCart: Cart = {};
    Object.keys(cart).forEach(productId => {
      if (productId !== product.id) newCart[productId] = cart[productId];
      else result = true;
    });

    setCart(newCart);
    saveCartToLocalStorage(newCart);

    return result;
  }

  const changeQuantity = (product: Product, quantity: number) => {
    const newCart = { ...cart, [product.id]: { product, quantity } }
    setCart(newCart);
    saveCartToLocalStorage(newCart);
  }

  const productInCart = (product: Product) => {
    return !!cart[product.id];
  }

  useEffect(() => {
    const totalPrice = Object.keys(cart).reduce((previous, productId) => {
      const productInCart = cart[productId];
      return previous + productInCart.product.price * productInCart.quantity;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cart])



  return (

    <CartContext.Provider value={{ addToCart, productInCart, removeFromCart, cart, changeQuantity, totalPrice }}>

      {children}

    </CartContext.Provider>

  )

}

export default CartContext;