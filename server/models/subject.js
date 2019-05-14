const database = require('../config/database');
const tableName = "subject";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    }
} 