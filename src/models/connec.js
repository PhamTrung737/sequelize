import {Sequelize} from "sequelize"
import connecdb from "../config/connecdb.js";
export const sequelize = new Sequelize(
    connecdb.user,
    connecdb.root,
    connecdb.pass,
    {
        host:connecdb.host,
        port:connecdb.port,
        dialect:connecdb.dialect
    }

);