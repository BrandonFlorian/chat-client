import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemAvatar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';

export class user extends Component {
    
    render() {

        return (
            <ListItem key={this.props.user._id}>
                <ListItemAvatar>
                    <Avatar src={this.props.user.avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.props.user.email} />
            </ListItem>
        )
    }
}

export default user
