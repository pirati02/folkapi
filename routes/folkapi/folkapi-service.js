const Ensemble = require('../../entity/ensemble');
const Song = require('../../entity/song');

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
                return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType))
            }).catch(console.log)
    }

    ensemble(id) {
        return this.dao
            .all(`SELECT * FROM "Ensembles" WHERE "Id" = $1`, [id])
            .then(({rows}) => {
                return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType))
            }).catch(console.log)
    }

    songsByEnsembleId(artistId) {
        return this.dao
            .all(`SELECT * FROM "Songs" WHERE "EnsembleId" = $1 and "SongType" = $2`, [artistId, 0])
            .then(({rows}) => {
                console.log(rows)
                return rows.filter(item => item.IsDeleted === "0").map(item => new Song(item.Id, item.Title, item.SongType, item.EnsembleId, item.Path))
            }).catch(console.log)
    }

    chantsByEnsembleId(artistId) {
        return this.dao
            .all(`SELECT * FROM "Songs" WHERE "EnsembleId" = $1 and "SongType" = $2`, [artistId, 1])
            .then(({rows}) => {
                console.log(rows)
                return rows.filter(item => item.IsDeleted === "0").map(item => new Song(item.Id, item.Title, item.SongType, item.EnsembleId, item.Path))
            }).catch(console.log)
    }
}

module.exports = FolkApiService;
