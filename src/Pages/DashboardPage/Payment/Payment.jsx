import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
// TODO: need correct publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);
const Payment = () => {
    return (
        <Elements stripe={stripePromise} >
            <CheckoutForm />
        </Elements>

        // <div className='w-full flex flex-col items-center justify-center h-full'>
        //     <h2 className='uppercase text-4xl'>Payment</h2>
        //     <div className='flex gap-4 my-6'>   
        //         <input type="text" name="cardNumber" id="" placeholder='Card number' className='border border-gray-400 p-2 rounded'/>
        //         <input type="text" name="date" id="" placeholder='mm/yy/cvc' className='border border-gray-400 p-2 rounded'/>
        //     </div>
        //     <button className='btn bg-blue-600 text-white w-1/4'>Pay</button>
        // </div>
    );
};

export default Payment;