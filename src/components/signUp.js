import { Button, FormControl, FormGroup} from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import client from './client';
import { Box } from '@material-ui/core'
import  Flower  from "../assets/Pink_Logo.png";

export class signUp extends Component {

    updateField(name, ev) {
        this.setState({ [name]: ev.target.value });
    }

    
  signup() {
    const { email, password } = this.state;

    return client.service('users')
      .create({ email, password })
      .then(() => this.login());
  }

    render() {
        return (
            <div>
                <div>
                    <Box margin={10} display="flex" justifyContent="center">
                        <img width="200" height="200" src={Flower} alt="pink flower"></img>
                    </Box>
                    <Box display="flex" justifyContent="center" marginTop={10} margin={10}>
                        <Typography color="textPrimary" variant="h2">Sign up</Typography>
                        <Typography>{this.state.error && this.state.error.message}</Typography>
                    </Box>
                </div>
                <div>
                    <Box display="flex" justifyContent="center">
                        <FormGroup>
                            <FormControl margin="dense">   
                                <TextField style = {{width: 600}} color="secondary" variant="outlined" type="text" label="Email" required onChange={ev => this.updateField('email', ev)}></TextField>
                            </FormControl>
                            <FormControl margin="dense">
                                <TextField color="secondary"
                                variant="outlined"
                                style={{backgroundColor: 'transparent'}}
                                required type="password" label="Password" onChange={ev => this.updateField('password', ev)}></TextField>
                            </FormControl>
                            <FormControl margin="dense">
                                <TextField color="secondary"
                                variant="outlined"
                                style={{backgroundColor: 'transparent'}}
                                required type="password" label="Confirm Password" onChange={ev => this.updateField('password', ev)}></TextField>
                            </FormControl>
                            <FormControl margin="dense">
                                <Button
                                variant="contained"
                                component="label"
                                >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                />
                                </Button>
                            </FormControl>
                            <FormControl margin="dense">
                                <Button color="primary" variant="contained" onClick={() => this.signup()}>Sign Up </Button>
                            </FormControl>
                        </FormGroup>
                    </Box>
                </div>
            </div>
        )
    }
}

export default signUp
