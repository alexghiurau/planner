# Changelog

## 11/02/2018

* project folder created
* npm package.json and dependencies set up
* index.html, style.css, server.js created
* express set up on server.js

## 16/02/2018

* mysql database set up and connected
* temporary index.js modifications to allow user input
* input into db (through app.get() and query string)
* put retval into page (as json)

## 18/02/2018

* retval now displays properly inside grid
* grid is now responsive to screen size

## 28/02/2018

* separated database functions inside server.js

## 12/03/2018

* user can input data without using app.get() and query string
* things now properly get stored inside the db
* database structure fixed, now properly uses weekNo as the identifier and primary key
* style changes for accessibility and usability

## 14/03/2018

* deletion implementation (does not work yet properly)

## 17/03/2018

* weeks can now be deleted by clicking the X button (hover), similar to JStagram
* deletion works properly with Database
* deletion now uses app.delete()
* added some brief documentation
* readme.md updated to follow proper layout
* init sql file cleaned up
* favicon added to /img/

## 21/03/2018

* code for loading units added
* test data added for units in the db

## 23/03/2018

* updating weeks is now possible by clicking contenteditable p elements
* updating now uses app.put()
* now properly updates the database with SQL
* new hover button similar to deletion button created for saving changes to weeks
* favicon changed
* changes to style.css for QoL
* changes to readme.md

## 26/03/2018

* can now change week number of a week without getting undefined error

## 27/03/2018

* code for units temporarily removed
* style.css changes for QoL

## 30/03/2018

* readme.md changes
* units code permanently removed
* code clean up
* changes to html form css
* remove .DS_Store files
* fix startup script for server to "npm run dashboard"

## 1/4/2018

* readme (reflection) edited
* eslint cleaning up

## 2/4/2018
* css cleanup (grid)

## 3/4/2018
* small QoL changes to index.js
* add error handling to server.js
* readme.md edits
* linter / beautify cleaning up
* set up GitHub repo properly
* re-validate html and css files
* fix package.json with new startup script
