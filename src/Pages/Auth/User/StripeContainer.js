import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import axios from 'axios';
function StripeContainer({totalPrice}) {
  const [clientSecret, setClientSecret] = useState(null);
  const stripePromise = loadStripe('pk_test_QPaEnpmtREKiQe4xInEDxMet003WsMGXnO');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:8000/product/payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalPrice,
          }),
        });
  
        if (!result.ok) {
          throw new Error('Failed to fetch');
        }
  
        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error fetching payment intent:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm  clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  )
}

export default StripeContainer