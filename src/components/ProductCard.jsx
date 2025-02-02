import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-[100px] max-h-[300px]">
      <div className="w-full h-48 flex items-center justify-center p-2">
        <img
          src={product.images[0]}
          className="object-contain max-h-full w-full"
          alt={product.name}
        />
      </div>
      <div className="text-black p-4 flex flex-col gap-2">
        <p className="truncate font-semibold">{product.name}</p>
        <p className="font-semibold text-red-600">{product.price}:-</p>
      </div>
    </Link>
  );
};

export default ProductCard;
