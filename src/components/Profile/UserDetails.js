import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getUserDetails } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Message from "../Message";
import { Form, Button } from "react-bootstrap";
import { updateUserDetails } from "../../actions/userActions";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { error, isLoading, user } = useSelector(
    (state) => state.detailsReducer
  );
  const { userInfo } = useSelector((state) => state.loginReducer);
  const { updateDetailsError, updateDetailsIsLoading, success } = useSelector(
    (state) => state.detailsUpdateReducer
  );

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (userInfo) {
      if (!user || !user.email) {
        dispatch(getUserDetails());
      } else {
        setEmail(user.email);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setPhone(user.phone);
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [dispatch, user, success]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUserDetails(firstName, lastName, phone, password));
    setEditable(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {updateDetailsIsLoading && <Loader />}
      {error && <Message error={error} />}
      {updateDetailsError && <Message error={updateDetailsError} />}
      <div className=' text-start container'>
        <div className=' my-5'>
          <Button
            variant={editable ? "info" : "secondary"}
            onClick={() => {
              setEditable(!editable);
            }}>
            <i className='fa-solid fa-pen-to-square'></i>&nbsp;<span>Edit</span>
          </Button>
        </div>

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
              disabled={true}
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
              disabled={editable ? false : true}
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
              disabled={editable ? false : true}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <div className=' d-inline-flex'>
              <Form.Label>Phone</Form.Label>
            </div>
            <div className=' d-inline-flex float-end'>
              {phone.length <= 10 ? (
                <i className='fa-solid fa-xmark'></i>
              ) : (
                <i className='fa-solid fa-check'></i>
              )}
            </div>

            <Form.Control
              type='number'
              placeholder='Enter Phone'
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              required
              disabled={editable ? false : true}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <div hidden={editable ? false : true}>
              <div className=' d-inline-flex'>
                <Form.Label>Password</Form.Label>
              </div>
              <div className=' d-inline-flex float-end'>
                {password.length === 0 ? (
                  <i className='fa-solid fa-xmark'></i>
                ) : password.length <= 8 ? (
                  <i className='fa-solid fa-exclamation'></i>
                ) : (
                  <i className='fa-solid fa-check'></i>
                )}
              </div>
            </div>

            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
              hidden={editable ? false : true}
            />
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            hidden={editable ? false : true}
            disabled={password ? false : true}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserDetails;
