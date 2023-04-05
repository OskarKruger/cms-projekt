import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';

const theme = createTheme({
  spacing: 8, // sets the default spacing between elements to 8px
  // other theme options here
});





const useStyles = makeStyles((theme) => ({
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
  }));
  
  
  function Sidebar() {
    const classes = useStyles();
  
  
    return (
        <Container>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Mail" />
            </ListItem>
          </List>
        </Drawer>

        </Container>
      );
  }
  
  export default Sidebar;
  