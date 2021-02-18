import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

import AppBar from '@material-ui/core/AppBar'
import { Button, Toolbar, Tooltip } from '@material-ui/core'
import Mybutton from '../util/Mybutton';

export class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <Mybutton tip="Create a post">
                                <AddIcon color="primary" />
                            </Mybutton>
                            <Link to="/">
                                <Mybutton tip="Home">
                                    <HomeIcon color="primary" />
                                </Mybutton>
                            </Link>
                            <Mybutton tip="Notification">
                                <Notifications color="primary" />
                            </Mybutton>
                        </Fragment>

                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/signup">signup</Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
