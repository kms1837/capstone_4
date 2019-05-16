const database = require('../config/database');
const tableName = "score";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    }
}