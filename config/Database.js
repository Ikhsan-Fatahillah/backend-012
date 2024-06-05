import { Sequelize } from "sequelize";

const db = new Sequelize('crud_db', 'root', '', {
    host: '104.198.138.95',
    dialect: 'mysql'
});

export default db;