const database = require('../config/database');
const tableName = "category_eval";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    }
}