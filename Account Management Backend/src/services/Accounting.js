const logError = require("../../errorLog");
const Querys = require("../config/querys");
const querys = require("../config/querys");
const database = require("../database/index");
// const db = database("Accounting");
const db = database("Accounting");
const query = new querys();

class Accounting {
  async createParty(userInputs, res) {
    // console

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
  // async inserbillLog(userInputs, res) {
  //   var q = query.inserbillLog(userInputs);
  //   db.query(q, (errr, data) => {
  //     if (errr) {
  //       logError(errr);
  //       res.status(200).json({ flag: false, message: "Internal Server error" });
  //     } else {
  //       if (data.affectedRows > 0) {
  //         res.status(200).json({
  //           flag: true,
  //           message: "insereted successfully",
  //         });
  //       } else {
  //         res.status(200).json({ flag: false, message: "Not founded" });
  //       }
  //     }
  //   });
  // }

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
        res.status(200).json({ flag: true, message: "Inserted successfully" });
      } else {
        res.status(200).json({ flag: false, message: "Not found" });
      }
    } catch (error) {
      logError(error);
      res.status(200).json({ flag: false, message: "Internal Server error" });
    }
  }

  async insertItemDetails(billId, item) {
    const q = `INSERT INTO Accounting.BillFullLog (billId, itemId, gst, amount, qty) VALUES (?, ?, ?, ?, ?)`;
    const values = [billId, item.id, item.GST, item.amount, item.qty];
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

    db.query(q, (errr, data) => {
      if (errr) {
        logError(errr);
        res.status(200).json({ flag: false, message: "Internal Server error" });
      } else {
        if (data.length > 0) {
          // console.log(data);
          var transformData = this.transformData(data);
          console.log(transformData);
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

  // Transform function
  // Transform function
  transformData(inputData) {
    const data = inputData;
    if (!data || data.length === 0) {
      throw new Error("Data array is empty or undefined");
    }

    const invoices = [];

    // Iterate through each invoice data
    for (const invoice of data) {
      const invoiceObj = {
        invoiceNo: invoice.invoiceNo,
        invoiceDate: invoice.invoiceDate,
        dueDate: invoice.dueDate,
        bPartyName: invoice.bPartyName,
        bPartyAddress: invoice.bPartyAdress, // Corrected key name
        bStateCode: invoice.bStateCode,
        gstNo: invoice.gstNo,
        items: [],
        totalQuantity: parseFloat(invoice.totalQuantity),
        gtotalAmount: parseFloat(invoice.gtotalAmount),
        discount: parseFloat(invoice.discount),
        totalTaxable: parseFloat(invoice.totalTaxable),
        totalSgst: parseFloat(invoice.totalSgst),
        totalCgst: parseFloat(invoice.totalCgst),
        totalIGst: parseFloat(invoice.totalIGst),
        tsc: parseFloat(invoice.tcs),
        totalAmount: parseFloat(invoice.totalAmount),
        flag: invoice.flag,
        transportDate: invoice.transportDate,
        bookName: invoice.bookName,
        payAmount: parseFloat(invoice.payAmount),
        pending: parseFloat(invoice.panding), // Corrected key name
        dueAmount: parseFloat(invoice.dueAmount), // Added handling for dueAmount
        deliveryAddress: invoice.deliveryAdress, // Corrected key name
      };

      // Check if invoice.items exists before mapping
      if (invoice.items && Array.isArray(invoice.items)) {
        // Iterate through each item in the invoice
        invoiceObj.items = invoice.items.map((item) => ({
          itemId: parseInt(item.itemId), // Corrected key name
          name: item.name,
          unit: item.unit,
          qty: parseFloat(item.qty),
          amount: parseFloat(item.amount),
          HSN: item.HSN,
          GST: parseFloat(item.GST),
          salePrice: parseFloat(item.salePrice),
          purchasePrice: parseFloat(item.purchasePrice),
          openingStock: parseInt(item.openingStock),
          closingStock: parseInt(item.closingStock),
        }));
      }

      // Push the constructed invoice object to the invoices array
      invoices.push(invoiceObj);
    }

    return invoices;
  }

  // Usage
}

module.exports = Accounting;
