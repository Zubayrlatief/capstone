import {createPool} from 'mysql2/promise'
//promise- allows to handle asynchronys
import {config} from 'dotenv'
config()

const pool =createPool({
     host: process.env.HOST,
     user: process.env.USER,
     database: process.env.DATABASE,
     password: process.env.PASSWORD,
     connectionLimit: 90
})
//pool saves connection (iff sending query it saves it)

export default pool