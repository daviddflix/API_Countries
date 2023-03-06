//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios').default;
const { Actividad_Turistica, Country, Actividad } = require('./src/db');
const port = process.env.PORT;


const dataInfo = async () => {
  try {
    const info = await axios.get('https://restcountries.com/v3/all')
  
  
  const data = await info.data.map(el => {
   
    
           return { 
           name: el.name.common,
           cca3: el.cca3,   
           capital: el.capital ? el.capital[0] : ' Capital Not found',
           region:  el.region,
           subregion : el.subregion ? el.subregion : 'Subregion not found',
           area: el.area,
           population: el.population,
           continente: el.continents.toString(),
           flags: el.flags[1],
       }
   })
  
return data 
  } catch (error) {
    console.log(error)
  }
  
}

(async () => {
  await conn.sync({ force: true });
 

     const info = await dataInfo() //info de la api
 
    try {
        const data = await Country.findAll();// data de la tabla
        if(!data.length){
            await  Country.bulkCreate(info) // llena la Db
          }
    } catch (error) {
        console.log(error)
    }

    server.listen(port, () => {
    console.log(`listening on port ${port}`); // eslint-disable-line no-console
  });
})();

// // Syncing all the models at once.
// conn.sync({ force: true }).then(() => {

  
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });

