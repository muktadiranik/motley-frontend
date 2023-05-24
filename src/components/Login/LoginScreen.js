import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/userActions";
import Message from "../Message";
import Loader from "../Loader";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.loginReducer);
  const { error, isLoading, userInfo } = userLoginState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [userInfo]);

  return (
    <div>
      <div className=' text-center my-4'>
        <h1>Login</h1>
        <div className=' container'>
          {error && <Message error={error.response.data.detail} />}
          {isLoading && <Loader />}
        </div>

        <div className=' container col-5 my-5 text-start'>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
        <div className=' container col-3 my-5 text-start'>
          <p>
            New Customer?
            <span>
              <Link to='/register'>Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
