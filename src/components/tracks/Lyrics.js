import React, { Component } from 'react'
import axios from 'axios';
import Spinner from "../layouts/Spinner";
export class Lyrics extends Component {

    state = {
        track: {},
        lyrics: {}
    };

    componentDidMount() {
        axios.get(`https://cors.bridged.cc/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${
            process.env.REACT_APP_MM_KEY
          }`)
            .then(res => {
                console.log(res.data);
                this.setState({ lyrics: res.data.message.body.lyrics });
                })

            return axios.get(`https://cors.bridged.cc/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${
                process.env.REACT_APP_MM_KEY
              }`)
                .then(res => {
                    this.setState({ track: res.data.message.body.lyrics });
                    console.log(res.data);
                })
                .catch(err => console.log(err)); 
    }

    render() {
        const { track, lyrics } = this.state;
        console.log(track);

        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
            return <Spinner />
        }
        else {
            return <h1>Data Returned</h1>
        }
        
    }
}

export default Lyrics
