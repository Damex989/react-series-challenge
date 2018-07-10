import React, { Component } from "react";
import { connect } from "react-redux";

class SearchBar extends Component {
  state = {
    value: ""
  };
  handleSearchInput = e => {
    const value = e.target.value;
    this.setState(() => ({
      value
    }));
  };
  handleSearch = e => {
    e.preventDefault();
    const { from } = this.props;
    const query = this.state.value;
    if(from === "/favorites") {
      const { favoriteGifs } =  this.props;
      const payload = { query, favoriteGifs };
      this.props.getFavoriteSearchGifs(payload);
    } else {
      this.props.getSearchGifs(query);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <input
          type="text"
          placeholder="Buscar"
          value={this.state.value}
          onChange={this.handleSearchInput}
        />
        <button type="onSubmit" onClick={this.handleSearch}>
          Buscar
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ favoriteGifs }) => ({
  favoriteGifs
});

const mapDispatchToProps = dispatch => {
  return {
    getSearchGifs: query => dispatch({ type: "GET_SEARCH_GIFS", query }),
    getFavoriteSearchGifs: payload => dispatch({ type: "GET_FAVORITE_SEARCH_GIFS", payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
