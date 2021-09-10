import Model from '../App/Model.js';

export default class MensajeModel extends Model{
  constructor(schema,con) {
    super(schema,con);
  }

  async getMensajes(){
    try {
      const mensajes = this.getAll();
      return mensajes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async cargarMensaje(data){
    try {
      const insertId = await this.create(data);
      return insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

}