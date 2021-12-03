import React from 'react';
import ReactPlayer from 'react-player';
import Animation from "./Animation";
var axios = require('axios');
var server = "http://localhost:5000"
var currentSeek = 0;

class Player extends React.Component {
  state = {toggle: false}
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }  

  componentDidMount(){
    setTimeout(() => {
      this.setState({toggle: !this.state.toggle});
    }, 3000);    
    setInterval(() => {      
      axios.get(server + "/currentSeek").then((response) => {
        if(this.currentSeek !== response.data.currentSeek){          
          this.currentSeek = response.data.currentSeek;
          this.myRef.current.seekTo(this.currentSeek , 'seconds');
        }
      })
    },500)    
  }
  render() {
    var playerStyle = {
      position: "absolute",
      top: "0",
      left: "0"
    };
    return <div>
      <div style={{display: this.state.toggle ? "none" : "block"}}>
        <Animation />        
      </div>      
      <div style={{display: this.state.toggle ? "block" : "none"}}>
        <ReactPlayer 
          style={playerStyle}
          ref={this.myRef} 
          width={"100%"} 
          height={"100%"}        
          controls={true}
          url="https://drive.google.com/u/0/uc?id=10M9lrWWvY5ilMXiyq2BhyYiTgkJOdFH2&export=download#.mp4"
          onSeek={(seconds) => {
            seconds = parseInt(seconds)          
            axios.get(`${server}/seekTo?seekTo=${seconds}`);        
          }}        
          />
        </div>
    </div>
  }

}
export default Player;