# EventHawk

## The EventHawk Team:
* Josh Smolinski
* Hetali Shah Gala
* Satwik Gardas
* Saurabh Verma
* Isaac Pittman

## What is EventHawk:

EventHawk is a web application that helps students promote pick-up activities that are too informal to be organized as events. Pick-up sports, video game nights, and movie marathons are great examples of things that slip through the cracks of the UML event calendar and Facebook. Using design components such as upvoting, filters, and ratings, EventHawk provides a familiar and lightweight way to showcase the dozens of small meetups already happening on campus.

DEMO: https://eventhawk.herokuapp.com

## Development:

### Project Management

EventHawk will be developed using the Agile Development methodology. Information on User Stories, Tasks, Milestones, etc will be maintained on Trello and can be viewed [here](https://trello.com/b/2QY2nsVj/eventhawk). 

The following technologies are used to build EventHawk:

| | Backend | Frontend |
| --- | --- | --- |
| **Languages** | Ruby | TypeScript, HTML, CSS |
| **Frameworks / Libraries** | Rails | ReactJS, Bootstrap, Font Awesome, Design Driven Documents (D3) |
| **Database** | Mongo DB ||
| **Other** | | NodeJS |

### Local Build

#### Building the Front End

The frontend requires NodeJS and NPM to perform a build. To start the build, run the following in a terminal/command prompt window:

 1. Run `npm install` to install application dependencies.
 2. Start the server by running `npm start`.
 3. In a web browser, navigate to `http://localhost:3003/`.

## Design:

While the design has yet to be formalized, we will seek to separate the UI, Event Ranking Algorithm, and Database to make more complete use of reactive programming and testing tools.

Possible D3 visualizations: [Zoomable Map](https://bl.ocks.org/mbostock/2206590), [Day/Hour heatmap](http://bl.ocks.org/tjdecke/5558084), [Collapsible Indented Tree](https://bl.ocks.org/mbostock/1093025).
