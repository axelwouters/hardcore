//On importe les outils nécessaires depuis React et Redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { selectBasket } from "../slices/basketSlice";
import { useState, useEffect } from "react";
import { checkPayment, updateOrder } from "../api/order";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Navigate } from "react-router-dom";

const CheckoutForm = (props) => {
    //On récupere les informations de l'utilisateur et du panier depuis redux
    const user = useSelector(selectUser);
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [redirectSuccess, setRedirectSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    

    //Fonction pour gerer la soumission du formulaire de paiement
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Starting payment process");

        //On verifie que Stripe est bien chargé
        if (!stripe || !elements) {
            setError("Stripe n'est pas chargé correctement");
            return;
        }

        //On prépare les données pour vérifier le paiement
        const data = {
            orderId: props.orderId,
            email: user.infos.email
        };

        try {
            //On vérifie le paiement avec le serveur
            console.log("Checking payment with data:", data);
            const paymentAuth = await checkPayment(data);
            console.log("Payment auth response:", paymentAuth);

            //On vérifie que la réponse du serveur est correcte
            if (paymentAuth.status !== 200) {
                console.error("Payment auth failed:", paymentAuth);
                setError(paymentAuth.msg || "Échec de l'autorisation du paiement");
                return;
            }

            //On vérifie que le secret client est présent
            if (!paymentAuth.client_secret) {
                console.error("client_secret is missing in the paymentAuth response");
                setError("Erreur de configuration du paiement: client_secret manquant");
                return;
            }

            const secret = paymentAuth.client_secret;
            console.log("Retrieved client_secret:", secret);

            //On vérifie que le secret est valide
            if (typeof secret !== 'string' || secret.trim() === '') {
                console.error("Invalid client_secret:", secret);
                setError("Erreur de configuration du paiement: client_secret invalide");
                return;
            }

            //On confirme le paiement avec stripe
            console.log("Confirming card payment with secret:", secret);
            const { error, paymentIntent } = await stripe.confirmCardPayment(secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: user.infos.email
                    }
                }
            });

            //On gere le resultat du paiement
            if (error) {
                console.error("Payment confirmation error:", error);
                setError(error.message);
            } else if (paymentIntent.status === "succeeded") {
                console.log("Payment succeeded:", paymentIntent);

                //On prepare les données pour mettre à jour la commande
                const updateData = {
                    orderId: props.orderId,
                    status: "payed"
                };

                //On met a jour la commande sur le serveur
                console.log("Updating order with data:", updateData);
                const updateResponse = await updateOrder(updateData);
                console.log("Order update response:", updateResponse);

                //On vérifie que la mise à jour a reussi
                if (updateResponse.status === 200) {
                    setRedirectSuccess(true);
                } else {
                    console.error("Order update failed:", updateResponse);
                    setError("Erreur lors de la mise à jour de la commande");
                }
            }
        } catch (err) {
            console.error("Unexpected error during payment process:", err);
            setError("Une erreur inattendue est survenue lors du traitement du paiement");
        }
    };

    //Si le paiement a reussi, on redirige vers la page de succés
    if (redirectSuccess) {
        return <Navigate to="/success" />;
    }

    //J'affiche le formulaire de paiement
    return (
        <section id="checkout-form">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <CardElement 
                    options={{
                        style: {
                            base: {
                                color: "#215cc2",
                                fontFamily: `"Helvetica Neue", Helvetica, sans-serif`,
                                fontSize: "16px",
                            },
                            invalid: {
                                color: "#ff2c2c",
                                iconColor: "#ff2c2c",
                            }
                        }
                    }}
                />
                <button className="Payer" type="submit" disabled={!stripe}>
                    Payer
                </button>
            </form>
        </section>
    );
};

export default CheckoutForm;