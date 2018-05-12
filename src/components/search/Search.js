import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import Axios from 'axios';
import ImageResults from '../image-results/ImageResults';
import FlatButton from 'material-ui/FlatButton';

const style = {
    marginLeft: 20,
};

const defaultProps = {
  amounts: [3,6,9,12,15,21,30,45],
  types: ["all", "photo", "illustration", "vector"],
  categories: ['all', 'fashion', 'nature', 'backgrounds', 'science', 'education', 'people', 'feelings', 'religion', 'health', 'places', 'animals', 'industry', 'food', 'computer', 'sports', 'transportation', 'travel', 'buildings', 'business', 'music']
}


class Search extends Component {
    state = {
        open: false,
        error: '',
        searchText: '',
        amount: 3,
        type: 'all',
        category: '',
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '8917566-b9300b1f044864f4c74305735',
        images: [],
        number: 1,
    };

    getImage(){
       Axios.get(`${this.state.apiUrl}?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=${this.state.type}&category=${this.state.category}&per_page=${this.state.amount}&page=${this.state.number}&safesearch=true`)
            .then(res => {
                this.setState({
                    images: res.data.hits,
                    open: false
                });
            })
            .catch(err => {
                console.log(err.message);
                this.setState({
                    open: true,
                    error: err.message
                });
            });
    }

    // https://pixabay.com/api/?key=8917566-b9300b1f044864f4c74305735&q=science&image_type=photo&category=science&per_page=15&page=1&safesearch=true&pretty=true

    onTextChange = (e) => {
        this.setState({searchText: e.target.value}, ()=>{
            if (this.state.searchText === ''){
                this.setState({
                    images: [],
                    open: false
                });
            }  else {
                this.getImage();
            }
        });
    };

    onSearch = () => {
        this.setState({
            images: [],
            number: 1,
            open: false
        });
        this.getImage();
    }

    onPagePrev = () => {
        if (this.state.number > 1){
            const number = this.state.number - 1;
            this.setState({number: number});
            console.log(this.state.number);
            this.getImage();
        }
    }

    onPageNext = () =>{
        let number = this.state.number;
        this.setState({number: ++number});
        this.getImage();

    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    onAmountChange = (event, index, value) => this.setState({amount: value});
    onCategoryChange = (event, index, value) => this.setState({category: value});
    onTypeChange = (event, index, value) => this.setState({type: value});

    render() {
        let listAmounts = this.props.amounts.map((amount,i) => {
            return(
                <MenuItem key={i} value={amount} primaryText={amount} />
            )
        });
        let listTypes = this.props.types.map((type,i) => {
            return(
                <MenuItem key={i} value={type} primaryText={type} />
            )
        });

        let listCategories = this.props.categories.map((category,i) => {
            return(
                <MenuItem key={i} value={category} primaryText={category} />
            )
        });
        const {searchText, amount, category, type, open, error, images} = this.state;
        return (
            <div>
                <div>
                    <TextField style={style}
                        name='searchText'
                        value={searchText}
                        floatingLabelText="Search for Images"
                        onChange={this.onTextChange}
                        fullWidth={true}
                    />
                    <br />
                    <SelectField style={style}
                        floatingLabelText="Amount"
                        value={amount}
                        onChange={this.onAmountChange}
                        fullWidth={true}
                    >
                    {listAmounts}
                    </SelectField>
                    <br />
                    <SelectField style={style}
                        floatingLabelText="Category"
                        value={category}
                        onChange={this.onCategoryChange}
                        fullWidth={true}
                    >
                    {listCategories}
                    </SelectField>
                    <br />
                    <SelectField style={style}
                        floatingLabelText="Image Type"
                        value={type}
                        onChange={this.onTypeChange}
                        fullWidth={true}
                    >
                    {listTypes}
                    </SelectField>
                    <FlatButton style = { { display: 'block', marginLeft: 20} } label="Search" primary={true} onClick={this.onSearch}/>
                </div>
                <br />
                <Snackbar
                    open={open}
                    message={error}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
                <br />
                {images.length >= 0 ? (<ImageResults images={images}/>) : null}
                <br />
                {images.length > 0 ? (
                    <div style = { { width: 500, margin: '0 auto' } }>
                      <FlatButton style = { { marginLeft: 50 } } label="Previous" primary={true} onClick={this.onPagePrev}/>
                      <FlatButton style={{ marginLeft: 50 }} label="Next" primary={true} onClick={this.onPageNext}/>
                    </div>
                ) : null}
            </div>
        )
    }
}

Search.defaultProps = defaultProps;
export default Search;
