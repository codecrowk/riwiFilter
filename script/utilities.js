const setLocalStorage = function (userKey, userValue) {
  const convertData = JSON.stringify(userValue);
  localStorage.setItem(userKey, convertData);
}

const getLocalStorage = function (userKey) {
  const getData = localStorage.getItem(userKey);
  const convertData = JSON.parse(getData);
  return convertData;
}

const clearLocalStorage = function (){
  localStorage.clear()
}

const removeElementHTML = function (parentNode, elementToRemove) {
  parentNode.removeChild(elementToRemove)
}

const  buttonGetParentRow  = function (userElement) {
    const parentNodeContainer = userElement.parentNode;
    const parentNodeRow = parentNodeContainer.parentNode;
    return parentNodeRow;
}

export {setLocalStorage, getLocalStorage,  clearLocalStorage,removeElementHTML, buttonGetParentRow}