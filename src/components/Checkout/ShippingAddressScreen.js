import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutProgress from "./CheckoutProgress";

const ShippingAddressScreen = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.addressReducer);
  const navigate = useNavigate();
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const newShippingAddress = {
      address: address,
      city: city,
      postalCode: postalCode,
      country: country,
    };
    dispatch(saveShippingAddress(newShippingAddress));
    navigate("/payment-method/", { replace: true });
  };
  return (
    <div className=' container text-start'>
      <div className=' justify-content-center'>
        <CheckoutProgress step1 step2 />
      </div>
      <h1>Shipping Address</h1>
      <div>
        <Button
          onClick={() => {
            navigate("/login", { replace: true });
          }}>
          <i className='fa-solid fa-backward'></i>&nbsp;
          <span>Login</span>
        </Button>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              type='text'
              placeholder='Enter Address'
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              type='text'
              placeholder='Enter City'
              onChange={(event) => {
                setCity(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              type='text'
              placeholder='Enter Postal Code'
              onChange={(event) => {
                setPostalCode(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              type='text'
              placeholder='Enter Country'
              onChange={(event) => {
                setCountry(event.target.value);
              }}
              required
            />
          </Form.Group>

          <Button variant='primary' type='submit' className='float-right'>
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressScreen;
