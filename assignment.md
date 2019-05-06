# Frontmen Case

## Create a very cool Client Application

We at Frontmen love Frontend Apps and like to demonstrate our skills and ask you to do the
same!

Therefore, we created a Boilerplate for you to utilize which can be found at:
https://github.com/FrontMen/Frontmen-Applicant-Boilerplate-V

### We will give you “Read Access” to the Repo of this Boilerplate so you can clone the project.

### There is a detailed Readme.md available which describes the installation process and

dependencies.

Note: If you have any issues, feedback or improvement ideas for the Boilerplate, feel free to share
them with us! We may have put some stuff in there deliberately that could use some improvements ;)

## Context

Our Frontmen Boilerplate is a NodeJS API-Gateway that exposes functionalities via Restful
API’s. The Gateway is built with Express and is supported by a MySQL Database. It has
predefined tables and relations for users, roles and Frontmen branches in the Database and
offers basic API’s to e.g. authenticate and manage the caching engine. You are free to add to
the Database schema or edit it via the embedded Sequelize module and use the
authentication and caching functionality.

We have embedded a logging-utility, so you can log relevant events. We ask you to utilize
this feature where ever applicable.


## Your challenge

Create a JavaScript based Client Application, web or mobile, that utilizes the purpose of the
Gateway. If you would like to use a Framework like Angular or React to create your Client
Application, feel free to use them but if you do, start a project from scratch and don’t use a 3rd
party boilerplate/ starter kit.

### Non-Functional Requirements

- Create and manage the Client application in a GIT-Repo (may be a local repo) from
    the start. When committing, please provide a proper description;
- All requests to external API’s from your Client Application must be routed via the
    Gateway. So, no direct request from your Client Application to external API’s are
    allowed. You need to create your own API for this on the Gateway.
    Note: don’t forget to use the logging utility
- It is not mandatory to include the protection of endpoints using the embedded JWT-
    Authentication, we will leave it up to you to determine when it would be wise to.
    There is an interceptor that protects endpoints defined in the config/config.js;
- A caching engine, an endpoint to clear the cache and a controller to manage the
    cache is available. You may use it if you want but it is not mandatory. We will leave it
    up to you if you would like to use it.
- When you finished your Client Application, please provide us both your Client
    Application code and the API-Gateway code
    Note: If you use a repo, make sure to push the log-files as well. See .gitignore.

### Functional Requirements

Mandatory

1. Fetch 10 Random Chuck Norris jokes from the following API:
    [http://api.icndb.com/jokes/random/10;](http://api.icndb.com/jokes/random/10;)
2. The jokes need to be displayed in a list;
3. In this list we can mark certain jokes as favorite. The favorites jokes will appear in a
    favorites list with a max of 10 (unique) items;
4. There should be an option to remove jokes from the favorites list as well;
5. On refresh the favorites lists should be maintained, maybe it’s a good idea to use the
    database and/or caching for this;
6. We can turn on/off a timer via a button (every 5 seconds) which will add one random
    joke to the favorites list that is fetched from [http://api.icndb.com/jokes/random/](http://api.icndb.com/jokes/random/)
    until the list has 10 items.


Optional

1. Create a login page that will log you in via the JWT-functionality of the API-
    Gateway;
2. Store the JWT-Token in the browser;
3. If a valid JWT-Token is stored in the browser, auto-login the user;
4. Display only the stored jokes & favorites for the logged in user;
5. The login form should consist of a username/email field (both can be used to login at
    the login API) and password which must comply to the following password security
    requirements:
       a. Passwords must include one increasing straight of at least three letters, like
          ‘abc’, ‘cde’, ‘fgh’, and so on, up to ‘xyz’.
       b. They cannot skip letters so e.g. ‘acd’ doesn't count.
       c. Passwords may not contain the letters i, O, or l, as these letters can be
          mistaken for other characters and are therefore confusing.
       d. Passwords must contain at least two non-overlapping pairs of letters, like aa,
          bb, or cc.
       e. Passwords cannot be longer than 32 characters.


