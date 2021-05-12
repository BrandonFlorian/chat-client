import { Typography, Avatar} from '@material-ui/core'
import React, { Component } from 'react'
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@material-ui/core'
import Flower  from "../assets/Pink_Logo.png";
export class message extends Component {
    render() {

        //this.props.message.user.avatar = Flower; 
        return ( 
            <Card style={{display: 'inline-block'}}>
                <CardContent>
                    <Avatar src={this.props.message.user.avatar} alt={this.props.message.user.email} className="avatar"></Avatar>
                    <Typography>{this.props.message.user.email} says:  </Typography>
                    <Typography>{this.props.message.text}</Typography>
                    <Box display="flex" justifyContent="flex-end">
                        <Typography variant="subtitle2" color="secondary">{moment(this.props.message.createdAt).format('MMM Do, hh:mm:ss')}</Typography>
                    </Box>
                </CardContent>
            </Card> 
        )
    }
}

export default message
