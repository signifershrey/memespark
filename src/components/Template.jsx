import React, { useState } from "react";
import Meme from "./Meme";

const Template = ({ templates, setMeme }) => {
  const [isMemeLoad, setIsMemeLoad] = useState(false);

  return (
    <div className="TemplatePage">
      <h1>Choose Any Templates</h1>
      <div className="templates">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template"
            onClick={() => {
              setMeme(template);
              setIsMemeLoad(true);
            }}
          >
            <div
              style={{ backgroundImage: `url(${template.url})` }}
              className={"image"}
            ></div>
          </div>
        ))}
      </div>
      {isMemeLoad ? <Meme /> : "Not able to load meme"}
    </div>
  );
};

export default Template;
