<a name="js-gems"></a>

<p align="center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 120px;">
  <img src="https://res.cloudinary.com/deztgvefu/image/upload/v1719057213/template_images/Screenshot_2024-06-22_at_14.52.43_xrdvgt.png" alt="Project Logo" width="340">
</p>

---

<a name="built-with"></a>
<a name="error-handling"></a>


<h4 align="center">
  <a href="#built-with">Built With</a> ·
  <a href="#testing">Testing</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#error-handling">Error Handling</a> ·
  <a href="#features">Features</a> ·
  <a href="#frontend">Frontend</a> 
</h4>

---

## Built With
- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Testing
- Jest

[![Coverage Status](https://img.shields.io/badge/coverage-85%25-brightgreen.svg)](https://github.com/BeatrisIlieve/MERNGems-Backend/blob/main/testCoverageReport/index.html)

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Deployment
- AWS EC2 Instance
- GitHub Actions
- Docker Hub

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Error Handling
1. Model Validations Using Regular Expressions:
- Ensures that data fields such as email addresses follow a standard format, passwords meet complexity requirements, payment details are in correct format etc.
2. Functions for Additional Validations:
- Includes checks for email uniqueness during registration, verifies the correctness of the old password during password updates, checks if a card is not expired, etc.

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Features

1. User Models:
- Implemented three distinct user models storing data about:
  - Logging credentials
  - Personal information
  - Shipping information

- Each user model is linked by a common user ID:
  - The ID is derived from the logging credentials model
  - The IDs for the personal information and shipping information models are set at the time of user registration
    
- Update Email functionality
- Update Password functionality
- Create and Update Personal Information functionality
- Create and Update Shipping Information functionality
- Detele Account functionality
- Logout functionality

2. Database aggregations for Product Filtering and Real-time Availability Tracking
   
3. Searching products by multiple criteria
   
4. Transfering Shopping Bag items after registration and login
   
5. Obligatory Size Selection except for the Category Earring
   
6. Users can increase or decrease the quantity of items in their shopping bag, with validations in place to ensure that they cannot add more than the available quantity in the database or reduce the quantity below zero
    
7. Transfering Wishlist items after registration and login
    
8. The system suggests matching jewelries across categories (earrings, necklaces, rings, bracelets) based on stone color and collection, taking into account the currently selected category
    
9. Orders History, ordered by the creation time
  
10. Email Notifications upon Registration and Order Completion

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Frontend
- Built with React
> [!NOTE]
> Currently optimized for desktop; future plans include implementing media queries for responsiveness on various devices

#### *Find the Frontend Repository [**HERE**](https://github.com/BeatrisIlieve/MERNGems-Frontend)*

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>
