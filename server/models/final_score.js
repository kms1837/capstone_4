const database = require('../config/database');
const tableName = "final_score";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    }
}