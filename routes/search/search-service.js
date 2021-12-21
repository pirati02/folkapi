const SearchResult = require('../../entity/search.result')

class SearchService {
    constructor(appDao) {
        this.dao = appDao;
    }

    searchEnsembles(term) {
        return this.dao
            .all(`SELECT * FROM "Ensembles" WHERE "Name" like $1`, ['%' + term + '%'])
            .then(({rows}) => {
                return rows.map(item => new SearchResult(item.Id, item.Name, "ensemble", null))
            }).catch(console.log)
    }

    searchSong(term) {
        return this.dao
            .all(`SELECT * FROM "Songs" WHERE "Title" like $1`, ['%' + term + '%'])
            .then(({rows}) => {
                return rows.map(item => new SearchResult(item.Id, item.Title, "song", item.EnsembleId))
            }).catch(console.log)
    }
}

module.exports = SearchService;
