const axios = require('axios');

const exportedMethods = {
    async getShows(term){
        const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + term);

        let retArray = [];
        let limit = data.length;
        if(limit > 5){
            limit = 5;
        }
        for(i = 0; i < limit; i++){
            retArray.push(data[i]);
        }
        return retArray;
    },

    async getShowId(id){
        const { data } = await axios.get('http://api.tvmaze.com/shows/' + id);
        return data;
    }
}

module.exports = exportedMethods;

