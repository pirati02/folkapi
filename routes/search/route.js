const express = require('express');
const router = express.Router();

const Database = require('../../context/database')
const SearchService = require('./search-service')

const searchService = new SearchService(new Database())
router.get("/term/:term", async (req, res) => {
    const term = req.params.term;
    const ensembles = await searchService.searchEnsembles(term)
    const songs = await searchService.searchSong(term)
    res.send({ensembles, songs});
});


module.exports = router;
