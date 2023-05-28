# NBA Team Builder

This is a full stack web application that allows building an optimal NBA team based on player statistics provided in the following [Kaggle dataset](https://www.kaggle.com/datasets/drgilermo/nba-players-stats). The original CSV files are included in the repo under `raw-data` directory at the project root, and are parsed when the application is initialized for the first time.

The base application stack consists of TypeScript, ExpressJS w/tRPC and React. It utilizes PostgreSQL as relational database to store NBA player data. The optimization problem is solved by using `glpk.js`, which is a port of GLPK (GNU Linear Programming Kit) for browser & node. The application is containerized using Docker, making it easy to set up and run.

The means of solving the problem and particular technical desicions are discussed in more detail later on.

## Getting Started

To run the application locally, make sure you have Docker installed on your machine. Then, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/ElGatoLoco/nba-team-builder
cd nba-team-builder
```

2. Build and run the Docker containers:

```sh
docker-compose up
```
This command will build, spin up the app and DB containers and start the web application, which will automatically import data from the CSV files while bootstrapping.

Wait for a message that says `Server is running at http://localhost:8080`, which means that data has been imported and the API is ready. At this point you can open your browser and navigate to `http://localhost:5173/` to access the web interface.

NOTE: When starting the app for the first time, the initial API request might take 10-15s, even though all services are up. The issue only persists inside Docker and _only_ after the initial build.

## Features
As per specification, the app includes the following features:
- List players: View a list of NBA players with their height, weight, college, and other details
- Add player: Add a new player to the database (without season stats)
- Delete player: Remove a player from the database (we actually use soft delete)
- Build optimal team based on a specific points sum provided by the end user

## Technology Stack

### Frontend

- React: A popular JavaScript library for building user interfaces
- React Router: A routing library for React applications
- React Hook Form: Performant, flexible and extensible forms library for React Hooks
- React Infinite Scroller: Infinite scroll solution for pagination
- React Hot Toast: Notifications for React
- Tailwind CSS: A utility-first CSS framework for rapid UI development
- Radix UI Icons

### Backend
- ExpressJS: A fast and minimalist web application framework for Node.js
- Fast-CSV: CSV Parser and Formatter
- TypeORM: An Object-Relational Mapping (ORM) library for TypeScript and JavaScript
- PostgreSQL: A powerful, open-source relational database management system
- glpk.js: A port of GLPK (GNU Linear Programming Kit) for browser & node
- Jest: A testing framework to ensure correctness

### Shared
- TypeScript: Strongly typed programming language that builds on JavaScript
- tRPC: End-to-end typesafe APIs
- ESLint, Prettier, Husky & Zod: Ensuring consistent formatting and validation

## Technical Discussion

The core challenge of building the optimal team consists of figuring out proper metrics, extracting them from the provided CSV files and connecting the data in a correct and meaningful manner, which would allow for the final part that boils down to defining the right constraints that would yield the correct solution.

### Modeling the core problem

*Player positions*

A basketball team consists of 5 players - point guard, shooting guard, small forward, power forward and a center. Even though players always have a certain role on the court, it is not uncommon for a player to switch between roles throughout his career or even during a game, depending on the tactics. However, it is important to note that this has limitations to it. A point guard can play as a shooting guard if need be, and vice versa. Many forwards, beside being able to switch between small and power forward positions, can also cover guard positions, while many others can play the center role. One thing that rarely happens is having a player who is able to transition seamlessly between guard and center positions. As a matter of fact, no such cases are present in our dataset.

Speaking of which, leads us to the first major decision, as player positions are defined in two places.

In one of the player datasets, all records have either a fixed position (G - Guard, F - Forward or C - Center) or a certain combination (G-F, F-G, F-C, C-F) tied to their name. For the sake of our problem, ordering of combinations is disregarded.

However, in the statistics CSV, player positions are defined in an inconsistent manner - sometimes we have exact positions (like SG, for shooting guard) and sometimes loose definitions (like F-G), identical to those present in the player dataset. Even though this adds some information, like which roles player had throughout his career, it would introduce additional complexity to process them and more importantly, restrict certain players to one specific position (like point guard, for example), thus leading to suboptimal solutions when building the team.

With all that in mind, a decision is made to import positions as they are recorded in player dataset and use them as such when building the optimal team, which will always consist of two guards (picked from G, G-F and F-G players), two forwards (picked from F, F-C and C-F) and a center (picked from C, F-C and C-F players).

*The best team*

In order to construct the best team one can have for a specific point sum, we need to set some criteria for what being the best player actually mean. The specification defines it _as being the youngest one who has the highest point sum in the least amount of games_.

Given that we're building the optimal team consisting of all-time players, it is kind of hard to decide which information should be used to measure how young someone is. We probably shouldn't use current age, as someone who played in the 60's would be unfairly disadvantaged, and over the course of their careers players were obviously getting older, so any other point in time doesn't make much sense, beside having the age in the last active season as likely the most reasonable option.

Having _the highest point sum in the least amount of games_ can be interpreted as either having the highest point sum as a primary criteria, and only if these values are the same, using the total amount of games to give advantage to someone who has played less, or actually calculating the average points per game and using this information as a single constraint. Given that we have an input which represents a target of _specific point sum_, it could be a bit confusing for the end user to get a (possibly more efficient) team, whose players' point sums might in certain cases be well below the limit.

With everything in mind, current version of the app optimizes for total points sum in the entire player's career, and uses total number of played games and age in the last active season, as primary and secondary tie-breakers, respectively.

### Data processing

With problem formulation reasoning out of the way, it is worth noting a few assumptions made for the processing of the datasets.

Given that there is no unique identifier that would allow us to connect players' data with absolute certainty, and since, as with any dataset that includes people, there is a possibility of having multiple persons with the same name, player's name is used in conjunction with their birth year to merge all the data into a single table named _players_.

Seasons statistics are stored in the _statistics_ table in their entirety, and only get filtered while aggregating player stats before actually feeding them into the solving algorithm. To query statistic records correctly, beside using players' names, it is also taken into account whether the player was active in the specific season (season's year should be between player's start and end year), and their age in that season should also add up with the birth year to the currently processed season.


### Generating Optimal Team

The problem at hand is a variant of [Knapsack problem](https://en.wikipedia.org/wiki/Knapsack_problem), which can be solved in multiple ways, with [linear programming](https://en.wikipedia.org/wiki/Linear_programming) being one of commonly used techniques. To achieve the best outcome (maximization or minimization), this method optimizes a linear objective function, based on a set of constraints.

In our particular use case, we want to maximize team's total points with subject to the following:
- Total points could not exceed the provided input value
- The team should have exactly two guards, two forwards and one center

This would be rather simple, if players could only play in a single position (defined as G, F or C). However, since this isn't the case, we have to figure out additional constraints to address the issue.

Simply saying that each player can cover either/or position wouldn't solve the problem correctly, as it would clash with the previous constraint and count each one (of the more versatile players) as if they were playing in two positions at the same time. To come around this, we have to introduce a set of constraints that count players who can play in multiple positions, as if they were separate individuals, but add the condition that player with a particular id (as defined in the database) can only appear once in the team.

With everything in place, a library like [glpk.js](https://github.com/jvail/glpk.js/) can be used to maximize the objective function's value and build the optimal team. For implementation details check out the solver module in the server package.

### Listing, Adding and Deleting Players

Beside optimal team generation, API exposes three more endpoints, for user listing, creating and deletion.

Client app connects to the listing endpoint on `/players` route and displays the data in tabular format, with filtering and pagination options. Next page of results is retrieved once user scrolls to the bottom of the table, while filtering is currently only supported by player name. Pagination of filtered resulsts is also implemented.

On the same page, records can be deleted by clicking the red `X` symbol in the last column. This action will only mark them as deleted (soft delete), to facilitate more complex scenarios in the future. Nevertheless, marking players as deleted will exclude them from the listing and optimal team generation.

Creation of new players is available through the form present on `/players/new` route. The form gets validated against the schema defined on the backend, which is possible thanks to using tRPC and monorepo approach.

Updating of the player records and CRUD operations for statistics are not currently implemented, as they were not included in the specification, but it should be trivial to add them.
