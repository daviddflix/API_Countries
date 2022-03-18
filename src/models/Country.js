const { DataTypes, Model, STRING} = require('sequelize');


// class country extends Model {}

// country.init({
//       ID: {type: DataTypes.UUID, unique: true, primaryKey: true, allowNull: false},
//       Nombre: {type: DataTypes.STRING, allowNull: false},
//       Imagen_de_la_bandera: {type: DataTypes.STRING, unique: true, allowNull: false},
//       Contiente: {type: STRING, allowNull: false},
//       Capital: { type: STRING, allowNull: false},
//       Subregión: { type: DataTypes.STRING},
//       Área: {type: DataTypes.INTEGER},
//       Población: {type: DataTypes.INTEGER},
//     },{ sequelize, modelName: 'country'})

module.exports = (sequelize) => {

  sequelize.define('country', {
    cca3: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    flags: {type: DataTypes.STRING, unique: true, allowNull: false},
    continente: {type: STRING, allowNull: false},
    capital: { type: STRING},
    subregion: { type: DataTypes.STRING},
    area: {type: DataTypes.FLOAT},
    population: {type: DataTypes.FLOAT},
  },{timestamps: false });


};



