# GoReact Application

Here is my repo for my GoReact application. The features that I decided to focus on for this application are the following:

- Written in Angular 10 and Laravel 7
- Uses Amazon AWS S3 bucket storage to persist media
- Includes user authentication leveraging JWT tokens
- Completely containerized for ease of setup
- Tests written in both the client and the server (wishing I had time to add even more)

## Local Setup

### Prequisites

1. You need to have docker installed on your local machine. You can go to the following URL to get it: https://www.docker.com/get-started
2. You will need to have n

### Installation

1. Clone the repo locally
2. Navigate to root of the repo
3. Run the following command: `docker-compose up`
4. Wait for what feels like forever...

![Waiting](https://media.giphy.com/media/9EuG8bg3yzhzq/giphy-downsized.gif)

5. Once it's done you can navigate to http://localhost:4200 in your browser of choice!

## Testing

### Client

I'm going to go ahead and make the assumption that you have `npm` and `node` installed locally on your computer :)

1. From the root of the repo run the following command: `cd client`
2. Install dependencies locally: `npm i`
3. Run the tests: `npm t`

### Server

From the root of the repo run the following command: `docker-compose exec myapp php artisan test`

This runs the tests directly on laravel docker container. This way you don't have to worry about having `artisan` or the right version of `php` etc.
