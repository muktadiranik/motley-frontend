import { Button } from "react-bootstrap";
import React, { useEffect, useRef } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { placeOrder } from "../../actions/orderActions";
import Loader from "../Loader";
import Message from "../Message";
import { createCart, getCartSummary } from "../../actions/cartActions";

const PaymentSuccessScreen = () => {
  const dispatch = useDispatch();
  const { isLoading, orderItems, error } = useSelector(
    (state) => state.cartToOrderReducer
  );
  const { shippingAddress } = useSelector((state) => state.addressReducer);
  const isOnec = useRef(false);

  const data = {
    address: shippingAddress.address,
    city: shippingAddress.city,
    postal_code: shippingAddress.postalCode,
    country: shippingAddress.country,
  };

  useEffect(() => {
    if (!isOnec.current) {
      dispatch(placeOrder(data));
      dispatch(createCart());
      dispatch(getCartSummary());
    }
    isOnec.current = true;
  }, [isLoading, orderItems, error, shippingAddress]);
  return (
    <div>
      <div
        id='sslcommerz'
        className=' d-flex align-items-center justify-content-center mt-5 mb-auto ms-auto me-auto alert-success rounded'>
        <div className=' d-block'>
          {" "}
          <h1>
            <i className='fa-solid fa-thumbs-up'></i>
          </h1>
          <h1>Payment Success</h1>
          {isLoading && <Loader />}
          {error && <Message error={error.message} />}
          {orderItems && (
            <div>
              <h2>
                <i className='fa-solid fa-check-double'></i>
              </h2>
              <h2>Order Success</h2>
              <LinkContainer to='/' className=' mx-5'>
                <Button size='lg'>
                  <i className='fa-solid fa-house'></i> &nbsp;<span>Home</span>{" "}
                </Button>
              </LinkContainer>
              <LinkContainer to='/orders/' className=' mx-5'>
                <Button size='lg'>
                  <i className='fa-solid fa-cart-flatbed-suitcase'></i>&nbsp;
                  <span>Orders</span>
                </Button>
              </LinkContainer>
            </div>
          )}
        </div>
      </div>
      <br />
    </div>
  );
};

export default PaymentSuccessScreen;
