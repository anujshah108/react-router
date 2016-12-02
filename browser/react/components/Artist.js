

import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';
import axios from 'axios';
import Albums from './Albums';
import Album from './Album';
import Songs from './Songs';
import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';


class Artist extends React.Component{
  constructor(props){
  super(props)
  this.state = {
  artistObj: {},
  artistAlbums: [],
  artistSongs: [],
  currentSong: {}

  }

}

componentDidMount () {
  const artistId = this.props.routeParams.artistId;

    axios.get(`/api/artists/${artistId}`)
      .then(res => res.data)
      .then(artist => {
       this.setState({artistObj: artist})


      })

    axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)
      .then(albums => {
       this.props.onLoad(convertAlbums(albums))

      })
      let songsArr = []
    axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data)
      .then(songs => {
         songsArr= songs.map(song => {
          return convertSong(song)
          })
         this.props.onLoadSong(songsArr)
        })




    }

  render(){
  const artistId = this.props.routeParams.artistId;
  const children = this.props.children;

  return  (

          <div>
  <h3>{ this.state.artistObj.name }</h3>
  <ul className="nav nav-tabs">
    <li><Link to={`/artists/${artistId}/albums`} >ALBUMS</Link></li>
    <li><Link to={`/artists/${artistId}/songs`}>SONGS</Link></li>
  </ul>
  { children && React.cloneElement(children, this.props) }
</div>
  )
}
}


export default Artist;



      // <div>
      //   <h3>{this.state.artistObj.name}</h3>
      //     <Albums albums= {this.state.artistAlbums} selectAlbums= {this.props.selectAlbum} />
      //   <h4>SONGS</h4>
      //   <Songs songs= {this.state.artistSongs} {...this.props} />
      // </div>

//           <div>
//   <h3>{ this.state.artistObj.name }</h3>
//   <ul className="nav nav-tabs">
//     <li><Link to={`/artists/${artistId}/albums`}>ALBUMS</Link></li>
//     <li><Link to={`/artists/${artistId}/songs`}>SONGS</Link></li>
//   </ul>
//   { children && React.cloneElement(children, propsToPassToChildren) }
// </div>

//   const propsToPassToChildren = {
//     artistObj: {},
//   albums: this.props.albums,
//   songs: this.props.currentSongList,
//   currentSong: {}
//   // ...this.props
// }