const { response } = require("express");
const logError = require("../../errorLog");
const { AcountServices } = require("../services");
const feactCompany = require("./middleware/featchCompany");
const Accounting = require("../services/Accounting");
var AcountService = new AcountServices();

module.exports = (app) => {
  //party crud
  app.post("/api/party", feactCompany, (req, res) => {
    try {
      var data = req.body;
      var id = req.cmp;
      var responsedata = {
        ...data,
        id: id,
      };

      AcountService.createParty(responsedata, res);
    } catch (error) {
      logError(error);
    }
  });
  app.delete("/api/party", feactCompany, (req, res) => {
    try {
      var data = req.body;
      // console.log(data);
      AcountService.deleteParty(data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.put("/api/party", feactCompany, (req, res) => {
    try {
      var companyId = req.cmp;

      var data = req.body;
      // console.log(data);
      var recive_data = { ...data, companyId: companyId };

      AcountService.updateParty(recive_data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.get("/api/party", feactCompany, (req, res) => {
    try {
      var data = req.cmp;

      AcountService.selectParty(data, res);
    } catch (error) {
      logError(error);
    }
  });

  //transetion master crud
  app.get("/api/financemaster", feactCompany, (req, res) => {
    try {
      var cmpid = req.cmp;
      var type = req.headers.data;
      AcountService.selectFinance(cmpid, res, type);
    } catch (error) {
      logError(error);
    }
  });
  app.post("/api/financemaster", feactCompany, (req, res) => {
    try {
      var companyId = req.cmp;
      // console.log(companyId);
      var data = req.body;
      // console.log(data);
      var recive_data = { ...data, companyId: companyId };
      AcountService.insertFinance(recive_data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.put("/api/financemaster", feactCompany, (req, res) => {
    try {
      var companyId = req.cmp;

      var data = req.body;
      var recive_data = { ...data, companyId: companyId };

      AcountService.updateFinance(recive_data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.delete("/api/financemaster", feactCompany, (req, res) => {
    try {
      var data = req.body.id;
      // console.log(data);
      AcountService.deleteFinance(data, res);
    } catch (error) {
      logError(error);
    }
  });

  //transectionMasterLog crud
  app.get("/api/transactionlog", feactCompany, (req, res) => {
    try {
      var data = req.body;
      AcountService.selectTransactiomLog(data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.put("/api/transactionlog", feactCompany, (req, res) => {
    try {
      var data = req.body;

      AcountService.updatetTransactionlog(data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.post("/api/transactionlog", feactCompany, (req, res) => {
    try {
      var data = req.body;
      AcountService.insertTransactiomLog(data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.delete("/api/transactionlog", feactCompany, (req, res) => {
    try {
      var data = req.body;
      AcountService.deleteTransactiomLog(data, res);
    } catch (error) {
      logError(error);
    }
  });

  //account group master
  app.get("/api/accountGroupMaster", feactCompany, (req, res) => {
    try {
      AcountService.selectAccountGroupMaster(res);
    } catch (error) {
      logError(error);
    }
  });

  //item Master
  app.post("/api/itemMaster", feactCompany, (req, res) => {
    try {
      var bodyData = req.body;
      var userId = req.cmp;
      var data = {
        ...bodyData,
        userId,
      };

      AcountService.insertItemMaster(data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.put("/api/itemMaster", feactCompany, (req, res) => {
    try {
      var bodyData = req.body;
      var userId = req.cmp;
      var data = {
        ...bodyData,
        Companyid: userId,
      };
      AcountService.updatetItemMaster(data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.delete("/api/itemMaster", feactCompany, (req, res) => {
    try {
      var data = req.body;

      AcountService.deletetItemMaster(data, res);
    } catch (error) {
      logError(error);
    }
  });
  app.get("/api/itemMaster", feactCompany, (req, res) => {
    try {
      var id = req.cmp;

      AcountService.selectItemMaster(id, res);
    } catch (error) {
      logError(error);
    }
  });

  app.get("/api/transectionReport", feactCompany, (req, res) => {
    var id = req.cmp;
    AcountService.generateReport(id, res);
  });
  app.post("/api/inserbillLog", feactCompany, (req, res) => {
    var data = req.body;

    var id = req.cmp;
    var requestdata = {
      ...data,
      CompanyId: id,
    };

    AcountService.inserbillLog(requestdata, res);
  });

  app.get("/api/billlog", feactCompany, (req, res) => {
    var id = req.cmp;
    AcountService.getbilling(id, res);
  });
  app.delete("/api/billlog", feactCompany, (req, res) => {
    var data = req.body;
    var id = req.cmp;

    var sData = {
      ...data,
      cmpId: id,
    };

    AcountService.deleteBilllog(sData, res);
  });
  app.put("/api/billlog",feactCompany,(req,res)=>{
    var data = req.body;
    var id = req.cmp;

    var sData = {
      ...data,
      cmpId: id,
    };

    AcountService.deleteBilllog(sData, res);
  })
  app.post("/api/billItem", feactCompany, (req, res) => {
    const id = req.body;

    AcountService.getBillItem(id, res);
  });
};
