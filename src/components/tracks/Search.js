import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";
export class Search extends Component {
  state = {
    trackTitle: "",
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();

    axios.get(
      `https://cors.bridged.cc/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
    )
    .then(res => {
      dispatch({
        type: 'SEARCH_TRACKS',
        payload: res.data.message.body.track_list
      });
        this.setState({trackTitle: ''});
      })
      .catch(err => console.log(err));
  };

  // findTrack = ( e) => {
  //   e.preventDefault();
  //   setTrackTitle(userInput);
  // };

  // onChange = e => {
  //   setUserInput(e.target.value);
  // };
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fa fa-music"></i> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange.bind(this)}
                  ></input>
                </div>
                <div className="text-center">
                  <button
                    className=" w-100 btn btn-primary btn-lg btn-outline mb-5 mt-3 px-5"
                    type="submit"
                  >
                    {" "}
                    Get Tracks Lyrics
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
