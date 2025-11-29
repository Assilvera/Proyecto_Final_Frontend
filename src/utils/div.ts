export const division = (n1: number, n2: number) => {
    if (n2 === 0) {
        throw new Error("Cannot divide by zero");
    }
    return n1 / n2;
}
    