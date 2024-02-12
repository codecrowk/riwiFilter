const setLocalStorage = function (userKey, userValue) {
  const convertData = JSON.stringify(userValue);
  localStorage.setItem(userKey, convertData);
}

const getLocalStorage = function (userKey) {
  const getData = localStorage.getItem(userKey);
  const convertData = JSON.parse(getData);
  return convertData;
}

export {setLocalStorage, getLocalStorage}