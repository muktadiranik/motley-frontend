import React, { useEffect, useState } from "react";
import { Row, Col, Badge, Button, Image, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutProgress from "./CheckoutProgress";
import { getCartItems, getCartSummary } from "../../actions/cartActions";
import axios from "axios";
import store from "../../store";
import {
  sslcommerzGatewayAction,
  saveAdditionalOrderInfo,
} from "../../actions/orderActions";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.addressReducer);
  const { paymentMethod } = useSelector((state) => state.methodReducer);
  const { cartItems } = useSelector((state) => state.getCartReducer);
  const { cartSummary } = useSelector((state) => state.getCartSummaryReducer);
  const { cartId } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    if (cartId) {
      dispatch(getCartItems());
      dispatch(getCartSummary());
    }
  }, []);

  const sslcommerz = () => {
    const orderInfoData = {
      cart_id: cartId,
      payment_method: paymentMethod,
      tax_price: (cartSummary.total_price * 0.15).toFixed(2),
      shipping_price: cartSummary.total_price > 1000 ? 0 : 100,
      total_price: (
        parseFloat(cartSummary.total_price) +
        parseFloat(cartSummary.total_price > 1000 ? 0 : 100) +
        parseFloat((cartSummary.total_price * 0.15).toFixed(2))
      ).toFixed(2),
    };
    localStorage.setItem("orderInfo", JSON.stringify(orderInfoData));

    const { loginReducer } = store.getState();
    const cartData = {
      total_amount: (
        parseFloat(cartSummary.total_price) +
        parseFloat(cartSummary.total_price > 1000 ? 0 : 100) +
        parseFloat((cartSummary.total_price * 0.15).toFixed(2))
      ).toFixed(2),
      cus_name:
        loginReducer.userInfo.first_name +
        " " +
        loginReducer.userInfo.last_name,
      cus_email: loginReducer.userInfo.email,
      cus_phone: loginReducer.userInfo.phone,
      cus_add1: shippingAddress.address,
      cus_city: shippingAddress.city,
      cus_country: shippingAddress.country,
      num_of_item: cartSummary.total_quantity,
      product_name: cartItems.map((item) => item.product.title),
    };
    console.log(cartData);
    dispatch(sslcommerzGatewayAction(cartData));
  };

  const navigate = useNavigate();
  return (
    <div className=' container-fluid'>
      <div className=' container'>
        <CheckoutProgress step1 step2 step3 step4 />
      </div>
      <div className=' text-start my-2'>
        <Button
          onClick={() => {
            navigate("/payment-method", { replace: true });
          }}>
          <i className='fa-solid fa-backward'></i>&nbsp;
          <span>Payment Method</span>
        </Button>
      </div>

      <Row>
        <Col sm={12} md={12} lg={8} xl={8}>
          <div className=' container my-4'>
            <div className=' container text-start my-2'>
              <h2>Shipping Address</h2>
              {shippingAddress && (
                <p>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              )}
            </div>
            <hr />
            <div className=' container text-start my-2'>
              <h2>Payment Method</h2>
              <h5>
                <Badge bg='success'>{paymentMethod}</Badge>
              </h5>
            </div>
            <hr />
            <div className=' container text-start my-2'>
              <h2>Cart</h2>
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.id}>
                    <Row>
                      <Col>
                        <Image src={item.product.image} height='100' rounded />
                      </Col>
                      <Col>
                        <h5>{item.product.title}</h5>
                      </Col>
                      <Col>
                        <h5>৳{item.product.price}</h5>
                      </Col>

                      <Col>
                        <h5>{item.quantity}</h5>
                      </Col>
                      <Col>
                        <h5>${item.total_price}</h5>
                      </Col>
                    </Row>
                    <br />
                  </div>
                ))}
            </div>
          </div>
        </Col>
        <Col sm={12} md={12} lg={4} xl={4}>
          <div>
            <h2>Payment</h2>
            {cartSummary && (
              <div>
                <ListGroup>
                  <ListGroup.Item>
                    <h3>Subtotal ({cartSummary.total_quantity}) items</h3>
                    <h1>
                      ৳
                      {(
                        parseFloat(cartSummary.total_price) +
                        parseFloat(cartSummary.total_price > 1000 ? 0 : 100) +
                        parseFloat((cartSummary.total_price * 0.15).toFixed(2))
                      ).toFixed(2)}
                    </h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>Total Items:</h4>
                      </Col>
                      <Col>
                        <h4>{cartSummary.total_quantity}</h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>Total Price:</h4>
                      </Col>
                      <Col>
                        <h4>৳{cartSummary.total_price}</h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>Shipping Cost:</h4>
                      </Col>
                      <Col>
                        <h4>৳{cartSummary.total_price > 1000 ? 0 : 100}</h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>VAT:</h4>
                      </Col>
                      <Col>
                        <h4>৳{(cartSummary.total_price * 0.15).toFixed(2)}</h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>Total Payable:</h4>
                      </Col>
                      <Col>
                        <h4>
                          ৳
                          {(
                            parseFloat(cartSummary.total_price) +
                            parseFloat(
                              cartSummary.total_price > 1000 ? 0 : 100
                            ) +
                            parseFloat(
                              (cartSummary.total_price * 0.15).toFixed(2)
                            )
                          ).toFixed(2)}
                        </h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {cartSummary.total_quantity > 0 && (
                    <ListGroup.Item>
                      <Button size='lg' onClick={sslcommerz}>
                        Place Order
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
