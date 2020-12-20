import { useState } from 'react';
import { Button, Col, Form, FormGroup, FormLabel } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentPage = ({ history }) => {
  const cartState = useSelector((state) => state.cartState);

  const [paymentMethod, setPaymentMethod] = useState(
    cartState.paymentMethod ?? 'Paypal'
  );

  const dispatch = useDispatch();

  const userLoginState = useSelector((state) => state.userLoginState);
  const { userInfo } = userLoginState;

  if (!userInfo) {
    history.push('/login?redirect=/cart');
  } else if (!cartState.shippingAddress) {
    history.push('/shipping');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps numSteps={3} />
      <h1>Payment</h1>
      <Form>
        <FormGroup id='payment-method'>
          <FormLabel as='legend'>Payment method</FormLabel>
          <Col>
            <Form.Check
              type='radio'
              id='paypal'
              name='Payment method'
              label='Paypal'
              value='Paypal'
              checked={paymentMethod === 'Paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </FormGroup>
        <Button type='button' onClick={handleSubmit}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
