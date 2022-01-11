import constants from './constants';
var axios = require('axios');
var currentSeek = 0;
const util = {
    getVideoEndpoint: (movieName) => {        
        return constants.localServer + "/video/" + movieName;
    },
    checkSeekInSync: (seekTo) => {
        axios.get(constants.firebaseUri).then((response) => {
            if(currentSeek !== response.data.seekedValue){
                console.log("here");
                currentSeek = response.data.seekedValue;
                seekTo(currentSeek);
            }
        });        
    }
}
export default util