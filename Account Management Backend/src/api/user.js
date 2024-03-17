const { userServices } = require("../services");
const feactCompany = require("./middleware/featchCompany");
const featchUser = require("./middleware/featchUser");
const user = new userServices();
module.exports = (app) => {
  // SingUp user
  app.post("/api/user/singUp", (req, res) => {
    let data = req.body;
    user.singUp(data, res);
  });

  //SingIn user
  app.post("/api/user/singIn", (req, res) => {
    let data = req.body;
    user.singIn(data, res);
  });

  //update user
  app.put("/api/user", featchUser, (req, res) => {
    var data = req.user;
    data = req.body;
  });

  //create company
  app.post("/api/company", featchUser, (req, res) => {
    var data = req.body;
    var id = req.user;

    const combinedJson = {
      ...data,
      ...id,
    };
    // console.log(combinedJson);
    // res.send(combinedJson);
    user.createCompany(combinedJson, res);
  });

  //update company
  app.put("/api/company/:id", featchUser, (req, res) => {
    var data = req.body;
    const id = req.params.id;
    const combinedJson = {
      ...data,
      id,
    };

    //updating Company
    user.updateCompany(combinedJson, res);
  });

  //deleting Company
  app.delete("/api/company", featchUser, (req, res) => {
    try {
      var id = req.params.id;
      user.deleteCommpany(id, res);
    } catch (error) {
      res.send(200).json({ message: "Internal Server Error" });
    }
  });
  app.get("/api/companyByid", featchUser, (req, res) => {
    user.featchCompanybyid(req.query.id, res);
  });

  app.get("/api/company", featchUser, (req, res) => {
    var data = req.user;

    user.selectCompanyById(data, res);
  });
  app.get("/api/financialYear", feactCompany, (req, res) => {
    var id = req.cmp;
    user.selectFinancialYear(id, res);
  });
  app.post("/api/varify", (req, res) => {
    console.log(req.body);
    user.varifyOtp(req.body, res);
  });
  // admin apis

  app.post("/api/singupAdmin", (req, res) => {
    let data = req.body;
    user.singUpAdmin(data, res);
  });
  app.post("/api/singInAdmin", (req, res) => {
    let data = req.body;
    user.SingInAdmin(data, res);
  });
  app.get("/api/featchUsers", (req, res) => {
    user.selectAlluser(res);
  });
  app.post("/api/cmpByid", featchUser, (req, res) => {
    const id = req.body;

    user.featchCompanybyid(id, res);
  });
};
