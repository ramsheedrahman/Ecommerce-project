import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import './stripeform.css';  // Update the path accordingly
import { useState,useEffect } from 'react';
import toast from "react-hot-toast";
// import StripePaymentForm from 'react-stripe-payment-form';
import axios from 'axios';

const CheckoutForm = ({clientSecret}) => {
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount,setAmount]=useState()
  const [currency,setCurrency]=useState()
  
  // useEffect(() => {
  //   const fetchClientSecret = async () => {
  //     try {
  //       const response = await axios.post(
  //         'http://localhost:8000/product/payment-intent',
  //         {
  //           amount: 100,
  //         },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
        
  //       setClientSecret(response.data.clientSecret);
  //       console.log(response.data.clientSecret);
  //     } catch (error) {
  //       console.error('Error making payment request:', error);
  //     }
  //   };
  //   fetchClientSecret()
  // },[]
  // )
console.log(clientSecret);
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  setIsProcessing(true);

  try {
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      toast.success('Thank you Payment Successfull')
      // Payment succeeded, handle the success case
      // You may want to redirect the user to a success page or update your UI
      console.log('Payment succeeded:', paymentIntent);
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    setMessage("An unexpected error occurred.");
    setIsProcessing(false);
  }
};


// var element = element.create('card', {
//   style: {
//     base: {
//       iconColor: '#c4f0ff',
//       color: '#fff',
//       fontWeight: '500',
//       fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
//       fontSize: '16px',
//       fontSmoothing: 'antialiased',
//       ':-webkit-autofill': {
//         color: '#fce883',
//       },
//       '::placeholder': {
//         color: '#87BBFD',
//       },
//     },
//     invalid: {
//       iconColor: '#FFC7EE',
//       color: '#FFC7EE',
//     },
//   },
// });

// // Mount the card element to the DOM
// element.mount('#card-element');



  

  return (
  //   <div>
  //   <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
  //   <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
  //     <option value="USD">USD</option>
  //     <option value="EUR">EUR</option>
  //     <option value="GBP">GBP</option>
  //   </select>

  //   {clientSecret && (
  //     <StripePaymentForm
  //       clientSecret={clientSecret}
  //       onSubmit={handleStripePaymentFormSubmit}
  //     />
  //   )}
  // </div>
      <div className="row " style={{height:'16rem'}}>
      <div className='stripe-form'>
         <form id="payment-form" onSubmit={handleSubmit}>
         <label>
        Card details
      </label>       
      <CardElement/>
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
      </div>
      </div>
    );
    

};

export default CheckoutForm;
