---
layout: cinderella-default
title: Writing Code
---

## Overview

The following sections explain how to access the Cinderella code base, make changes to it, and send us a request to pull your changes into the Cinderella
master.

## Creating and Working with your Fork of Cinderella

### 1.  Setup your Personal Fork

   *  [Download Git](http://git-scm.com/download)  (Alternatively, Mac users may consider [mac.github.com](http://mac.github.com/))
   *  Go to [GitHub](http://github.com) and fork [cinderella/cinderella](https://github.com/cinderella/cinderella)

### 2.  Create your Local Repository

   *  Follow the excellent instructions in the [learn.github.com](http://learn.github.com/)  guide to [clone a repository](http://learn.github.com/p/setup.html#cloning_a_git_repo)

### 3.  Pull Changes to your Fork

   *  Run `git remote add cinderella git://github.com/cinderella/cinderella.git`
   *  Run `git pull --rebase cinderella master` [(Why rebase?)](http://stackoverflow.com/questions/5968964/avoid-unwanted-merge-commits-and-other-commits-when-doing-pull-request-in-github)

<!---
### 4.  Run Unit Tests
   *  Run `mvn clean test`
-->

## Contributing your Changes back to Cinderella

### 1. Commit your Changes

   *  Make sure your commit includes tests that cover the code change.
   *  Make sure everything compiles and all of the tests are successfully running for each commit.

### 2.  Update your Current Repository with Cinderella Master

   *  Run `git remote add cinderella git://github.com/cinderella/cinderella.git`
   *  Run `git pull --rebase cinderella master` [(Why rebase?)](http://stackoverflow.com/questions/5968964/avoid-unwanted-merge-commits-and-other-commits-when-doing-pull-request-in-github)
   *  Run `git push` 
   
**Note** - This will push ALL committed changes to your fork.  If you have committed changes to your local repository that are not yet in GitHub, those changes will be pushed in addition to the commits from the main Cinderella repository.
<!---
### 3.  Run Unit Tests

   *  Run `mvn clean test`
-->

### 3.  Create a Pull Request

   *  Go to your fork of Cinderella in GitHub
   *  Click on "Pull Request" in the upper right of the page
   *  Please add a detailed description of your commit.  If you do not do this, it may take some time before we pull your commit into the Cinderella master
      while we are attempting to decipher the intent behind your commit.  
   *  Please also reference any issues that your commit may resolve. 


