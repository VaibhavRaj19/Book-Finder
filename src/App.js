import React, { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
    const data = await response.json();
    setBooks(data.docs.slice(0, 10)); // show top 10 results
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">📚 Book Finder</h1>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search books by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {books.map((book, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-md mb-4">
                <span className="text-gray-600">No Image</span>
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {book.first_publish_year ? `First Published: ${book.first_publish_year}` : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
