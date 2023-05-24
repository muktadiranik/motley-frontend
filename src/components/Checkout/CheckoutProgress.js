import React from "react";
import { Nav, Navbar, ProgressBar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutProgress = ({ step1, step2, step3, step4 }) => {
  return (
    <div className=' my-4'>
      <ProgressBar>
        {step1 ? (
          <ProgressBar variant='warning' now={25} key={1} label='Login' />
        ) : (
          <ProgressBar variant='secondary' now={25} key={1} label='Login' />
        )}
        {step2 ? (
          <ProgressBar
            variant='primary'
            now={25}
            key={2}
            label='Shipping Address'
          />
        ) : (
          <ProgressBar
            variant='secondary'
            now={25}
            key={2}
            label='Shipping Address'
          />
        )}
        {step3 ? (
          <ProgressBar variant='info' now={25} key={3} label='Payment Method' />
        ) : (
          <ProgressBar
            variant='secondary'
            now={25}
            key={3}
            label='Payment Method'
          />
        )}
        {step4 ? (
          <ProgressBar variant='success' now={25} key={4} label='Place Order' />
        ) : (
          <ProgressBar
            variant='secondary'
            now={25}
            key={4}
            label='Place Order'
          />
        )}
      </ProgressBar>
    </div>
  );
};

export default CheckoutProgress;
