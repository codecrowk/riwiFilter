const DATA_BASE_ROOT = "http://localhost:3000";
const ADMINS_END_POINT = `${DATA_BASE_ROOT}/admins`;
const BRANDS_END_POINT = `${DATA_BASE_ROOT}/brands`;
const PQRS_END_POINT = `${DATA_BASE_ROOT}/pqrs`;

class ModelBuilder {
  constructor (userEndpoint) {
    this.endpoint = userEndpoint;
  }

  async getAllData () {
    const fetchURL = this.endpoint;
    const req = await fetch(fetchURL);
    const data = await req.json()
    console.log(data)
    return data
  }

  async post (userDataSchema) {
    const fetchURL = this.endpoint;
    const fetchHeaders = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userDataSchema)
    };
    const req = await fetch(fetchURL, fetchHeaders);
    const data = await req.json()
    console.log(data)
    return data
  }

  async delete (userID) {
    const fetchURL = `${this.endpoint}/${userID}`;
    const fetchHeaders = {
      method: 'DELETE'
    };
    const req = await fetch(fetchURL, fetchHeaders);
    const data = await req.json()
    console.log(data)
    return data
  }

  async updateData (userID, userDataSchema) {
    const fetchURL = `${this.endpoint}/${userID}`;
    const fetchHeaders = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userDataSchema)
    };
    const req = await fetch(fetchURL, fetchHeaders);
    const data = await req.json()
    console.log(data)
    return data
  }
}
const adminData = {
  name: "emanuel",
  email: "manuel@gmail.com",
  password: "password"
}
const myModel = new ModelBuilder(ADMINS_END_POINT);
// myModel.post(adminData)
myModel.getAllData()
// myModel.delete("5e2a")
myModel.updateData("6e46", adminData)