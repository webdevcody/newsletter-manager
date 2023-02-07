#!/bin/bash

endpoint="$1"

while true
do
  status_code=$(curl -s -o /dev/null -w "%{http_code}" $endpoint)
  if [ $status_code -eq 200 ]; then
    echo "${endpoint} is up"
    break
  else
    echo "${endpoint} is down. Waiting for 5 seconds..."
    sleep 5
  fi
done