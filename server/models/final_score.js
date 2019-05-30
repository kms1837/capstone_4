const common = require('./common');
const tableName = "final_score";

module.exports = {
  findToStudentID(studentID) {
    return common.findToOption(tableName, 'studentID=?' , [studentID]);
  },

  setProfessorOpinion(studentID, opinion) {
    return common.update(tableName, 'professor=?', 'studentID=?', opinion, studentID);
    //UPDATE sw.final_score SET professor="daasdasdasd" WHERE studentID="s100";
  },

  getProfessorOpinion(studentID) {
    return common.columnSelect(tableName, 'professor', 'WHERE studentID=?', studentID);
  }
}