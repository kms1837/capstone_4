const common = require('./common');
const tableName = "graduate";

module.exports = {
  listToGrade(grade) {
    return common.findToOption(tableName, 'final_grade=?', grade);
  }
}