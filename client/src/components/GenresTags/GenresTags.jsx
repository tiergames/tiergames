import React, { Component } from "react";
import GenreTag from "../GenreTag/GenreTag"

export default class GenresTags extends Component {

  handleChange(e) {
    let newGenresSelected = [...this.props.selectedGenres]

    e.target.type === "checkbox" && e.target.checked 
      ? newGenresSelected.push(+e.target.value) 
      : newGenresSelected.pop()
    
    if (e.target.type === "radio") {
      newGenresSelected = [+e.target.value]
    }

    this.props.handleGenreFilterChange(newGenresSelected);
  }
  
  render() {      
    const { selectedGenres, genres, type } = this.props;

    return (
      <> 
        {genres.map(genre => 
          <GenreTag 
            key={genre.id} 
            type={type}
            genre={genre} 
            onChange={e => this.handleChange(e)} 
            checked={selectedGenres.includes(genre.id)}
          />
        )}
      </>
    );
  }
}
