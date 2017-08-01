# Contentful Metalsmith Boilerplate

[![CircleCI](https://circleci.com/gh/craigmdennis/contentful-metalsmith-starter.svg?style=svg)](https://circleci.com/gh/craigmdennis/contentful-metalsmith-starter)

Built with [Metalsmith](http://www.metalsmith.io/) and [Contentful](https://www.contentful.com) by using a metalsmith plugin: [contentful-metalsmith](https://github.com/contentful/contentful-metalsmith).

# Installation

1. Sign up for Contentful and create a Space.
1. Link your GitHub repo with CircleCI.

## Clone and Install Dependencies

```shell
  $ git clone git@github.com:craigmdennis/contentful-metalsmith-boilerplate.git
  $ cd contentful-metalsmith-boilerplate
  $ yarn
```

## Create Environment Variables

1. Duplicate and rename `.sample.env`to `.env`.
1. Add the Space ID from Contentful to `SPACE_ID`.
1. Add your Content Delivery API Access Token from Contentful to `ACCESS_TOKEN`.

## Run Metalsmith Server

```shell
  # @ contentful-metalsmith-boilerplate
  $ yarn start
```

# Configuration
All metalsmith plugin configuration is handled by `./config/plugins.json` and all site metadata is added by `./config/site.json`.

## Helpers
You can add any js file to `./helpers/*.js` and it will be available in Pug using the filename. For example `./helpers/updatedDate.js` is available as `helpers.updatedDate()` in any Pug template.
  
# Deploying to S3

1. Make sure you have an [AWS credentials file](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-config-files) set up.
1. Create an S3 bucket and [set it up for static website hosting](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).
1. Replace `AWS_BUCKET_NAME` in `.env` with your S3 bucket name.
1. Replace `AWS_BUCKET_REGION` in `.env` with the bucket region.

```shell
  # @ contentful-metalsmith-boilerplate
  $ yarn deploy
```

[Published Content](contentfulmetalsmithdemo.craigmdennis.com.s3-website.eu-west-2.amazonaws.com)
[Preview Content](preview.contentfulmetalsmithdemo.craigmdennis.com.s3-website.eu-west-2.amazonaws.com)
  
# Continuous Integration with Circle CI

## Allow Access to GitHub Code
You will need to set up a deploy hook from within the CircleCI settings. CircleCI does this all for you at the press of a button.

## Add Environment Variables
In CircleCI you will need to add the environment variables to match those that appear in `.env`.

You will also need to add `AWS_BUCKET_NAME` and `AWS_BUCKET_REGION` (e.g. `s3://my-bucket-name` and `eu-west-2`).

## Add AWS Credentials
Add the same credentials you used for deploying from your local machine, to the CircleCI AWS Credentials menu option.

## Build On Push
Any new code that is pushed to `master` will be built and deployed to S3 via CircleCI.

# Rebuild With Contentful

This repo is designed to work out-of-the-box with COntentful's 'Blog' pre-made Space.

## Generate a CircleCI Token
Create a new token under 'Account Settings' -> 'Personal API Tokens'.

## Create a Contentful Webhook
Set the URL to:
```
https://circleci.com/api/v1/project/YOUR_COMPANY/YOUR_PROJECT/tree/YOUR_BRANCH?circle-token=YOUR_CIRCLECI_TOKEN
```

being careful to replace the placeholders with your CircleCI (GitHub) url and the recently created CircleCI token. Then select 'Publish' and 'Unpublish' as the events.

[Find out more about rebuilding with Contentful and CircleCI](https://www.contentful.com/developers/docs/ruby/tutorials/automated-rebuild-and-deploy-with-circleci-and-webhooks/)

# Contentful Preview

## Local Preview
Add your Preview Delivery API Access Token from Contentful to `PREVIEW_TOKEN`.
```shell
  # @ contentful-metalsmith-boilerplate
  $ yarn preview
```

## Deploy Preview to S3
1. Set up a new S3 bucket as before, for static web hosting.
1. Replace `AWS_PREVIEW_BUCKET_NAME` in `.env` with your preview S3 bucket name.
1. Replace `AWS_PREVIEW_BUCKET_REGION` in `.env` with the preview bucket region.

To deploy locally you can run:

```shell
  # @ contentful-metalsmith-boilerplate
  $ PREVIEW=1 yarn deploy
```

[Published Content][1]

[Preview Content][2]

## Continuous Preview Integration with CircleCI
Automatically deploying the preview content takes a little bit of a hack. The compile process needs an additional build parameter (`PREVIEW=1`) which requires modifying the JSON data payload; something you can't do from Contetful (it just sends the content as the payload).

The answer is to use another service as a middle-man; Zapier. While Zapier has a Contentful app, it only triggers on create events so you need to create a custom one from scratch.

## Zapier Setup
1. Create new 'catch' webhook Zap.
1. Paste the Zapier generated webhook URL into a new Contentful webhook and set the entries to 'Save' and 'Autosave'. You don't need 'Publish' or 'Unpublish' becuase no content would change (for the Preview app).
1. Back in Zapier, create a custom request webhook as the second action.
1. Set the method to POST and add the same CirleCI webhook URL from before.
1. Set data pass through to 'No' and add the following as the data.
    ```json
      {"build_parameters":{"PREVIEW":1}}
    ```
1. Set the headers to: `Content-Type` / `application/json`.

## S3 Setup
1. Set up a new S3 bucket for the preview, if you've not already done so.
1. Add `AWS_PREVIEW_BUCKET_NAME` and `AWS_PREVIEW_BUCKET_REGION` to CircleCI.
1. Whitelist access to the S3 bucket by IP. Add the following bucket policy:
    ```json
      {
          "Version": "2008-10-17",
          "Id": "S3PolicyId1",
          "Statement": [
              {
                  "Sid": "IPAllow",
                  "Effect": "Allow",
                  "Principal": {
                      "AWS": "*"
                  },
                  "Action": "s3:*",
                  "Resource": "arn:aws:s3:::preview.my-bucket-name/*",
                  "Condition": {
                      "IpAddress": {
                          "aws:SourceIp": "YOUR.IP.ADDESS.HERE"
                      }
                  }
              }
          ]
      }
    ```

[1]: http://contentfulmetalsmithdemo.craigmdennis.com.s3-website.eu-west-2.amazonaws.com
[2]: http://preview.contentfulmetalsmithdemo.craigmdennis.com.s3-website.eu-west-2.amazonaws.com
