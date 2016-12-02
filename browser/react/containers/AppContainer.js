import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onLoadArtist = this.onLoadArtist.bind(this);
    this.onLoadArtists = this.onLoadArtists.bind(this);
    this.onLoadSong = this.onLoadSong.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));

    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => this.setState({
        artists:artists
      }));


    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (albums) {
    this.setState({
      albums: albums
    });
  }

  onLoadArtist (albums) {
    this.setState({
      currentAlbums: albums
    });
  }

  onLoadArtists (artist) {
    this.setState({
      selectedArtist: artist
    });
  }


    onLoadSong (songs) {    this.setState({
      songs: songs
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  deselectAlbum () {
    this.setState({ selectedAlbum: {}});
  }




  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
        {
  this.props.children ?
    React.cloneElement(this.props.children, {
      album: this.state.selectedAlbum,
      currentSong: this.state.currentSong,
      isPlaying: this.state.isPlaying,
      toggleOne: this.toggleOne,
      albums: this.state.albums,
      selectAlbum: this.selectAlbum, 
      artists: this.state.artists,
      selectedArtist : this.state.selectedArtist,
      onLoad : this.onLoad,
      onLoadArtist : this.onLoadArtist,
      onLoadArtists : this.onLoadArtists,
      onLoadSong : this.onLoadSong,
      songs: this.state.songs,
      currentAlbums: this.state.currentAlbums
    })
    : null
}
        </div>
        <Player
          currentSong={this.state.currentSong}
          songs={this.state.songs}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
