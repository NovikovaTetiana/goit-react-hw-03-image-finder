import { Component } from 'react';
import { Header } from './Searchbar.styled'

import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
   value: ''
  };

  handleChange = ({ currentTarget: { value } }) => {
    this.setState({ value: value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if(this.state.value.trim() === ''){
      toast.error('Введіть слово')
      return
    }
    this.props.onSubmit(this.state.value);
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value} = this.state;
    return (
      <Header >
        <form  onSubmit={this.handleSubmit}>
         <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            value={value}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </Header>
    );
  }
}

