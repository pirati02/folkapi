const SearchResult = require('../../entity/search.result')
const Ensemble = require("../../entity/ensemble");
const Song = require("../../entity/song");

class SearchService {
    constructor(appDao) {
        this.dao = appDao;
    }

    searchEnsembles(term) {
        return this.dao
            .all(`SELECT * FROM "Ensembles" WHERE "Name" like $1`, ['%' + term + '%'])
            .then(({rows}) => {
                return rows.map(item => new Ensemble(item.Id, item.Name, item.ArtistType))
            }).catch(console.log)
    }

    searchSong(term) {
        return this.dao
            .all(`SELECT songs.*, ensembles."Name" as "EnsembleName"  FROM "Songs" songs  
                   JOIN "Ensembles" ensembles ON songs."EnsembleId" = ensembles."Id"
                WHERE songs."Title" like $1`, ['%' + term + '%'])
            .then(({rows}) => {
                return rows.map(item => new Song(item.Id, item.Title, item.SongType, item.EnsembleId, item.Path, item.EnsembleName))
            }).catch(console.log)
    }
}

module.exports = SearchService;
