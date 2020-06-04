const http = require("http");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/:url", (req, res) => {
  const { url } = req.params;
  http.get(`http://${url}`, (response) => {
    const { headers, statusCode} = response;
    if (statusCode !== 200) return res.sendStatus(statusCode);
    let data = "";
    response.on("data", (chunk) => (response += chunk));
    response.on("end", () => res.send(data));
    console.log("headers", headers);
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
