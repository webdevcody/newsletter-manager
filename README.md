# Overview

This is the newsletter application I use for my youtube channel to send out updates to my subscriber.

## Setup

### DynamoDB

Create a Dynamodb table with the pk and sk named "pk" and "sk". Remember the name, you'll need it when setting up the user and policies.

### SES

Setup SES for your domain and verify the identity. Keep track of this identity name since you'll need to update it in the `policy.json`

#### Request SES Production Access

Request production SES to get out of sandbox mode. You'll need to convince AWS you have a legit business reason to be sending emails.

### IAM User and Policy

Create an IAM user for programmatic access and setup your keys inside your .env file.

Modify the `policy.json` file and attach it to your user.

## How to Run

1. npm i
2. npm run dev
3. open http://localhost:3000

## How to Send Emails

1. open http://localhost:3000/compose
2. enter your subject and body and click send
3. watch your logs for when the endpoint is done sending out all the emails

## Importing Emails

If you have a list of existing emails you want to import, create a src/scripts/emails.json that contains an array of all the email address strings you want to import then run `npx ts-node src/scripts/import.ts`.
