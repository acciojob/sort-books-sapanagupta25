import { getBooks } from "./apiBooks";
import { compare } from "./util";
const initialState = {
    bookDetails: [],
    status: "idle",
};
function booksReducer(state = initialState, action) {
    switch (action.type) {
        case "books/created":
            return {
                ...state,
                bookDetails: action.payload,
                status: "idle",
            };
        case "books/loading":
            return {
                ...state,
                status: "loading",
            };
        case "books/sortBookOptions":
            return {
                ...state,
                bookDetails: state.bookDetails.sort((a, b) =>
                    compare(
                        a[action.payload.value],
                        b[action.payload.value],
                        action.payload.isAsc
                    )
                ),
            };
        case "books/sortByOrder":
            return {
                ...state,
                bookDetails: state.bookDetails.sort((a, b) =>
                    compare(
                        a[action.payload.value],
                        b[action.payload.value],
                        action.payload.isAsc
                    )
                ),
            };
        default:
            return state;
    }
}

export function created() {
    return function (dispatch, getState) {
        dispatch(loading());
        getBooks().then((data) => {
            dispatch({ type: "books/created", payload: data });
        });
    };
}

export function loading() {
    return {
        type: "books/loading",
    };
}

export function sortBookOptions(option, isAsc) {
    return {
        type: "books/sortBookOptions",
        payload: {
            value: option,
            isAsc,
        },
    };
}

export function sortByOrder(option, isAsc) {
    return {
        type: "books/sortByOrder",
        payload: {
            value: option,
            isAsc,
        },
    };
}

export default booksReducer;
