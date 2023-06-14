import React from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

// TODO: provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div className="px-20">
            <Helmet>
                <title>Dance Fusion | Payment</title>
            </Helmet>
            <SectionTitle subHeading="Please Process" heading="Payment" />
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;
