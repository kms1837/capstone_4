const database = require('../config/database');

module.exports = {
    async columnSelect(tableName, column, option, ...items) {
        try {
            const connection = await database.getConnection(async conn=>conn);
            try {
                let sql = `SELECT ${column} FROM ${tableName} ${option}`;
                const [row] = await connection.query(sql, items);
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

    async select(tableName, option, ...items) {
        return this.columnSelect(tableName, '*', option, ...items);
    },

    async findToOption(tableName, option, ...items) {
        return this.select(tableName, `WHERE ${option}`, ...items);
    },

    async findToID(tableName, id) {
        return this.select(tableName, `WHERE id=?`, [id]);
    },

    async getList(tableName) {
        return this.select(tableName, ``, []);
    },

    async insert(tableName, items={}) {
        try {
            const connection = await database.getConnection(async conn=>conn);
            try {
                let sql = `INSERT INTO ${tableName} SET ?`;
                let [row] = await connection.query(sql, items);
                connection.release();

                return row.insertId;
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

    async update(tableName, updateColumn, target, ...items) {
        try {
            const connection = await database.getConnection(async conn=>conn);
            try {
                let sql = `UPDATE ${tableName} SET ${updateColumn} WHERE ${target}`;
                const [row] = await connection.query(sql, items);
                connection.release();
                return row[0];
            }
            catch(err) {
                await connection.rollback();
                connection.release();
                console.log('Query Error!', err);
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