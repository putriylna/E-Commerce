import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";
import { useCartStore } from "../store/useCartStore";
import { FaPlus, FaChevronRight } from "react-icons/fa6";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function ProductDetailPage() {
  const [showAlert, setShowAlert] = useState(false);
  const { titleSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // If product exists in state (from navigation), don't fetch again
    if (location.state?.product) return;

    const fetchProductByTitle = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all products
        const res = await api.get("/products");
        const products = res.data || [];

        // Find product by title slug
        const foundProduct = products.find(
          (p) => createSlug(p.title) === titleSlug,
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProductByTitle();
  }, [titleSlug, location.state]);

  const handleAddToCart = () => {
    if (!product) return;

    const productToAdd = {
      id: product.id?.toString(),
      title: product.title || "Untitled Product",
      price: product.price,
      qty: quantity,
      image: product.image || "",
      category: product.category || "",
      description: product.description || "",
    };

    addToCart(productToAdd);
    setShowAlert(true);

    // Auto hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">
          Error: {error || "Product not found"}
        </div>
        <button
          onClick={() => navigate("/products")}
          className="ml-4 px-4 py-2 bg-yellow-400 text-white rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification - Shows when item is added to cart */}
      {showAlert && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert">
            <span>
              Added {quantity} × {product.title} to cart
            </span>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Breadcrumbs Navigation */}
          <div className="breadcrumbs text-sm mb-6">
            <ul>
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="cursor-pointer hover:text-yellow-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/products")}
                  className="cursor-pointer hover:text-yellow-500"
                >
                  Products
                </a>
              </li>
              <li className="text-gray-600 truncate max-w-xs">
                {product.title}
              </li>
            </ul>
          </div>

          {/* Main Product Container */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="md:flex">
              {/* Product Image Section */}
              <div className="md:w-1/2 p-6 md:p-8 flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 md:h-80 object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="md:w-1/2 p-6 md:p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm font-medium border border-yellow-100">
                    {product.category}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                {/* Price Display */}
                <div className="flex items-center mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-3 text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Product Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="divider my-8"></div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4 max-w-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="btn btn-outline btn-circle btn-sm text-gray-500"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="btn btn-outline btn-circle btn-sm text-gray-500"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full btn btn-primary btn-lg flex items-center justify-center gap-3"
                  >
                    <FaPlus className="text-lg" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Continue Shopping Button */}
                  <button
                    onClick={() => navigate("/products")}
                    className="w-full btn btn-outline btn-lg flex items-center justify-center gap-2"
                  >
                    <FaChevronRight className="rotate-180" />
                    <span>Continue Shopping</span>
                  </button>
                </div>

                {/* Additional Product Info (Optional) */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Availability:</span>
                      <span className="ml-2 text-green-600 font-medium">
                        In Stock
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
