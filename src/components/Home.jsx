import React from "react";
import {
  Play,
  Star,
  Calendar,
  Clock,
  Search,
  User,
  Bell,
  Menu,
  Package,
  Film,
  Plus,
} from "lucide-react";
import { FiCalendar, FiClock, FiStar } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let storedItems = JSON.parse(localStorage.getItem("newMovie")) || [];
    setMovies(storedItems);
  }, []);

  // tv shows
  const [show, setshow] = useState([]);

  useEffect(() => {
    let storedItems = JSON.parse(localStorage.getItem("newShow")) || [];
    setshow(storedItems);
  }, []);

  // navigate
  const navigate = useNavigate();
  function handleNavigatemovies() {
    navigate("/movies");
  }
  function handleNavigatetv() {
    navigate("/tv");
  }
  // for moving from home to details
  function handleNavigatedetails(item, type) {
    if (type === "movie") {
      navigate("/details", { state: { movie: item } });
    } else if (type === "tv") {
      navigate("/details", { state: { tv: item } });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-slate-900 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/50 to-slate-950/50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 space-x-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Discover Cinema
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in the world of extraordinary storytelling with our
            premium collection of movies and series
          </p>
          <div className="gap-4 flex-col lg:flex-row flex justify-center items-center">
            <button
              onClick={handleNavigatemovies}
              className="group cursor-pointer bg-gradient-to-r from-cyan-600 to-blue-600 m-0 hover:from-cyan-700 hover:to-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <Play className="inline-block w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Add Movies
            </button>
            <button
              onClick={handleNavigatetv}
              className="group cursor-pointer bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <Play className="inline-block w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Add TV Shows
            </button>
          </div>
        </div>
      </section>

      {/* Movie Cards */}
      <section>
        <h2 className="text-4xl font-bold text-white pt-20 text-center">
          🍿 Movie Section
        </h2>

        {movies.length === 0 ? (
          // Empty State
          <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-center space-y-6">
              <div className="relative">
                <Package className="w-24 h-24 text-gray-600 mx-auto opacity-50" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <Film className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-gray-400">
                  No Movies Yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                  Your movie collection is empty. Start building your cinema
                  library by adding your first movie!
                </p>
              </div>
              <button
                onClick={handleNavigatemovies}
                className="group cursor-pointer bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Add Your First Movie
              </button>
            </div>
          </div>
        ) : (
          // Movie Grid
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-20">
            {movies.map((item) => (
              <div
                key={item.id}
                className="group bg-gradient-to-br from-sky-800 via-slate-900 to-gray-950 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] bg-gray-800">
                  <div
                    style={{ backgroundImage: `url(${item.file})` }}
                    className="absolute inset-0 bg-cover bg-center"
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-3xl"></div>

                  {/* Movie Details Button - Shows on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    {/* for moving from homw ton details ()=>handleNavigatedetails(item) */}
                    <button
                      onClick={() => handleNavigatedetails(item, "movie")}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Movie Details
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-yellow-400 mb-3">
                    <FiStar className="w-5 h-5" />
                    <span className="text-sm font-medium text-white">
                      {item.rate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Show Cards */}
      <section className="bg-gradient-to-br from-neutral-900 via-slate-900 to-gray-900">
        <h2 className="text-4xl font-bold text-white pt-20 text-center">
          🎭 TV Show's Section
        </h2>

        {show.length === 0 ? (
          // Empty State
          <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-center space-y-6">
              <div className="relative">
                <Package className="w-24 h-24 text-gray-600 mx-auto opacity-50" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <Film className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-gray-400">
                  No TV Show's Yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                  Your TV show collection is empty. Start building your library
                  by adding your first show!
                </p>
              </div>
              <button
                onClick={handleNavigatetv}
                className="group cursor-pointer bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Add Your Show
              </button>
            </div>
          </div>
        ) : (
          // Movie Grid
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-20">
            {show.map((item) => (
              <div
                key={item.id}
                className="group bg-gradient-to-br from-sky-800 via-slate-900 to-gray-950 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] bg-gray-800">
                  <div
                    style={{ backgroundImage: `url(${item.file})` }}
                    className="absolute inset-0 bg-cover bg-center"
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-3xl"></div>

                  {/* Movie Details Button - Shows on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    {/* for moving from homw ton details ()=>handleNavigatedetails(item) */}
                    <button
                      onClick={() => handleNavigatedetails(item, "tv")}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Tv Show Details
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-yellow-400 mb-3">
                    <FiStar className="w-5 h-5" />
                    <span className="text-sm font-medium text-white">
                      {item.rate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
