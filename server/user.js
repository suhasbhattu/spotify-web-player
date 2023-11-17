const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
  const accessToken = process.env["ACCESS_TOKEN"];
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const getCurrentUser = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: headers,
      });
      const responseJson = {
        displayName: response.data.display_name,
      };
      process.env['USER_ID'] = response.data.id;
      res.json(responseJson);
    } catch (error) {}
  };
  getCurrentUser();
});

module.exports = router;
