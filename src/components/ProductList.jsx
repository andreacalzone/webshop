import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import AuthLinks from './AuthLinks';

export const ProductList = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="flex gap-8">
      {/* Sidebar and AuthLinks Container */}
      <div className="flex flex-col gap-4 w-64">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <AuthLinks />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 flex-1">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

ProductList.Skeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div className="bg-gray-300/30 aspect-square rounded-lg animate-pulse" />
    </div>
  );
};