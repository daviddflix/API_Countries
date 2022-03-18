const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 
  sequelize.define('activities', {
    nombre: {type: DataTypes.STRING},
    dificultad: {type: DataTypes.ENUM("1", "2", "3", "4", "5")},
    duracion: {type: DataTypes.INTEGER},
    temporada: {type: DataTypes.ENUM("Verano", "Otoño", "Invierno","Primavera")}
  }, {timestamps: false })
};
