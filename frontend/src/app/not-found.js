"use client";
import Link from "next/link";
// import style from "./notfound.module.css";

export default function NotFound() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/homepg/bg-img-3.svg')" }}
    >
      {/* Overlay for dim effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">
        {/* 404 Text with Animation */}
        <h1 className="text-[6rem] md:text-[10rem] font-extrabold text-white drop-shadow-lg animate-bounce">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 drop-shadow">
          Oops! Page Not Found
        </h2>
        <p className="mt-3 text-lg text-gray-200 max-w-xl mx-auto">
          The page you’re looking for doesn’t exist or has been moved.  
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Floating circles animation */}
      <div className="absolute w-72 h-72 bg-red-500/30 rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-64 h-64 bg-orange-500/30 rounded-full bottom-10 right-10 animate-ping"></div>
    </div>
  );
}
