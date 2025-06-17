function handleError(req, res) {
    console.log('This is the error handler that I created');
}

function getErrorMessage(err) {
  if (err.code === 11000 || err.code === 11001) {
    return 'Email is already registered.'
  }
  return err.message || 'Something went wrong.'
}

export default {
    handleError,
    getErrorMessage
};
