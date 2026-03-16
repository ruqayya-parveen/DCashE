export const tryCatchForNonPromiseMethod = (
    fn = () => { },
    message = 'Error occured in handleError method ::',
    ...args
) => {
    try {
        fn(...args);
    } catch (error) {
        console.error(message, error);
    }
};

export const tryCatchForSuccess = (
    fn = () => { },
    url,
    ...args
) => {
    return tryCatchForNonPromiseMethod(
        fn,
        `Error occured in success method of ${url} ::`,
        ...args
    );
};