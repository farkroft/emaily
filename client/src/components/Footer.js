import React, { Component } from 'react';

class Footer extends Component {
    yearNow() {
        return new Date().getFullYear();
    }

    render() {
        return (
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Developed By</h5>
                            <p className="grey-text text-lighten-4">Fajar Agung Rizki</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="https://github.com/farkroft" target="_blank" rel="noopener noreferrer">Github</a></li>
                                <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/fajarar" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        <p className="grey-text text-lighten-4 center">© {this.yearNow()} Copyright Text</p>
                    </div>
                </div>
          </footer>
        );
    }
};

export default Footer;