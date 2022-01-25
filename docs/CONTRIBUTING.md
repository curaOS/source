# Contributing to CURA

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

-   Reporting a bug
-   Discussing the current state of the code
-   Submitting a fix
-   Proposing new features

We use Github to host code, to track issues and feature requests, as well as accept pull requests. Pull requests are the best way to propose changes to the codebase.

## Report bugs using Github's [issues](https://github.com/curaOS/source/issues)

We use GitHub issues to track bugs. Report a bug by [opening a new issue](https://github.com/curaOS/source/issues/new); it's that easy!

Just make sure to write bug reports with details, background, and sample code.

**Great Bug Reports** tend to have:

-   A quick summary and/or background
-   Steps to reproduce
    -   Be specific!
    -   Give sample code if you can.
-   What you expected would happen.
-   What actually happens.
-   Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## How to contribute?

1. Fork the repo and create your branch from `master`.
2. Add your code and tests if needed.
3. Ensure the code is clean.
4. Always format your code using prettier.
5. Ensure your commits are small and tidy.
6. You may also update the documentation if needed.
7. Issue that pull request and write an awesome description that describes what you did!

> Pull requests gets automatically deployed to Vercel so you can test your changes live

## Merging a Pull Request

We use [semantic-release](https://github.com/semantic-release/semantic-release) to automatically publish packages from `master` to npm, which is relying on the **commit message format** below to determine the next release based on it.

-   When merging a PR, make sure that it has at least one commit with this commit format below. If it doesn't, squash the PR and use this format as a title then merge.

## Commit Message Format

> For a detailed specification, please visit [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)

```
<type>(<package>): <short summary>
  │       │             │
  │       │             └─> A short description of the code change. In present tense. Not capitalized.
  │       │
  │       └─> Package affected: frontend|hooks|components. Can be more than one.
  │
  └─> Commit Type: build|ci|docs|feat|fix|test
```

`<type>` and `<short summary>` fields are required, but the `(<package>)` field is optional.

##### Commit type explanation

-   **build**: Changes that affect the build or management system only (example: yarn, tsconfig.js, package.json)
-   **ci**: Changes to our CI configuration files and scripts (examples: .github/workflows)
-   **docs**: Documentation only changes
-   **feat**: A new feature
-   **fix**: A bug fix
-   **test**: Adding tests or correcting existing tests
