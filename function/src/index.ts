import * as functions from "firebase-functions/v2/https";
import express from "express";

const app = express();

// Your routes here
app.get("/", (req, res) => {
  res.send("Hello from Firebase + Express!");
});

export const api = functions.onRequest(app);
