const common = require('./common');
const tableName = "final_score";

module.exports = {
    findToStudentID(studentID) {
        return common.findToOption(tableName, 'studentID=?' , [studentID]);
    }
}