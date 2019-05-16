const database = require('../config/database');
const common = require('./common');
const tableName = "department";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    }
}