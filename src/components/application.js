import React, { Component } from 'react';
import Login from './login';
import client from './client';
import ResponsiveDrawer from './responsiveDrawer';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core'

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
        login: null, 
        messages: [], 
        users: [],
        signup: false};
  }

  componentDidMount() {
    const messages = client.service('messages');
    const users = client.service('users');

    // Try to authenticate
    client.authenticate().catch(() => this.setState({ login: null }));

    // On successful login
    client.on('authenticated', login => {
      // Get all users and messages
      Promise.all([
        messages.find({
          query: {
            $sort: { createdAt: -1 },
            $limit: 25
          }
        }),
        users.find()
      ]).then( ([ messageData, userData ]) => {
        // messages in reversed order
        const orderedMessages = messageData.data.reverse();
        const allUsers = userData.data;

        this.setState({ login, messages: orderedMessages, users: allUsers });
      });
    });

    // On logout reset set state to null
    client.on('logout', () => this.setState({
      login: null,
      messages: null,
      users: null
    }));

    // Add new messages to the message state
    messages.on('created', message => this.setState({
      messages: this.state.messages.concat(message)
    }));

    // Add new users to the user state
    users.on('created', user => this.setState({
      users: this.state.users.concat(user)
    }));
  }
 
  render() {
      
    if(this.state.login === undefined) {
        console.log(this.state.login);
      return (
            <Box display="flex" justifyContent="center">
                <Typography variant="h1">Loading...</Typography>
            </Box>
      );
    } else if(this.state.login) {
      return (  
            <ResponsiveDrawer messages={this.state.messages} users={this.state.users} login={this.state.login}></ResponsiveDrawer>
      );}
    return <Login />;
  }
}

export default Application;