import Model from '../App/Model.js';

class ProductoModel extends Model{
  constructor(schema,con) {
    super(schema,con);
  }

  async getProductos(){
    try {
      const productos = this.getAll();
      return productos;
    } catch (error) {
      throw new Error(error);
    }
  }

  async agregarProducto(data){
    try {
      const insertId = await this.create(data);
      return insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default ProductoModel;