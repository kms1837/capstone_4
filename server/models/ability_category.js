const common = require('./common');
const tableName = "ability_category";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    },

    getList() {
        return common.getList(tableName);
    }
}