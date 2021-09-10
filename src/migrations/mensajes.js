import knex from "knex";
import { options } from "../config/db.js";
const table = "mensajes";
const db = knex(options.sqlite);

const crearTabla = async (tabla) => {
  try {
    let existeTabla = await db.schema.hasTable(tabla);
    if (existeTabla) {
      await db.schema.dropTable(tabla);
    }
    await db.schema.createTable(tabla, (table) => {
      table.increments("id").primary();
      table.string("email", 100).notNullable();
      table.string("message", 500).notNullable();
      table.timestamp("date");
    });
    return {
      table: tabla,
    };
  } catch (error) {
    console.log(error);
  } finally {
    db.destroy();
  }
};

crearTabla(table)
  .then((res) => console.log(`Tabla ${res.table} creada.`))
  .catch((error) => console.log(error));
