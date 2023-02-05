#!/bin/bash

aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?ends_with(@,'webdevcody.com')]].Id" | jq -r '.[0]'
ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?ends_with(@,'webdevcody.com')]].Id" | jq -r '.[0]')
echo $ID
aws cloudfront create-invalidation --distribution-id $ID --paths "/*"

