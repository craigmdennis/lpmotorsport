const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const assets = require('metalsmith-assets')
const sass = require('metalsmith-sass')
const markdown = require('metalsmith-markdown')
const dataMarkdown = require('metalsmith-data-markdown')
const contentful = require('contentful-metalsmith')
const htmlmin = require('metalsmith-html-minifier')
const date = require('metalsmith-build-date')
const permalinks = require('metalsmith-permalinks')
const babel = require('metalsmith-babel')
const postcss = require('metalsmith-postcss')
const mIf = require('metalsmith-if')
const browserSync = require('metalsmith-browser-sync')
const extend = require('extend')

// Allow the use of .env files
require('dotenv').config()

// Configuration
const config = require('./config/plugins.json')
const site = require('./config/site.json')

// Require all helpers
const requireDir = require('require-dir')

// Conditionally run plugins when serving
const serve = process.env.SERVE
const preview = process.env.PREVIEW
const spaceID = process.env.SPACE_ID

// Extend the pug options as 'engine' needs
// to be set in this file
const pugOptions = extend({
  engine: 'pug',
  helpers: requireDir('./helpers')
}, config.pugOptions)

// Metalsmith Pipeline
Metalsmith(__dirname)
  .metadata(site)
  .source('src')
  .destination('build')
  .clean(true)
  .use(date({ key: 'dateBuilt' }))
  .use(mIf(
    !preview,
    contentful({
      space_id: spaceID,
      access_token: process.env.ACCESS_TOKEN
    })
  ))
  .use(mIf(
    preview,
    contentful({
      space_id: spaceID,
      access_token: process.env.PREVIEW_TOKEN,
      host: 'preview.contentful.com'
    })
  ))
  .use(layouts(pugOptions))
  .use(assets(config.assetOptions))
  .use(babel(config.babelOptions))
  .use(sass(config.sassOptions))
  .use(postcss(config.postcssOptions))
  .use(markdown(config.markdownOptions))
  .use(dataMarkdown(config.dataMarkdownOptions))
  .use(permalinks(config.permalinkOptions))
  .use(mIf(
    serve, [browserSync(config.bsOptions)]
  ))
  .use(mIf(
    !serve, [htmlmin(config.htmlminOptions)]
  ))
  .build((err, files) => {
    if (err) {
      throw err
    }

    console.log('Completed.')
  })
