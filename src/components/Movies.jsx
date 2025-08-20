import React from "react";
import { useState, useEffect } from "react";
import {
  Upload,
  Star,
  Calendar,
  Clock,
  Film,
  Tag,
  Image,
  Plus,
  Globe,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [rate, setRate] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState({ hours: "", minutes: "" });
  const [description, setDescription] = useState("");

  // edit
  const location = useLocation();
  const editMovie = location.state?.movies;
  useEffect(() => {
    if (editMovie) {
      setFile(editMovie.file);
      setTitle(editMovie.title);
      setLanguage(editMovie.language);
      setRate(editMovie.rate);
      setGenre(editMovie.genre);
      setDate(editMovie.date);
      setDuration(editMovie.duration);
      setDescription(editMovie.description);
    }
  }, [editMovie]);

  // Error states
  const [errors, setErrors] = useState({});

  // localStorage
  useEffect(() => {
    let storedItems = JSON.parse(localStorage.getItem("newMovie")) || [];
    setMovies(storedItems);
  }, []);

  // Function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  function validateFields() {
    const newErrors = {};

    if (!file) newErrors.file = "Movie poster is required";
    if (!title.trim()) newErrors.title = "Movie title is required";
    if (!language) newErrors.language = "Language is required";
    if (!rate) newErrors.rate = "Rating is required";
    else if (parseFloat(rate) > 10) newErrors.rate = "Rating cannot exceed 10";
    if (!genre) newErrors.genre = "Genre is required";
    if (!date) newErrors.date = "Release date is required";
    if (!duration.hours) newErrors.hours = "Hours is required";
    if (!duration.minutes) newErrors.minutes = "Minutes is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleAddTodo() {
    if (!validateFields()) {
      return;
    }

    const newMovie = {
      id: editMovie ? editMovie.id : Date.now(),
      file: file,
      title: title,
      language: language,
      rate: rate,
      genre: genre,
      date: date,
      duration: `${duration.hours}h ${duration.minutes}m`,
      description: description,
    };

    let updatedMovies;
    if (editMovie) {
      // Editing: replace the old one
      updatedMovies = movies.map((m) => (m.id === editMovie.id ? newMovie : m));
    } else {
      // Adding: push new one
      updatedMovies = [...movies, newMovie];
    }

    setMovies(updatedMovies);
    // localStorage
    localStorage.setItem("newMovie", JSON.stringify(updatedMovies));

    setFile(null);
    setTitle("");
    setLanguage("");
    setRate("");
    setGenre("");
    setDate("");
    setDuration({ hours: "", minutes: "" });
    setDescription("");
    setErrors({});
    navigate("/");
  }

  // Handle file input change with base64 conversion
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        // Check file size (optional - limit to 10MB)
        if (selectedFile.size > 10 * 1024 * 1024) {
          setErrors({ ...errors, file: "File size should be less than 10MB" });
          return;
        }

        const base64String = await convertToBase64(selectedFile);
        setFile(base64String);
        setErrors({ ...errors, file: "" });
      } catch (error) {
        console.error("Error converting file to base64:", error);
        setErrors({ ...errors, file: "Error uploading file" });
      }
    }
  };

  // navigate
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-slate-900 to-gray-900 text-white">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/30 to-slate-950/30"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-14 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Add New Movie
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Expand your cinema collection by adding new movies with all the
            details
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-sky-800/20 via-slate-900/40 to-gray-950/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10">
          <form className="space-y-8">
            {/* Movie Image Upload */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-xl font-semibold text-white">
                <Image className="w-6 h-6 text-cyan-400" />
                Movie Poster
              </label>
              <div className="relative group">
                <div
                  className={`border-2 border-dashed ${
                    errors.file
                      ? "border-red-500"
                      : "border-gray-600 hover:border-cyan-400"
                  } rounded-2xl p-12 text-center transition-all duration-300 bg-gray-800/50 hover:bg-gray-800/70`}
                >
                  {file ? (
                    <div className="space-y-4">
                      <img
                        src={file}
                        alt="Preview"
                        className="w-32 h-48 object-cover mx-auto rounded-lg"
                      />
                      <p className="text-green-400">
                        Image uploaded successfully!
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-cyan-400 transition-colors duration-300" />
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Click to upload movie poster or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        PNG, JPG up to 10MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {errors.file && (
                <p className="text-red-400 text-sm mt-2">{errors.file}</p>
              )}
            </div>

            {/* Movie Name and Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Movie Name */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-semibold text-white">
                  <Film className="w-6 h-6 text-cyan-400" />
                  Movie Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors({ ...errors, title: "" });
                  }}
                  placeholder="Enter movie title"
                  className={`w-full px-6 py-4 bg-gray-800/50 border ${
                    errors.title ? "border-red-500" : "border-gray-600"
                  } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-800/70 transition-all duration-300`}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-2">{errors.title}</p>
                )}
              </div>

              {/* Language */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-semibold text-white">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  Language
                </label>
                <input
                  type="text"
                  placeholder="Enter Language"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    if (errors.language) setErrors({ ...errors, language: "" });
                  }}
                  className={`w-full px-6 py-4 bg-gray-800/50 border ${
                    errors.language ? "border-red-500" : "border-gray-600"
                  } rounded-2xl text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300`}
                />
                {errors.language && (
                  <p className="text-red-400 text-sm mt-2">{errors.language}</p>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="flex items-center gap-3 text-xl font-semibold text-white mb-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Rating
                </label>
                <div className="gap-4">
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (parseFloat(value) >= 0 && parseFloat(value) <= 10)
                      ) {
                        setRate(value);
                        if (errors.rate) setErrors({ ...errors, rate: "" });
                      }
                    }}
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="8.5"
                    className={`px-6 py-4 bg-gray-800/50 border ${
                      errors.rate ? "border-red-500" : "border-gray-600"
                    } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-gray-800/70 transition-all duration-300 w-full`}
                  />
                </div>
                {errors.rate && (
                  <p className="text-red-400 text-sm mt-2">{errors.rate}</p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="flex items-center gap-3 text-xl font-semibold text-white mb-3">
                  <Tag className="w-6 h-6 text-cyan-400" />
                  Genre
                </label>
                <select
                  value={genre}
                  onChange={(e) => {
                    setGenre(e.target.value);
                    if (errors.genre) setErrors({ ...errors, genre: "" });
                  }}
                  className={`w-full px-6 py-4 bg-gray-800/50 border ${
                    errors.genre ? "border-red-500" : "border-gray-600"
                  } rounded-2xl text-white focus:outline-none focus:border-cyan-400 focus:bg-gray-800/70 transition-all duration-300`}
                >
                  <option value="">Select Genre</option>
                  <option value="action">Action</option>
                  <option value="adventure">Adventure</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="horror">Horror</option>
                  <option value="mystery">Mystery</option>
                  <option value="romance">Romance</option>
                  <option value="sci-fi">Sci-Fi</option>
                  <option value="thriller">Thriller</option>
                  <option value="western">Western</option>
                  <option value="animation">Animation</option>
                  <option value="documentary">Documentary</option>
                  <option value="biography">Biography</option>
                  <option value="crime">Crime</option>
                  <option value="family">Family</option>
                  <option value="history">History</option>
                  <option value="music">Music</option>
                  <option value="musical">Musical</option>
                  <option value="sport">Sport</option>
                  <option value="war">War</option>
                </select>
                {errors.genre && (
                  <p className="text-red-400 text-sm mt-2">{errors.genre}</p>
                )}
              </div>
            </div>

            {/* Release Date and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Release Date */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-semibold text-white">
                  <Calendar className="w-6 h-6 text-green-400" />
                  Release Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
                  className={`w-full px-6 py-4 bg-gray-800/50 border ${
                    errors.date ? "border-red-500" : "border-gray-600"
                  } rounded-2xl text-white focus:outline-none focus:border-green-400 focus:bg-gray-800/70 transition-all duration-300`}
                />
                {errors.date && (
                  <p className="text-red-400 text-sm mt-2">{errors.date}</p>
                )}
              </div>

              {/* Duration */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-semibold text-white">
                  <Clock className="w-6 h-6 text-purple-400" />
                  Duration
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={duration.hours}
                    onChange={(e) => {
                      setDuration({ ...duration, hours: e.target.value });
                      if (errors.hours) setErrors({ ...errors, hours: "" });
                    }}
                    min="0"
                    max="12"
                    placeholder="2"
                    className={`flex-1 px-4 py-4 bg-gray-800/50 border ${
                      errors.hours ? "border-red-500" : "border-gray-600"
                    } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-gray-800/70 transition-all duration-300`}
                  />
                  <span className="flex items-center px-4 text-gray-400 font-medium">
                    h
                  </span>
                  <input
                    type="number"
                    value={duration.minutes}
                    onChange={(e) => {
                      setDuration({ ...duration, minutes: e.target.value });
                      if (errors.minutes) setErrors({ ...errors, minutes: "" });
                    }}
                    min="0"
                    max="59"
                    placeholder="30"
                    className={`flex-1 px-4 py-4 bg-gray-800/50 border ${
                      errors.minutes ? "border-red-500" : "border-gray-600"
                    } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-gray-800/70 transition-all duration-300`}
                  />
                  <span className="flex items-center px-4 text-gray-400 font-medium">
                    m
                  </span>
                </div>
                {(errors.hours || errors.minutes) && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.hours || errors.minutes}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-xl font-semibold text-white">
                <Film className="w-6 h-6 text-indigo-400" />
                Description
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors({ ...errors, description: "" });
                }}
                placeholder="Enter movie description, plot summary, or synopsis..."
                className={`w-full px-6 py-4 bg-gray-800/50 border ${
                  errors.description ? "border-red-500" : "border-gray-600"
                } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-gray-800/70 transition-all duration-300 resize-none`}
              ></textarea>
              {errors.description && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={handleAddTodo}
                className="group cursor-pointer bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center gap-3"
              >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                Add Movie
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Movies;
