const common = require('./common');
const tableName = "category_eval";

module.exports = {
    findToStudentID(StudentID) {
        return common.select(tableName, 'JOIN ability_category ON category_id=ability_category.id WHERE student_id=?;', [StudentID]);
        /* SELECT * FROM category_eval 
            JOIN ability_category ON category_id=ability_category.id 
            WHERE student_id=1; */
    }
}