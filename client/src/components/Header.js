import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent = () => {
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">
                            Log in With Google
                        </a>
                    </li>
                )
            default:
                return [
                  <li key="1"><Payments /></li>,
                  <li key="3" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                  <li key="2">
                    <a href="/api/logout">LOG OUT</a>
                  </li>
                ]
        }
    }
    render() {
        return (
          <nav>
            <div className="nav-wrapper">
              <Link to={this.props.auth ? '/survey' : '/'} className="left brand-logo">
                Emaily
              </Link>
              <ul className="right hide-on-med-and-down">
                    {this.renderContent()}
              </ul>
            </div>
          </nav>
        );
    }
}
function mapStateToProps(state){
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, null )(Header);