const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const Contentful = require('spike-contentful')
const locals = {}
const env = process.env.SPIKE_ENV

module.exports = {
  plugins: [
    new Contentful({
      addDataTo: locals,
      accessToken: '6d405922a8ad8bea14ce60958e8c35c94ee3d51d5a08d0c2de6c62d09acd15cb',
      spaceId: 'p7deyor9gd4e',
      contentTypes: [
        {
          name: 'vehicles',
          id: 'vehicle'
        }
      ]
    })
  ],
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  reshape: htmlStandards({
    parser: sugarml,
    locals: () => locals,
    minify: env === 'production'
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards()
}
