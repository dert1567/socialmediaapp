
import React, { Component, Fragment } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../Redux/actions/dataActions'
import Mybutton from '../util/Mybutton';

import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { deleteScream } from '../Redux/actions/dataActions'
import { Button, Dialog, DialogTitle } from '@material-ui/core';


const styles = theme => ({
    deleteButton: {
        positin: 'absolute',
        left: '80%',
        tpo: '10%'
    }
})


class DeleteScream extends Component {

    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false });
    };





    render() {

        const { classes } = this.props

        return (
            <Fragment>
                <Mybutton
                    tip="Delete Scream"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </Mybutton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this scream ?
              </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Delete
                </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(
    null,
    { deleteScream }
)(withStyles(styles)(DeleteScream));
