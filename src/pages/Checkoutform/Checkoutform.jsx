/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Checkoutform = () => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
  
    const [errorMessage, setErrorMessage] = useState(null);
    const {user} = useAuth();
  

//TODO: Use Effect with intent 

   const [clientSecret,setClientSecret] = useState('');
   
   const axiosPrivate = useAxiosPrivate();
   const [funding , setFunding] = useState(1);


   if(funding>0){
    useEffect(()=>{
        axiosPrivate.post('/create-payment-intent',{price:funding})
        .then(res=>{
            setClientSecret(res.data.clientSecret)
        })
    },[ ])
   }

   const handleAmount = (event) => {
    if(parseFloat(event.target.value) > 0) setFunding(parseFloat(event.target.value))
    else setFunding(1)
   }



    const handleSubmit = async (event) => {
      event.preventDefault();
    //   setFunding(parseFloat(event.target.amount.value))
        // setFunding(event.target.amount.value)
      console.log();
      
  
      if (!stripe || !elements) {
        return;
      }
  
      const card = elements.getElement(CardElement)
      if(card===null) {return;}

       // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.log('[error]', error);
        setErrorMessage(error.message);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setErrorMessage('')
      }
      


      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || 'anonymus',
              name: user?.displayName || 'anonymus',
            },
          },
        },
      );

      if(confirmError)console.log(confirmError);
      else{
        if(paymentIntent.status==='succeeded'){
            
            // console.log(paymentIntent.id);
            const payment = {
              name: user.displayName,
              email: user.email,
              price: funding,
              transactionId: paymentIntent.id,
              date: new Date(),
            }
      
            const res = await axiosPrivate.post('/payments',payment)
             
            if(res.data?.paymentResult?.insertedId){
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Funding Received Successfully!!",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/fundings')
            }
        }
      }

      

    };
  
    return (
        <form onSubmit={handleSubmit} className="card-body max-w-md border mx-auto rounded-2xl border-blood">
            <input type="text" onChange={handleAmount} placeholder="Amount" name="amount" required className="input input-bordered w-full " />
        
        <CardElement className="border p-3 rounded-lg"
          options={{
            style: {
              base: {
                fontSize: '20px',
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
        
        
        <button type="submit" className="btn bg-blood text-white my-6 "disabled={!stripe || !clientSecret }>
          Fund
        </button>
        <p className="text-red-600"> {errorMessage}</p>
        
      </form>
    );
};

export default Checkoutform;