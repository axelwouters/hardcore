
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../components/Checkout-form"
import { Elements } from "@stripe/react-stripe-js"



const Payment = (props) => {
    //Ma clé publique de stripe me brancher l'environnement
    const stripePromise = loadStripe("pk_test_51PwPk4P8IUFD1Oi7rzdPjJFjc7So7we2SxXzl95DU9gOZGrZ1tcrWMdPHbrM3zJEtZAVZGFnK6xaPlvn0WRFa63Q00oIAefGEX")
    return (<section id="payment">
        <h2>Paiement</h2>
        <p>Id de la commande: {props.params.orderId}</p>
        {/* On va brancher l'environnement des fonctionnalitées de react-stripe
            qui va permettre d'effectuer les échanges avec l'api
        */}
            <Elements stripe={stripePromise}>
                <CheckoutForm orderId={props.params.orderId} />
            </Elements>
    </section>)
}

export default Payment