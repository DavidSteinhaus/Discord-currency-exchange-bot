# Discord Currency Exchange Bot

Welcome to the Discord Currency Exchange Bot project! This bot allows you to easily check the purchase rate for various currencies directly from Discord.

## Features

- Shows the current purchase rate for various currencies
- Simple and easy to use commands
- Simple and easy to edit bot configurations directly from Discord without the need to change the code.

## Getting Started

We do not currently host the bot publicly. If you want to use the bot in your server you will need to create and host the bot yourself. There are two things you will absolutely need to host it:

1. [Discord bot token](https://discord.com/developers/applications).
2. [Open exchange API](https://openexchangerates.org/).

Commands list:

- `!config`
  - `!config help`
  - `!config add`
  - `!config remove`
  - `!config remove-all`
  - `!config set-base`
- `!convert`
- `!rate`

## Configuration

When configuring the bot for the first time you will need to run the command `!config base [SYMBOL]` to set the base you are exchanging to.
(Please keep in mind the bot only works with currency symbols and not currency names for example: `USD`, `EUR`)
after setting the base can add one or multiple currencies with the add command like this:
`!config add USD EUR GBP TRY` etc...
this is it you are all set up and ready to go type `!rate` and see the wonders.

## Contributing

We welcome contributions to the Discord Currency Exchange Bot project! If you have an idea for a new feature or have found a bug, please open an issue on the [GitHub repository](https://github.com/DavidSteinhaus/Discord-currency-exchange-bot).

## License

This project is licensed under the **MIT** license. Please see the [LICENSE](https://github.com/DavidSteinhaus/Discord-currency-exchange-bot/blob/main/LICENSE.md) file for more information.
