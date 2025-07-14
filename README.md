# Travel Time Loading Bar

This project demonstrates travel time progress bars that you can create yourself.
Open the page and use the **+** button to add a new loading bar by providing a
name, a start time and an end time. Each bar updates automatically every second
to show how much of the journey has passed.

View the live page here: [Travel Time Loading Bar](https://roink.github.io/travel-time-loading-bar/)

## Setup

Ensure the tools listed in `requirements.txt` are installed (Node.js and npm).
Then run:

```bash
./setup.sh
```

This installs the Node dependencies needed for testing.
If installation fails, ensure your environment has access to the npm registry.

## Running tests

After running the setup script, execute:

```bash
npm test
```

This project uses Jest with the `jsdom` environment.
