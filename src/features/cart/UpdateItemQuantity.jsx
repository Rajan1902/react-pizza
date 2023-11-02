
import { useDispatch } from 'react-redux'
import Button from '../../UI/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

// eslint-disable-next-line react/prop-types
const UpdateItemQuantity = ({pizzaId,currentquantity }) => {
    const dispatch = useDispatch();
  return (
    <div className='flex gap-1 items-center md:gap-3'>
        <Button type='round' onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span>{currentquantity}</span>
        <Button type='round' onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  ) 
}

export default UpdateItemQuantity