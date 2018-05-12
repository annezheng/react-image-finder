import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const style = {
    container: {
      position: 'relative',
    },
    refresh: {
      display: 'inline-block',
      position: 'relative',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    
  };


class ImageResults extends Component {
    state = {
        open: false,
        currentImage: ''
    };

    handleOpen = (img) => {
        this.setState({open: true, currentImage: img});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    render() {
        let imageListContent;
        const { images } = this.props;
        console.log(images);

        if (images.length > 0){
            imageListContent =(
            <div style={style.root}>
                <GridList
                cols={3}
                >
                <Subheader>Results</Subheader>
                {images.map((image) => (
                    <GridTile
                    key={image.id}
                    title={image.tags}
                    subtitle={<span> <b>{image.downloads}</b> Downloads</span>}
                    actionIcon={<IconButton onClick={()=>this.handleOpen(image.largeImageURL)}><ZoomIn color="white" /></IconButton>}
                    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    >
                    <img src={image.largeImageURL} alt=""/>
                    </GridTile>
                ))}
                </GridList>
            </div>)

        }else{
            imageListContent = null;
        }

        const actions = [
            <FlatButton
            label="Close"
            primary={true}
            onClick={this.handleClose}
            />,
        ];

        return (
        <div>
            {imageListContent}
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
            <img src={this.state.currentImage}  style={{width: '100%'}} alt=""/>
            </Dialog>
        </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults;
