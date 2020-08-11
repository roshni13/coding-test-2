const express = require('express');
const Joi = require('@hapi/joi');
const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

//retrieving pet details
router.get('/',async (req,res,next) =>{
  try{
    const pets = await Pet.find();
    res.json(pets);
  }
  catch(err){
    res.send("error");
    next(err);
  }    
})

//retrieving pet details of given id
router.get('/:id',async (req,res,next) =>{
  try{
    const pets = await Pet.findById(req.params.id);
    res.json(pets);
  }
  catch(err){
    res.send("error");
    next(err);
  }    
})

//sending data
router.post('/',
  validateBody(Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
    colour: Joi.string().required()
  })),
  async (req, res, next) =>{
    const pet = new Pet({
      name:req.body.name,
      age:req.body.age,
      colour:req.body.colour
  });
  
  try{
    await pet.save();
    res.status(201).json(pet);
  } 
  catch(err){
      res.send("error")
      next(err);
  }
})

//deleting pets
router.delete('/:id',async (req,res,next) =>{
  try{
    const n= await Pet.deleteOne({_id:req.params.id});
    res.send("deleted successfully");  
  }
  catch(err){
    res.send("error");
    next(err);
  }    
})


module.exports = router;

validateBody(Joi.object().keys({
    name: Joi.string().required(),
  	age: Joi.number().required(),
  	colour: Joi.string().required()
  }))