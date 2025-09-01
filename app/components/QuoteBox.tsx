'use client'

import React, { useState, useEffect } from "react";

export default function QuoteBox() {
  const [quote, setQuote] = useState("Loading quote...");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true); // show spinner
      const res = await fetch("/api/quote");
      const data = await res.json();
      setQuote(data.content);
      setAuthor(data.author || "");
    } catch (error) {
      setQuote("Failed to load quote.");
      setAuthor("");
    } finally {
      setLoading(false); // hide spinner
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="p-4 mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        ✨ Quote of the Moment
      </h2>
      <p className="italic text-gray-700 dark:text-gray-300 mb-2">“{quote}”</p>
      {author && (
        <p className="text-right text-gray-600 dark:text-gray-400">– {author}</p>
      )}
      <button
        onClick={fetchQuote}
        disabled={loading}
        className={`mt-3 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
        `}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          "Get New Quote"
        )}
      </button>
    </div>
  );
}
