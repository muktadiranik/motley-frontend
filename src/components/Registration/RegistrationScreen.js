import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { registerUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const userRegistrationState = useSelector((state) => state.registerReducer);
  const { error, isLoading, userInfo } = userRegistrationState;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(registerUser(email, firstName, lastName, phone, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [userInfo]);

  return (
    <div>
      <div className=' my-4 text-center'>
        <h1>Registration</h1>
        <div className=' container'>
          {error && <Message error={error.response.data.email} />}
          {error && <Message error={error.message} />}
          {isLoading && <Loader />}
        </div>

        <div className=' container text-start col-5 my-5'>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter First Name'
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Last Name'
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Phone'
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
