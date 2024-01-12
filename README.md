# Invoice Generator API

The Invoice Generator API is a Node.js and Express.js based service that allows users to generate invoices based on provided data. Users can make a request to the `/generate-pdf` endpoint with the necessary information, and the API will return a PDF version of the invoice.

## Table of Contents

- [Usage](#usage)
  - [Endpoint](#endpoint)
  - [Request](#request)
  - [Response](#response)
- [Example](#example)
- [Hosted Link](#hosted-link)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run the Server](#run-the-server)

## Usage

### Endpoint

```
POST /generate-pdf
```

### Request

- Method: `POST`
- Content-Type: `application/json`
- Body:

```json
{
  "billDate": "YYYY-MM-DD",
  "billNumber": "12341234",
  "products": [
    { "id": "001", "name": "Product 1", "quantity": 3, "price": 10 },
    { "id": "002", "name": "Product 2", "quantity": 1, "price": 15 },
    { "id": "003", "name": "Product 3", "quantity": 1, "price": 15 },
    { "id": "004", "name": "Product 4", "quantity": 1, "price": 90 },
    { "id": "005", "name": "Product 5", "quantity": 6, "price": 20 }
  ],
  "paymentType": "Online",
  "transactionDetails": "Transaction ID: 7890123456"
}
```

### Response

- Content-Type: `application/pdf`

## Example

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "billDate": "2024-01-09",
  "billNumber": "12341234",
  "products": [
    { "id": "001", "name": "Product 1", "quantity": 3, "price": 10 },
    { "id": "002", "name": "Product 2", "quantity": 1, "price": 15 },
    { "id": "003", "name": "Product 3", "quantity": 1, "price": 15 },
    { "id": "004", "name": "Product 4", "quantity": 1, "price": 90 },
    { "id": "005", "name": "Product 5", "quantity": 6, "price": 20 }
  ],
  "paymentType": "Online",
  "transactionDetails": "Transaction ID: 7890123456"
}' https://invoice-generator-api.onrender.com/generate-pdf --output invoice.pdf
```

## Hosted Link

The API is hosted at [https://invoice-generator-api.onrender.com](https://invoice-generator-api.onrender.com).

## Setup

### Prerequisites

- Node.js installed on your machine. You can download it [here](https://nodejs.org/).

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/invoice-generator-api.git
cd invoice-generator-api
npm install
```

### Run the Server

Start the server using:

```bash
npm start
```

The server will run at `http://localhost:3000` by default. You can modify the port in the `index.js` file.

# Customizing Company Information

If you wish to change the company name, address, phone number, or GST number in the generated invoices, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/invoice-generator-api.git
    cd invoice-generator-api
    ```

2. Navigate to the `views` directory. This is where the EJS template file is located.

    ```bash
    cd views
    ```

3. Open the `invoice-template.ejs` file in a text editor of your choice.

4. Locate the section of the template that contains the company information. It looks like this:

    ```html
    <div class="header">
        <h2>Company Name</h2>
    </div>

    <div class="company-details">
        <p>Address: Company Address</p>
        <p>Phone: Company Phone Number</p>
        <p>GST No: Company GST Number</p>
    </div>
    ```

5. Update the values within the tags for `h2` and `p` as needed. For example:

    ```html
    <div class="header">
        <h2>My Custom Company Name</h2>
    </div>

    <div class="company-details">
        <p>Address: Custom Company Address</p>
        <p>Phone: +123 456 7890</p>
        <p>GST No: ABC123456789</p>
    </div>
    ```

6. Save the changes.

This customized section specifically addresses the structure of your provided EJS code. Users can follow these steps to modify the company information in the generated invoices.

# Contributing

Thank you for considering contributing to the Invoice Generator API! Contributions help improve the project and make it more robust.

## How to Contribute

1. Fork the repository to your GitHub account.
2. Clone the forked repository to your local machine:

    ```bash
    git clone https://github.com/your-username/invoice-generator-api.git
    ```

3. Create a new branch for your changes:

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. Make your changes, and commit them:

    ```bash
    git add .
    git commit -m "Add your commit message here"
    ```

5. Push your changes to your fork:

    ```bash
    git push origin feature/your-feature-name
    ```

6. Open a pull request on the [original repository](https://github.com/your-username/invoice-generator-api) to merge your changes.

## Coding Standards

Please adhere to the existing coding standards and style used in the project. If possible, follow the [Node.js style guide](https://github.com/felixge/node-style-guide).

## Report Issues

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/your-username/invoice-generator-api/issues) on GitHub.
