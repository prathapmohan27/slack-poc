require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { InstallProvider } = require("@slack/oauth");
const cors = require("cors");
const { WebClient } = require("@slack/web-api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
});

app.route("/").get((req, res) => {
  slack.res.send("Hello World!");
});

const user = "U089QLQQ0AX";

app.get("/slack/install", async (req, res) => {
  try {
    const url = await installer.generateInstallUrl({
      scopes: ["app_mentions:read", "chat:write"],
      metadata: "user_id",
      // redirectUri: process.env.SLACK_REDIRECT_URI,
    });
    res.json({ url });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/slack/callback", async (req, res) => {
  try {
    req.headers.cookie = "slack-app-oauth-state=" + req.query.state;
    const result = await installer.handleCallback(req, res, {
      success: async (installation, metadata, req, res) => {
        const botToken = installation.bot.token;
        console.log(`Bot token: ${botToken}`);
        const r = await new WebClient(botToken).chat.postMessage({
          channel: installation.user.id,
          text: "Hello world!",
        });
        console.log(r);
        console.log("user id: ", installation.user.id);
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// send message to all users
app.get("/send", async (req, res) => {
  try {
    const botToken = process.env.SLACK_BOT_TOKEN;
    const result = await new WebClient(botToken).chat.postMessage({
      channel: user,
      text: "Hello world!",
    });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.get("/test/connection", async (req, res) => {
  try {
    const botToken = process.env.SLACK_BOT_TOKEN;
    const client = new WebClient(botToken);

    // Check if the bot token is valid
    const authTestResult = await client.auth.test();
    if (!authTestResult.ok) {
      return res.status(401).json({ error: "Invalid or expired bot token" });
    }

    // Check if the user is still authorized
    const userInfoResult = await client.users.info({ user });
    if (!userInfoResult.ok) {
      return res
        .status(401)
        .json({ error: "User has uninstalled the app or is not authorized" });
    }

    res.json(userInfoResult);
  } catch (error) {
    if (error.data && error.data.error === "account_inactive") {
      return res
        .status(401)
        .json({ error: "Account is inactive or user has uninstalled the app" });
    }
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
