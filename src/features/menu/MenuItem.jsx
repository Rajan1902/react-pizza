import {useDispatch} from 'react-redux';
import Button from "../../UI/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem } from '../cart/cartSlice';

// eslint-disable-next-line react/prop-types
function MenuItem( {pizza} ) {
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const handleAddToCart = ()=>{
    // console.log(id);
    const newItem = {
      pizzaId : id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice : unitPrice
    };
    dispatch(addItem(newItem));
  }
  

  return (
    <li className="flex gap-4">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-75 grayscale": ""}`}/>
      <div className="flex flex-col grow pt-1">
        <p className="font-medium">{name}</p>
        {/* eslint-disable-next-line react/prop-types */}
        <p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="uppercase text-sm text-stone-500 font-medium">Sold out</p>}
          {!soldOut && <Button type = 'small' onClick = {handleAddToCart}>add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
