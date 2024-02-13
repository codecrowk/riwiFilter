import { AdminDataModel } from "./data_base_model.js";
import { setLocalStorage } from "./utilities.js";
const AdminModel = new AdminDataModel();

const LoginControler = {
  init () {
    LoginViews.init()
    this.invalidEmailPassword = "Invalid email or password";
  },

  checkLoginChain () {
    this.checkIfValidEmail()
  },

  checkIfValidEmail () {
    const userEmail = LoginViews.userEmail.value;
    // Dont trush this regepx
    const emailRegepx = /^\w+@[a-z]+\.\w+/gi;
    const isValidEmail = emailRegepx.test(userEmail);
    if (isValidEmail) {
      this.checkEmailDB()
    } else {
      this.invalidUser("Check email address")
    }
  },

  async checkEmailDB () {
    const userEmail = LoginViews.userEmail.value;
    const dataUser = await AdminModel.getAdminByEmail(userEmail)
    const isEmailInDB = Boolean(dataUser.length)
    if (isEmailInDB) {
      this.checkIfValidPassword(dataUser)
    } else {
      this.invalidUser(this.invalidEmailPassword)
    }
  },

  checkIfValidPassword (userData) {
    const passwordForm = LoginViews.userPassword.value;
    const {password, id} = userData[0];
    if (password == passwordForm) {
      this.validUser(id)
    } else {
      this.invalidUser(this.invalidEmailPassword)
    }
  },

  validUser (userID) {
    setLocalStorage("userID", userID) 
    window.location.href = "./admin_index.html"
  },

  invalidUser (userMessage) {
    LoginViews.userMessage.innerText = userMessage;
  }
}

const LoginViews = {
  init () {
    this.userEmail = document.getElementById("emailHTML");
    this.userPassword = document.getElementById("passwordHTML");
    this.userMessage = document.getElementById("login_message");
    this.submitBTN = document.getElementById("submit_btn");
    this.submitBTN.addEventListener('click', () => {
      LoginControler.checkLoginChain()
      console.log("hello")
    
    })
  }
}
console.log("Im here")
LoginControler.init()