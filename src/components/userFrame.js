import React, { Component } from 'react'
import UserList from './userList';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';

export class userFrame extends Component {
    render() {
        return (
        <div className={this.props.classes}    >
            <Box display="flex" justifyContent="center">
                <Typography color="secondary" variant="h6">           
                    {this.props.users.length} users
                </Typography>
            </Box>
            <Divider />
            <UserList users={this.props.users}></UserList>
        </div>
        )
    }
}

export default userFrame
