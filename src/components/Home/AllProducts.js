import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/exports";
import { listProducts } from "../../actions/productActions";
import Products from "./Products";
import { Row, Col } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

const AllProducts = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productReducer);
  const { error, isLoading, productList } = productState;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div className=' my-4'>
      <h1>All Products</h1>
      <div>
        {isLoading && <Loader />}
        {error && <Message error={error} />}
        {productList && (
          <Row>
            {productList.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={2} xl={2}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
