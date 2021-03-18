# Tribe Simulator

Simulates the event API from the AGV website.

## Usage

Place your JSON response containing the event data in the `responses` folder and define the environment variables accordingly.
Run it in development mode using `npm run dev`.

## Environment Variables

`FILE`: should point to the response file you want the simulator to serve. Example: `FILE=./responses/default.json`
`PORT`: the port on which the API should be served.

## Contributing

Feel free to commit the responses you use for testing. But please remove invalid responses, that don't work anymore.
