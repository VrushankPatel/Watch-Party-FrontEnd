import React from 'react';
import "../static/animation.css";

class Animation extends React.Component {
    render() { 
        return <div>
            <div className='txt' contentEditable="false">
                <span style={{
                            fontFamily: "Verdana",
                            letterSpacing: "13px"                            
                        }}>VRUSHAVANI</span>
            </div>
        </div>
    }
}
 
export default Animation;