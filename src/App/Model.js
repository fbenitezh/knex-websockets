import knex from "knex";

class Model {
  constructor(schema,connection) {
    this.schema = schema;
    this.db = knex(connection);
  }

  async getAll() {
    try {
      const data = await this.db
        .from(this.schema)
        .select("*")
        .orderBy("id", "asc");
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data) {
    try {
      await this.db(this.schema).insert(data);
      const lastInsertId = await this.db
        .from(this.schema)
        .select("id")
        .orderBy("id", "desc")
        .limit(1);
      return lastInsertId;
    } catch (error) {
      throw new Error(error);
    } 
  }
}

export default Model;
