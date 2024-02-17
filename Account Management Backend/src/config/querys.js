const crypto = require("crypto-js");
const moment = require("moment");
const { updateLocale } = require("moment/moment");
const currentdate = moment();
class Querys {
  singUp = (userInputs) => {
    const key = process.env.KEY;

    const { email, password, firstName, lastName } = userInputs;
    var encPass = crypto.HmacSHA1(password, key).toString(crypto.enc.Hex);
    return `insert into tbluser(email,firstName,lastName,password) values('${email}','${firstName}','${lastName}','${encPass}')`;
  };
  checkUser = (userInputs) => {
    const { email } = userInputs;
    return `select * from tbluser where  email='${email}'`;
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
  updateUser = (userInputs) => {
    const { email, password, userName, id } = userInputs;
    return `UPDATE tbl_user SET email='${email}', userName='${userName}', password='${password}' WHERE id=${id};`;
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
      businessType,
    } = userInputs;
    const handleUndefined = (value) =>
      value === undefined ? null : `'${value}'`;

    return `INSERT INTO tblcompany(userId,companyName,gstNumber,email,phoneNumber,address,city,state,country,postalCode,ownerName,ownerEmail,businessType,createDate,UpdateDate) VALUES (${handleUndefined(
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
    )}, '${formattedDate}',' ${formattedDate}');`;
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
    return `select * from tblcompany Where userId= ${id.uid}`;
  };
  featchCompanyid = (id) => {
    return `select * from tblcompany Where id= ${id}`;
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
    return `select * from accounting.party where partyName = '${partyName}' and Companyid= ${id}`;
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

    return `INSERT INTO accounting.party(partyName, address, phoneNumber, statecode, pan, gstNumber,  deliveryAddress, creditLimit, openingBalance, CompanyId, accountGroup, city, postalCode, distance, transporterName, BrokerName, natureOfOrg, email, remarks, tds, paymentTerms, partyGroup, discount, brokerage, rf, TCSRate) VALUES (${replaceUndefinedWithNull(
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
    const {
      ID,
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
    // console.log(userInputs);
    return `UPDATE accounting.party SET partyName = '${partyName}', address = '${address}', phoneNumber = '${phoneNumber}', statecode = '${statecode}', pan = '${pan}', gstNumber = '${gstNumber}',  deliveryAddress = '${deliveryAddress}', creditLimit = '${creditLimit}', openingBalance = '${openingBalance}', accountGroup = '${accountGroup}', city = '${city}', postalCode = '${postalCode}', distance = '${distance}', transporterName = '${transporterName}', brokerage = '${brokerage}', natureOfOrg = '${natureOfOrg}', email = '${email}', remarks = '${remarks}', tds = '${tds}', paymentTerms = '${paymentTerms}', partyGroup = '${partyGroup}', discount = '${discount}', brokerage = '${brokerage}', rf = '${rf}', TCSRate = '${TCSRate}' WHERE ID = ${ID};`;
    // return `UPDATE accounting.party SET PartyName = '${PartyName}', Address = '${Address}', MobileNo = '${MobileNo}', StateCode = '${StateCode}', PAN = '${PAN}', CompanyId='${CompanyId}', GSTIN = '${GSTIN}',  DeliveryAddress = '${DeliveryAddress}', CreditLimit = '${CreditLimit}', OpeningBalance = '${OpeningBalance}', accountGroup = '${accountGroup}', City = '${City}', Pincode = '${Pincode}', Distance = '${Distance}', transporterName = '${transporterName}', BrokerName = '${BrokerName}', natureOfOrg = '${natureOfOrg}', EmailId = '${EmailId}', Remarks = '${Remarks}', TDS = '${TDS}', paymentterms = '${paymentterms}', partyGroup = '${partyGroup}', discount = '${discount}', brokerage = '${brokerage}', rf = '${rf}', TCSRate = '${TCSRate}' WHERE ID = ${ID};`;
  }

  deleteParty = (id) => {
    return `DELETE FROM accounting.party WHERE id = ${id.id};`;
  };
  selectParty = (id) => {
    return `SELECT * FROM accounting.party WHERE CompanyId = ${id};`;
    // return `select * from accounting.party`;/
  };

  selectCompany = (id) => {
    let query = `SELECT * FROM tblcompany where userId= ${id.id}`;

    return query;
  };
  selectFinancialYear = (userInputs) => {
    return `select year FROM accounting.financialyear WHERE companyId = ${userInputs}`;
  };

  insertFinancialYaer = (userInputs) => {
    console.log(userInputs);
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

    return `INSERT INTO accounting.financialyear(companyId,year)VALUES(${insertId},'${year}');    `;
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
    return `UPDATE accounting.financialyear SET companyId = ${companyId}, fromDate = ${fromDate}, toDate = ${toDate}, currentYear = ${currentYear}, status = ${status}, openingStock = ${openingStock}, closingStock = ${closingStock}, capital = ${capital} WHERE id = ${id};
    `;
  };
  deleteFinancialYear = (userDate) => {
    return `DELETE FROM accounting.financialyear WHERE id = ${userDate.id};`;
  };
  selectFinancialMaster = () => {
    return `SELECT * FROM transactionMaster`;
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

    return `INSERT INTO accounting.transactionMaster
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

    return query;
  };

  insertItemMaster = (userdata) => {
    const currentdate = moment();
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");
    const { name, unit, hsn, gst, userId } = userdata;
    // console.log(userdata);
    return `INSERT INTO accounting.itemmaster(name,unit,HSN,GST,CompanyId,createDate,updateDate,LastModifidedBy)VALUES('${name}','${unit}','${hsn}','${gst}',${userId},'${formattedDate}','${formattedDate}',${userId});`;
  };
  UpdateItemMaster = (userInputs) => {
    const currentdate = moment();
    const formattedDate = currentdate.format("YYYY-MM-DD HH:mm:ss");
    const { id, name, unit, HSN, GST, userId } = userInputs;

    return `UPDATE accounting.itemmaster
   SET
       name = '${name}',
       unit = '${unit}',
       HSN =' ${HSN}',
       GST = '${GST}',
      
       updateDate =' ${formattedDate}',
       LastModifidedBy = '${userId}'
   WHERE
       id= ${id}`;
  };
  deleteitemMaster = (userdata) => {
    return `DELETE FROM accounting.itemmaster where id =${userdata.id}`;
  };
  itmexistquery = (userdata) => {
    let query = `SELECT * FROM accounting.itemmaster WHERE CompanyId = ${userdata.userId} AND name='${userdata.name}'`;

    return query;
  };
  seletItemMaster = (userdata) => {
    let query = `SELECT id,name,unit,HSN,GST FROM accounting.itemmaster  where CompanyId = ${userdata}`;

    return query;
  };
  report = (id) => {
    return `SELECT sum(amount) as Amount,AccountTo,AccountFrom ,transectionType FROM accounting.transactionMaster where CompanyId=${id} group by transectionType , AccountTo,AccountFrom;`;
  };

  selectaccountGroupMaster = () => {
    return `SELECT * FROM accounting.accountgroupmaster;`;
  };
  inserbillLog = (userdata) => {
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
      kassar,
      deliveryAdress,
    } = userdata;

    return `INSERT INTO accounting.Billlog (
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
      kassar,
      deliveryAdress,
      createDate,
      updateDate
  ) VALUES (
      '${CompanyId}',
      '${invoiceNo}',
      '${invoiceDate}',
      '${dueDate}',
      '${bPartyName}',
      '${bPartyAdress}',
      '${bStateCode}',
      '${gstNo}',
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
      '${payAmount}',
      '${panding}',
      '${kassar}',
      '${deliveryAdress}',
      '${formattedDate}',
      '${formattedDate}'
  );
  `;
  };
  getbilling = (userdata) => {
    return `select * from Billlog where ComapnyId =${userdata}  `;
  };
}

module.exports = Querys;
