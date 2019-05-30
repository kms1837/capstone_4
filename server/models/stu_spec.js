const common = require('./common');
const tableName = "stu_spec";

module.exports = {
    findToID(id) {
      return common.select(tableName, `JOIN file ON fileID=file.id WHERE ${tableName}.id=?`, id);
    },

    StudentIDtoList(StudentID) {
      return common.select(tableName, 'JOIN file ON fileID=file.id WHERE student_id=?;', StudentID);
    },

    getList() {
      return common.columnSelect(tableName, `*, ${tableName}.id as specID`, 'JOIN user ON student_id=user.studentID', []);
    },

    acceptWaitingList() {
      return common.columnSelect(
        tableName, 
        `*, ${tableName}.id as specID`, 
        'JOIN file ON fileID=file.id JOIN user ON student_id=user.studentID WHERE agree_date is null', 
        []);
    },

    agree(specID) {
      let now = new Date();
      let dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      return common.update(tableName, 'regist_agree=?, agree_date=?', 'id=?', true, dateStr, specID);
    },

    reject(specID) {
      let now = new Date();
      let dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      return common.update(tableName, 'regist_agree=?, agree_date=?', 'id=?',  false, dateStr, specID);
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
        "request_date": dateStr
      }

      return common.insert(tableName, insertData);
    }
}