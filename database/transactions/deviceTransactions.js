const { FadabHelper } = require("fadab-mysql-helper");

class DeviceTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblDevice";
  }
}

module.exports = DeviceTransactions;
