const { Router } = require('express');
const { Activities, Country, actividad } = require('../db');
const { Op } = require('sequelize');
// const Activiadad = require('../models/Activiadad');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);





router.get('/countries', async (req, res) => {
    const {name} = req.query
    let found = await Country.findAll({where: {name: {[Op.iLike]: '%' + name + '%'}}})  
                                              
    if(name){
      try {
        if(found.length){
            return res.send(found)
        } else {
          res.status(404).json({message: 'Country not found'})
        }
      } catch (error) {
          console.log(error)
      }
    } else{
        try {
            let Total = await Country.findAll({include: Activities})
          res.json(Total)
        } catch (error) {
            console.log(error)
        }
        
    }
   
})

router.get('/error', (req, res) => {
    res.status(404).send("<h1>country not found</h1>")
})

router.get('/countries/:idPais', async (req, res) => {

   const {idPais} = req.params
   try {
    const found = await Country.findByPk(idPais, {include: Activities})
    found? res.json(found) : res.sendStatus(404)

   } catch (error) {
       console.log(error)
   }
  
})

router.post('/activity', async (req, res) => {
    const {nombre, dificultad, duracion, temporada, name} = req.body
try {
   
        const activity = await Activities.create({
            nombre: nombre,
            dificultad: dificultad,
            duracion: duracion,
            temporada: temporada
          })

          const countries = await Country.findAll({where:{name: name }})
          
         await  activity.addCountry(countries)
          res.send('Actividad Creada')
         
    
    
    
} catch (error) {
    console.log(error)
}

})

router.get('/activities',  async (req, res) => {
   let data = await  Activities.findAll({
    attributes: ['nombre']
  })
   res.send(data)
})




module.exports = router
