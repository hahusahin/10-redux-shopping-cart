import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const getCartData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(process.env.REACT_APP_FIREBASE_CART);

      if (!response.ok) {
        throw new Error("Error fetching cart data");
      }

      const cart = await response.json();
      dispatch(cartActions.replaceCart({
         items: cart.items || [],
         cartQuantity: cart.cartQuantity || 0
      }));
      
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Failed to fetch cart data",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    try {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Pending",
          message: "Sending cart data...",
        })
      );

      const response = await fetch(
        process.env.REACT_APP_FIREBASE_CART,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            cartQuantity: cart.cartQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error sending data");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Cart data sent successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Failed to send data to server",
        })
      );
    }
  };
};
