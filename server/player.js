const express = require("express");
const axios = require("axios");

const router = express.Router();

router.put("/", (req, res) => {
  const accessToken = process.env["ACCESS_TOKEN"];
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const body = {
    device_ids: [req.body.deviceId],
  };
  const transferPlayback = async () => {
    try {
      await axios.put("https://api.spotify.com/v1/me/player", body, {
        headers: headers,
      });
      res.json({ transfer: true });
    } catch (error) {
      res.json(error);
    }
  };
  transferPlayback();
});

router.put("/play", (req, res) => {
  const accessToken = process.env["ACCESS_TOKEN"];
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const contextUri = req.body.contextUri;
  const body = {
    uris: [contextUri],
    position_ms: 0,
  };
  const playTrack = async () => {
    try {
      await axios.put("https://api.spotify.com/v1/me/player/play", body, {
        headers: headers,
      });
      res.json({});
    } catch (error) {
      res.json(error);
    }
  };
  playTrack();
});

module.exports = router;
