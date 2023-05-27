export const formatDate = (isoStr) => {
    const date = new Date(isoStr);
    const options = { month: 'short', day: 'numeric' };
    const istDate = date.toLocaleString('en-IN', options);
    return istDate
}
