import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState("");

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { amount }).then((res) => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        });
    }, [amount, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("error", error);
            setCardError(error.message);
        } else {
            setCardError("");
            console.log("payment method", paymentMethod);
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "anonymous",
                        email: user?.email || "unknown",
                    },
                },
            });
        if (confirmError) {
            console.log(confirmError);
        }
        console.log(paymentIntent);
    };

    return (
        <>
            <form className="w-2/3 mx-auto" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-outline btn-primary btn-sm mt-5"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
            </form>
            {cardError && (
                <p className="text-lg text-red-600 text-center">{cardError}</p>
            )}
        </>
    );
};

export default CheckoutForm;
