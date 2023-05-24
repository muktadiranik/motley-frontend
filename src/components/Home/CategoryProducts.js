import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  listCategoryProducts,
} from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";

const CategoryProducts = ({ categoryId }) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.categoryProductReducer);
  const { error, isLoading, productList } = productState;

  useEffect(() => {
    dispatch(listCategoryProducts(categoryId));
  }, [categoryId]);

  return (
    <div>
      <Row>
        {isLoading && <Loader />}
        {error && <Message error={error} />}
        {productList.product_set &&
          productList.product_set.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={2} xl={2}>
              <Products product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default CategoryProducts;
