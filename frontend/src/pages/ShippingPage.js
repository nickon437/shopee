import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = ({ history }) => {
  const cartState = useSelector((state) => state.cartState);
  const { shippingAddress } = cartState;

  const [address, setAddress] = useState(shippingAddress?.address ?? '');
  const [city, setCity] = useState(shippingAddress?.city ?? '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode ?? '');
  const [country, setCountry] = useState(shippingAddress?.country ?? '');

  const dispatch = useDispatch();

  const userLoginState = useSelector(state => state.userLoginState);
  const { userInfo } = userLoginState;

  if (!userInfo) {
    history.push('/login?redirect=/cart');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps numSteps={2} />
      <h1>Shipping</h1>
      <Form>
        <FormGroup controlId='address'>
          <FormLabel>Address</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter address'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='city'>
          <FormLabel>City</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter city'
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='postalCode'>
          <FormLabel>PostalCode</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter postal code'
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='country'>
          <FormLabel>Country</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter country'
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type='button' className='btn-block' onClick={handleSubmit}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
