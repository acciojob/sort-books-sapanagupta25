import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSortBy, setSortOrder } from './bookSlice.js';
import './App.css';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, sortOrder } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSortOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  const sortedBooks = [...books].sort((a, b) => {
    const valA = a[sortBy]?.toLowerCase() || '';
    const valB = b[sortBy]?.toLowerCase() || '';
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <div>
          <label htmlFor="sortBy">Sort by:</label>
          <select id="sortBy" onChange={handleSortByChange} value={sortBy}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortOrder">Order:</label>
          <select id="sortOrder" onChange={handleSortOrderChange} value={sortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Publisher</th>
            <th className="border px-4 py-2">ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.publisher}</td>
              <td className="border px-4 py-2">{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
