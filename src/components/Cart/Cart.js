import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const items = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                total: item.totalPrice,
              }}
            />
          ))}
        </ul>
      )}
      {items.length === 0 && <p>Your Shopping Cart is Empty!</p>}
    </Card>
  );
};

export default Cart;
