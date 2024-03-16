const logError = require("../../errorLog");
const Querys = require("../config/querys");
const querys = require("../config/querys");
const database = require("../database/index");
// const db = database("Accounting");
const db = database("Accounting");
const query = new querys();

class Accounting {
  async createParty(userInputs, res) {
    // const partyArray = Array.isArray(parties) ? parties : [parties];

    var quer = query.createPartyquery(userInputs);
    var selectquery = query.selectpartycmpId(userInputs);
    db.query(selectquery, (err, data) => {
      if (err) {
        logError(err);
        res
          .status(200)
          .send({ message: "internal server error", flag: "false" });
      } else {
        if (data.length > 0) {
          res
            .status(200)
            .send({ message: "Party Alredy exist", flag: "false" });
        } else {
          db.query(quer, (err) => {
            if (err) {
              logError(err.message);
              res.json({ flag: false, message: "Internal server error" });
            } else {
              res
                .status(200)
                .json({ flag: true, message: "Party Created Successfully" });
            }
          });
        }
      }
    });
  }
  // deleting company
  async deleteParty(id, res) {
    let flag = false;
    var q = query.deleteParty(id, res);
    db.query(q, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.affectedRows) {
          flag = true;
          res
            .status(200)
            .json({ flag: flag, message: "party Deleted Successfully" });
        } else {
          res
            .status(200)
            .json({ flag: flag, message: "No Company Founded To delete" });
        }
      }
    });
  }
  async selectParty(id, res) {
    let flag = false;

    var q = query.selectParty(id);
    0;
    db.query(q, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.length > 0) {
          flag = true;
          // console.log(data);
          res.status(200).json({
            flag: flag,
            message: "party featch Successfully",
            data: data,
          });
        } else {
          res
            .status(200)
            .json({ flag: flag, message: "No Party Founded To select" });
        }
      }
    });
  }
  async updateParty(userInputs, res) {
    let flag = false;
    let { companyId } = userInputs;
    var q = query.updateParty(userInputs, res);
    db.query(q, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.affectedRows) {
          flag = true;
          res.status(200).json({
            flag: flag,
            message: "party Updated Successfully",
          });
        } else {
          res
            .status(200)
            .json({ flag: flag, message: "No Company Founded To Update" });
        }
      }
    });
  }
  async insertFinancialYaer(userInputs, res) {
    let flag = false;

    var q = query.insertFinancialYaer(userInputs, res);
    db.query(q, (err, data) => {
      if (err) {
        // res
        //   .status(200)
        //   .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.affectedRows) {
          flag = true;
          res.status(200).json({
            flag: flag,
            message: " inserted succsessfully Successfully",
            data: data,
          });
        } else {
          res.status(200).json({ flag: flag, message: "Not inserted" });
        }
      }
    });
  }
  // async insertFinancialyear(userInputs, res) {
  //   let flag = false;

  //   var q = query.insertFinancialYaer(userInputs, res);
  //   db.query(q, (err, data) => {
  //     if (err) {
  //       res
  //         .status(200)
  //         .json({ message: "Internal Server Error ", flag: false });

  //       logError(err.message);
  //     } else {
  //       if (data.affectedRows) {
  //         flag = true;
  //         res.status(200).json({
  //           flag: flag,
  //           message: "Company Updated Successfully",
  //           data: data,
  //         });
  //       } else {
  //         res
  //           .status(200)
  //           .json({ flag: flag, message: "No Company Founded To Update" });
  //       }
  //     }
  //   });
  // }

  async selectFinance(cmpid, res, type) {
    // var q = query.selectFinancialMaster();

    db.query(
      `SELECT * FROM Accounting.transactionMaster where  CompanyId=${cmpid} and transectionType = '${type}' `,
      (errr, data) => {
        if (errr) {
          logError(errr);
          res
            .status(200)
            .json({ flag: false, message: "Internal Server error" });
        } else {
          if (data.length > 0) {
            res.status(200).json({
              data: data,
              flag: true,
              message: "featch succsessfully",
            });
          } else {
            res.status(200).json({ flag: false, message: "No data match" });
          }
        }
      }
    );
  }
  async insertFinance(userInputs, res) {
    var q = query.InsertFinancialMaster(userInputs);

    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({ flag: true, message: "added to the finance" });
        } else {
          res.status(200).json({ flag: false, message: "Not inserted" });
        }
      }
    });
  }
  async updateFinance(userInputs, res) {
    var q = query.updateFinanceMaster(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res
            .status(200)
            .json({ flag: true, message: "Updated to the finance" });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async deleteFinance(userInputs, res) {
    var q = query.deleteFinancialMaster(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({ flag: true, message: "deleted successfully" });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async selectTransactiomLog(userInputs, res) {
    var q = query.selectTransactionLog(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.length > 0) {
          res
            .status(200)
            .json({ data: data, flag: true, message: "featch successfully" });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async insertTransactiomLog(userInputs, res) {
    var q = query.insertTransactionLog(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({
            flag: true,
            message: "insereted successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async deleteTransactiomLog(userInputs, res) {
    var q = query.deleteTransactionLog(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({
            flag: true,
            message: "deleted successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async updatetTransactionlog(userInputs, res) {
    var q = query.updateTransactionLog(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({
            flag: true,
            message: "Updated successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async selectAccountGroupMaster(res) {
    var q = query.selectaccountGroupMaster();
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.length > 0) {
          res
            .status(200)
            .json({ data: data, flag: true, message: "featch successfully" });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async insertItemMaster(userInputs, res) {
    var q = query.insertItemMaster(userInputs);

    var existitmquery = query.itmexistquery(userInputs);

    db.query(existitmquery, (err, data) => {
      console.log(data);
      if (err) {
        res
          .status(200)
          .send({ message: "internal server Error", flag: "false" });
      } else {
        if (data.length > 0) {
          res.status(200).send({ message: "item alredy exist", flag: "false" });
        } else {
          db.query(q, (errr, data) => {
            if (errr) {
              logError(errr);
              res
                .status(200)
                .json({ flag: false, message: "Internal Server error" });
            } else {
              if (data.affectedRows > 0) {
                res.status(200).json({
                  flag: true,
                  message: "insereted successfully",
                });
              } else {
                res.status(200).json({ flag: false, message: "Not insereted" });
              }
            }
          });
        }
      }
    });
  }
  async updatetItemMaster(userInputs, res) {
    var q = query.UpdateItemMaster(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({
            flag: true,
            message: "Updated successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async deletetItemMaster(userInputs, res) {
    var q = query.deleteitemMaster(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({
            flag: true,
            message: "deleted successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async selectItemMaster(userInputs, res) {
    var q = query.seletItemMaster(userInputs);

    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.length > 0) {
          res.status(200).json({
            data,
            flag: true,
            message: "featch successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }

  async generateReport(userInputs, res) {
    const q = query.report(userInputs);
    let results = [];
    let a = [];

    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);

        res.status(500).json({ flag: false, message: "Internal Server Error" });
      } else {
        if (data.length > 0) {
          for (let index = 0; index < data.length; index++) {
            for (let j = index + 1; j < data.length; j++) {
              if (
                data[index].AccountTo == data[j].AccountFrom &&
                data[j].AccountTo == data[index].AccountFrom
              ) {
                a.push(j, index);

                let result = {
                  AccountTo: data[index].AccountTo,
                  AccountFrom: data[index].AccountFrom,
                  Amount:
                    data[index].Amount > data[j].Amount
                      ? `${Math.abs(data[index].Amount - data[j].Amount)}`
                      : data[j].Amount - data[index].Amount,
                  transectionType: "",
                };

                if (data[index].Amount > data[j].Amount) {
                  result.transectionType = "credit";
                }
                if (data[index].Amount < data[j].Amount) {
                  result.transectionType = "debit";
                }
                if (data[index].Amount == data[j].Amount) {
                  result.transectionType = "-";
                }

                results.push(result);
              }
            }
          }

          data
            .map((_, index) => index)
            .filter((index) => {
              if (a.indexOf(index) === -1) {
                results.push(data[index]);
              }
            });

          if (data.length > 0) {
            res.status(200).json({
              data: results,
              flag: true,
              message: "Fetch successful",
            });
          } else {
            res.status(200).json({
              flag: false,
              message: "No transactions found for the specified filter",
            });
          }
        } else {
          res.status(200).json({ flag: false, message: "Not found" });
        }
      }
    });
  }

  async inserbillLog(userInputs, res) {
    try {
      const q = query.inserbillLog(userInputs);
      const data = await this.dbQuery(q);

      if (data.affectedRows > 0) {
        await Promise.all(
          userInputs.items.map((item) =>
            this.insertItemDetails(data.insertId, item)
          )
        );
        res.status(200).json({
          flag: true,
          message: "Inserted successfully",
          insertId: data.insertId,
        });
      } else {
        res.status(200).json({ flag: false, message: "Not found" });
      }
    } catch (error) {
      logError(error);
      res.status(200).json({ flag: false, message: "Internal Server error" });
    }
  }

  async insertItemDetails(billId, item) {
    const q = `INSERT INTO Accounting.BillFullLog (billId, itemId, gst, amount, qty,unitCost) VALUES (?, ?, ?, ?, ?,?)`;
    const values = [
      billId,
      item.id,
      item.GST,
      item.amount,
      item.qty,
      item.salePrice,
    ];
    await this.dbQuery(q, values);
  }

  async dbQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  async getbilling(userrInputs, res) {
    var q = query.getbilling(userrInputs);
    console.log(q);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.length > 0) {
          // console.log(data);

          res.status(200).json({
            flag: true,
            data: data,
            message: "Featch successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async getBillItem(userrInputs, res) {
    var q = query.getBillItem(userrInputs);

    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.length > 0) {
          // console.log(data);

          res.status(200).json({
            flag: true,
            data: data,
            message: "Featch successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }

  async deleteBilllog(userInputs, res) {
    console.log(userInputs);
    var q = query.deleteBillLog(userInputs);
    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({
            flag: true,
            message: "deleted successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }

  async updateBilling(userInputs, res) {
    try {
      const { billId, items } = userInputs;
      const q = query.updateBillLog(userInputs);
      const data = await this.dbQuery(q);

      if (data.affectedRows > 0) {
        await Promise.all(
          items.map(async (item) => {
            const existsQuery = `SELECT * FROM Accounting.BillFullLog WHERE billId = ? AND itemId = ?`;
            const existsValues = [billId, item.id];
            const existingItem = await this.dbQuery(existsQuery, existsValues);

            if (existingItem.length > 0) {
              const updateQuery = `UPDATE Accounting.BillFullLog SET gst = ?, amount = ?, qty = ?, unitCost = ? WHERE billId = ? AND itemId = ?`;
              const updateValues = [
                item.GST,
                item.amount,
                item.qty,
                item.salePrice,
                billId,
                item.id,
              ];
              await this.dbQuery(updateQuery, updateValues);
            } else {
              await this.insertItemDetails(billId, item);
            }
          })
        );
        res.status(200).json({
          flag: true,
          message: "Inserted successfully",
          insertId: data.insertId,
        });
      } else {
        res.status(200).json({ flag: false, message: "Not found" });
      }
    } catch (error) {
      logError(error);
      res.status(200).json({ flag: false, message: "Internal Server error" });
    }
  }
  async getBillById(userrInputs, res) {
    var q = query.selectBillLogbyID(userrInputs);

    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.length > 0) {
          // console.log(data);

          res.status(200).json({
            flag: true,
            data: data[0],
            message: "Featch successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
  async getInvoiceNoLatest(userrInputs, res) {
    var q = query.getlastInvoiceNo(userrInputs);

    db.query(q, (errr, data) => {
      console.log(data);
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.length > 0) {
          // console.log(data);

          res.status(200).json({
            flag: true,
            data: data,
            message: "Featch successfully",
          });
        } else {
          res.status(200).json({ flag: false, message: "Not founded" });
        }
      }
    });
  }
}

module.exports = Accounting;
