import React, { useContext } from "react";
import "./MusicPlayer.css";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { FaFastForward, FaBackward } from "react-icons/fa";
import { FaVolumeOff, FaVolumeXmark } from "react-icons/fa6";
import { Slider } from "@mui/material";
import { TrackContext } from "../context/TrackContext/TrackContext";
import * as audios from "../../assests/audios";
import tracks from "../../data/tacks.json";
import { useNavigate } from "react-router-dom";

export const MusicPlayer = () => {
  const [volumeValue, setVolumeValue] = React.useState(50);
  const [lastVolume, setLastVolume] = React.useState(50);
  const [volumeClicked, setVolumeClicked] = React.useState(false);
  const { isPlaying, setIsPlaying } = React.useContext(TrackContext);
  const audioRef = React.useRef(null);
  const { currentTrack, setTrack } = useContext(TrackContext);
  const navigate = useNavigate();
  const [audioCurrentTime, setAudioCurrentTime] = React.useState(0);
  const [audioDuration, setAudioDuration] = React.useState(0);

  const handleVolumeChange = (newValue) => {
    setVolumeValue(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  const handleAudioTimeChange = (event, newValue) => {
    if (Number.isFinite(newValue)) {
      setAudioCurrentTime(newValue);
      if (audioRef.current) {
        audioRef.current.currentTime = newValue;
      }
    }
  };
  const handleSongPlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSongForward = () => {
    if (tracks[tracks.indexOf(currentTrack) + 1]) {
      setTrack(tracks[tracks.indexOf(currentTrack) + 1]);
    } else {
      setTrack(tracks[0]);
    }
  };

  const handleSongBackward = () => {
    if (tracks[tracks.indexOf(currentTrack) - 1]) {
      setTrack(tracks[tracks.indexOf(currentTrack) - 1]);
    } else {
      setTrack(tracks[tracks.length - 1]);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTrack) {
      audio.src = audios[currentTrack.audio];
      if (isPlaying) {
        audio.play().catch((e) => console.error(e));
      }

      const setAudioData = () => {
        setAudioDuration(audio.duration);
      };

      const setAudioTime = () => {
        setAudioCurrentTime(audio.currentTime);
      };

      audio.addEventListener("loadedmetadata", setAudioData);
      audio.addEventListener("timeupdate", setAudioTime);

      return () => {
        audio.removeEventListener("loadedmetadata", setAudioData);
        audio.removeEventListener("timeupdate", setAudioTime);
      };
    }
  }, [currentTrack]);

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error(e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  React.useEffect(() => {
    if (currentTrack) {
      if (audioCurrentTime === audioDuration) {
        handleSongForward();
      }
    }
  }, [audioCurrentTime]);

  const toggleMute = () => {
    if (volumeValue !== 0) {
      setVolumeValue(0);
      if (audioRef.current) audioRef.current.volume = 0;
    } else {
      setVolumeValue(lastVolume);
      if (audioRef.current) audioRef.current.volume = lastVolume / 100;
    }
  };

  const isCurrentTrackPlaying = isPlaying;

  return currentTrack ? (
    <div className="playerOuterCont">
      <div className="playerCont">
        <Slider
          className="slider audiotime"
          max={audioDuration}
          min={0}
          aria-label="song"
          sx={{
            color: "white",
            "& .MuiSlider-thumb": {
              display: "none",
            },
            "& .MuiSlider-track": {
              color: "white",
            },
            "& .MuiSlider-rail": {
              color: "#bfbfbf",
            },
          }}
          value={audioCurrentTime}
          onChange={handleAudioTimeChange}
        />
        <div className="playerContInner">
          <div
            className="playerTrackInfo"
            onClick={() => navigate(`/tracks/${currentTrack.title}`)}
          >
            <img src={currentTrack.cover_image} />
            <div className="playerTrackContent">
              <p className="playerTrackTitle">{currentTrack.title}</p>
              <p className="playerTrackArtist">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="playerBtns">
            <FaBackward onClick={handleSongBackward} />
            <div className="playPauseDiv" onClick={handleSongPlay}>
              {isCurrentTrackPlaying ? <CiPause1 /> : <CiPlay1 />}
            </div>
            <FaFastForward onClick={handleSongForward} />
          </div>
          <div className="playerVolume">
            <div onClick={toggleMute}>
              {volumeValue === 0 || volumeClicked ? (
                <FaVolumeXmark />
              ) : (
                <FaVolumeOff />
              )}
            </div>
            <Slider
              className="slider"
              max={100}
              min={0}
              aria-label="Volume"
              sx={{
                color: "white",
                "& .MuiSlider-thumb": {
                  color: "white",
                },
                "& .MuiSlider-track": {
                  color: "white",
                },
                "& .MuiSlider-rail": {
                  color: "#bfbfbf",
                },
              }}
              value={volumeValue}
              onChange={handleVolumeChange}
            />
            <audio ref={audioRef} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
