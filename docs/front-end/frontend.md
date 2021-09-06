---
description: A Next.js app continuosly deployed on Vercel.
---

# Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the file.

## Tools

### State

* **unstated-next:** to wrap up Near Context
* **recoil**: state for app-related info
* **SWR**: contract data fetch and cache

### Design

* **theme-ui**: for a consistent themable UI

## Packages Development

To enable hot reloading of the packages while developing add the following to your app's `next.config.js`:

```bash
const withTM = require('next-transpile-modules')(['@cura/[package-name]'])

module.exports = withTM({
    webpack5: false, // you want to keep using Webpack 4
})
```

In the library you are trying to use, substitute the following entries:

```bash
   "main": "src/index.ts",
    "files": [
        "src"
    ],
```

Then make sure you `yalc publish` in the package and `yalc add @cura/[package-name]` in your app.

