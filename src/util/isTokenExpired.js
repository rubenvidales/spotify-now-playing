const isTokenExpired = (creationDate, expirationTime = 3600) => {
  try {
    if (!creationDate) {
      throw new Error("creationDate is not defined");
    }
    const dateTime = +creationDate + expirationTime * 1000;
    if (Number.isNaN(dateTime)) {
      throw new Error("creationDate is not a valid number");
    }
    const nowDate = new Date();
    return dateTime < nowDate.getTime();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default isTokenExpired;
