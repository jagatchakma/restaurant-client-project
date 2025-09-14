import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const totalPrice = cart.reduce((totalSum, item) => totalSum + item.price, 0);
    // const totalPrice = 150;

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // TODO: 

        if (!stripe || !elements) {
            // case no data got in element
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            console.log('pament error', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod.card);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "Anonymous",
                        name: user?.displaName || "Anomymous"
                    }
                }
            }
        )

        if (confirmError) {
            //
            console.log("ConFirm error with check:  ", error)
        } else {
            //
            // console.log("payment intent", paymentIntent)
            if (paymentIntent.status === "succeeded") {

                // Have to save information to database
                const payment = {
                    transactionId: paymentIntent.id,
                    email: user.email,
                    price: totalPrice,
                    date: new Date(),   //TODO: utc date convert have to do using moment js 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: "Pending",
                }

                // console.log("Sending payment", payment);
                const result = await axiosSecure.post("/payments", payment);
                // console.log("Payment about", result);
                if (result.data?.paymentResult.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your payment is successfull",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        };

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn bg-blue-600 my-2' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-600'>{error}</p>
        </form>
    );
};

export default CheckoutForm;