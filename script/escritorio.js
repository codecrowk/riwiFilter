import { AdminDataModel, BrandDataModel, PqrsDataModel } from "./data_base_model.js";
const AdminModel = new AdminDataModel();
const BrandModel = new BrandDataModel();
const PqrsModel = new PqrsDataModel();

const EscritorioControler = {
  init () {
    EscritorioViews.init()
    this.renderStadistics()
  },

  async renderStadistics () {
    const adminData = await AdminModel.getAllData()
    const brandData = await BrandModel.getAllData()
    const pqrsData = await PqrsModel.getAllData()
    // const length = adminData.length
    EscritorioViews.adminCounter.innerText =  adminData.length
    EscritorioViews.brandCounter.innerText =  brandData.length
    EscritorioViews.pqrsCounter.innerText = pqrsData.length
  }
}

const EscritorioViews = {
  init () {
    this.adminCounter = document.getElementById("admin_counter");
    this.brandCounter = document.getElementById("brand_counter");
    this.pqrsCounter = document.getElementById("pqrs_counter");
  }
}

EscritorioControler.init()