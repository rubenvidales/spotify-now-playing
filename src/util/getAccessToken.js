import { Buffer } from "buffer";
import isTokenExpired from "./isTokenExpired";

const getAccessToken = async (client_id, client_secret, refresh_token) => {
  const accessTokenLocalStorage = localStorage.getItem("spotify_access_token");

  if (accessTokenLocalStorage) {
    const [token, creationDate] = accessTokenLocalStorage.split(":");
    if (!isTokenExpired(creationDate)) {
      return token;
    }
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
  }).toString();

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  const { access_token } = await response.json();

  const now = new Date();
  localStorage.setItem(
    "spotify_access_token",
    `${access_token}:${now.getTime()}`,
  );

  return access_token;
};

export default getAccessToken;
