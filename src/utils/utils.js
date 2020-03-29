export const dateConverter = date => {
    let arr = date.split('-');
    return `${arr[1]}/${arr[2]}`;
};
