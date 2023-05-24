import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import CheckoutProgress from "./CheckoutProgress";
import { useDispatch } from "react-redux/es/exports";
import { savePaymentMethod } from "../../actions/cartActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentMethodScreen = () => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order/", { replace: true });
  };
  return (
    <div className=' container'>
      <div>
        <CheckoutProgress step1 step2 step3 />
      </div>
      <div className=' text-start'>
        <h1>Select Payment Method</h1>
        <Button
          onClick={() => {
            navigate("/shipping-address", { replace: true });
          }}>
          <i className='fa-solid fa-backward'></i>&nbsp;
          <span>Shipping Address</span>
        </Button>

        <Form onSubmit={onSubmitHandler}>
          <div className=' my-5'>
            <Form.Group>
              <Col>
                <h4>
                  <Form.Check
                    type='radio'
                    label='SSLCOMMERZ'
                    value='sslcommerz'
                    name='paymentMethod'
                    onChange={(event) => {
                      setPaymentMethod(event.target.value);
                    }}
                    defaultChecked></Form.Check>
                </h4>
              </Col>
            </Form.Group>
          </div>

          <Button type='submit'>Continue</Button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
