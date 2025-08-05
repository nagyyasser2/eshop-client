import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { fetchUserOrders } from "../api/orders";
import OrderStatus from "../components/OrderStatus";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaUser,
  FaSearch,
  FaFilter,
  FaShoppingBag,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useState } from "react";

function OrderTracking() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userOrders", user?.id],
    queryFn: () => fetchUserOrders(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });

  // Filter orders based on search and status
  const filteredOrders =
    orders?.filter((order) => {
      const matchesSearch =
        order.id.toString().includes(searchTerm) ||
        order.items?.some((item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    }) || [];

  const getStatusCount = (status: string) => {
    if (status === "all") return orders?.length || 0;
    return orders?.filter((order) => order.status === status).length || 0;
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUser className="text-blue-500 text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Track your orders and view purchase history
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
              <FaExclamationTriangle className="text-blue-500 text-2xl mx-auto mb-3" />
              <p className="text-blue-800 font-medium">
                Please log in to view your orders
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaUser />
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <FaBox className="text-blue-500 text-xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">
                Track and manage your purchases
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          {orders && orders.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {getStatusCount("all")}
                    </p>
                  </div>
                  <FaShoppingBag className="text-blue-500 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Processing
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {getStatusCount("processing")}
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Shipping
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {getStatusCount("shipping")}
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Delivered
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {getStatusCount("delivered")}
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filter Section */}
          {orders && orders.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by order ID or product name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="md:w-64">
                  <div className="relative">
                    <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                    >
                      <option value="all">All Orders</option>
                      <option value="processing">Processing</option>
                      <option value="shipping">Shipping</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {searchTerm && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Showing {filteredOrders.length} result
                    {filteredOrders.length !== 1 ? "s" : ""} for "{searchTerm}"
                  </span>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">
                Loading your orders...
              </p>
              <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't load your orders right now. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {orders?.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaShoppingBag />
              Start Shopping
            </Link>
          </div>
        )}

        {/* No Search Results */}
        {orders && orders.length > 0 && filteredOrders.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              No orders found
            </h3>
            <p className="text-gray-600 mb-6">
              No orders match your current search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Orders List */}
        {filteredOrders && filteredOrders.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            {filteredOrders && filteredOrders.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Est. Delivery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <OrderStatus key={order.id} order={order} />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-6 text-center text-gray-500">
                No orders found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderTracking;
