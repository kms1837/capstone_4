const database = require('../config/database');

module.exports = {
    async findToOption(tableName, option, ...items) {
        try {
            const connection = await database.getConnection(async conn=>conn);
            try {
                let sql = `SELECT * FROM ${tableName} WHERE ${option}`;
                const [row] = await connection.query(sql, items);
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
    },

    async findToID(tableName, id) {
        try {
            const connection = await database.getConnection(async conn=>conn);
            try {
                let sql = `SELECT * FROM ${tableName} WHERE id=?`;
                const [row] = await connection.query(sql, [id]);
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
    },

    async getList(tableName) {
        try {
            const connection = await database.getConnection(async conn=>conn);
            try {
                let sql = `SELECT * FROM ${tableName}`;
                const [row] = await connection.query(sql);
                connection.release();
                return row;
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
    },

    async delete(tableName, option, ...items) {
        try {
            const connection = await database.getConnection(async conn=>conn);
            try {
                let sql = `DELETE FROM ${tableName} WHERE ${option}`;
                const [row] = await connection.query(sql, items);
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
    }
}