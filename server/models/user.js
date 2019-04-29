const database = require('../config/database');

module.exports = async function(studentID) {
    try {
        const connection = await database.getConnection(async conn=>conn);
        try {
            let sql = 'SELECT * FROM user WHERE studentID=?';
            const [row] = await connection.query(sql, [studentID]);
            connection.release();
            return row[0];
        }
        catch(err) {
            await connection.rollback();
            connection.release();
            console.log('Query Error!');
            return false;
        } 
    }
    catch(err) {
        console.log('DB ERROR!');
        return false;
    }
};