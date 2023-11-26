const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

const router = express.Router();

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const baseUrl = process.env.BASE_URL;
const redirectURI = `${baseUrl}/auth/callback`;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let index = 0; index < length; index++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/login", (req, res) => {
  const scope =
    "streaming user-read-email user-read-private user-read-currently-playing";
  const state = generateRandomString(32);
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: redirectURI,
    state: state,
  });
  res.redirect(
    `https://accounts.spotify.com/authorize?${queryParams.toString()}`
  );
});

router.get("/callback", (req, res) => {
  const code = req.query.code;
  const authFormat = `${spotify_client_id}:${spotify_client_secret}`;
  const authorization = `Basic ${Buffer.from(authFormat).toString("base64")}`;
  const headers = {
    Authorization: authorization,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const body = {
    code: code,
    redirect_uri: redirectURI,
    grant_type: "authorization_code",
  };
  const getAccessToken = async () => {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body,
      {
        headers: headers,
      }
    );
    process.env["ACCESS_TOKEN"] = response.data.access_token;
    res.redirect("http://localhost:3000/home");
  };
  getAccessToken();
});

router.get("/logout", (req, res) => {
  process.env["ACCESS_TOKEN"] = "";
  res.status(200).send({});
});

router.get("/token", (req, res) => {
  res.json({
    accessToken: process.env.ACCESS_TOKEN ?? "",
  });
});

module.exports = router;
