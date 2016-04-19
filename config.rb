# Read from Gulp Starter's config.json file
# and rev-manifest file (if present)
require 'lib/gulp'
require 'lib/package'

# page '/*.xml', layout: false
# page '/*.json', layout: false
# page '/*.txt', layout: false

# Pretty URLs
activate :directory_indexes

# Language Support
set :haml, { :attr_wrapper => '"', :format => :html5 }
set :markdown, fenced_code_blocks: true, smartypants: true
set :build_dir, "public"

# Markdown options
set :markdown_engine, :redcarpet
set :markdown, :tables => true, :autolink => true, :gh_blockcode => true, :fenced_code_blocks => true, with_toc_data: true
