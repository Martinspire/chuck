# Chuck norris joke generator

This is a simple application to demonstrate the skills of Martin Spierings for Frontmen. The joke generator fetches jokes via local backend to icndb.com. For this assignment I bootstrapped most parts of the application with Angular CLI. I added Angular Material to inject some basic styling and gave it my personal touch. It should run fine for both desktop, mobile and tablets, adjusting to each resolution and having the best experience possible. As part of the assignment you can get a list of 10 jokes, mark some as favorite and have that list of favorite persist across sessions. You can remove favorites and get a new favorite on a 5 second delay loop until the list has 10 jokes. There's also a separate joke page which is better used as a funny presentation tool. Backgrounds and Chuck images are applied randomly.

# Why no user authentication?

Partially because it just costs more time to implement. And partially because I had more fun making the frontend of the application. I tried a few versions out, used some libraries of which I hadn't used the latest versions yet and wanted to focus more on getting that right with testing and design. I know I'm able to implement such a backend, but I found it more important to get the rest of the application right. I also ran into some problems getting the router working the way I wanted to. Aside from that I wasn't comfortable with the Sequelize functionality and the lack of Typescript in the code. To revamp it the way I want to, would have cost me too much time with only little influence on the end result. As a tradeoff I decided I wanted to show my skill with adding proper tests instead.

# How much time was used?

Since this work isn't in Git from the start its harder to prove it, but I think overall it has taken me 16 hours from start to finish. I had some trouble getting the backend going, trying to get the frontend work with the backend and getting up to speed with the latest works from Angular. Got annoyed by Angular Bootstrap so switched to Material and wasn't really happy with the design on 2 tries. If a design was made and I had a better idea of the backend (a conversation with the backend developer would've helped) it would've probably taken less than 8 hours to get it working.

# Tools used

* Angular (CLI)
* Angular Material

* Visual Studio Code
* XAMPP

# How to install

You need to have both frontend and backend run their `npm install` scripts. You can install it on both frontend/backend on unix systems with `npm run startinstall`. Or `npm run backendinstall` and `npm run frontendinstall` separately. Aside from that you optionally can install the mysql database following the backend guide and run that separately. This will remove the error that it cannot connect to a database.

# How to run

You can use the package.json in this folder to run it on both frontend/backend on unix systems with `npm run start`. Or `npm run backend` and `npm run frontend` separately.

# How to test

You can use the package.json in the frontend folder to run unit tests with `ng test`. Or e2e tests with `ng e2e`. You can also see coverage if you run it like so: and `ng test --code-coverage`. I think the coverage is pretty nice.

# Concluding

Let me know what you think of this application and lets talk about the design and development choices I made.