import React , { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Message from './message';
import { Button, FormControl, TextField} from '@material-ui/core/';
import client from './client';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core'
import UserFrame from './userFrame';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {

    //send message to server
    const sendMessage = (ev) => {
        const input = ev.target.querySelector('[name="text"]');
        const text = input.value.trim();
    
        if(text) {
          client.service('messages').create({ text }).then(() => {
            input.value = '';
          });
        }
    
        ev.preventDefault();
      };

      let scrollToBottom = () => {
        window.scrollTo(0,document.body.scrollHeight);
      }
    
      useEffect(() => {
        scrollToBottom = scrollToBottom.bind(this);
    
        client.service('messages').on('created', scrollToBottom);
        scrollToBottom();
          return () => {
            client.service('messages').removeListener('created', scrollToBottom);
          }
      }, []);

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const users = props.users;
    const messages = props.messages;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Grid 
                container
                //spacing={20}
                justify="space-between">
                    <Grid item>
                        <Typography color="secondary" position="left" variant="h6" noWrap>
                            Messages
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="secondary">{props.login.user.email}</Typography>
                        </Grid>
                    <Grid item>
                        <Button color="secondary" position="right" onClick={() => client.logout()} className="button button-primary">Logout</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="users">
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <UserFrame classes={classes.toolbar} users={users}></UserFrame>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer classes={{ paper: classes.drawerPaper,}} variant="permanent" open>
                    <UserFrame classes={classes.toolbar} users={users}></UserFrame>
                </Drawer>
            </Hidden>
                <Drawer variant="permanent" anchor={'bottom'}></Drawer>
        </nav>
        <main className={classes.content} >
            <div className={classes.toolbar}/>  
                {messages.map(message => 
                    {
                        if(message.user.email === props.login.user.email){
                            return <div key={message._id}>
                                        <Box display="flex" justifyContent="flex-end" m={1} p={1} >
                                            <Message message={message} position="flex-end"></Message>
                                        </Box>
                                    </div>
                        }else{
                            return <div key={message._id}>
                                        <Box display="flex" justifyContent="flex-start" m={1} p={1}  >
                                            <Message message={message}></Message>
                                        </Box>
                                    </div>
                        }
                    })
                }
            <form onSubmit={sendMessage.bind(this)} id="send-message">
                <FormControl fullWidth={true}>
                    <TextField id="text" color="secondary" name="text" variant="filled" fullWidth={true} margin="normal" label="Message" InputProps={{endAdornment:   
                        <IconButton color="secondary" type="submit">
                            <SendIcon />
                        </IconButton>}}>
                    </TextField>
                </FormControl>
            </form>
        </main>
        </div>
    );
}
export default ResponsiveDrawer;