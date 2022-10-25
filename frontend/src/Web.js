import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';

function Web() {

  const [isShowVideo, setIsShowVideo] = useState(false);
  const videoElement = useRef();
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    console.log(isShowVideo)
    if(isShowVideo) {
        const interval = setInterval(() => {
            console.log("videoElement" + videoElement.current.getScreenshot())
            // capture1();
            setImageSrc(videoElement.current.getScreenshot())
          }, 5000);
          return () => clearInterval(interval);
    }
     // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [isShowVideo])

//   const capture1 = () => {
//     console.log("here")
//     setImageSrc(videoElement.current.getScreenshot());
//     console.log(imageSrc)
//   }

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

  

  return (
    <div>
      <div className="camView">
        {isShowVideo &&
          <Webcam audio={false} id="vid" screenshotFormat="image/jpeg" ref={videoElement} videoConstraints={videoConstraints} />
        }
      </div>
      <button onClick={startCam}>Start Video</button>
      <button onClick={stopCam}>Stop Video</button>
      {/* <button onClick={capture1}>Capture photo</button> */}
      <div width="100px">
        {imageSrc}
      </div>
    </div>
  );
};

export default Web;