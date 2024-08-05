// create a server in express
// and listen to port 3000
// and send a response to the client

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//endpoint to conection with API chatGPT, send description and get response suggestion domains 10
app.post("/chatGPT", (req, res) => {
  const axios = require("axios");
  const { description } = req.body;
  const credencials = "Bearer" + process.env.API_KEY;
  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        // model free
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Eres un asistente experto en sugerir nombres de dominios.",
          },
          {
            role: "user",
            content: `Sugiere nombres de dominios para una empresa con la siguiente descripción: ${description}`,
          },
        ],
        // max_tokens: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: credencials,
        },
      }
    )
    .then((response) => {
      console.log("🚀 ~ .then ~ response:", response);
      res.send(response.data.choices[0].text);
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send(error.response.data);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
