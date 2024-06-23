import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "../Checkoutform/Checkoutform";





const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_PK);
const Payment = () => {


    return (

        <div className="container mx-auto mt-20">


       <Elements stripe={stripePromise} >
          <Checkoutform  ></Checkoutform>
        </Elements>
        </div>
    );
};

export default Payment;