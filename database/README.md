# Airport Scheduling Database

This project is designed to manage and schedule airport operations efficiently. The database schema and scripts provided will help you set up and maintain the necessary data for airport scheduling.

## Getting Started

### Installation

1. Install dependencies:
    ```sh
    npm install
    ```

2. Set up the environment variables:
    - Copy the `.env.example` file to `.env` and edit the variables as needed

3. Run the Makefile to create the database:
    ```sh
    make create
    ```
4. To drop the database:
    ```sh
    make drop
    ```

5. To seed the database with initial data:
    ```sh
    make seed
    ```

6. To select data from the database:
    ```sh
    make select
    ```