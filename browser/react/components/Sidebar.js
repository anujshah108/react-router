import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Link } from 'react-router';

const Sidebar = (props) => {

  const deselectAlbum = props.deselectAlbum;

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to={`/albums`} onClick={deselectAlbum}>ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to={`/artists`}>ARTISTS</Link>
        </h4>
      </section>

    </sidebar>
  );
}

export default Sidebar;
