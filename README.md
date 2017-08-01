# LP Motorsport

[![CircleCI](https://circleci.com/gh/craigmdennis/lpmotorsport.svg?style=svg)](https://circleci.com/gh/craigmdennis/lpmotorsport)

Built with [Metalsmith](http://www.metalsmith.io/) and [Contentful](https://www.contentful.com) by using a metalsmith plugin: [contentful-metalsmith](https://github.com/contentful/contentful-metalsmith).

# Installation

1. Sign up for Contentful and create a Space.
1. Link your GitHub repo with CircleCI.

## Clone and Install Dependencies

```shell
  $ git clone git@github.com:craigmdennis/lpmotorsport.git
  $ cd lpmotorsport
  $ yarn
```

## Create Environment Variables

1. Duplicate and rename `.sample.env`to `.env`.
1. Add the Space ID from Contentful to `SPACE_ID`.
1. Add your Content Delivery API Access Token from Contentful to `ACCESS_TOKEN`.

## Run Metalsmith Server

```shell
  # @ lpmotorsport
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
  # @ lpmotorsport
  $ yarn deploy
```

[Published Content][1]

[Preview Content][2]

# Contentful Preview

## Local Preview
Add your Preview Delivery API Access Token from Contentful to `PREVIEW_TOKEN` in `.env`.
```shell
  # @ lpmotorsport
  $ yarn preview
```

## Deploy Preview to S3
1. Set up a new S3 bucket as before, for static web hosting.
1. Replace `AWS_PREVIEW_BUCKET_NAME` in `.env` with your preview S3 bucket name.
1. Replace `AWS_PREVIEW_BUCKET_REGION` in `.env` with the preview bucket region.

To deploy locally you can run:

```shell
  # @ lpmotorsport
  $ PREVIEW=1 yarn deploy
```

[Published Content][1]

[Preview Content][2]

[1]: http://lpmotorsport.s3-website.eu-west-2.amazonaws.com
[2]: http://preview.lpmotorsport.s3-website.eu-west-2.amazonaws.com
