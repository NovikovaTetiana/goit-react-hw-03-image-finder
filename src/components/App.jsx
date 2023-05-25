import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled'


export class App extends Component {
  state = {
    searchText: '',
  };

 handleSearch = (searchText) =>{
  this.setState({ searchText })
 }


  render() {

    return (
      
      <Container>
        <Searchbar onSubmit={this.handleSearch}/>
        <ImageGallery searchText={this.state.searchText}/> 
        <ToastContainer autoClose={2000}/>
      </Container>
    );
  }
}
