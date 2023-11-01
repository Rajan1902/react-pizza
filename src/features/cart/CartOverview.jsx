import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";
function CartOverview() {
  const pizzaQuantity = useSelector(getTotalCartQuantity);
  const cartPrice = useSelector(getTotalCartPrice);

  if(pizzaQuantity == 0) return null;

  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-300 space-x-4 sm:space-x-6">
        <span className="uppercase font-semibold">{pizzaQuantity} pizza(s)</span>
        <span>{formatCurrency(cartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
