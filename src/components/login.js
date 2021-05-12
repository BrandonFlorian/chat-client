import { Button, CssBaseline, FormControl, FormGroup, Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import client from './client';
import { Box } from '@material-ui/core'
import  Flower  from "../assets/Pink_Logo.png";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  login() {
    const { email, password } = this.state;

    return client.authenticate({
      strategy: 'local',
      email, password
    }).catch(error => this.setState({ error }));
  }

  signup() {
    const { email, password } = this.state;

    return client.service('users')
      .create({ email, password })
      .then(() => this.login());
  }

  render() {

    return (
            <main className="login container">
              <div className="row">
                  <Box margin={10} display="flex" justifyContent="center">
                      <img width="200" height="200" src={Flower}></img>
                  </Box>
                  <Box display="flex" justifyContent="center" marginTop={10} margin={10}>
                  <Typography color="textPrimary" variant="h2">Log in or Sign up</Typography>
                  <Typography>{this.state.error && this.state.error.message}</Typography>
                  </Box>

              </div>
              <div>
                    <Box display="flex" justifyContent="center">
                        <FormGroup>
                        <FormControl margin="dense">   
                          <TextField style = {{width: 600}} color="secondary" 
                          onKeyDown={(event) => {
                            if (event.key== 'Enter'){
                              this.login();
                            }
                            }} variant="outlined" type="text" label="Email" required onChange={ev => this.updateField('email', ev)}></TextField>
                        </FormControl>
                        <FormControl margin="dense">
                          <TextField color="secondary"
                          onKeyDown={(event) => {
                            if (event.key== 'Enter'){
                              this.login();
                            }
                            }}
                           variant="outlined"
                           required type="password" label="Password" onChange={ev => this.updateField('password', ev)}></TextField>
                        </FormControl>
                        <FormControl margin="dense">
                          <Button color="primary" variant="contained"  onClick={() => this.login()}>Log In</Button>
                        </FormControl>
                        <FormControl margin="dense">
                          <Button color="primary" variant="contained" onClick={() => this.signup()}>Sign Up </Button>
                        </FormControl>
                        <FormControl margin="dense">
                          <Button color="primary" variant="contained" href="http://localhost:3030/oauth/github">Github</Button>
                        </FormControl>
                    </FormGroup>
                  </Box>
              </div>
            </main>
      );
  }
}