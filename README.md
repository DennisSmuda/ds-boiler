# DS Boilerplate

> 🤘 Welcome to my Boilerplate 🤘

## ⚙️ Installation

```bash
git clone https://github.com/DennisSmuda/ds-boiler.git my-new-project

cd my-new-project
npm i # install dependencies
npm start # starts dev server at `http://localhost:3000`

```

**alternatively** you can [create a repo from this template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template)

## ⚡️ Development

> WIP

## 💡 Features

- [Express.js](https://expressjs.com/) with [pug](https://pugjs.org/) templates
- [webpack](https://webpack.js.org/) build step with ECMA2020 and PostCSS support

## 🗂 Directory Structure

```
  .
  ├── app # JavaScript Client-Application source files
  ├── public # Compiled files
  ├── shared # Files that get copied into the `public` directory
  ├── src # Source files (alternatively `lib` or `app`)
  ├── styles # PostCSS stylesheets
  ├── views # pug views
  ├── webpack # config files
  └── README.md
```

## 🌱 Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

```bash
      $ sudo apt install nodejs
      $ sudo apt install npm
```

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

```bash
    $ node --version
    vX.YY.Z

    $ npm --version
    x.y.z
```
