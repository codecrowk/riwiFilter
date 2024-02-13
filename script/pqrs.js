import { PqrsDataModel } from "./data_base_model.js";
import { removeElementHTML, buttonGetParentRow, setLocalStorage, getLocalStorage } from "./utilities.js";
const PqrsModel = new PqrsDataModel()

const PqrsControler = {
  init () {
    PqrsViews.init()
    this.renderAdminTable()
  },

  async renderAdminTable () {
    const pqrsInfo = await PqrsModel.getAllData() 
    for (const  pqrs of pqrsInfo) {
      const pqrsElement = PqrsViews.addNewPQRSTable(pqrs);
      PqrsViews.pqrsTable.appendChild(pqrsElement)
    }
  },
  
  tableAction (event) {
    const currentElement =  event.target;
    const isButton = this.checkIfButton(currentElement)
    if (!isButton) return;
    const buttonType = currentElement.innerText;
    console.log(currentElement)
    switch (buttonType) {
      case "Detalles":
        break;
    
      case "Editar":
        this.updateAdmin(currentElement)
        break;

      case "Eliminar":
        this.eliminarPQRS(currentElement)
        break;
      default:
        break;
    }

  },

  eliminarPQRS (userElement) {
    const parentElement = buttonGetParentRow(userElement);
    const pqrsID = parentElement.children[0].innerText;
    const adminTableHTML = PqrsViews.pqrsTable;
    PqrsModel.delete(pqrsID);
    removeElementHTML(adminTableHTML, parentElement)
  },

  updateAdmin (userElement) {
    const parentElement = buttonGetParentRow(userElement);
    const adminID = parentElement.children[0].innerText;
    AdministratorViews.modalHeader.innerText = "Actualizar informacion admin";
    AdministratorViews.submitBTN.innerText = "Actualizar"
    setLocalStorage("updateAdminID", adminID);
  },

  async updateAdminDB () {
    const nameValue = AdministratorViews.nameHTML.value;
    debugger
    const emailValue = AdministratorViews.emailHTML.value;
    const adminID = getLocalStorage("updateAdminID");
    AdminModel.updateData(adminID, nameValue, emailValue);
  },

  async  newAdminDB () {
    const nameValue = AdministratorViews.nameHTML.value;
    const emailValue = AdministratorViews.emailHTML.value;
    const res = await AdminModel.post(nameValue, emailValue)
    const newAdminElement = AdministratorViews.addAdminTable(res);
    AdministratorViews.adminTableHTML.appendChild(newAdminElement)
  },

  modalSwicher () {
    const modalValue = AdministratorViews.submitBTN.innerText;
    if (modalValue == "Agregar") {
      this.newAdminDB()
    } else if (modalValue == "Actualizar") {
      this.updateAdminDB()
    }
  },

  checkIfButton (userElement) {
    if (userElement.tagName == "BUTTON") {
      return true
    } else {
      return false
    }
  }
}

const PqrsViews = {
  init () {
    this.pqrsTable = document.getElementById("pqrsHTML");
    // this.modalHeader = document.getElementById("exampleModalLabel")
    // this.nameHTML = document.getElementById("nameHTML");
    // this.emailHTML = document.getElementById("emailHTML");
    // this.submitBTN = document.getElementById("submit_btn");
    // this.buttonCreate = document.getElementById("button_create");
    this.pqrsTable.addEventListener('click', (e) => {PqrsControler.tableAction(e)})
    // this.submitBTN.addEventListener('click', (e) => {AdministratorControler.modalSwicher()})
    // this.buttonCreate.addEventListener('click', () => this.submitBTN.innerText = "Agregar");
  },

  addNewPQRSTable (userData) {
    const {id, type, email, message} = userData;
    //----- Create elements
    const newRow = document.createElement('tr');
    // id
    const pqrsID = document.createElement('td');
    pqrsID.innerText = id;
    // type
    const pqrsType = document.createElement('td');
    pqrsType.innerText = type;
    // email
    const pqrsEmail = document.createElement('td');
    pqrsEmail.innerText = email;
    // message
    const pqrsMessage = document.createElement('td');
    pqrsMessage.innerText = message;
    // buttons
    const buttonsContainer = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("btn", "btn-sm", "btn-danger");
    deleteButton.innerText = "Eliminar";
    //----- Join elements
    buttonsContainer.appendChild(deleteButton);
    
    newRow.appendChild(pqrsID);
    newRow.appendChild(pqrsType);
    newRow.appendChild(pqrsEmail);
    newRow.appendChild(pqrsMessage);
    newRow.appendChild(buttonsContainer);
    return newRow;
  }
}
console.log("Hey baby")
PqrsControler.init()