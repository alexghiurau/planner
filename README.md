# WebScript Planner

A planning tool web app that allows users to create units and add weeks to these,
along with lecture, lab, seminar topics, resources and notes. A reflection upon this work can be found towards the end of this document.

**Note:** GitHub showed my real name on all commits so I had to remake the repository, therefore it will not have many commits.

## Prerequisites

This web app uses MySQL therefore you will either need MySQL or MariaDB installed.

## Installation

To install dependencies:
```
npm install
```
To set up the database (MySQL service must be running):
```
npm run initsql
```
The current user is _localhost_ and password is _root_ for compatibility. This can be changed in the config.js file. Also note that running this script deletes the database if it already exists. Only use this script if you are sure you want to delete the database if it exists already.

## Usage

To start the app, type into the terminal:
```
npm run dashboard
```
Then go to your browser and access from either [localhost:8080](http://localhost:8080) or [127.0.0.1:8080](http://127.0.0.1:8080).

#### Create a week

From here you can create a week by typing in the details in the form. Note that week number, lecture and lab topics are required.

#### Edit a week

To edit the contents of a week, just click on the text you wish to edit. After that just hover over the week and click the green check mark button.

#### Delete a week

To delete a week simply hover over it and click the red "X" button.


## Contributing

1. Fork this repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## History

I have kept a manual [changelog](changelog.md) for this project. It only shows the major changes.

## Reflection

This section is a reflection on the decisions I have made for this project, constraints and limitations and things learned.

#### Design choices

In terms of visual design, I decided to "recycle" my WEBF1 website and have used it for this project. The colour scheme and navigation bar remained the same. I believe the current design is simple and accessible and on par with other material design implementations. At first I wanted to use the Bootstrap library for its grid and nicely styled elements, but I thought by doing it myself I would learn new things. It is also not justified loading the Bootstrap and jQuery library just for this.

I wanted the app to use grid because it is a new feature of CSS and supported in the modern popular browsers. I have found it very easy to use (even easier than Bootstrap's grid) and for me it has worked very well. I could have achieved the same by using div elements for each week created, but in my opinion this is much cleaner. By using grid I learned that I can use repeat() instead of writing out the grid fractions which is much more efficient and looks cleaner. I have used the html template element to create a template which could later be used by Javascript to create new weeks asynchronously.

#### Package choices

To create this app I have used different packages from npm. The first package is express - I used this package because it makes creating a server and handle routing much easier than the standard way. Express is very lightweight and its syntax is very clean and human-readable, which saved me some time with the documentation.

The other packages I have used are mysql and mysql2. I needed an environment to store data in, and thought that a mysql database would work well here. It is widely supported and documented, and allows for long-term data storage. The syntax is also simple and familiar, which made development faster and easier. Mysql2 supports promises, which I took some time to understand but in the end it made things a lot easier because I was able to see how it works alongside await and fetch. It also returns useful and meaningful error messages which helped me a lot in troubleshooting the app.

Using npm and packages also taught me how to create my own packages, and how to export those so that they can be used in other files. I have exported functions in variables in several examples, such as the config.js which is then used by the server to connect to the database.

#### Folder / file structure

I like my work area to be tidy and clear, therefore I tried my best to group files with things in common into folders. I have followed a similar folder structure to the JSBook example as I thought it was clean and made sense.

I decided to separate the server from the database functions to keep things clean. Therefore the server.js file only needs to set up the server, routes and call functions for model-mysql.js file to carry out. Doing this using the express functions was simple. By using a logical and clean folder structure I believe it will help other developers work on this app, thus making it more maintainable.

#### Coding style / maintainability / documentation

I am still experimenting and finding my own coding style but I wanted to ensure I use ES6 syntax for future-proofing reasons. ES6 syntax also shortens a lot of functions and keeps things neat. For example I have used arrow functions inside model-mysql.js which allowed me to export these functions on the same line. I have used ESlint to ensure my code follows the standards set by AirBnB (same configuration file as JStagram) and does not have errors. Linter taught me that I should not just write code and consider it is correct just because it compiles and that following standards set by professionals is good practice. The only errors the linter throws are the use of unused variables and 'module is undefined' but this is just due to the linter's settings (I left the linter config files inside the project for now, should anyone else want to use it). I also used the Atom Beautify package to clean up my code and keep indentation consistent and clean. For the week number dropdown I wanted to create it using JavaScript to reduce clutter in the html file but in the end it seemed redundant as it only occurs on a single html page and running a for loop just to populate this dropdown seemed not very efficient, so in the end I chose function over aesthetics.

I checked to see if my app used HTML5 and CSS3 using the HTML5 and CSS3 validator websites, just like in WEBF1. All my functions and variables have meaningful names and all file names make sense and are meaningful. I was told to only provide comments where needed, so I only wrote brief comments above functions that were not self-explanatory or other lines of code that looked confusing. I wanted the readme to be useful and follow industry standards, so I used a template from GitHub. I ensured I used error checking where possible, giving out as much information as I can. I had to learn this the hard way from all the times I had problems with my code and did not know where to start looking. By using GitHub I was able to understand the importance of open source software and wish to be a part of this community. I have added an open source license to this project (ISC).

#### Functionality

I liked the idea of having multiple weeks which could be created, edited and deleted by the user. I have created those using section html elements and used css grid to lay them out evenly in the page. To post and get weeks was not very challenging to implement, I think the most challenging bit was editing a week. I used the "contenteditable" property in html which simplified things (no need for an extra form) but it took me a while to understand how to implement this feature using Javascript, especially editing the week number. To solve this I was helped and found out that I could use _e.target.parentElement_ instead of looping through the child elements of main.

 Currently the new week form is in the same page as the weeks and in the future I would handle this differently, because I don't think the form is very appealing at the moment - maybe hide it in a similar manner to Bootstrap's modals. Also styling the form was a little challenging as there are many ways to do it, but I decided to keep it simple and not use fancy CSS on it. My aim was to have the input elements accessible and large enough to see on different screens.

#### Accessibility / Usability

I tried my best to make this app as accessible as possible by creating a simple and familiar user interface that allows users to get things done fast and easy. I have incorporated media queries using CSS to allow the app to be better displayed on a mobile device's screen. I think one of the more challenging parts was styling the html form and making it adapt to screen size as it contains so many different elements. I gave things meaningful names and kept nesting simple to allow screen readers to properly work in this app. Choosing a colour scheme was difficult so I went with the Moodle colours as they are not too harsh on the eyes and things are easy to see and distinguish.

I assumed that lecturers would add weeks in order, therefore I made the app increment the week number after each week addition and focus on the lecture topic field. This in turn saves time and hassle for the users, as long as they wish to add the weeks in order. This of course could go both ways, but I had to make a choice based on my experience using web apps. The 'Home' button in the navigation bar currently serves the only purpose of a refresh button, but in the future as I will add functionality I think the navigation bar will become more useful, so it is there and ready to use.

#### Issues encountered

The first obvious and most major issue I had was not being to properly implement units into this app. Currently the app only allows to have one unit with up to 24 weeks. This is a problem because it limits the functionality of this app as it can only be used for one unit at a time. I have implemented units using different ways (tabs, or 3 units on one page) and there was some partial working functionality but in the end it broke the most important aspect of this app (that is, storing, getting, editing and deleting data) so I decided to remove this broken functionality and keep what was working. In the future I will try my best to fix this, and make the app more wholesome.

I also need to spend more time learning how to better use Javascript to manipulate the DOM (especially regarding manipulating child/parent elements, looping through these children etc.), as this project uses this a lot and my knowledge prior to starting this project was not great. I believe with a little more work I will be able to make this app work a lot better and actually be useful in the real world.

#### Conclusion

This project taught how much work it can take to learn new technologies and how rewarding it can be to get it done. It taught me how to better manage my time, how to think critically under pressure and how to research for help, either from the internet or implementing other people's code into my work (and give credits for it). I have learned many new JavaScript tricks and enjoyed the backend development a little more than the frontend stuff, but it was nice to get them to work together. I learned about the importance of documentation and making the app 'reusable'. Overall I am pleased with the fact that I was able to create a simple app, but I am not happy with its current functionality for now. In the future I want to research more and implement everything I was not able to into it and make it work and be useful in the real world.

## Credits

Thanks and credits go to Rich, Jacek and Matt for all the help provided and the example
web apps they created on GitHub, such as JStagram and JSbook.

Thanks and credits go to zenorocha on GitHub for this readme template. You can find the template [here](https://gist.github.com/zenorocha/4526327).

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

STUDENT ID: UP786633
