import React from 'react';

// Komponen Loading terpisah
const LoadingState = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <span className="loading loading-spinner loading-lg text-yellow-400"></span>
    <p className="mt-4 text-sm text-gray-500">Tunggu sebentar yaa...</p>
  </div>
);

// Komponen Error terpisah
const ErrorState = ({ error, onRetry }) => (
  <div className="p-8 text-center">
    <div className="text-red-500 mb-4">
      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <p className="text-lg font-semibold text-gray-900 mb-2">Error loading products</p>
    <p className="text-gray-600">{error}</p>
    <button 
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Komponen Empty State terpisah
const EmptyState = () => (
  <div className="col-span-full text-center py-12">
    <p className="text-gray-500">No products found</p>
  </div>
);

// Komponen Product Card terpisah
const ProductCard = ({ product, onProductClick, formatPrice }) => (
  <div
    key={product.id}
    className="group relative cursor-pointer border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
    onClick={() => onProductClick(product)}
  >
    <div className="aspect-square overflow-hidden rounded-md mb-4">
      <img
        alt={product.title}
        src={product.image}
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>

    <h3 className="text-sm font-bold line-clamp-1 mb-2">
      {product.title}
    </h3>

    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
      {product.description}
    </p>

    <p className="mt-2 font-semibold text-yellow-500">
      ${formatPrice(product.price)}
    </p>

    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow-sm">
        View Details
      </span>
    </div>
  </div>
);

// Fungsi utilitas
const formatPrice = (price) => {
  return typeof price === 'number' ? price.toFixed(2) : "0.00";
};

// Komponen utama
export default function ProductList({ 
  products, 
  loading, 
  error, 
  onProductClick,
  onRetry 
}) {
  // Early returns untuk state khusus
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={onRetry} />;
  if (products.length === 0) return <EmptyState />;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
}