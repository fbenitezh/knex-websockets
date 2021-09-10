import knex from "knex";
import {options} from "../config/db.js";
const table = "productos";
const db = knex(options.mariadb);

const crearTabla = async (tabla) => {
  try {
    let existeTabla = await db.schema.hasTable(tabla);
    if (existeTabla) {
      await db.schema.dropTable(tabla);
    }
    await db.schema.createTable(tabla, (table) => {
      table.increments("id").primary();
      table.string("name", 100);
      table.integer("price", 4);
      table.string("thumbnail", 500);
    });
    return {
      db: options.mariadb.connection.database,
      table: tabla,
    };
  } catch (error) {
    console.log(error);
  } finally {
    db.destroy();
  }
};

crearTabla(table)
  .then((res) => console.log(`Tabla ${res.table} creada en db: ${res.db}.`))
  .catch((error) => console.log(error));
