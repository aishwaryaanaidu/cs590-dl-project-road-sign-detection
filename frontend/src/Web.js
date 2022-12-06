import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import Speech from 'react-speech';

function Web() {

  const [isShowVideo, setIsShowVideo] = useState(false);
  const videoElement = useRef();
  const [imageSrc, setImageSrc] = useState("");
  const [output, setOutput] = useState("");
  const [receivedResponse, setReceivedResponse] = useState("");
  const [ourText, setOurText] = useState("")
  const msg = new SpeechSynthesisUtterance()

  const speechHandler = (msg, out) => {
    msg.text = out
    window.speechSynthesis.speak(msg)
  }

  useEffect(() => {
    console.log(isShowVideo)
    if(isShowVideo) {
        const interval = setInterval(() => {
            // console.log("videoElement" + videoElement.current.getScreenshot())
            setImageSrc(videoElement.current.getScreenshot())
            getRoadSign(videoElement.current.getScreenshot())
            // speechHandler(msg, output)
          }, 2000);
          return () => clearInterval(interval);
    }
  }, [isShowVideo])

const getRoadSign = (image) => {
    fetch('http://127.0.0.1:5000/', { 
      method: 'POST',
      headers: {
      },
      body: JSON.stringify({ "base64": image.split(",")[1] })
    }).then(response =>  response.json())
    .then(resData => { 
        setOutput(resData.prediction)
        speechHandler(msg, resData.prediction)
        setReceivedResponse(true)
    }
    ).catch(
      error => console.log(error)
    );
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    // facingMode: { exact: "environment" }
    facingMode: "user"
  }

  const startCam = () => {
    setIsShowVideo(true);
  }

  const stopCam = () => {
    let stream = videoElement.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach(track => {
      console.log("track" + track)
      track.stop()
    });
    setIsShowVideo(false);
    setOutput("")
    speechHandler(msg, "")
  }

  

  return (
    <div>
      <h1 style={{ color: "#3CB4ED" }}>Road sign detection</h1>
      <div className="camView">
        {isShowVideo &&
          <Webcam style = {{ maxHeight: '60vh'}} audio={false} id="vid" screenshotFormat="image/jpeg" ref={videoElement} videoConstraints={videoConstraints} />
        }
      </div>
      <button style={{ marginTop: '5%'}} class="button-64" onClick={startCam}>Start Video</button>
      <button class="button-64" onClick={stopCam}>Stop Video</button>
        <p style={{ fontSize: '20pt', color: "#3CB4ED", marginTop: '7px' }}>{output}</p>
    </div>
  );
};

export default Web;