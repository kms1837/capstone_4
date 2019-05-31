const common = require('./common');
const tableName = "track";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    },

    getList() {
        return common.getList(tableName);
    }
}
