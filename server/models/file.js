const database = require('../config/database');
const common = require('./common');
const tableName = "file";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    },

    upload(request) {
        let userData = request.body;
        let now = new Date();
        let dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        let fileData = {
            "path": request.file.uploadedFile.uploadName,
            "date" : dateStr
        }
        return common.insert(tableName, fileData);
    }
}