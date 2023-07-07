import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

const app = express();
const token = process.env.TOKEN;
const url = "https://gorest.co.in/public-api/users/";
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/get/list", async (req, res) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  if (response.data.code === 200) {
    res.send(response.data.data);
  } else {
    res.send("Oops there was some error please load the page again...");
  }
});

app.post("/post/data", async (req, res) => {
  const data = req.body;
  const response = await axios.post(url, JSON.stringify(data), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  res.send(response.data);
});

app.patch("/update/data/:id", async (req, res) => {
  const data = req.body;
  const URL = url + `${req.params.id}`;
  const response = await axios.patch(URL, JSON.stringify(data), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  res.send(response.data);
});

app.delete("/delete/data/:id", async (req, res) => {
  const URL = url + `${req.params.id}`;
  const response = await axios.delete(URL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  res.send(response.data);
});

app.listen(8000, () => {
  console.log("Server is Listening on port 8000");
});
