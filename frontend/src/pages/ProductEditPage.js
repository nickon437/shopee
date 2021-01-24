import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import {
  createProduct,
  updateProduct,
  fetchProductDetails,
  uploadImage,
} from '../actions/productActions';
import { REFRESH_PRODUCT } from '../constants/productConstants';

const ProductEditPage = ({ match, history }) => {
  const productId = match.params.id;
  const isNewProduct = productId === 'new';

  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const brandRef = useRef();
  const countInStockRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();

  const dispatch = useDispatch();

  const productDetailsState = useSelector((state) => state.productDetailsState);
  const {
    loading,
    isUpdating,
    isUpdatedSuccessful,
    error,
    product,
  } = productDetailsState;

  const imageUploadState = useSelector((state) => state.imageUploadState);
  const {
    isLoading: isImageUploading,
    imagePath,
    error: imageUploadingError,
  } = imageUploadState;

  const userLoginState = useSelector((state) => state.userLoginState);
  const { userInfo } = userLoginState;

  if (!userInfo?.isAdmin) {
    history.push('/login');
  }

  useEffect(() => {
    if (!isImageUploading) {
      if (imageUploadingError) {
        console.error(imageUploadingError);
      } else {
        imageRef.current.value = imagePath ?? '';
      }
    }
  }, [isImageUploading, imagePath, imageUploadingError]);

  useEffect(() => {
    if (!isNewProduct && product._id !== productId) {
      dispatch(fetchProductDetails(productId));
    }

    if (!isNewProduct) {
      nameRef.current.value = product.name;
      priceRef.current.value = product.price;
      imageRef.current.value = product.image;
      brandRef.current.value = product.brand;
      countInStockRef.current.value = product.countInStock;
      categoryRef.current.value = product.category;
      descriptionRef.current.value = product.description;
    }
  }, [dispatch, isNewProduct, product, productId]);

  useEffect(() => {
    if (isUpdatedSuccessful) {
      dispatch({ type: REFRESH_PRODUCT });
      history.push('/admin/productlist');
    }
  }, [isUpdatedSuccessful, history, dispatch]);

  const handleSave = (e) => {
    e.preventDefault();

    const productToSave = {
      id: isNewProduct ? undefined : product._id,
      name: nameRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
      brand: brandRef.current.value,
      countInStock: countInStockRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
    };

    if (isNewProduct) {
      dispatch(createProduct(productToSave));
    } else {
      dispatch(updateProduct(productToSave));
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    await dispatch(uploadImage(file));

    
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>{isNewProduct ? 'Create' : 'Edit'} Product</h1>
        {(loading || isUpdating) && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={handleSave}>
          <FormGroup controlId='name'>
            <FormLabel>Name</FormLabel>
            <FormControl type='text' placeholder='Enter name' ref={nameRef} />
          </FormGroup>
          <FormGroup controlId='price'>
            <FormLabel>Price</FormLabel>
            <FormControl
              type='number'
              placeholder='Enter price'
              ref={priceRef}
              step='0.01'
              pattern='^\d+(?:\.\d{1,2})?$'
            />
          </FormGroup>
          <FormGroup controlId='image'>
            <FormLabel>Image</FormLabel>
            <FormControl
              type='text'
              placeholder='Enter image link'
              ref={imageRef}
            />
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={handleUpload}
            />
            {isImageUploading && <Loader />}
          </FormGroup>
          <FormGroup controlId='brand'>
            <FormLabel>Brand</FormLabel>
            <FormControl type='text' placeholder='Enter brand' ref={brandRef} />
          </FormGroup>
          <FormGroup controlId='countInStock'>
            <FormLabel>Count In Stock</FormLabel>
            <FormControl
              type='number'
              placeholder='Enter amount of stock'
              ref={countInStockRef}
            />
          </FormGroup>
          <FormGroup controlId='category'>
            <FormLabel>Category</FormLabel>
            <FormControl
              type='text'
              placeholder='Enter category'
              ref={categoryRef}
            />
          </FormGroup>
          <FormGroup controlId='description'>
            <FormLabel>Description</FormLabel>
            <FormControl
              type='text'
              placeholder='Enter description'
              ref={descriptionRef}
            />
          </FormGroup>
          <Button variant='primary' type='submit'>
            {isNewProduct ? 'Create' : 'Update'}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
