import React from 'react';
import ReactPlayer from 'react-player';
import Animation from "./Animation";
import util from '../util/util';
import constants from '../util/constants';
var axios = require('axios');

class Player extends React.Component {
  state = {toggle: false, videoUrl: "", showPlayer: false};

  constructor(props) {
    super(props);    
    this.myRef = React.createRef();
  }

  componentDidMount(){
    this.setState({videoUrl : util.getVideoEndpoint("Red Notice.mkv")});
    setTimeout(() => {
      const videoUrl = prompt("Enter video url : ");
      this.setState({videoUrl: videoUrl});
      this.setState({toggle: !this.state.toggle})
    }, 3000);
    
    setInterval(() => {      
        console.log("vrushank");
        util.checkSeekInSync((currentSeek) => {
          console.log(currentSeek);
          // if(this.state.showPlayer === true){
            this.myRef.current.seekTo(currentSeek , 'seconds');
          // }
        });              
    }, 500);    
  }
  render() {    
    return <div>      
      <div style={{display: this.state.toggle ? "none" : "block"}}>
        <Animation />        
      </div>
      <div style={{display: this.state.toggle ? "block" : "none"}}>
        <ReactPlayer 
          style={{
            position: "absolute",
            top: "0",
            left: "0",            
          }}
          ref={this.myRef} 
          width={"100%"} 
          height={"100%"}        
          controls={true}
          url={this.state.videoUrl}
          onSeek={(seconds) => {
            seconds = parseInt(seconds)
            var config = {method: 'put',url: constants.firebaseUri,              
              data : JSON.stringify({"seekedValue": seconds})
            };
            
            axios(config);
          }}        
          />
        </div> 
    </div>;
  }

}
export default Player;