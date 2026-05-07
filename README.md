# FakeRestAPI API Automation

Automated API testing project for the FakeRestAPI demo application using Playwright, Axios, and JavaScript.

The project covers API requests for Authors and Books resources, including valid and invalid scenarios. Axios is used for sending HTTP requests, while Playwright is used as the test runner and assertion framework.

## Project Overview

This project was created to practice and demonstrate API test automation on the FakeRestAPI demo application.

Covered resources:
- Authors
- Books

Covered scenarios:
- Get all authors/books
- Get author/book by valid ID
- Create author/book with valid data
- Get authors by book ID
- Update book data
- Delete book
- Negative validation scenarios
- Bug validation tests

Main goals:
- Practice API automation
- Use Axios for HTTP requests
- Use Playwright for test execution and assertions
- Validate response status codes and response body

## Technologies Used

- JavaScript
- Node.js
- Playwright
- Axios
- HTML Report

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Civa24/FakeRESTAPI-ATBH-automation.git
cd FakeRESTAPI_postman_automation



### 2.Install dependecises
npm install

##If axios wasn't install then write
npm install axios

### 3.Install playwright browsers

npx playwright install 
##or 
npm init playwright@latest


### How to run tests

npm run test ||  npm test


### how to run playwright reported

npx playwright show-report


## PROJECT STRUCTURE 

api/
  api.js

tests/
  authors.spec.js
  books.spec.js

utils/
  logger.js