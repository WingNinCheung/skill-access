# Skill Access

Skill Access is a full-stack web application that allows users to access engineers' coding and communication skills against other engineers that work at similar companies and with the same title (e.g. Junior Engineer or Senior Engineer).

<a href="https://github.com/WingNinCheung/skill-access/wiki">Database Schema</a>

![Screen Shot 2023-05-16 at 1 41 32 AM](https://github.com/WingNinCheung/skill-access/assets/96600317/c735a8f8-47e8-463a-8071-1581807530f3)



## Dataset
- score-records.csv contains the coding and communication scores for all of the users in our sample dataset (https://github.com/WingNinCheung/skill-access/blob/main/backend/data/score-records.csv)
- companies.csv contains the list of firms along with their fractal_index (https://github.com/WingNinCheung/skill-access/blob/main/backend/data/companies.csv)

(A similar company is any company who's absolute difference of fractal_index is less than 0.15. A company is similar to itself)

## Technologies Used

- Frontend: React, JavaScript
- Backend: Python, Flask, PostgreSQL
- Testing: Playwright

## Instruction to Run Locally

1. Navigate to a directory and run below on your terminal:
    ```
    git clone https://github.com/WingNinCheung/skill-access.git
    ```
2. Create a PostgreSQL user and database (Please install <a href="https://www.postgresql.org/">PostgreSQL</a> first)
    ```
    psql 
    CREATE USER <YOUR_NAME> WITH CREATEDB PASSWORD '<YOUR_PW>';
    CREATE DATABASE <DATABASE_NAME> WITH OWNER <YOUR_NAME>;
    ```
3. Create .env in the root directory (Based on the info in .env.example)
    ```
    FLASK_APP=__init__
    FLASK_ENV=development
    SECRET_KEY=<YOUR_KEY>
    DATABASE_URL=postgresql://<YOUR_NAME>:<YOUR_PW>@localhost/<DATABASE_NAME>
    ```
4. Install dependencies
    - Frontend
    ```
    cd <your_root_directory>
    npm install
    ```
    - Backend
    ```
    cd /backend
    pip install pipenv
    pipenv install
    pipenv shell
    ```
5. Run it
   - Backend
   ```
   cd /backend
   flask run
   ```
   - Frontend
   ```
   cd <your_root_directory>
   npm start
   ```
   Go to http://localhost:3000/

## Run Automated Tests

  - Navigate to the root directory and run
    ```
    npm run test
    ```
