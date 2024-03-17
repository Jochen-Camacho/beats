import React from "react";
import WaveSurfer from "wavesurfer.js";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import "./WaveForm.css";
import { TrackContext } from "../context/TrackContext/TrackContext";
import * as audios from "../../assests/audios";

export const WaveForm = ({ url }) => {
  const waveformRef = React.useRef(null);
  const wavesurfer = React.useRef(null);
  const [isWavePlaying, setIsWavePlaying] = React.useState(false);
  const { isPlaying, setIsPlaying } = React.useContext(TrackContext);

  React.useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "white",
      progressColor: "grey",
      cursorColor: "white",
    });

    wavesurfer.current.load(audios[url]);
    wavesurfer.current.on("pause", () => setIsWavePlaying(false));

    return () => wavesurfer.current.destroy();
  }, [url]);

  React.useEffect(() => {
    if (isPlaying) {
      setIsWavePlaying(false);
      wavesurfer.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    wavesurfer.current.playPause();
    setIsWavePlaying(!isWavePlaying);
    setIsPlaying(false);
  };

  return (
    <div className="waveFormCont">
      <div className="waveFormBtn" onClick={handlePlayPause}>
        {isWavePlaying ? <CiPause1 /> : <CiPlay1 />}
      </div>
      <div className="waveForm" ref={waveformRef} />
    </div>
  );
};
