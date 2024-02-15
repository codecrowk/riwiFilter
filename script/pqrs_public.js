import { PqrsDataModel } from "./data_base_model.js";
const PqrsModel = new PqrsDataModel();

const PqrsControler = {
  init () {
    PqrsViews.init()
  },

  checkPqrsChain () {
    this.validateFormValues()
  },

  validateFormValues () {
    const pqrsData = PqrsViews.pqrsInfo.getValues();
    for (const element in pqrsData) {
      const formNodeValue = pqrsData[element];
      if (formNodeValue == "") {
        this.invalidData("Please fill form data")
        return
      };
    }
    this.checkIfValidEmail()
  },

  checkIfValidEmail () {
    const userEmail = PqrsViews.userEmail.value;
    // Dont trush this regepx
    const emailRegepx = /^\w+@[a-z]+\.\w+/gi;
    const isValidEmail = emailRegepx.test(userEmail);
    if (isValidEmail) {
      this.sendPqrsDB()
    } else {
      this.invalidData("Check email address")
    }
  },

  async sendPqrsDB () {
    const pqrsData = PqrsViews.pqrsInfo.getValues();
    const {type, email, message} = pqrsData;
    const res = await PqrsModel.post(type, email, message);
    this.validPQRS()
    PqrsViews.clearPqrsForm()

  },

  invalidData (userMessage) {
    PqrsViews.invalidMessage.innerText = userMessage;
  },

  validPQRS () {
    PqrsViews.invalidMessage.innerText = "PQRS registrada con éxito";
    PqrsViews.invalidMessage.classList.replace("text-danger", "text-success");
    setTimeout(() => {
      PqrsViews.invalidMessage.classList.replace("text-success", "text-danger");
      PqrsViews.invalidMessage.innerText = "";
    },3000)
  }
}

const PqrsViews = {
  init () {
    this.userPqrsType = document.getElementById("pqrs_type")
    this.userEmail = document.getElementById("emailHTML");
    this.userMessage = document.getElementById("messageHTML");
    this.invalidMessage = document.getElementById("invalid_message");

    this.submitBTN = document.getElementById("submit_btn");
    this.submitBTN.addEventListener('click', () => {
      PqrsControler.checkPqrsChain()
    })
  },

  get pqrsInfo () {
    const pqrsElements = {
      type: PqrsViews.userPqrsType,
      email: PqrsViews.userEmail,
      message: PqrsViews.userMessage
    };

    const pqrsInfo = {
      getElements: function() {
        return pqrsElements;
      },

      getValues: function() {
        const pqrsValues = {};
        for (const key in pqrsElements) {
          pqrsValues[key] = pqrsElements[key].value;
        }
        return pqrsValues;
      },
    }
    return pqrsInfo
  },

  clearPqrsForm () {
    const pqrsData = this.pqrsInfo.getElements()
    for (const key in pqrsData) {
      pqrsData[key].value = ""
    }
  }
}
PqrsControler.init()