# Overview

This is the newsletter application I use for my youtube channel to send out updates to my subscriber.

## User Features

- a dedicated page where people can enter their email to subscribe to your newsletter
- a success page which shows a custom message after subscribing
- a dynamodb table which stores all subscriptions
- a cli command for sending out mjml emails to your subscribers
- users can unsubscribe via a rest api and link appended to all emails

## Code Features

- fully deployable using IaC via terraform and serverless framework
- api is a monolambda
- all in typescript
- yarn monorepo approach
- e2e testing using cypress
- integration and unit testing using jest
- everything can be ran locally via docker-compose
- ci/cd setup using github actions for testing and deployment

## How to Run

1. docker compose build
1. docker compose up
1. open http://localhost:3000

## How to Develop

My goal is to get all of this project 100% running in docker for local development. This means you'd need to docker exec into the shell container to do any one off commands or scripts. It's a bit more overhead, but I think it's worth it for consistency across developers and machines.

1. `docker-compose up`
2. `docker exec -it shell /bin/bash`

## Running E2E Tests

1. `docker exec -it shell /bin/bash`
1. `yarn workspace @wdc-newsletter/e2e cypress`

## How to Send Emails

1. `. ./load-env.sh .env.prod`
1. `npx ts-node ./scripts/src/sendEmailsCli.ts "My New T3 Stack Course is Live" "./data/emails/t3-course.mjml"`

## Importing Emails to Prod

1. update .env to have prod info
2. create a `src/scripts/emails.json` with array of email address
3. run `npx ts-node src/scripts/import.ts`

## Deployment

Create a Dynamodb table with the pk and sk named "pk" and "sk". Remember the name, you'll need it when setting up the user and policies.

### SES

Setup SES for your domain and verify the identity. Keep track of this identity name since you'll need to update it in the `policy.json`

#### Request SES Production Access

Request production SES to get out of sandbox mode. You'll need to convince AWS you have a legit business reason to be sending emails.

### IAM User and Policy

Create an IAM user for programmatic access and setup your keys inside your .env file.

Modify the `policy.json` file and attach it to your user.

#### ACM

Create and validate a certficate for the following:

- newsletter.webdevcody.com
- newsletter-api.webdevcody.com

#### Domain

- Setup CNAME for api
- Setup CNAME for ui

#### Deploying the UI

- setup and source .env by running `. ./load-env.sh`
- yarn deploy:ui
- make sure to add the certificate and alternate domain name to cloudfront distrubtion

#### Creating Gateway Domain

- yarn workspace @wdc-newsletter/api create-domain

#### Deploying the API

- setup and source .env by running `. ./load-env.sh`
- yarn deploy:api

# Issues
