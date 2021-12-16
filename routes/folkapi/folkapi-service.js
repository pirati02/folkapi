var Ensemble = require('./ensemble');
var Song = require('./song')

class FolkApiService {

    constructor(appDao) {
        this.dao = appDao;
    }

    ensembles() {
        return this.dao
            .all(`SELECT * FROM "Ensembles" WHERE "ArtistType" = $1`, [1])
            .then(({rows}) => {
                return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType))
            }).catch(console.log)
    }

    oldRecordings() {
        return this.dao
            .all(`SELECT * FROM "Ensembles" WHERE "ArtistType" = $1`, [2])
            .then(({rows}) => {
                console.log({rows})
                return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType))
            }).catch(console.log)
    }

    songsByEnsembleId(artistId) {
        return this.dao
            .all(`SELECT * FROM "Songs" WHERE "EnsembleId" = $1 and "SongType" = $2`, [artistId, 0])
            .then(({rows}) => {
                return rows.map(item => new Song(item.Id, item.Title, item.SongType, item.EnsembleId))
            }).catch(console.log)
    }

    chantsByEnsembleId(artistId) {
        return this.dao
            .all(`SELECT * FROM "Songs" WHERE "EnsembleId" = $1 and "SongType" = $2`, [artistId, 1])
            .then(({rows}) => {
                return rows.map(item => new Song(item.Id, item.Title, item.SongType, item.EnsembleId))
            }).catch(console.log)
    }

    songById(id) {
        return this.dao
            .get(`SELECT * FROM "Songs" WHERE "Id" = $1`, [id])
            .then(({rows}) => { 
                const item = rows[0]
                return new Song(item.Id, item.Title, item.SongType, item.EnsembleId, item.Path)
            })
            .catch(console.log)
    }
}

module.exports = FolkApiService;
