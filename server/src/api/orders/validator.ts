import { Cart, CustomerInfo, ProductInCart } from "./service";
import Joi from "joi";
import joiPhoneNumber from "joi-phone-number";

const joi = Joi.extend(joiPhoneNumber);

const createOrderValidator = joi.object({
    customer: joi.object({
        name: joi.string().min(1).required().messages({
          "*": "name"
        }),
        email: joi.string().email().required().messages({
          "*": "email"
        }),
        phone: joi.string().phoneNumber().required().messages({
          "*": "phone"
        }),
        address: joi.string().required().messages({
          "*": "address"
        }),
    }),
    cart: joi.object().required()
});

export const validateCreateOrder = (body: {
    customer: CustomerInfo;
    cart: Cart;
}) => {

  const result = createOrderValidator.validate(body);
  
  let productsInCart: ProductInCart[] = [];
  if (!result.error) {
    productsInCart = Object.keys(body.cart).map(productId => {
      return body.cart[productId];
    })
  }

  if (!result.error) {
    const price = productsInCart.reduce((prev, productInCart) => {
      return prev + productInCart.product.price * productInCart.quantity;
    }, 0)
    if (price === 0) {
      result.error = new Error("empty cart");
    }
  }

  if (!result.error) {
    const shopId = productsInCart[0].product.shopId;
    const isOneShop = productsInCart.every(productsInCart => productsInCart.product.shopId === shopId);
    if (!isOneShop) {
      result.error = new Error("different shops");
    }
  }

  return result;

};
