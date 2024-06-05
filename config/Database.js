import { Sequelize } from "sequelize";

const db = new Sequelize('crud_db', 'root', 'u~1rBp_{U5/:1=M,', {
    host: '104.198.138.95',
    dialect: 'mysql'
});

export default db;