import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { listLatestProducts } from "../../actions/productActions";
import { Carousel, Image } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.latestProductReducer);
  const { error, isLoading, productList } = productState;

  useEffect(() => {
    dispatch(listLatestProducts());
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <Message error={error} />}
      {productList && (
        <div className=' my-4'>
          <h1>Latest Products</h1>
          <Carousel fade interval={2000}>
            {productList.map((product) => (
              <Carousel.Item key={product.id}>
                <div className=' d-flex align-items-center justify-content-center mt-4'>
                  <Link to={`/products/${product.id}`}>
                    <Image src={product.image} fluid rounded width={800} />
                  </Link>
                </div>

                <Carousel.Caption>
                  <h3 className=' text-dark'>
                    {product.title} (৳{product.price})
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default LatestProducts;
