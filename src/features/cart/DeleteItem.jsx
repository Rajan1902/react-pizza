
import { useDispatch } from 'react-redux'
import Button from '../../UI/Button'
import { deleteItem } from './cartSlice';

// eslint-disable-next-line react/prop-types
const DeleteItem = ({pizzaId}) => {
const dispatch = useDispatch();
return (
    <Button onClick={()=>dispatch(deleteItem(pizzaId))} type="small">Delete</Button>
  )
}

export default DeleteItem 