import React, { Component } from "react";
import GenreTag from "../GenreTag/GenreTag"

export default class GenresTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: props.genres,
      genresSelected: props.selectedGenres || [],
    };
  }

  handleChange(e) {
    let newGenresSelected = [...this.state.genresSelected]

    e.target.type === "checkbox" && e.target.checked 
      ? newGenresSelected.push(+e.target.value) 
      : newGenresSelected.pop()
    
    if (e.target.type === "radio") {
      newGenresSelected = [+e.target.value]
    }

    this.setState({
      genreSelected: newGenresSelected,
    });

    this.props.handleGenreFilterChange(newGenresSelected);
  }
  
  render() {      
    const { genres, genresSelected } = this.state;
    const { type } = this.props;
    
    return (
      <> 
        {genres.map(genre => 
          <GenreTag 
            key={genre.id} 
            type={type}
            genre={genre} 
            onChange={e => this.handleChange(e)} 
            checked={genresSelected.includes(genre.id)}
          />
        )}
      </>
    );
  }
}
