import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';

// const Landing = () => {
//     return (
//         <div style={{ textAlign: 'center' }}>
//             <h1>
//                 Emaily!
//             </h1>
//             Collect feedback from your users
//         </div>
//     );
// };

// export default Landing;

class Landing extends Component {
    componentWillMount(){
        if(this.getToken()){
            this.props.history.push('/surveys')
        }
    }

    getToken = () => {
        if (localStorage.getItem('googleId') !== null || localStorage.getItem('googleId') !== undefined) {
            return localStorage.getItem('googleId');
        }
    }

    render() {
        const mailPic = "http://cdn.strategyonline.ca/wp/wp-content/uploads/2015/12/shutterstock_253684528.jpg?85d2f3"

        return (
            <div className="fullscreen" style={{ width: "100%", height: "100%" }} >
                <div className="iniA" style={{ padding: "0px 20px" }}>
                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={mailPic} alt=""></img>
                </div>
                {/* <h1>
                    Emaily !
                </h1>
                Collect feedback from your users */}
            </div>
        )
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);