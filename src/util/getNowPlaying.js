import getAccessToken from "./getAccessToken";

const client_id = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_REACT_APP_SPOTIFY_REFRESH_TOKEN;

const getNowPlaying = async () => {
  try {
    const access_token = await getAccessToken(
      client_id,
      client_secret,
      refresh_token,
    );

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (response.status === 204) {
      return {
        requestStatus: "error",
        message: "Currently Not Playing",
      };
    } else if (response.status > 400) {
      return {
        requestStatus: "error",
        message: "Unable to Fetch Song",
      };
    }

    const song = await response.json();

    // playing podcast
    if (song.is_playing && song.currently_playing_type === "episode") {
      return {
        requestStatus: "error",
        message: "Currently playing unsupported media",
      };
    }

    // playing music
    return {
      requestStatus: "ok",
      title: song.item.name,
      artist: song.item.artists.map((artist) => artist.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      releaseDate: song.item.album.release_date.substring(0, 4),
      isPlaying: song.is_playing,
      // timePlayed: song.progress_ms,
      // timeTotal: song.item.duration_ms,
    };
  } catch (error) {
    console.error("Error fetching currently playing song: ", error);
    return error.message.toString();
  }
};

export default getNowPlaying;
