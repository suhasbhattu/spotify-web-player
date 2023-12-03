const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
  const accessToken = process.env["ACCESS_TOKEN"];
  const userId = process.env["USER_ID"];
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const getUserPlaylists = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: headers,
        }
      );
      const playlistsResponse = response.data;
      const playlists = playlistsResponse.items.map((item) => {
        return {
          name: item.name,
          id: item.id,
          thumbnail: item.images[1].url,
          tracksCount: item.tracks.total,
        };
      });
      playlists.sort((item1, item2) => item1.name.localeCompare(item2.name));
      const responseJson = {
        items: playlists,
        length: playlistsResponse.total,
      };
      res.json(responseJson);
    } catch (error) {
      res.json(error);
    }
  };
  getUserPlaylists();
});

router.get("/:id", (req, res) => {
  const accessToken = process.env["ACCESS_TOKEN"];
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const id = req.params.id;
  const getPlaylistById = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${id}`,
        { headers: headers }
      );
      const playlistResponse = response.data;
      let tracksResponse = playlistResponse.tracks.items;
      const total = playlistResponse.tracks.total;
      const page = total % 50 ? total / 50 : Math.floor(total / 50) + 1;
      if (total > 100) {
        for (let index = 2; index < page; index++) {
          const params = {
            limit: 50,
            offset: 50 * index,
          };
          const nextResponse = await axios.get(
            `https://api.spotify.com/v1/playlists/${id}/tracks`,
            { headers: headers, params: params }
          );
          tracksResponse = tracksResponse.concat(nextResponse.data.items);
        }
      }
      const tracks = tracksResponse.map((item) => {
        return {
          id: item.track.id,
          name: item.track.name,
          artists: item.track.artists.map((artist) => artist.name).join(", "),
          albumName: item.track.album.name,
          duration: item.track.duration_ms,
          contextUri: item.track.uri ?? '',
          thumbnail:
            item.track.album.images.length > 0
              ? item.track.album.images[2].url
              : "",
        };
      });
      const responseJson = {
        id: playlistResponse.id,
        name: playlistResponse.name,
        thumbnail: playlistResponse.images[1].url,
        tracks: tracks,
        tracksCount: playlistResponse.tracks.total,
      };
      res.json(responseJson);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  };
  getPlaylistById();
});

module.exports = router;
