const createSuccess = (status = 200, message, elements, baseUrl) => {
  let response = {
    status,
  };

  if (message) {
    response.message = message;
  }
  if (elements) {
    response.elements = elements;
  }
  if (baseUrl) {
    response.baseUrl = baseUrl;
  }
  return response;
};

module.exports = createSuccess;
