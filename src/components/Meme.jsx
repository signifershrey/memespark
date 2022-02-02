import React, { useState } from "react";
import axios from "axios";
import fileDownload from "js-file-download";

const Meme = ({ meme, setMeme }) => {
  const [link, setLink] = useState(null);

  const [form, setForm] = useState({
    template_id: meme.id,
    username: "ShreyMaurya",
    password: "qwerty@123",
    boxes: [],
  });

  const generateMeme = () => {
    // console.log(form);

    let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`;
    console.log(url);

    // eslint-disable-next-line array-callback-return
    form.boxes.map((box, index) => {
      url += `&boxes[${index}][text]=${box.text}`;
    });

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setLink(result.data.url);
          setMeme({ ...meme, url: result.data.url });
        } else {
          alert("Enter the Caption First");
        }
      });
    return url;
  };

  function downloadMeme(link, filename) {
    axios
      .get(link, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  }
  const sendTweet = () => {
    const texthref = link.toString();
    // console.log(texthref);
    let finalMessage = encodeURIComponent(texthref);
    let twitterUrl = `https://twitter.com/intent/tweet?text=${finalMessage}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="meme">
      <img src={meme.url} alt="meme-images" />
      <div>
        {[...Array(meme.box_count)].map((_, index) => (
          <input
            type="text"
            key={index}
            placeholder={`Meme Caption ${index + 1}`}
            onChange={(e) => {
              const newBoxes = form.boxes;
              newBoxes[index] = { text: e.target.value };
              setForm({ ...form, boxes: newBoxes });
            }}
          ></input>
        ))}
      </div>
      <div>
        <button onClick={generateMeme}>Generate Meme</button>
        <button onClick={() => setMeme(null)}>Choose Template</button>
        <button
          onClick={() => {
            link
              ? downloadMeme(link, "image.jpeg")
              : alert("Firstly Generate the meme");
          }}
        >
          Download
        </button>
                 <button onClick={()=> {
            link ?
            
             sendTweet()
             :
             alert("First Generate meme")
          }}>
          Share
          </button>
      </div>
    </div>
  );
};

export default Meme;
