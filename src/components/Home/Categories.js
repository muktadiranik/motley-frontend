import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import CategoryProducts from "./CategoryProducts";
import { listCategories } from "../../actions/categoryActions";
import Message from "../Message";
import Loader from "../Loader";

const Categories = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categoryReducer);
  const { error, isLoading, categoryList } = categoryState;
  const [categoryId, setCategoryId] = useState(1);
  useEffect(() => {
    dispatch(listCategories());
  }, []);

  return (
    <div className=' text-center my-4'>
      {isLoading && <Loader />}
      {error && <Message error={error} />}
      {categoryList && (
        <div>
          <ButtonGroup>
            {categoryList.map((category) => (
              <Button
                key={category.id}
                variant='secondary'
                onClick={() => {
                  setCategoryId(category.id);
                }}>
                {category.title}
              </Button>
            ))}
          </ButtonGroup>
          <div>
            <CategoryProducts categoryId={categoryId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
