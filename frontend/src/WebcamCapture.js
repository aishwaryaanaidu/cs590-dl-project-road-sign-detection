import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function WebcamCapture() {

  const [isShowVideo, setIsShowVideo] = useState(false);
  const videoElement = useRef(null);
  const [imageSrc, setImageSrc] = useState("");

  const capture = React.useCallback(
    () => {
      // imageSrc = videoElement.current.getScreenshot();
      setImageSrc(videoElement.current.getScreenshot());
      console.log(imageSrc)
    },
    [videoElement]
  );

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: { exact: "environment" }
    // facingMode: "user"
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
          <Webcam audio={false} screenshotFormat="image/jpeg" ref={videoElement} onUserMedia={handleOnUserMedia} videoConstraints={videoConstraints} />
        }
      </div>
      <button onClick={startCam}>Start Video</button>
      <button onClick={stopCam}>Stop Video</button>
      <button onClick={capture}>Capture photo</button>
      <div width="100px">
        {imageSrc}
      </div>
    </div>
  );
};

export default WebcamCapture;