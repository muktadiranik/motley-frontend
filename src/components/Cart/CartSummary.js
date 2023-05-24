import React, { useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartSummary } from "../../actions/cartActions";
import Loader from "../Loader";
import Message from "../Message";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ updateCartItems, toggle }) => {
  const dispatch = useDispatch();
  const cartSummaryState = useSelector((state) => state.getCartSummaryReducer);
  const { cartId } = useSelector((state) => state.cartReducer);
  const { error, isLoading, cartSummary } = cartSummaryState;
  const navigate = useNavigate();

  useEffect(() => {
    if (cartId) {
      dispatch(getCartSummary());
    }
  }, [updateCartItems, toggle, cartId]);

  return (
    <div className=' text-center'>
      {isLoading && <Loader />}
      {error && <Message error={error} />}

      {cartSummary && (
        <div>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal ({cartSummary.total_quantity}) items</h3>
              <h1>৳{cartSummary.total_price}</h1>
            </ListGroup.Item>
            {cartSummary.total_quantity > 0 && (
              <ListGroup.Item>
                <Button
                  size='lg'
                  onClick={() => {
                    navigate("/shipping-address/", {
                      replace: true,
                    });
                  }}>
                  Checkout
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
