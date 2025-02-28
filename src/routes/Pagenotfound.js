import React from 'react'
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Pagenotfound</h1>
      <button id="btndpnf">
        <Link to="/home">
          <h2>Go Home</h2>
        </Link>
      </button>
    </div>
  );
}

export default Pagenotfound
