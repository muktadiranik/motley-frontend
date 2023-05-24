import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../../actions/cartActions";
import { Image, Row, Col, Button } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import CartSummary from "./CartSummary";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.getCartReducer);
  const updateCartState = useSelector((state) => state.updateCartReducer);
  const { error, isLoading, cartItems } = cartState;
  const { cartId } = useSelector((state) => state.cartReducer);
  const { updateCartItems } = updateCartState;
  const [toggle, setToggle] = useState(false);

  const updateCart = (id, quantity) => {
    dispatch(updateCartItem(id, quantity));
  };
  const deleteCart = (id) => {
    dispatch(deleteCartItem(id));
    setToggle(!toggle);
  };

  useEffect(() => {
    if (cartId) {
      dispatch(getCartItems());
    }
  }, [updateCartItems, toggle, cartId]);

  return (
    <div className=' container-fluid text-start'>
      <div>
        <Row>
          <Col sm={12} md={12} lg={10} xl={8} className=' my-4'>
            <div>
              <div className=' text-center'>
                {isLoading && <Loader />}
                {error && <Message error={error} />}
              </div>
              {cartItems && <h1>Cart Items</h1>}
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
                        <Row>
                          <div>
                            <div className=' text-center'>
                              <Button
                                size='sm'
                                onClick={() => {
                                  updateCart(item.id, item.quantity + 1);
                                }}>
                                <i className='fa-solid fa-angle-up'></i>
                              </Button>
                            </div>
                          </div>
                          <div>
                            <div className=' d-flex justify-content-center'>
                              <h5>{item.quantity}</h5>
                            </div>
                          </div>
                          <div>
                            <div className=' text-center'>
                              <Button
                                size='sm'
                                disabled={item.quantity > 1 ? false : true}
                                onClick={() => {
                                  updateCart(item.id, item.quantity - 1);
                                }}>
                                <i className='fa-solid fa-angle-down'></i>
                              </Button>
                            </div>
                          </div>
                        </Row>
                      </Col>
                      <Col>
                        <Button
                          variant='danger'
                          onClick={() => {
                            deleteCart(item.id);
                          }}>
                          <i className='fa-solid fa-trash'></i>
                        </Button>
                      </Col>
                      <Col>
                        <h5>${item.total_price}</h5>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
            </div>
          </Col>
          <Col sm={12} md={12} lg={2} xl={4} className=' my-4'>
            <CartSummary updateCartItems={updateCartItems} toggle={toggle} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartScreen;
