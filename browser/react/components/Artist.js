import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';
import axios from 'axios';

class Artist extends React.Component{
  constructor(props){
  super(props)
  this.artistObj = {}
}

componentDidMount () {
  const artistId = this.props.routeParams.artistId;
  let artistAlbums = []
  let artistSongs = []

    axios.get(`/api/artists/${artistId}`)
      .then(res => res.data)
      .then(artist => {
       this.artistObj = artist

      })

    axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)
      .then(albums => {
       this.artistAlbums = albums

      })

    axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data)
      .then(songs => {
       this.artistSongs = songs

      })

}

  render(){
  return  (
      <div>
        <h3>{this.artistObj.name}</h3>
        <h4>ALBUMS</h4>
        <h4>SONGS</h4>
      </div>
  )
}
}


export default Artist;
