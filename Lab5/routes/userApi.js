const express = require('express');
const router = express.Router();
const data = require('../data');
const apiData = data.api;

router
    .route('/people')
    .get(async (req, res) => {
        try{
            const people = await apiData.getPeople();
            res.json(people);
        } catch (e) {
            res.status(404).json(e);
        }
    });

router
    .route('/work')
    .get(async (req, res) => {
        try{
            const work = await apiData.getWork();
            res.json(work);
        } catch (e) {
            res.status(404).json(e);
        }
    });

router
    .route('/people/:id')
    .get(async (req, res) =>{
        try{
            const person = await apiData.getPersonById(req.params.id);
            res.json(person);
        } catch (e){
            res.status(404).json(e);
        }
    });

router
    .route('/work/:id')
    .get(async (req, res) =>{
        try{
            const work = await apiData.getWorkById(req.params.id);
            res.json(work);
        } catch (e){
            res.status(404).json(e);
        }
    });

module.exports = router;