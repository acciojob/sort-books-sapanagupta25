import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import { useDispatch, useSelector } from "react-redux";
import { sortBookOptions, created, sortByOrder } from "../booksReducer";

const App = () => {
    const [sortOptions, setSortOptions] = useState("Title");
    const [sortBy, setSortBy] = useState("Ascending");
    const dispatch = useDispatch();
    const { bookDetails, status } = useSelector((state) => state);
    useEffect(() => {
        dispatch(created());
    }, []);
    return (
        <>
            <div>
                <select
                    id="sortBy"
                    value={sortOptions}
                    onChange={(e) => {
                        setSortOptions(e.target.value);
                        dispatch(
                            sortBookOptions(
                                e.target.value.toLowerCase(),
                                sortBy.toLowerCase()
                            )
                        );
                    }}
                >
                    <option value="Title">Title</option>
                    <option value="Author">Author</option>
                    <option value="Publisher">Publisher</option>
                </select>
            </div>
            <div>
                <select
                    id="order"
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        dispatch(
                            sortByOrder(
                                sortOptions.toLowerCase(),
                                e.target.value.toLowerCase()
                            )
                        );
                    }}
                >
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </div>
            <label htmlFor="sortBy">Sort by:</label>
            <label htmlFor="order">Order:</label>
            <h1>Books List</h1>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                    </tr>
                </thead>
                {status === "loading" && <p>Loading...</p>}
                {status === "idle" && (
                    <tbody>
                        {bookDetails.map((book, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.primary_isbn13}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
        </>
    );
};

export default App;
