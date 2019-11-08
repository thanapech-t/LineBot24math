const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/webhook", (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  reply(reply_token);
  res.sendStatus(200);
});

app.listen(port);

function randomNumber() {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    let number = Math.floor(Math.random() * 9) + 1;
    arr.push(number);
  }
  return arr.join(" ");
}

function reply(reply_token) {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer {yFxy1RzCMiuvV9MhDF94+J0RLca42YuLGBCQwXQmfj8yCpHvwPwLdtbJG6uZAM9a7Mga2dzrP94tkBJurfdWyxfIRcBMOtJfF9LwTLuhEBi0vh17PMwy3XvddbQrSbRZgg4YfuTpbCQ5GqidMJJrUwdB04t89/1O/w1cDnyilFU=}"
  };

  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text:
          reply_token === "random !" ? randomNumber() : "please click button"
      }
    ]
  });
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers: headers,
      body: body
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}
