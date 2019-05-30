const common = require('./common');
const tableName = "student_track";

module.exports = {
  getStudentTrackInfo(studentID, trackID) {
    return common.findToOption(tableName, 'studentID=? and trackID=?', studentID, trackID);
  },

  getTrackAvg(trackID) {
    return common.columnSelect(tableName, 'avg(track_score)', 'where trackID=?', trackID);
  }
}