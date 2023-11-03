
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartItems, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector((state)=>state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();

  const cart = useSelector(getCartItems);
  const totalPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority? totalPrice*0.2: 0;
  const finalPrice = totalPrice + priorityPrice;

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
   
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" defaultValue={username} required className="input grow"/>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full"/>
            {formErrors?.phone && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
            type="text"
            name="address"
            required
            disabled = {isLoadingAddress}
            defaultValue={address}
            className="input w-full"/>
                      {addressStatus === 'error' && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{errorAddress}</p>}
          </div>

          {!position.latitude && !position.longitude && <span className="absolute right-[3px] z-10 top-8 sm:top-0 ">
          <Button type='small' disabled={isLoadingAddress} onClick={(e)=>{
            e.preventDefault();
            dispatch(fetchAddress())
            }}>get location</Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 foucs:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name='position' value={position.latitude && position.longitude ?`${position.latitude}, ${position.longitude}`: ""} />
          <Button type = "primary" disabled = {isSubmitting || isLoadingAddress} >{isSubmitting ? "submitting..." : `place order ${formatCurrency(finalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}
export const action = async ({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  const order = {
    ...data, cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  }
  const errors = {};
  if(!isValidPhone(order.phone)){
    errors.phone = "Invalid Phone number! Please check again.";
  }
  if(Object.keys(errors).length>0) return errors;
  
  const newOrder =await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}


export default CreateOrder;
