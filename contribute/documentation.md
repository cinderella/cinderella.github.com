---
layout: cinderella-default
title: Contributing to the Docs
---

## Overview

[Cinderella.io](http://www.cinderella.io) is hosted in GitHub pages.

Pages are written in Markdown, converted to HTML using [Jekyll](https://github.com/mojombo/jekyll), and pushed to GitHub as static content. GitHub watches for changes and republishes automatically.

## Writing Markdown

Markdown ([syntax](http://daringfireball.net/projects/markdown/syntax)) allows the docs to be viewed raw on GitHub (e.g. [this page](https://github.com/cinderella/cinderella.github.com/blob/master/contribute/documentation.md)) and easily converted to HTML for the site.

Please start your Markdown with the following snippet. Jekyll uses this to convert the pages to HTML, with the `title` used for &lt;title&gt; and initial &lt;h1&gt;.

	---
	layout: cinderella-default
	title: <your page heading goes here>
	---

## Convert to HTML

In in the root directory of your local copy of [cinderella/cinderella.github.com](https://github.com/cinderella/cinderella.github.com) run:
	
	jekyll
	
or

	jekyll --server --auto
	
	
Both commands rebuild static content to `/_site`.

The first command quickly rebuilds the site, the second runs a local `server` that allows you to preview your content, and `auto`matically rebuilds as it detects changes. (NB: Jekyll can be a bit sleepy to detect changes.)

The local server is at [localhost:4000](http://localhost:4000/). You can use `jekyll --server [port]` to customize this.

## Pushing New Content Live

Complete the pull request process (like [committing code]({{ site.url }}/contribute/code.html)). When your pull request is accepted the content of `/_site` will automatically be republished to [cinderella.io](http://www.cinderella.io).