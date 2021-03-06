import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    clearToken() {
        localStorage.clear();
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{ margin: '0 10px'  }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href="/api/logout" onClick={this.clearToken} >Logout</a></li>
                ];
        }
    }

    render() {
        return (
            <div className="navbar-fixed scrollspy">
                <nav>
                    <div className="nav-wrapper darken-1" style={{ marginLeft: "20px" }}>
                        <Link
                            to={this.props.auth ? '/surveys' : '/'}
                            className="left brand-logo"
                        >
                            Emaily
                        </Link>
                        <ul className="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);