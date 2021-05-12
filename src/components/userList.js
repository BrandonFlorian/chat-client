import React, { Component } from 'react'
import List from '@material-ui/core/List';
import User from './user';

export class userList extends Component {
    render() {
        return (
            <List>
                {this.props.users.map((user) => (    
                    <User key={user._id} user={user}></User> 
                ))}
            </List>
        )
    }
}

export default userList
