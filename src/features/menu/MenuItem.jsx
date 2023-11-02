import {useDispatch, useSelector} from 'react-redux';
import Button from "../../UI/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem, getCurrentCartItemQuantity } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

// eslint-disable-next-line react/prop-types
function MenuItem( {pizza} ) {
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentCartItemQuantity(id));
  const isInCart = currentQuantity>0;
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
          
          {isInCart && <div className='flex items-center gap-3 sm:gap-8'>
            <UpdateItemQuantity pizzaId={id} currentquantity={currentQuantity}/>
            <DeleteItem pizzaId={id}/> 
            </div>}
          {!soldOut && !isInCart && <Button type = 'small' onClick = {handleAddToCart}>add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
