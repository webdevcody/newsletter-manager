#!/bin/bash

endpoint="$1"

while true
do
  status_code=$(curl -s -o /dev/null -w "%{http_code}" $endpoint)
  if [ $status_code -eq 200 ]; then
    echo "Endpoint is up"
    break
  else
    echo "Endpoint is down. Waiting for 5 seconds..."
    sleep 5
  fi
done