const crypto = require("crypto-js");
const moment = require("moment");
const { updateLocale } = require("moment/moment");
const { userServices } = require("../services");
const currentdate = moment();
class Querys {
  singUp = (userInputs) => {
    const key = process.env.KEY;

    const { email, password, firstName, lastName } = userInputs;
    var encPass = crypto.HmacSHA1(password, key).toString(crypto.enc.Hex);
    return `insert into tbluser(email,firstName,lastName,password) values('${email}','${firstName}','${lastName}','${encPass}')`;
  };
  signUpAdminUser = (userInputs) => {
    const key = process.env.KEY;

    const { email, password, firstName, lastName } = userInputs;
    var encPass = crypto.HmacSHA1(password, key).toString(crypto.enc.Hex);
    return `insert into admin(email,firstName,lastName,password) values('${email}','${firstName}','${lastName}','${encPass}')`;
  };

  checkUser = (userInputs) => {
    const { email } = userInputs;
    return `select * from tbluser where  email='${email}'`;
  };
  checkAdminUser = (userInputs) => {
    const { email } = userInputs;
    return `select * from admin where  email='${email}'`;
  };

  singIN = (userInputs) => {
    const key = process.env.KEY;
    const { email, password, userName } = userInputs;
    var encPass = crypto.HmacSHA1(password, key).toString(crypto.enc.Hex);
    if (email != null || email != "") {
      return `select * from tbluser where  email='${email}' and password = '${encPass}'`;
    } else {
      return `select * from tbluser where  userName='${userName}' and password = '${encPass}'`;
    }
  };
  singInAdmin = (userInputs) => {
    const key = process.env.KEY;
    const { email, password, userName } = userInputs;
    var encPass = crypto.HmacSHA1(password, key).toString(crypto.enc.Hex);
    if (email != null || email != "") {
      return `select * from admin where  email='${email}' and password = '${encPass}'`;
    } else {
      return `select * from admin where  userName='${userName}' and password = '${encPass}'`;
    }
  };
  updateUser = (userInputs) => {
    const { email, password, id, status } = userInputs;
    return `UPDATE tbluser SET email='${email}', status='${status}', password='${password}' WHERE id=${id};`;
  };
  resetPassword = (userInputs) => {
    const key = process.env.KEY;

    const { email, password } = userInputs;
    var encPass = crypto.HmacSHA1(password, key).toString(crypto.enc.Hex);
    return `UPDATE tbluser SET  password='${encPass}' WHERE email='${email}'`;
  };
  createCompany = (userInputs) => {
    const currentdate = moment(); // Get the current date and time
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");

    var {
      id,
      companyName,
      gstNumber,
      email,
      phoneNumber = 0,
      address,
      city,
      state,
      country,
      postalCode,
      ownerName,
      ownerEmail,
      purchaseStock,
      businessType,
    } = userInputs;
    const handleUndefined = (value) =>
      value === undefined ? null : `'${value}'`;

    return `INSERT INTO tblcompany(userId,companyName,gstNumber,email,phoneNumber,address,city,state,country,postalCode,ownerName,ownerEmail,businessType,createDate,UpdateDate,OpeningBalance) VALUES (${handleUndefined(
      id
    )}, ${handleUndefined(companyName)}, ${handleUndefined(
      gstNumber
    )}, ${handleUndefined(email)}, ${handleUndefined(
      phoneNumber
    )}, ${handleUndefined(address)}, ${handleUndefined(
      city
    )}, ${handleUndefined(state)}, ${handleUndefined(
      country
    )}, ${handleUndefined(postalCode)}, ${handleUndefined(
      ownerName
    )}, ${handleUndefined(ownerEmail)}, ${handleUndefined(
      businessType
    )}, '${formattedDate}',' ${formattedDate}',${handleUndefined(
      purchaseStock
    )});`;
  };
  updateCompany = (userInputs) => {
    var {
      id,
      companyName,
      gstNumber,
      email,
      phoneNumber,
      address,
      city,
      state,
      country,
      postalCode,
      ownerName,
      ownerEmail,
      ownerPhoneNumber,
      businessType,

      UpdateDate,
    } = userInputs;
    const handleUndefined = (value) =>
      value === undefined ? "null" : `'${value}'`;

    return `UPDATE tblcompany SET companyName = ${handleUndefined(
      companyName
    )},gstNumber = ${handleUndefined(gstNumber)},email = ${handleUndefined(
      email
    )},phoneNumber = ${handleUndefined(
      phoneNumber
    )},address = ${handleUndefined(address)},city = ${handleUndefined(
      city
    )},state = ${handleUndefined(state)},country = ${handleUndefined(
      country
    )},postalCode = ${handleUndefined(
      postalCode
    )},ownerName = ${handleUndefined(ownerName)},ownerEmail = ${handleUndefined(
      ownerEmail
    )},ownerPhoneNumber = ${handleUndefined(
      ownerPhoneNumber
    )},businessType = ${handleUndefined(
      businessType
    )},UpdateDate = ${handleUndefined(UpdateDate)} WHERE id = ${handleUndefined(
      id
    )} ;`;
  };

  featchCompany = (id) => {
    return `select * from tblcompany }`;
  };
  featchCompanyid = (id) => {
    return `select * from tblcompany Where id= ${id}`;
  };
  featchCompanyUserId = (id) => {
    return `select * from tblcompany Where userId= ${id}`;
  };
  allcmp = () => {
    return `select * from tblcompany `;
  };
  selectAlluser = (id) => {
    return `select * from tbluser `;
  };
  deleteUser = (data) => {
    return `delete from tbluser where id =${data}`;
  };
  selectuserByid = (id) => {
    return `select * from tbluser  where id = ${id}`;
  };
  get featchCompany() {
    return this._featchCompany;
  }
  set featchCompany(value) {
    this._featchCompany = value;
  }
  deleteCompany = (id) => {
    return `delete from tblcompany Where id=${id}`;
  };
  selectpartycmpId = (userdata) => {
    var { partyName, id } = userdata;
    return `select * from Accounting.party where partyName = '${partyName}' and Companyid= ${id}`;
  };
  createPartyquery = (userInputs) => {
    var {
      partyName,
      gstNumber,
      email,
      phoneNumber,
      address,
      city,
      statecode,
      pan,
      remarks,
      openingBalance,
      id,
      deliveryAddress,
      tds,
      creditLimit,
      distance,
      transporterName,
      natureOfOrg,
      partyGroup,
      discount,
      brokerage,
      rf,
      TCSRate,
      postalCode,
      accountGroup,
      paymentTerms,
    } = userInputs;

    // Function to replace undefined values with null
    const replaceUndefinedWithNull = (value) =>
      value !== undefined ? `'${value}'` : "null";

    return `INSERT INTO Accounting.party(partyName, address, phoneNumber, statecode, pan, gstNumber,  deliveryAddress, creditLimit, openingBalance, CompanyId, accountGroup, city, postalCode, distance, transporterName, BrokerName, natureOfOrg, email, remarks, tds, paymentTerms, partyGroup, discount, brokerage, rf, TCSRate) VALUES (${replaceUndefinedWithNull(
      partyName
    )}, ${replaceUndefinedWithNull(address)}, ${replaceUndefinedWithNull(
      phoneNumber
    )}, ${replaceUndefinedWithNull(statecode)}, ${replaceUndefinedWithNull(
      pan
    )}, ${replaceUndefinedWithNull(gstNumber)}, ${replaceUndefinedWithNull(
      deliveryAddress
    )}, ${replaceUndefinedWithNull(creditLimit)}, ${replaceUndefinedWithNull(
      openingBalance
    )}, ${replaceUndefinedWithNull(id)}, ${replaceUndefinedWithNull(
      accountGroup
    )}, ${replaceUndefinedWithNull(city)}, ${replaceUndefinedWithNull(
      postalCode
    )}, ${replaceUndefinedWithNull(distance)}, ${replaceUndefinedWithNull(
      transporterName
    )}, ${replaceUndefinedWithNull(brokerage)}, ${replaceUndefinedWithNull(
      natureOfOrg
    )}, ${replaceUndefinedWithNull(email)}, ${replaceUndefinedWithNull(
      remarks
    )}, ${replaceUndefinedWithNull(tds)}, ${replaceUndefinedWithNull(
      paymentTerms
    )}, ${replaceUndefinedWithNull(partyGroup)}, ${replaceUndefinedWithNull(
      discount
    )}, ${replaceUndefinedWithNull(brokerage)}, ${replaceUndefinedWithNull(
      rf
    )}, ${replaceUndefinedWithNull(TCSRate)});`;
  };
  updateParty(userInputs) {
    const replaceUndefinedWithNull = (value) =>
      value !== undefined ? `'${value}'` : "";

    const fieldsToUpdate = [
      "partyName",
      "gstNumber",
      "email",
      "phoneNumber",
      "address",
      "city",
      "statecode",
      "pan",
      "remarks",
      "openingBalance",
      "deliveryAddress",
      "tds",
      "creditLimit",
      "distance",
      "transporterName",
      "natureOfOrg",
      "partyGroup",
      "discount",
      "brokerage",
      "rf",
      "TCSRate",
      "postalCode",
      "accountGroup",
      "paymentTerms",
    ];

    const setValues = fieldsToUpdate
      .map(
        (field) => `${field} = ${replaceUndefinedWithNull(userInputs[field])}`
      )
      .join(", ");

    const query = `UPDATE Accounting.party SET ${setValues} WHERE ID = ${userInputs.ID};`;

    return query;
  }

  deleteParty = (id) => {
    return `DELETE FROM Accounting.party WHERE id = ${id.id};`;
  };
  selectParty = (id) => {
    return `SELECT * FROM Accounting.party WHERE CompanyId = ${id};`;
    // return `select * from Accounting.party`;/
  };

  selectCompany = (id) => {
    let query = `SELECT * FROM tblcompany where userId= ${id.id}`;

    return query;
  };
  selectFinancialYear = (userInputs) => {
    return `select year FROM Accounting.financialyear WHERE companyId = ${userInputs}`;
  };

  insertFinancialYaer = (userInputs) => {
    // console.log(userInputs);
    var {
      insertId,

      currentYear,
      status,
      openingStock,
      closingStock,
      capital,
    } = userInputs;

    var fromDate = new Date(userInputs.date[0]).getFullYear();
    var toDate = new Date(userInputs.date[1])
      .getFullYear()
      .toString()
      .slice(-2);

    var year = fromDate + "/" + toDate;

    return `INSERT INTO Accounting.financialyear(companyId,year)VALUES(${insertId},'${year}');    `;
  };
  updateFinancialYaer = (userInputs) => {
    var {
      id,
      companyId,
      fromDate,
      toDate,
      currentYear,
      status,
      openingStock,
      closingStock,
      capital,
    } = userInputs;
    return `UPDATE Accounting.financialyear SET companyId = ${companyId}, fromDate = ${fromDate}, toDate = ${toDate}, currentYear = ${currentYear}, status = ${status}, openingStock = ${openingStock}, closingStock = ${closingStock}, capital = ${capital} WHERE id = ${id};
    `;
  };
  deleteFinancialYear = (userDate) => {
    return `DELETE FROM Accounting.financialyear WHERE id = ${userDate.id};`;
  };
  selectFinancialMaster = (cmp) => {
    return `SELECT * FROM transactionMaster where companyId =${cmp} `;
  };
  InsertFinancialMaster = (userData) => {
    const currentdate = moment();
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");

    var {
      companyId,
      paymentNo,
      transectionType,
      AccountFrom,
      AccountTo,
      chequeNo,
      amount,
      narration,

      invoiceNo,
    } = userData;

    return `INSERT INTO Accounting.transactionMaster
    (
      transectionType,
      createDate,
      updateDate,
      companyId,
      paymentNo,
      AccountFrom,
      AccountTo,
      chequeNo,
      amount,
      narration,
      invoiceNo
    )
    VALUES
    (
      '${transectionType}',
      '${formattedDate}',
      '${formattedDate}', 
      ${companyId},
      '${paymentNo}',
      '${AccountFrom}',
      '${AccountTo}',
      '${chequeNo}',
      ${amount},
      '${narration}',
      '${invoiceNo}'
    );`;
  };
  updateFinanceMaster = (userInputs) => {
    const currentdate = moment();
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");
    var {
      id,
      transectionType,
      companyId,
      paymentNo,
      AccountFrom,
      AccountTo,
      chequeNo,
      amount,
      narration,
      PID,
      tick,
      invoiceNo,
    } = userInputs;

    return `UPDATE transactionMaster
    SET
    transectionType = '${transectionType}',
    updateDate = '${formattedDate}',
    companyId = '${companyId}',
    paymentNo = '${paymentNo}',
    AccountFrom = '${AccountFrom}',
    AccountTo = '${AccountTo}',
    chequeNo = '${chequeNo}',
    amount = ${amount},  -- Removed single quotes around ${amount}
    narration = '${narration}',
    PID = '${PID}',
    tick = ${tick},
    invoiceNo = '${invoiceNo}'
    WHERE id = ${id};
    `;
  };
  deleteFinancialMaster = (id) => {
    let query = `delete  FROM transactionMaster  WHERE id = ${id}`;

    return query;
  };

  insertTransactionLog = (userInputs) => {
    let { paymentId, billLogId, flag, amount } = userInputs;
    return `INSERT INTO transactionmasterlog(paymentId,billLogId,flag,Amount)VALUES(${paymentId},${billLogId},${flag},${amount});`;
  };
  updateTransactionLog = (userInputs) => {
    let { id, paymentId, billLogId, flag, amount } = userInputs;
    return `update transactionmasterlog set paymentId=${paymentId}, billLogId = ${billLogId},flag=${flag},Amount=${amount} where id=${id}`;
  };
  deleteTransactionLog = (userInputs) => {
    let { id } = userInputs;
    return `delete from transactionmasterlog wherte id=${id}`;
  };
  selectTransactionLog = (userDate) => {
    let query = "SELECT * FROM transactionmasterlog";

    if (userDate && userDate.id) {
      query += ` WHERE id = ${userDate.id}`;
    }
    if (userDate && userDate.CmpId) {
      query += ` WHERE id = ${userDate.id}`;
    }

    return query;
  };

  insertItemMaster = (userdata) => {
    const currentdate = moment();
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");
    const {
      name,
      unit,
      HSN,
      GST,
      userId,
      openingStock,
      closingStock,
      salePrice,
      purchasePrice,
    } = userdata;

    const openingStockValue = openingStock !== "" ? openingStock : null;
    const closingStockValue = closingStock !== "" ? closingStock : null;
    const salePriceValue = salePrice !== "" ? salePrice : null;
    const purchasePriceValue = purchasePrice !== "" ? purchasePrice : null;

    return `INSERT INTO Accounting.itemmaster (name, unit, HSN, GST, CompanyId, createDate, updateDate, LastModifidedBy, openingStock, closingStock, salePrice, purchasePrice) VALUES ('${name}', '${unit}', '${HSN}', '${GST}', ${userId}, '${formattedDate}', '${formattedDate}', ${userId}, ${openingStockValue}, ${closingStockValue}, ${salePriceValue}, ${purchasePriceValue});`;
  };
  UpdateItemMaster = (userInputs) => {
    // console.log(userInputs);
    const currentdate = moment();
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");
    const {
      id,
      name,
      unit,
      HSN,
      GST,
      userId,
      CompanyId,
      openingStock,
      purchasePrice,
      closingStock,
      salePrice,
    } = userInputs;

    return `UPDATE Accounting.itemmaster
   SET
       name = '${name}',
       unit = '${unit}',
       HSN =' ${HSN}',
       GST = '${GST}',
       salePrice='${salePrice}',
       purchasePrice='${purchasePrice}',
       openingStock='${openingStock}',
       closingStock='${closingStock}',
       updateDate =' ${formattedDate}',
       LastModifidedBy = '${userId}'
   WHERE
       id= ${id} and CompanyId=${CompanyId} `;
  };
  deleteitemMaster = (userdata) => {
    return `DELETE FROM Accounting.itemmaster where id =${userdata.id}`;
  };
  itmexistquery = (userdata) => {
    let query = `SELECT * FROM Accounting.itemmaster WHERE CompanyId = ${userdata.userId} AND name='${userdata.name}'`;

    return query;
  };
  seletItemMaster = (userdata) => {
    let query = `SELECT * FROM Accounting.itemmaster  where CompanyId = ${userdata}`;

    return query;
  };
  report = (id) => {
    return `SELECT sum(amount) as Amount,AccountTo,AccountFrom ,transectionType FROM Accounting.transactionMaster where CompanyId=${id} group by transectionType , AccountTo,AccountFrom;`;
  };

  selectaccountGroupMaster = () => {
    return `SELECT * FROM Accounting.accountgroupmaster;`;
  };
  inserbillLog = (userdata) => {
    // console.log(userdata);
    const currentdate = moment();
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");
    const {
      CompanyId,
      invoiceNo,
      invoiceDate,
      dueDate,
      bPartyName,
      bPartyAdress,
      bStateCode,
      gstNo,
      totalQuantity,
      gtotalAmount,
      discount,
      totalTaxable,
      paidAmount,
      totalSgst,
      totalCgst,
      totalIGst,
      tcs,
      pgstNo,
      totalAmount,
      flag,
      transportDate,
      bookName,
      isGstBill,
      transactionType,
      panding,
      bStateName,
      dueAmount,
      deliveryAdress,
    } = userdata;

    return `INSERT INTO Accounting.Billlog (
      ComapnyId,
      invoiceNo,
      invoiceDate,
      dueDate,
      bPartyName,
      bPartyAdress,
      bStateCode,
      gstNo,
      totalQuantity,
      gtotalAmount,
      discount,
      totalTaxable,
      totalSgst,
      totalCgst,
      totalIGst,
      tcs,
      totalAmount,
      flag,
      transportDate,
      bookName,
      payAmount,
      panding,
     
  
      dueAmount,
      deliveryAdress,
      createDate,
      updateDate,
      isGstBill,
      transactionType
 
  ) VALUES (
      '${CompanyId}',
      '${invoiceNo}',
      '${invoiceDate}',
      '${dueDate}',
      '${bPartyName}',
      '${bPartyAdress}',
      '${bStateName}',
      '${pgstNo}',
      '${totalQuantity}',
      '${gtotalAmount}',
      '${discount}',
      '${totalTaxable}',
      '${totalSgst}',
      '${totalCgst}',
      '${totalIGst}', 
      '${tcs}',
      '${totalAmount}',
      '${flag}',
      '${transportDate}',
      '${bookName}',
      '${paidAmount}',
      '${panding}',
      '${dueAmount}',
      '${deliveryAdress}',
      '${formattedDate}',
      '${formattedDate}',
      '${isGstBill}',
      '${transactionType}'

  );
  `;
  };
  selectBillLogbyID = (userDAta) => {
    // console.log(userDAta);
    return `select * from Accounting.Billlog where id = ${userDAta.id} and ComapnyId=${userDAta.CompanyId}`;
  };

  updateBillLog = (userdata) => {
    console.log(userdata);
    const currentdate = moment();
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");
    const {
      id,
      CompanyId,
      invoiceNo,
      invoiceDate,
      dueDate,
      bPartyName,
      bPartyAdress,
      bStateCode,
      gstNo,
      totalQuantity,
      gtotalAmount,
      discount,
      totalTaxable,
      paidAmount,
      totalSgst,
      totalCgst,
      cmpId,
      totalIGst,
      tcs,
      totalAmount,
      flag,
      pgstNo,
      transportDate,
      bookName,
      isGstBill,
      panding,
      dueAmount,
      deliveryAdress,
      transactionType,
      bStateName,
    } = userdata;
    // console.log(userdata, "jshdvgf");
    return `UPDATE Accounting.Billlog 
    SET
      ComapnyId = '${cmpId}',
      invoiceNo = '${invoiceNo}',
      invoiceDate = '${invoiceDate}',
      dueDate = '${dueDate}',
      bPartyName = '${bPartyName}',
      bPartyAdress = '${bPartyAdress}',
      bStateCode = '${bStateName}',
      gstNo = '${pgstNo}',
      transactionType= '${transactionType}',
      totalQuantity = '${totalQuantity}',
      gtotalAmount = '${gtotalAmount}',
      discount = '${discount}',
      totalTaxable = '${totalTaxable}',
      totalSgst = '${totalSgst}',
      totalCgst = '${totalCgst}',
      totalIGst = '${totalIGst}',
      tcs = '${tcs}',
      totalAmount = '${totalAmount}',
      flag = '${flag}',
      transportDate = '${transportDate}',
      bookName = '${bookName}',
      payAmount = '${paidAmount}',
      panding = '${panding}',
      dueAmount = '${dueAmount}',
      deliveryAdress = '${deliveryAdress}',
      updateDate = '${formattedDate}',
      isGstBill = '${isGstBill}'
    WHERE id = '${id}';
    `;
  };

  getbilling = (userdata) => {
    // console.log(userdata.cmpId);
    //return `select * from Billlog where ComapnyId =${userdata}  `;
    if (userdata.bookName) {
      return `  SELECT * From Billlog WHERE ComapnyId = ${userdata.cmpId} and bookName= '${userdata.bookName}'`;
    } else {
      return `  SELECT * From Billlog WHERE ComapnyId = ${userdata.cmpId}`;
    }
  };
  getBillItem = (userinput) => {
    // console.log(userinput.id, "ahsdg");
    return `SELECT * FROM BillFullLog WHERE billId ='${userinput.id}'`;
  };
  deleteBillLog = (data) => {
    return `DELETE FROM Billlog where id=${data.id} and ComapnyId = ${data.cmpId}`;
  };
  getlastInvoiceNo = (data) => {
    return `SELECT invoiceNo FROM Accounting.Billlog where ComapnyId=${data.cmpId} ORDER BY id DESC LIMIT 1`;
  };
}

module.exports = Querys;
