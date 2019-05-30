const database = require('../config/database');
const common = require('./common');

const tableName = 'user';

module.exports = {
    findToStudentID(studentID) {
        return common.findToOption(tableName, "studentID=?", [studentID]);
    },

    findToID(id) {
        return common.findToID(tableName, id);
    },

    getList() {
        return common.select(tableName, 'limit 100',[]);
    },

    getScoreList() {
        return common.select(tableName, 'JOIN final_score ON user.studentID=final_score.studentID limit 100',[]);
    } // 트랙 JOIN
};
