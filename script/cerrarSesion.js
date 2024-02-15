import { clearLocalStorage } from "./utilities.js";
const endSessionControler = {
  init (){
    endSessionviews.init()
  },

  endSession () {
    clearLocalStorage()
  }
}
const endSessionviews = {
  init () {
    const endSessionButton = document.getElementById("end_session");
    endSessionButton.addEventListener('click', (e) => {
      endSessionControler.endSession()
    })
  },
}

export {endSessionControler}