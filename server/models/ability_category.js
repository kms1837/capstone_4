const database = require('../config/database');
const tableName = "ability_category";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    }
}