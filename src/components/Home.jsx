import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [btnClicked, setBtnClicked] = useState(false);

  return (
    <div className="App">
      <h1>MEMESPARK</h1>
      {/* <h1>A Meme Generator Application</h1> */}
      <ul className="features">
        <li>Place for 100+ Memes Templates</li>
        <li>Create Dank Memes</li>
        <li>Download Memes</li>
        <li>Share with your friends directly</li>
      </ul>
      <div className={"playBtn"} onClick={() => setBtnClicked(true)}>
        Play
      </div>
      {btnClicked ? <Redirect to={"/templates"} /> : null}
    </div>
  );
};

export default Home;
