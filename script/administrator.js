import { AdminDataModel } from "./data_base_model.js";
import { removeElementHTML, buttonGetParentRow, setLocalStorage, getLocalStorage } from "./utilities.js";
const AdminModel = new AdminDataModel()

const AdministratorControler = {
  init () {
    AdministratorViews.init()
    this.renderAdminTable()
  },

  async renderAdminTable () {
    const adminInfo = await AdminModel.getAllData() 
    for (const  admin of adminInfo) {
      const adminElement = AdministratorViews.addAdminTable(admin);
      AdministratorViews.adminTableHTML.appendChild(adminElement)
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
        this.eliminarUsuario(currentElement)
        break;
      default:
        break;
    }

  },

  eliminarUsuario (userElement) {
    const parentElement = buttonGetParentRow(userElement);
    const adminID = parentElement.children[0].innerText;
    const adminTableHTML = AdministratorViews.adminTableHTML;
    AdminModel.delete(adminID);
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

const AdministratorViews = {
  init () {
    this.adminTableHTML = document.getElementById("admin_table");
    this.modalHeader = document.getElementById("exampleModalLabel")
    this.nameHTML = document.getElementById("nameHTML");
    this.emailHTML = document.getElementById("emailHTML");
    this.submitBTN = document.getElementById("submit_btn");
    this.buttonCreate = document.getElementById("button_create");
    this.adminTableHTML.addEventListener('click', (e) => {AdministratorControler.tableAction(e)})
    this.submitBTN.addEventListener('click', (e) => {AdministratorControler.modalSwicher()})
    this.buttonCreate.addEventListener('click', () => this.submitBTN.innerText = "Agregar");
  },

  addAdminTable (userData) {
    const {id, name, email} = userData;
    //----- Create elements
    const newRow = document.createElement('tr');
    // id
    const adminID = document.createElement('td');
    adminID.innerText = id;
    // name
    const adminName = document.createElement('td');
    adminName.innerText = name;
    // email
    const adminEmail = document.createElement('td');
    adminEmail.innerText = email;
    // buttons
    const buttonsContainer = document.createElement('td');
    const detailButton = document.createElement('button');
    detailButton.classList.add("btn", "btn-sm", "btn-info");
    detailButton.innerText = "Detalles";
    // 
    const editButton = document.createElement('button');
    editButton.classList.add("btn", "btn-sm", "btn-warning");
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#exampleModal");
    editButton.innerText = "Editar";
    // 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("btn", "btn-sm", "btn-danger");
    deleteButton.innerText = "Eliminar";
    //----- Join elements
    buttonsContainer.appendChild(detailButton);
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);
    
    newRow.appendChild(adminID);
    newRow.appendChild(adminName);
    newRow.appendChild(adminEmail);
    newRow.appendChild(buttonsContainer);
    return newRow;
  }
}

AdministratorControler.init()