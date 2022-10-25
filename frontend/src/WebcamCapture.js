import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';

function WebcamCapture() {

  const [isShowVideo, setIsShowVideo] = useState(false);
  const videoElement = useRef();
  const [imageSrc, setImageSrc] = useState("");

  // useEffect(() => {
  //   const el2 = videoElement.current;
  //   console.log(el2); 
  // }, [videoElement.current]);
//   const wrapper = useCallback((node) => {
//     videoElement.current = node;
//     console.log("node" + node);
// }, [])

  // useEffect(() => {
  //   let localRef = null;
  //   if (videoElement.current) localRef = videoElement.current;
  //     const interval = setInterval(() => {
  //     console.log("videoElement" + localRef)
  //     // capture1(videoElement);
  //   }, 5000);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("videoElement" + videoElement)
      console.log("DOCCCCC" + document.getElementById("vid").current);
      capture1(videoElement);
    }, 5000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [videoElement])

  // const capture = React.useCallback(
  //   () => {
  //     debugger
  //     console.log("Capturing frame")
  //     // imageSrc = videoElement.current.getScreenshot();
  //     setImageSrc(videoElement.current.getScreenshot());
  //     console.log(imageSrc)
  //   },
  //   [videoElement]
  // );

  const capture1 = (videoElement) => {
    setImageSrc(videoElement.current.getScreenshot());
    console.log(imageSrc)
  }

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
  }

  const handleOnUserMedia = () => {
    console.log(videoElement.current.stream)
  }

  

  return (
    <div>
      <div className="camView">
        {isShowVideo &&
          <Webcam audio={false} id="vid" screenshotFormat="image/jpeg" ref={(input) => (this.videoElement = input)} onUserMedia={handleOnUserMedia} videoConstraints={videoConstraints} />
        }
      </div>
      <button onClick={startCam}>Start Video</button>
      <button onClick={stopCam}>Stop Video</button>
      <button onClick={capture1}>Capture photo</button>
      <div width="100px">
        {imageSrc}
      </div>
    </div>
  );
};

export default WebcamCapture;