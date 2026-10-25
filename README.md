# StockTrack Inventory Management System

## Project Overview
The inventory management system is a web-based application that allows businesses to monitor available stock, add, update, and remove products, track inventory movement, and record stock-in and stock-out transactions. This platform provides a centralized way to track inventory and maintain accurate records.

## Project Objectives
1. Design an interactive dashboard - Display dashboard statistics such as total products, total stock quantity, low-stock products, out-of-stock products, total inventory value, and recently added products.

2. Implement product management - Enable users to add, view, edit, and delete products through CRUD (Create, Read, Update, and Delete) operations.

3. Integrate API Integration - Integrate an API to enable communication between the frontend application and the backend data source.

4. Implement search and filter - allow users to search products by name and filter products by category and stock status.

5. Apply form validation and error handling - validate product information, and add error handling and loading states.

6. Develop a responsive design - ensure the application adapts effectively to desktop, tablet, and mobile screen sizes.

7. Write automated tests that checks the inventory calculations, stock status, filtering and product validation.

8. Apply version control and project management using Git and GitHub, including feature branches, pull requests, and a project board.

## Project Links
GitHub Repository

https://github.com/stevemusili/stock-track.git

Live Application


## Features
Dashboard
- View total number of products
- View total stock quantity
- View low-stock products
- View out-of-stock products
- View total inventory value
- View recently added products

Product Management
- Add new products
- View all products
- Edit products
- Delete products
- View product stock status

Search and Filtering
- Search products by name
- Filter products by category
- Filter products by status

Product Validation
- Validate product name
- Validate product categories
- Validate product quantity and price
- Validate minimum stock levels
- Display loading and error states

API Integration
The Application uses RESTful API endpoints to perform:
- GET - Retrieve products
- POST - Add products
- DELETE - Delete products
- PUT - Update complete product information
- PATCH - Update specific product information

## Technologies
- HTML
- CSS
- JavaScript Modules
- Jest
- RESTful API
- JSON Server
- Figma
- Git
- GitHub

## API Endpoints
- GET /products
- POST /products
- DELETE /products/:id
- PUT /products/:id
- PATCH /products/:id

## Project Structure

```
stock-track/
├── js/
│   ├── api.js
│   ├── main.js
│   ├── ui.js
│   └── utils.js
├── tests/
│   └── utils.test.js
├── db.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── style.css
```

## Setup Instructions

1. Clone the repository

```
git clone https://github.com/stevemusili/stock-track.git
```

2. Navigate to the Project

```
cd stock-track
```

3. Install dependencies

```
npm install
```

4. Start JSON Server

Run:

```
npx json-server --watch db.json
```
API will normally be available at:

```
http://localhost:3000
```

Endpoints:

```
http://localhost:3000/products
```

5. 
Run the application
```
npm start
```

## Running Tests

```
npm test
```

## Deployment Link

## License

