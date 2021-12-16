const express = require('express');
const router = express.Router();

const Database = require('./database')
const FolkApiService = require('./folkapi-service')

const folkapiService = new FolkApiService(new Database())
router.get("/ensembles", async (req, res) => {
  const ensembles =  await folkapiService.ensembles();
  res.send(ensembles);
});

router.get("/old-recording", async (req, res) => {
  const ensembles =  await folkapiService.oldRecordings();
  res.send(ensembles);
});

router.get("/songs/:id", async (req, res) => {
  const id = req.params.id;
  const songs =  await folkapiService.songsByEnsembleId(id);
  const chants =  await folkapiService.chantsByEnsembleId(id);
  res.send({songs, chants});
})

router.get("/song/:id", async (req, res) => {
  const id = req.params.id;
  const song = await folkapiService.songById(id);
  if(song == null) res.status(404).send('Not found');
  res.send(song);
})

router.get("/songdata/:id", async (req, res) => {
  const id = req.params.id;
  const song = await folkapiService.songData(id);
  if(song == null) res.status(404).send('Not found');
  const file = Buffer.from(song.Data).toString('base64');
  res.json({
    file:file
  });
})

module.exports = router;
