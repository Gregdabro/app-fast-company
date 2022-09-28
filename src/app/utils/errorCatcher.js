export function errorCatcher(error, setError) {
    const { message } = error.response.data;
    setError(message);
}
