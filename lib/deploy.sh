#!/bin/bash

eval $(cat .env)

# Check to see if PREVIEW env variable is set
if ["$PREVIEW" = ""]

then
  echo "Deploying Published Content"
  echo "${AWS_BUCKET_NAME}"
  aws s3 sync build $AWS_BUCKET_NAME --delete --region=$AWS_BUCKET_REGION
else
  echo "Deploying Preview Content"
  echo "${AWS_PREVIEW_BUCKET_NAME}"
  aws s3 sync build $AWS_PREVIEW_BUCKET_NAME --delete --region=$AWS_PREVIEW_BUCKET_REGION
fi