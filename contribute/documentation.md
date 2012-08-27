---
layout: cinderella-default
title: Contributing to the Docs
---

## Overview

[Cinderella.io](http://www.cinderella.io) is hosted in GitHub pages.

Pages are written in Markdown and pushed to GitHub Pages.

Post-push pages are  automatically converted to HTML using [Jekyll](https://github.com/mojombo/jekyll) and republished.

## Writing Markdown for Jekyll

Markdown ([syntax](http://daringfireball.net/projects/markdown/syntax)) allows pages to be viewed/edited raw on GitHub (e.g. [this page](https://github.com/cinderella/cinderella.github.com/blob/master/contribute/documentation.md)) in addition to making it clean and simple to write the site's content.

Please start your Markdown with the following snippet. Jekyll uses this to convert the pages to HTML, with the `title` used for &lt;title&gt; and initial &lt;h1&gt;.

	---
	layout: cinderella-default
	title: <your page heading goes here>
	---

## Adding Pages to the Menu

The website's menu is a nested list in `/_includes/sidebar.html`. Javascript is used to expand the relevant sections as the reader descends into the site.

## Local Review Using Jekyll

In in the root directory of your local copy of [cinderella/cinderella.github.com](https://github.com/cinderella/cinderella.github.com) run:
	
	jekyll
	
or

	jekyll --server --auto
	
	
Both commands rebuild static content to `/_site`.

The first command quickly rebuilds the site, the second runs a local `server` that allows you to preview your content, and `auto`matically rebuilds as it detects changes. (NB: Jekyll can be a bit sleepy to detect changes.)

The local server is at [localhost:4000](http://localhost:4000/). You can use `jekyll --server [port]` to customize this.

Note: `/_site` is only used locally and is not required for upload.

## Pushing New Content Live

Complete the pull request process (like [committing code]({{ site.url }}/contribute/code.html)). When your pull request is accepted the content will automatically be republished to [cinderella.io](http://www.cinderella.io).