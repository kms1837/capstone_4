const common = require('./common');
const tableName = "stu_spec";

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    },

    StudentIDtoList(StudentID) {
        return common.select(tableName, 'JOIN file ON fileID=file.id WHERE student_id=?;', [StudentID]);
    },

    getList() {
        return common.select(tableName, 'JOIN user ON student_id=user.studentID;', []);
    },

    insert(request, fileID) {
        let userData = request.body;
        let now = new Date();
        let dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        let insertData = {
            "student_id": request.session.studentID,
            "spec_typeID": userData.type,
            "name": userData.name,
            "regist_agree": false,
            "score": 0,
            "spec_explain": userData.explain,
            "fileID" : fileID,
            "request_date": dateStr,
            "agree_date": dateStr
        }

        return common.insert(tableName, insertData);
    }
}