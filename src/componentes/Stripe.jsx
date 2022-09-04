import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "./css/stripe.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Navbar from "./PrivateRoute/Navbar";
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import {
  allRequest,
  getAllServices,
  postNotification,
  updateRequest,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
const publicUrl =
  "pk_test_51Lb2ZIKO72YUdcCNim89I44LXzpgG2vz57CjEn0ZAqmTZVW4D1o9y1ea5rzYeeH3dMFE4CAclOjOUqfc5NXncwMe00Zzkr0H1d";
const stripePromise = loadStripe(publicUrl);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const dispatch = useDispatch();
  let service = useSelector((state) => state.services);
  let request = useSelector((state) => state.allRequest);
  request = request.filter((p) => p.state === "aceptado");
  request = request.filter((p) => p.service_id === id);
  service = service.filter((p) => p.id === id);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allRequest());
    dispatch(getAllServices());
  }, [dispatch]);

  const [reque] = useState({
    state: "Pagado",
    id: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const email = service[0].user.email;
      const { id } = paymentMethod;
      await axios.post("http://www.localhost:3001/payment", {
        id,
        amount: request[0]?.services.price,
        email: email,
      });

      dispatch(updateRequest({ ...reque, id: request[0]?.id }));
      dispatch(
        postNotification({
          message: `Recibiste un pago por el servicio ${service[0]?.name}`,
          userNotification_id: request[0]?.requester_id,
          userNotificated_id: service[0]?.user_id,
        })
      );

      elements.getElement(CardElement).clear();
      toast.success("Pago completado exitosamente!, redireccionando...");
      setTimeout(() => {
        navigate("/settings/requester");
      }, 2000);
    }
  };

  return (
    <div className="container-flex">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handlerSubmit} className="input">
        <img
          src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png"
          className="logo-card"
          alt="Not found"
        />

        <CardElement />

        {/* <Link to={`/home/services/review/${id}`}> */}
        <button className="proceed">
          <svg className="sendicon" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
          </svg>
        </button>
        {/* </Link> */}

        <h3>
          {<br />}Amount: ${service[0]?.price}
        </h3>
      </form>
    </div>
  );
};

export default function Stripe() {
  const { id } = useParams();
  let request = useSelector((state) => state.allRequest);
  let prueba = request.filter((p) => p.state === "aceptado");

  prueba = prueba.filter((p) => p.service_id === id);
  // console.log(prueba)
  return (
    <div className="pay-container">
      <Navbar />

      {prueba[0]?.state !== "aceptado" ? (
        <p>MEGA ERROR</p>
      ) : (
        <Elements stripe={stripePromise}>
          <Link style={{ textDecoration: "none" }} to="/settings/requester">
            <Button sx={{ color: "#1F2937" }} variant="outlined">
              Volver atras
            </Button>
          </Link>
          <CheckoutForm />
        </Elements>
      )}
      <Footer />
    </div>
  );
}
