import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import '../PaymentForm.css';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51OoNM4SAhHA0xxMBbgP0Z0jXoTFRtnnC1kFKJXb6HRsbvsU8KWJNbazuhANvHl10jFxnSFfQCNPr1L5i5c9EkKJA003QytlFON');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan } = location.state || {};
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
    } else {
      // Send paymentMethod.id and selectedPlan to your backend
      const response = await fetch('/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          plan: selectedPlan
        }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        navigate('/success'); // Redirect to a success page or handle success
      }

      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form-container p-[20px] my-[20px]">
      <h2 className="payment-form-title">Payment for {selectedPlan} Plan</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="card-element" className="form-label">Credit or Debit Card</label>
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  color: "#333",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4"
                  }
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a"
                }
              }
            }}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button" disabled={!stripe || isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default App;
