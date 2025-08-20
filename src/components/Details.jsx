import React from "react";
import { useState, useEffect } from "react";
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
  ArrowLeft,
  ArrowRight,
  Heart,
  Share2,
  Download,
  Bookmark,
  Trash,
  Pencil,
} from "lucide-react";
import { FiCalendar, FiClock, FiStar } from "react-icons/fi";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  const showw = location.state?.tv;
  const item = movie || showw;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleNavigatelist = () => {
    navigate("/list");
  };

  // tv shows
  const [show, setshow] = useState([]);

  useEffect(() => {
    let storedItems = JSON.parse(localStorage.getItem("newShow")) || [];
    setshow(storedItems);
  }, []);
  function handleDeleteTvShow(id) {
    let updatedTodos = show.filter((tv) => tv.id !== id);
    setshow(updatedTodos);
    localStorage.setItem("newShow", JSON.stringify(updatedTodos));
    navigate("/");
  }
  function handleEditTvShow(id) {
    let editTodo = show.find((tv) => tv.id === id);

    if (editTodo) {
      navigate(`/tv`, { state: { tv: editTodo } });
    }
  }
  // movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let storedItems = JSON.parse(localStorage.getItem("newMovie")) || [];
    setMovies(storedItems);
  }, []);
  function handleDeleteMovie(id) {
    let updatedTodos = movies.filter((movie) => movie.id !== id);
    setMovies(updatedTodos);
    localStorage.setItem("newMovie", JSON.stringify(updatedTodos));
    navigate("/");
  }
  function handleEditMovie(id) {
    let editTodo = movies.find((movie) => movie.id === id);

    if (editTodo) {
      navigate(`/movies`, { state: { movie: editTodo } });
    }
  }

  function handleDelete(id) {
    if (movie) {
      handleDeleteMovie(id);
    } else if (showw) {
      handleDeleteTvShow(id);
    }
  }

  function handleEdit(id) {
    if (movie) {
      handleEditMovie(id);
    } else if (showw) {
      handleEditTvShow(id);
    }
  }



  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-slate-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <Package className="w-24 h-24 text-gray-600 mx-auto opacity-50" />
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-gray-400">
              No Movie Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              The movie you're looking for doesn't exist or hasn't been added
              yet.
            </p>
          </div>
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-slate-900 to-gray-900 text-white">
      {/* Hero Banner Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            style={{ backgroundImage: `url(${item.file})` }}
            className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Navigation Bar */}
        <nav className="relative z-20 flex items-center justify-between p-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-lg font-medium">Back</span>
          </button>

          <div className="flex items-center gap-4">
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
              <Share2 className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
              <Bookmark className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 flex items-center h-full px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[20%_auto] gap-12 items-center">
            {/* Movie Poster */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative w-80 h-[480px] rounded-2xl overflow-hidden shadow-2xl">
                  <div
                    style={{ backgroundImage: `url(${item.file})` }}
                    className="absolute inset-0 bg-cover bg-top"
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Movie Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                  {item.title}
                </h1>

                {item.tagline && (
                  <p className="text-xl text-gray-300 italic">
                    "{item.tagline}"
                  </p>
                )}
              </div>

              {/* Movie Stats */}
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2 text-yellow-400">
                  <FiStar className="w-6 h-6" />
                  <span className="text-white font-semibold">{item.rate}</span>
                  <span className="text-gray-400">/10</span>
                </div>

                <div className="flex items-center gap-2 text-cyan-400">
                  <FiCalendar className="w-6 h-6" />
                  <span className="text-white">{item.date}</span>
                </div>

                <div className="flex items-center gap-2 text-blue-400">
                  <FiClock className="w-6 h-6" />
                  <span className="text-white">{item.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-lg">
                {/* Genre Tags */}
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-full text-sm font-medium text-white backdrop-blur-sm">
                    {item.genre}
                  </span>
                </div>
                {/* Language Tags */}
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-full text-sm font-medium text-white backdrop-blur-sm">
                    {item.language}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white">Overview</h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-5 items-center">
                <button
                  className="group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center gap-3 cursor-pointer"
                  onClick={handleNavigatelist}
                >
                  Watch List
                  <ArrowRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </button>
                {/* Edit Button */}
                {/* <button
                  onClick={()=> handleEdit(item.id)}
                  className="group cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/40"
                >
                  <Pencil className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button> */}

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="group cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/40"
                >
                  <Trash className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
