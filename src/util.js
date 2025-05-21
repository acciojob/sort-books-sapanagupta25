export function compare(a, b, isAsc = "ascending") {
    if (isAsc === "descending") [a, b] = [b, a];
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
