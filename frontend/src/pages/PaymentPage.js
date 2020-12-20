import { useState } from 'react';
import { Button, Col, Form, FormGroup, FormLabel } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { useSelector } from 'react-redux';

const PaymentPage = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const cartState = useSelector(state => state.cartState);
  const { shippingAddress } = cartState;

  const userLoginState = useSelector(state => state.userLoginState);
  const { userInfo } = userLoginState;

  if (!userInfo) {
    history.push('/login?redirect=/cart')
  } if (!shippingAddress) {
    history.push('/shipping');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <FormContainer>
      <CheckoutSteps numSteps={3} />
      <h1>Payment</h1>
      <Form>
        <FormGroup id='payment-method'>
          <FormLabel as='lengend'>Payment methods</FormLabel>
          <Col>
            <Form.Check
              type='radio'
              id='paypal'
              name='Payment method'
              label='Paypal'
              value='Paypal'
              checked={paymentMethod === 'Paypal'}
              onSelect={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </FormGroup>
        <Button type="button" onSubmit={handleSubmit}>Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
