[Clash Royale Challenge App](http://clash-royale-challenge.surge.sh)

Small web app that generates random deck from Clash Royale Game  with its cards(8 cards). Each card has single character, building, or
spell. Each card has some characteristics like (name, elixir cost, type and rarity.. etc). Your task is to generate random
decks based on the available cards provided through Clash API. Each time you click on generate button will generate
new random deck with different random cards.

This App was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), make change on config by [react-app-rewired](https://github.com/timarney/react-app-rewired), and use reduex as a state management,

  I used react-app-rewired on this project to add Alias,
  and I used css-in-js  library[EMOTION](https://emotion.sh/docs/introduction) to  have better performance in first place,
  and use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) as commits conventonal,
  and I used eslintrc and prettierrc for linter if you user VSCode you can add on setting file  this lines to have autofix on save.

  ```
    [
      "eslint.options": {
            "extensions": [
                ".js"
            ]
        },
        "eslint.autoFixOnSave": true,
        "eslint.validate": [
            {
                "language": "javascript",
                "autoFix": true,
            },
            "javascriptreact",
        ],
    ]
  ```

To run App after clone the repo run

``` npm i && npm start ```
