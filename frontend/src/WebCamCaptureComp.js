import React from 'react';
import Webcam from 'react-webcam';

class WebcamCaptureComp extends React.Component {
    constructor(props) {
        super(props);
        this.videoElement = React.createRef();
        this.state = {
            isShowVideo: false,
            imageSrc: ""
        }
        const videoConstraints = {
            width: 640,
            height: 480,
            // facingMode: { exact: "environment" }
            facingMode: "user"
          }
    }

    capture = () => {
        // setImageSrc(videoElement.current.getScreenshot());
        this.setState({
            imageSrc: this.videoElement.current.getScreenshot()
        })
        console.log(this.state.imageSrc)
    }

    startCam = () => {
        // setIsShowVideo(true);
        this.setState({
            isShowVideo: true
        })
    }

    stopCam = () => {
        let stream = this.videoElement.current.stream;
        const tracks = stream.getTracks();
        tracks.forEach(track => {
            console.log("track" + track)
            track.stop()
        });
        // setIsShowVideo(false);
        this.setState({
            isShowVideo: false
        })
    }


    componentDidMount() {
        //   this.textInput.current.focusTextInput();
        // console.log(this.videoElement.current.getScreenshot());
    }

    render() {
        return (
            <div>
                <div className="camView">
                    {this.state.isShowVideo &&
                        <Webcam audio={false} id="vid" screenshotFormat="image/jpeg" ref={this.videoElement} videoConstraints={this.videoConstraints} />
                    }
                </div>
                <button onClick={this.startCam}>Start Video</button>
                <button onClick={this.stopCam}>Stop Video</button>
                <button onClick={this.capture}>Capture photo</button>
                <div width="100px">
                    {this.state.imageSrc}
                </div>
            </div>
        );
    }
}

export default WebcamCaptureComp;