import React ,{ useEffect, useState } from "react";
// import react from 'react';
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Template from "./components/Template";
import { HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Meme from "./components/Meme";

function App() {
  const [templates, setTemplates] = useState([]);
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        //  console.log(data);
        setTemplates(data.data.memes);
      });
  }, []);

  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/templates"}>
            {meme == null ? (
              <Template templates={templates}  setMeme={setMeme} />
            ) : (
              <Meme meme={meme} setMeme={setMeme} />
            )}
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
