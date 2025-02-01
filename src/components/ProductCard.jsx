import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full aspect-square">
        <img
          src={product.images[0]}
          className="object-contain w-full h-full"
          alt={product.name}
        />
      </div>
      <div className="text-black p-4">
        <p className="truncate font-semibold">{product.name}</p>
        <p className="font-semibold text-red-600">{product.price}:-</p>
      </div>
    </Link>
  );
};

export default ProductCard;