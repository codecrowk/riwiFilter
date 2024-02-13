import { AdminDataModel } from "./data_base_model.js";
import { getLocalStorage } from "./utilities.js";
const AdminModel = new AdminDataModel()
const isIDLocalStorage = getLocalStorage("userID");
debugger
if (!Boolean(isIDLocalStorage)) {
  window.location.href = "../index.html"
}

const checkValidID = AdminModel.getAdminByID(isIDLocalStorage)
