# LoveHeart
![GitHub package.json version](https://img.shields.io/github/package-json/v/browser-vm/Loveheart) ![GitHub repo size](https://img.shields.io/github/repo-size/browser-vm/Loveheart) [![Docker](https://github.com/browser-vm/LoveHeart/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/browser-vm/LoveHeart/actions/workflows/docker-publish.yml)

A speeding, lightweight proxy for bypassing internet censorship.

## Features

-   Bypasses internet censorship
-   Uses [ChemicalJS](https://github.com/chemicaljs/chemical) for proxying and component management
-   Simple terminal-like interface
-   Supports custom search engines
-   Includes back, forward, reload, and close navigation buttons
-   Confirmed bypass for most sites blocked by AT&T

## Usage

1.  Clone the repository:

    ```bash
    git clone https://github.com/browser-vm/LoveHeart.git
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Run the proxy:

    ```bash
    npm start
    ```

4.  Open your web browser and navigate to `http://localhost:3000`

## Development

### Testing

This project uses [Jest](https://jestjs.io/) for unit testing. Tests are located in the `__tests__` directory.

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (useful during development)
npm run test:watch
```

### Linting

This project uses [ESLint](https://eslint.org/) for code quality and consistency.

```bash
# Lint all JavaScript files
npm run lint

# Lint and automatically fix issues
npm run lint:fix
```

## Docker
Our docker build image is available both on the Github container registry AND the [official Docker registry](https://hub.docker.com/r/browservm/loveheart).

## Links
COMING SOON!!!

## Updates
I'll post updates on the status of the proxy here every now and then.

## Releases
It's official. Release 0.0.3 is here. And it works.

## Issues
If you need another link, [email me](mailto:namelessonbandlab@outlook.com). We refuse to be blocked by censors.

## License

BSD 3-Clause
