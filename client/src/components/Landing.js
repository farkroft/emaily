import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

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
    // componentWillMount(){
    //     if(this.getToken()){
    //         this.props.history.push('surveys')
    //     }
    // }

    // getToken = () => {
    //     return localStorage.getItem('googleId');
    // }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>
                    Emaily !
                </h1>
                Collect feedback from your users
            </div>
        )
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);