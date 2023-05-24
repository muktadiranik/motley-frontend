import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../actions/cartActions";

const Products = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (id, quantity) => {
    dispatch(addCartItem(id, quantity));
  };
  return (
    <div className=' my-2 mx-2'>
      <Card className='my-3 p-2'>
        <Link to={`/products/${product.id}`}>
          {product.image ? (
            <Card.Img src={product.image} />
          ) : (
            <Card.Img src='https://picsum.photos/400/400' height='400px' />
          )}
        </Link>
        <Link to={`/products/${product.id}`} className=' py-1'>
          <Card.Title>
            <h4 className=' text-center'>{product.title}</h4>
          </Card.Title>
        </Link>

        <Card.Body>
          <Card.Text as='div'>
            <span>
              <Rating value={product.rating} reviews={product.review_count} />
            </span>
            <div className=' my-2'>
              {product.category.map((unitCategory) => (
                <Badge key={unitCategory.id} bg='info' className=' mx-1 my-1'>
                  {unitCategory.title}
                </Badge>
              ))}
              <br />
              <Badge bg='danger' className=' mx-1 my-1'>
                {product.brand_title}
              </Badge>
            </div>
            <div className=' py-3'>
              <h2>৳{product.price}</h2>
            </div>
          </Card.Text>
          <Button
            onClick={() => {
              handleAddToCart(product.id, 1);
            }}>
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Products;
