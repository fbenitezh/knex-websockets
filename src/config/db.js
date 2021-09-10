import dotenv from 'dotenv';
dotenv.config();

export const options = {
  mariadb:{
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    }
  },
  sqlite:{
    client:'sqlite3',
    connection:{
      filename:'./src/db/ecommerce.sqlite'
    },
    useNullAsDefault:true
  }
};