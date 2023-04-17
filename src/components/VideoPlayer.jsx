import React, { Component } from 'react';
import Burgervideo from "../assets/Double.mp4"
import CmsThumbnail from "../assets/Cmsstock.jpg"   
import { Button } from '@mui/material';

class InteractiveVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isMuted: true
    };

    this.videoRef = React.createRef();
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  togglePlay() {
    const { isPlaying } = this.state;
    const video = this.videoRef.current;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    this.setState({ isPlaying: !isPlaying });
  }

  toggleMute() {
    const { isMuted } = this.state;
    const video = this.videoRef.current;

    video.muted = !isMuted;

    this.setState({ isMuted: !isMuted });
  }

  render() {
    const { isPlaying, isMuted } = this.state;

    return (
      <div>
        <video ref={this.videoRef} src={Burgervideo} poster={CmsThumbnail} />
        <br />
        <Button variant='contained' onClick={this.togglePlay}>{isPlaying ? 'Pause' : 'Play'}</Button>
        <Button variant='outlined' onClick={this.toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</Button>
      </div>
    );
  }
}

export default InteractiveVideo;
