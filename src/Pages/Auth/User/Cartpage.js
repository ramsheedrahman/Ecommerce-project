// CartPage.js
import React, { useEffect, useState } from "react";
import { FaTrash, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../../Components/Context/cart";
import '../../../Styles/Cartpage.css'
import Layout from "../../../Components/Layout/Layout";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StripeContainer from "./StripeContainer";
const CartPage = () => {
  const navigate=useNavigate()
  const [cart,setCart]=useCart([])
  const [redyForpaid,setreadyForpaid]=useState(false)

  const calculateTotalPrice = () => {
    const total= cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return total.toLocaleString('en-US',{
        style:'currency',
        currency:'USD'
    })
  };
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice());

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }

      return item;

    });

    setCart(updatedCart);
  };
  
  return (
    <Layout>
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Items in Cart:{cart.length}items</h5>
              </div>
              <div className="card-body">
              {
  Array.from(new Set(cart.map(item => item._id))).map(productId => {
    const product = cart.find(item => item._id === productId);

    return (
      <div className="row" key={product._id}>
        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
          <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
            <img src={`http://localhost:8000/product/get-productphoto/${product._id}`} className="w-100" alt={product.name} />
            <a href="#!">
              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
            </a>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
          <p>
            <strong>{product.name}</strong>
          </p>
          <p>Color: {product.color}</p>
          <p>Size: {product.size}</p>
          <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item">
            <FaTrash />
          </button>
          <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Move to the wish list">
            <FaHeart />
          </button>
        </div>
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <button className="btn btn-primary px-3 me-2" onClick={() => handleQuantityChange(product._id, product.quantity -1)}>
              <FaMinus />
            </button>
            <div className="form-outline">
              <input id={`form-${product._id}`} min="0" name="cartquantity" value={product.quantity} type="number" className="form-control" />
              <label className="form-label" htmlFor={`form-${product._id}`}>
                Quantity
              </label>
            </div>
            <button className="btn btn-primary px-3 ms-2" onClick={() => handleQuantityChange(product._id, product.quantity + 1)}>
              <FaPlus />
            </button>
          </div>
          <p className="text-start text-md-center">
            <strong>${product.price.toFixed(2)}</strong>
          </p>
        </div>
      </div>
    );
  })
}

              </div>
            </div>

            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p>
                  <strong>Expected shipping delivery</strong>
                </p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>

            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.svg"
              alt="PayPal acceptance mark" />

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>{calculateTotalPrice()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>$53.98</strong>
                    </span>
                  </li>
                </ul>

                <button onClick={()=>navigate('/payment')}>Checkout</button>

              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      
    </section>
    {redyForpaid ? 
    <div className="row d-flex justify-content-center m-3">
    <div className="col-12 col-md-6 ">
  <div className="stripeContainer">
    <StripeContainer amount={totalPrice}/>
  </div>
</div>
</div>
:
null
}


    </Layout>
  );
};

export default CartPage;
