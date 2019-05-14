const database = require('../config/database');
const tableName = "stu_spec";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    }
}