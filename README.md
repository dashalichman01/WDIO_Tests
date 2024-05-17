# WDIO TESTS

Automation testing some parts of marketplace using WebdriverIO

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone this repository:

   ```bash
   git clone 

2. Install dependencies:

    ```bash
   npm install

3. Create .env File

    Create a .env file in the root directory of the project.

4. Configure Environment Variables

    In the .env file, add the following environment variables:
    
    ```bash
    BASE_URL=https://example.com
    ```
    Replace https://example.com with the base URL of your application, and your_username and your_password with your actual credentials.

### Running Tests

To run Cypress tests, use the following command:

   ```
   npm run wdio
   ```

### Configuration

-  configuration is stored in wdio.config.ts, tsconfig.json files.
