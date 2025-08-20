import React from "react";
import { useEffect, useState } from "react";

const List = () => {
  const productList = [
    { name: "Narsimha", category: "Mythology" },
    { name: "Housefull 4", category: "Comedy" },
    { name: "War", category: "Action" },
    { name: "3 Idiots", category: "Drama" },
    { name: "Chhichhore", category: "Drama" },
    { name: "Bhool Bhulaiyaa 2", category: "Comedy" },
    { name: "Kabir Singh", category: "Romance" },
    { name: "Dangal", category: "Sports Drama" },
    { name: "Brahmastra", category: "Fantasy" },
    { name: "Gadar 2", category: "Action" },
    { name: "KGF Chapter 2", category: "Action" },
    { name: "Stree", category: "Horror Comedy" },
    { name: "Tanhaji", category: "Historical Action" },
    { name: "RRR", category: "Action Drama" },
  ];

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState("");
  let filteredCategory;
  if (categories) {
    filteredCategory = products.filter(
      (product) => product.category === categories
    );
  } else {
    filteredCategory = products;
  }

  useEffect(() => {
    let savedProduct = JSON.parse(localStorage.getItem("productList"));
    if (savedProduct) {
      setProducts(savedProduct);
    } else {
      setProducts(productList);
      localStorage.setItem("productList", JSON.stringify(productList));
    }
  }, []);
  const bookData = [
    { mname: "Narasimha", price: 331 },
    { mname: "Sholay", price: 366 },
    { mname: "War", price: 185 },
    { mname: "Housefull", price: 163 },
    { mname: "3 Idiots", price: 219 },
    { mname: "Chennai Express", price: 228 },
    { mname: "Koi Mil Gaya", price: 437 },
    { mname: "Pathaan", price: 650 },
  ];

  const [books, setBooks] = useState([]);
  const [sortOption, setSortOption] = useState("");

  let sortedBooks = [...books];
  if (sortOption === "mname") {
    sortedBooks.sort((a, b) => a.mname.localeCompare(b.mname));
  } else if (sortOption === "priceLowToHigh") {
    sortedBooks.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    sortedBooks.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    setBooks(bookData);
    localStorage.setItem("BookList", JSON.stringify(bookData));
  }, []);

  // Get unique categories from products
  const uniqueCategories = [...new Set(productList.map(product => product.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-slate-900 to-gray-900 text-white">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mt-10 mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Movies Collection
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover and organize your premium collection with smart filtering and sorting
            </p>
          </div>

          {/* Combined Controls Section */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 items-center hover:scale-105 transition-all duration-300 shadow-xl">
              
              {/* Filter Control */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                  <span className="text-lg">🎬</span>
                  Filter Movies
                </label>
                <select
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="w-48 px-4 py-2 bg-gradient-to-r from-slate-800/80 to-gray-800/80 border border-cyan-500/30 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 cursor-pointer hover:border-cyan-400"
                >
                  <option value="" className="bg-slate-800">All Categories</option>
                  {uniqueCategories.map(category => (
                    <option key={category} value={category} className="bg-slate-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="sm:hidden w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Sort Control */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  Sort Movies
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-48 px-4 py-2 bg-gradient-to-r from-slate-800/80 to-gray-800/80 border border-cyan-500/30 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 cursor-pointer hover:border-cyan-400"
                >
                  <option value="" className="bg-slate-800">Default Order</option>
                  <option value="mname" className="bg-slate-800">By Name A-Z</option>
                  <option value="priceLowToHigh" className="bg-slate-800">Price Low-High</option>
                  <option value="priceHighToLow" className="bg-slate-800">Price High-Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tables Container */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Movies Table */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl hover:scale-102 transition-all duration-300">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">🎬</span>
                  Movies Collection
                </h2>
              </div>
              
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Movie Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredCategory.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gradient-to-r hover:from-cyan-600/10 hover:to-blue-600/10 transition-all duration-300"
                      >
                        <td className="px-6 py-3 text-sm font-medium text-gray-200">
                          {item.name}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-300">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-300 text-xs font-medium">
                            {item.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Books Table */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl hover:scale-102 transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  Movies Price Collection
                </h2>
              </div>
              
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Book Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                        Price (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {sortedBooks.map((itembook, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-pink-600/10 transition-all duration-300"
                      >
                        <td className="px-6 py-3 text-sm font-medium text-gray-200">
                          {itembook.mname}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-300">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 text-green-300 text-xs font-medium">
                            ₹{itembook.price}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;