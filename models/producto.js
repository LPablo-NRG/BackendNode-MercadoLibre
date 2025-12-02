'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producto extends Model {
    static associate(models) {
      // 1. Relación con Categorías (Original) - OJO: aquí NO va 'idcarrito'
      producto.belongsToMany(models.categoria, { 
          as: 'categorias', 
          through: 'categoriaproducto', 
          foreignKey: 'productoid' 
      });

      // 2. Relación con Archivo (Original)
      producto.belongsTo(models.archivo);

      // 3. NUEVA Relación con Carrito (Esta es la que faltaba)
      producto.belongsToMany(models.carrito, {
        through: 'productocarrito',
        foreignKey: 'idproducto', // La llave de este modelo en la tabla intermedia
        otherKey: 'idcarrito'     // La llave del otro modelo
      });
    }
  }
  producto.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      defaultValue: "Sin titulo"
    },
    descripcion: {
      type: DataTypes.TEXT,
      defaultValue: "Sin descripcion"
    },
    precio: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    archivoid: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'producto',
  });
  return producto;
};