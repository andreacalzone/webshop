import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiSolidCartAdd } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/features/shoppingCart/shoppingCartSlice';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!productId) {
      console.error('❌ No productId found in useParams()');
      setError('Invalid product ID');
      return;
    }

    console.log(`🔍 Fetching product with ID: ${productId}`);

    const getProduct = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`https://js2-ecommerce-api.vercel.app/api/products/${productId}`);
        console.log('✅ Product fetched:', res.data);
        setProduct(res.data);
      } catch (err) {
        console.error('❌ API request failed:', err);
        setError('Something went wrong');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  const handleClick = () => {
    // Add the product to the cart
    dispatch(addToCart(product));
  };

  if (error) {
    return (
      <div className="mt-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (loading || !product) {
    return (
      <div className="mt-5">
        <div className="w-full aspect-video bg-gray-300/30 rounded-lg animate-pulse" />
        <div className="mt-4 w-1/2 h-8 bg-gray-300/30 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="w-full max-w-md mx-auto aspect-square rounded-lg bg-white">
        <img
          src={product.images[0]}
          className="w-full h-full object-contain"
          alt={product.name}
        />
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="mt-2">{product.description}</p>
        <p className="mt-2 font-semibold">Pris: {product.price}:-</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleClick}
          className="flex items-center gap-4 bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Lägg i varukorgen <BiSolidCartAdd />
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;