import { AdminDataModel } from "./data_base_model.js";
import { getLocalStorage } from "./utilities.js";
const AdminModel = new AdminDataModel()
// debugger
const checkLoginControler = {
  init () {
    this.checkIfLog()
  },

  checkIfLog () {
    const idLocalStorage = getLocalStorage("userID");
    if (Boolean(idLocalStorage)) {
      this.checkValidID(idLocalStorage)
    } else {
      this.invalidRedirection()
    }
  },

  async checkValidID (userID) {
    const isAdminInDB = await AdminModel.getAdminByID(userID);
    if (!Boolean(isAdminInDB.length)) {
      this.invalidRedirection()
    }
  },

  invalidRedirection () {
    window.location.href = "../index.html"
  }
}

export {checkLoginControler}