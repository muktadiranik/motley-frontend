import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Alert,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { productDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { addCartItem } from "../../actions/cartActions";

const Product = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.detailProductReducer);
  const addCartState = useSelector((state) => state.addCartReducer);
  const { error, isLoading, product } = productState;
  const { addItemError, addCartItems } = addCartState;
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  const [isHidden, setIsHidden] = useState(true);
  const [cartAlertVariant, setCartAlertVariant] = useState("info");
  const { id } = useParams();
  const showMessageRef = useRef(false);

  const showMessage = () => {
    if (addCartItems) {
      setCartAlertVariant("success");
      setCartMessage(JSON.stringify(addCartItems.quantity));
      setIsHidden(false);
      setTimeout(() => {
        setIsHidden(true);
      }, 2000);
      return;
    }
    if (addItemError) {
      setCartAlertVariant("danger");
      setCartMessage(addItemError);
      setIsHidden(false);
      setTimeout(() => {
        setIsHidden(true);
      }, 2000);
      return;
    }
  };

  const handleAddToCart = (id, quantity) => {
    dispatch(addCartItem(id, quantity));
  };

  useEffect(() => {
    dispatch(productDetails(id));
  }, []);

  useEffect(() => {
    if (showMessageRef.current) {
      showMessage();
    } else {
      showMessageRef.current = true;
    }
  }, [addItemError, addCartItems]);

  return (
    <div className=' my-5 mx-2'>
      <div className=' container fixed-top mt-5'>
        <div className={isHidden ? "visually-hidden" : "visible"}>
          <Alert variant={cartAlertVariant}>
            <h5>
              Added <Badge>{quantity}</Badge> {product.title}{" "}
              <Badge>{cartMessage}</Badge>
            </h5>
          </Alert>
        </div>
      </div>

      {isLoading && <Loader />}
      {error && <Message error={error} />}
      {product && (
        <Row>
          <Col sm={12} md={12} lg={6} xl={6}>
            <div className=' text-start mx-2 my-2'>
              <Link to='/'>
                <Button>
                  <i className='fa-solid fa-arrow-left-long'></i>
                </Button>
              </Link>
            </div>
            <div className=' text-center'>
              {product.image ? (
                <img src={product.image} alt='' className=' rounded-2' />
              ) : (
                <img
                  src='https://picsum.photos/400/400'
                  alt=''
                  className=' rounded-2'
                />
              )}
            </div>
          </Col>
          <Col sm={12} md={12} lg={3} xl={3}>
            <div className=' text-start'>
              <h1>{product.title}</h1>
              <hr />
              <div>
                <Rating value={product.rating} reviews={product.review_count} />
              </div>
              <hr />
              <h4>৳{product.price}</h4>
              <hr />
              <p>{product.description}</p>
            </div>
          </Col>
          <Col sm={12} md={12} lg={3} xl={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h5>Price</h5>
                    </Col>
                    <Col>
                      <h5>৳{product.price}</h5>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h5>Stock</h5>
                    </Col>
                    {product.stock_count === 0 ? (
                      <Col>
                        <h5>Stock Out</h5>
                      </Col>
                    ) : (
                      <Col>
                        <h5>In Stock</h5>
                      </Col>
                    )}
                  </Row>
                </ListGroup.Item>
                {product.stock_count > 0 && (
                  <div>
                    <ListGroup.Item>
                      <h3>{quantity}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <ButtonGroup>
                        <Button
                          variant='outline-danger'
                          disabled={quantity > 1 ? false : true}
                          onClick={() => {
                            setQuantity((quantity) => quantity - 1);
                          }}>
                          <i className='fa-solid fa-minus'></i>
                        </Button>
                        <Button
                          variant='outline-success'
                          disabled={
                            quantity > product.stock_count ? true : false
                          }
                          onClick={() => {
                            setQuantity((quantity) => quantity + 1);
                          }}>
                          <i className='fa-solid fa-plus'></i>
                        </Button>
                      </ButtonGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className=' text-center'>
                        <Button
                          size='lg'
                          variant='success'
                          onClick={() => {
                            handleAddToCart(id, quantity);
                          }}>
                          Add To Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </div>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Product;
