const database = require('../config/database');
const common = require('./common');

const tableName = 'user';

module.exports = {
    findToStudentID(studentID) {
        return common.findToOption(tableName, "studentID=?", [studentID]);
    }
};