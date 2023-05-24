import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Badge, NavDropdown, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { createCart, getCartSummary } from "../actions/cartActions";

function Header() {
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.loginReducer);
  const cartSummaryState = useSelector((state) => state.getCartSummaryReducer);

  const { addCartItems } = useSelector((state) => state.addCartReducer);
  const { updateCartItems } = useSelector((state) => state.updateCartReducer);
  const { isLoading } = useSelector((state) => state.deleteCartReducer);
  const { cartId } = useSelector((state) => state.cartReducer);

  const { userInfo } = userLoginState;
  const { cartSummary } = cartSummaryState;

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    dispatch(createCart());
  }, []);

  useEffect(() => {
    if (cartId) {
      dispatch(getCartSummary());
    }
  }, [addCartItems, updateCartItems, isLoading]);

  return (
    <Navbar bg='dark' expand='lg' variant='dark' className=' py-4'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>React-Django</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fa-solid fa-cart-shopping'></i>Cart
                {cartSummary && cartSummary.total_quantity ? (
                  <Badge>{cartSummary.total_quantity}</Badge>
                ) : (
                  <Badge>0</Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.first_name} id='basic-nav-dropdown'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    <NavItem className=' nav-link'>
                      <i className='fa-solid fa-user'></i>Profile
                    </NavItem>
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/orders'>
                  <NavDropdown.Item>
                    <NavItem className=' nav-link'>
                      <i className='fa-solid fa-cart-flatbed-suitcase'></i>
                      Orders
                    </NavItem>
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item>
                  <NavItem className=' nav-link' onClick={logoutHandler}>
                    <i className='fa-solid fa-right-from-bracket'></i>Logout
                  </NavItem>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fa-solid fa-right-to-bracket'></i>Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
