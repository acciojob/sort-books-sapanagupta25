import { compare } from "./util";

const API_KEY = "UiA0Bi9Fyb2fQG5i1XyM8X8ZiDYkGge1";
const URL = `https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=${API_KEY}`;
export function getBooks() {
    return fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            const { results } = data;
            const book_details = results;
            const newArr = book_details.map(
                ({ book_details: [book_details] }) => {
                    const { title, author, publisher, primary_isbn13 } =
                        book_details;
                    return {
                        title,
                        author,
                        publisher,
                        primary_isbn13,
                    };
                }
            );
            return newArr.sort((a, b) => compare(a.title, b.title));
        });
}
