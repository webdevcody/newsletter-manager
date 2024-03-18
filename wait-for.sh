#!/bin/bash

endpoint="$1"

while true
do
  status_code=$(curl -s -o /dev/null -w "%{http_code}" $endpoint)
  echo $status_code
  if [ $status_code -eq 200 ] || [ $status_code -eq 400 ]; then
    echo "${endpoint} is up"
    break
  else
    echo "${endpoint} is down. Waiting for 5 seconds..."
    sleep 5
  fi
done