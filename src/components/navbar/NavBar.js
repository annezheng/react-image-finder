import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ContentSend from 'material-ui/svg-icons/content/send';
import {List, ListItem} from 'material-ui/List';

class NavBar extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
              label="Ok"
              primary={true}         
              onClick={this.handleClose}
            />,
          ];
        return (
            <div>
                <AppBar
                title='Pixabay Image Finder'
                onTitleClick={this.handleOpen}
                iconElementRight={<FlatButton label="About" onClick={this.handleOpen}/>}
                />
                <Dialog
                    title="Technologies"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>                   
                    <List>                                               
                        <a target="_blank" href="https://reactjs.org/" rel="noopener noreferrer"><ListItem primaryText="React" leftIcon={<ContentSend />} /></a>
                        <a target="_blank" href="https://github.com/axios/axios" rel="noopener noreferrer"><ListItem primaryText="Axios" leftIcon={<ContentSend />} /></a>                         
                        <a target="_blank" href="http://www.material-ui.com/#/" rel="noopener noreferrer"><ListItem primaryText="Material UI" leftIcon={<ContentSend />} /></a>
                        <a target="_blank" href="https://pixabay.com/api/docs/" rel="noopener noreferrer"><ListItem primaryText="Pixabay API" leftIcon={<ContentSend />} /></a>                       
                    </List>
                </Dialog>
            </div>
        );
  }
}

export default NavBar;
