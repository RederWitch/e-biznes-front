import * as actionTypes from "../constants/cartConstants";
import axios from "axios";
import client from "../../client";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await client.get(`/api/product/${id}`);

  const imgName = data.name.replace(/\s+/g, '-').toLowerCase();
  const imgUrl = `${process.env.PUBLIC_URL}/products/${imgName}.jpg`;

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data.id,
      name: data.name,
      imageUrl: imgUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
