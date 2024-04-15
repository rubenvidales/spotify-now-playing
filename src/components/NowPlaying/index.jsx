import { useState, useEffect } from "react";
import getNowPlaying from "../../util/getNowPlaying";
import "./style.css";
import { Link } from "react-router-dom";

const FAKE_DATA = {
  title: "Corner of My Eye",
  isPlaying: true,
  albumImageUrl:
    "https://i.scdn.co/image/ab67616d0000b273d1f907dd035be34c97c6c196",
  artist: "Future Islands",
  album: "People Who Aren't There Anymore",
  releaseDate: "2024",
  artistUrl: "https://open.spotify.com/artist/1WvvwcQx0tj6NdDhZZ2zZz",
  requestStatus: "ok",
  songUrl: "https://open.spotify.com/track/0WD51wX4WlDOSSs6pD28W7",
  timePlayed: 61512,
  timeTotal: 233266,
};

const NowPlaying = ({ isFake }) => {
  const [nowPlaying, setNowPlaying] = useState({});

  useEffect(() => {
    const fetchNowPlaying = async () => {
      let data;
      if (isFake) {
        data = FAKE_DATA;
      } else {
        data = await getNowPlaying();
      }

      setNowPlaying(data);
    };

    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 2000);

    return () => clearInterval(interval);
  }, [isFake]);

  const { title, isPlaying, albumImageUrl, artist, album, releaseDate } =
    nowPlaying;

  let playerState = "OFFLINE";
  if (title) {
    isPlaying ? (playerState = "PLAY") : (playerState = "PAUSE");
  } else {
    playerState = "OFFLINE";
  }

  return (
    <div className="now-playing">
      {playerState !== "OFFLINE" ? (
        <div className="now-playing__container">
          <img
            src="./src/assets/icons/spotify.png"
            className="now-playing__logo"
            alt="now playing logo"
          />

          <h1 className="now-playing__title">
            now playing by{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="now-playing__link"
              to="https://github.com/rubenvidales"
            >
              Ruben Vidales
            </Link>
          </h1>
          <div className="now-playing__cover-row">
            <img
              className="now-playing__song-cover"
              src={albumImageUrl}
              alt="Cover"
            />
            <img
              className="now-playing__status"
              // src="/src/assets/icons/play_circle.svg"
              src={`./src/assets/icons/${playerState === "PLAY" ? "play_circle" : "pause_circle"}.svg`}
              alt="player status icon"
            />
          </div>

          <h2 className="now-playing__song-title">{title}</h2>
          <h3 className="now-playing__song-artist">{artist}</h3>
          <h4 className="now-playing__song-album">{`${album} (${releaseDate})`}</h4>
        </div>
      ) : (
        <>
          <h1>Spotify Player not connected</h1>
          <h3>
            {`If is not online at the moment, you can visit the fake version `}
            <Link to="/fake" className="now-playing__link">
              here
            </Link>
          </h3>
        </>
      )}
    </div>
  );
};

export default NowPlaying;
