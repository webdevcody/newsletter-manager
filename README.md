# Overview

This is the newsletter application I use for my youtube channel to send out updates to my subscriber.

## How to Run

1. npm i
1. docker-compose up
1. open http://localhost:3000

## Connect to Shell container

`docker exec -it shell /bin/bash`

## Running Cypress

unfortunatley, cypress open will require you to install the node_modules:

1. npm run cypress:open

## How to Send Emails

1. `npx ts-node ./src/scripts/sendEmailsCli.ts "welcome to the jungle" "./src/data/emails/welcome.mjml"`

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
