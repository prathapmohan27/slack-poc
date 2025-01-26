# Slack (POC) Setup

## Check out pricing details

## Getting Started

Follow the official Slack SDK guide for Node.js to get started: [Slack SDK Documentation](https://slack.dev/node-slack-sdk/)

## Workflow

1. Redirect the user to the Slack OAuth page.
2. After successful login, capture the `user_id` and `bot_id` from the response.
3. Store the `user_id` and `bot_id` in your database.
4. Use the `user_id` and `bot_id` to notify the user via Slack.

## Create a Slack App

1. Navigate to [Slack API Apps](https://api.slack.com/apps) and create a new Slack app within your Slack workspace.
2. Obtain the `client_id` and `client_secret` from the app's Basic Information page.

## OAuth & Permissions

1. Open your app in the Slack dashboard.
2. Go to the OAuth & Permissions section.
3. Add required bot token scopes based on your app's functionality.
4. Add your application's Redirect URL.

## Token Information

- **Bot Token**: This token does not expire.
- **Re-login**: If the user manually uninstalls the bot, they must log in again to reauthorize it.

## Development Dependencies

Install the required Node.js packages for Slack integration:

```sh
npm install @slack/oauth @slack/web-api
```
