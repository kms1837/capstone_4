const database = require('../config/database');
const tableName = "major_univ";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    }
}