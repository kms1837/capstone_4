const common = require('./common');
const tableName = "score";

module.exports = {
  findToID(id) {
    return common.findToID(tableName, id);
  },

  studentTrackScore(studentID, trackID) {
    return common.select(tableName, 'JOIN subject ON subjectID=subject.id where studentID=? and trackID=?', studentID, trackID);
  }
}