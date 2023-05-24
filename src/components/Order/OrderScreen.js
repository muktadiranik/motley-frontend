import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getOrderItems } from "../../actions/orderActions";
import { Row, Col, Image } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { isLoading, orderItems, error } = useSelector(
    (state) => state.orderItemsReducer
  );
  useEffect(() => {
    dispatch(getOrderItems());
  }, [dispatch]);

  return (
    <div>
      <div className=' container-fluid text-start my-4'>
        <h1>Orders</h1>

        <div>
          {isLoading && <Loader />}
          {error && <Message error={error} />}
          {orderItems &&
            Array.isArray(orderItems) &&
            orderItems.map((item) => {
              return (
                <div key={item.id}>
                  {" "}
                  <Row>
                    <div>
                      <h4>Order({item.id})</h4>
                    </div>
                    <Col>
                      {Array.isArray(item.orderitem_set) &&
                        item.orderitem_set.map((product) => {
                          return (
                            <div key={product.id}>
                              <Row>
                                <Col>
                                  <Image
                                    src={product.product.image}
                                    height='100'
                                    rounded
                                  />
                                </Col>
                                <Col>{product.product.title}</Col>
                                <Col>{product.quantity}</Col>
                                <Col>৳{product.price}</Col>
                                <Col>৳{product.price}</Col>
                                <Col>৳{product.price}</Col>
                                <Col>৳{product.price}</Col>
                              </Row>
                              <br />
                            </div>
                          );
                        })}
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <h5>Payment Method</h5>
                        </Col>
                        <Col>
                          <h5>{item.payment_method}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5>VAT</h5>
                        </Col>
                        <Col>
                          <h5>৳{item.tax_price}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5>Shipping Price</h5>
                        </Col>
                        <Col>
                          <h5>৳{item.shipping_price}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5>Total Paid</h5>
                        </Col>
                        <Col>
                          <h5>৳{item.total_price}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5>Paid</h5>
                        </Col>
                        <Col>
                          <h5>
                            {item.is_paid ? (
                              <i className='fa-solid fa-circle-check'></i>
                            ) : (
                              <i className='fa-solid fa-circle-xmark'></i>
                            )}
                          </h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5>Delivered</h5>
                        </Col>
                        <Col>
                          <h5>
                            {item.is_delivered ? (
                              <i className='fa-solid fa-circle-check'></i>
                            ) : (
                              <i className='fa-solid fa-circle-xmark'></i>
                            )}
                          </h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5>Shipping Address</h5>
                        </Col>
                        <Col>
                          <h5>
                            {item ? item.shippingaddress.address : ""},{" "}
                            {item ? item.shippingaddress.city : ""},{" "}
                            {item ? item.shippingaddress.postal_code : ""},{" "}
                            {item ? item.shippingaddress.country : ""}
                          </h5>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
