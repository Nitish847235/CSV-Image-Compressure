# Image Processing System

## Overview

This project provides an asynchronous system for processing image data from CSV files. Users can upload a CSV file containing product information and image URLs, and the system will compress the images and return a processed CSV file with the updated image URLs.

## Features

- **Upload API**: Accepts a CSV file, validates it, and initiates image processing asynchronously.
- **Status API**: Allows users to check the processing status and download the processed CSV file.
- **Asynchronous Workers**: Processes images in the background, compressing them and storing the results.
- **EJS Templates**: Provides a user-friendly interface for uploading CSV files and viewing/download processed results.
- **Dynamic Response Handling**: Returns either HTML or JSON depending on how the API is accessed (browser vs. API client).

## Technologies Used

- **Node.js**: Backend framework for handling API requests and processing logic.
- **MongoDB**: Database for storing product data and tracking the status of processing requests.
- **Multer**: Middleware for handling multipart/form-data, used for file uploads.
- **Sharp**: Image processing library used to compress images.
- **EJS**: Templating engine used to render HTML pages for file upload and output display.
- **CSV-Writer**: Utility for generating CSV files from processed data.

## Getting Started

### Prerequisites

- **Node.js**: v14.x or higher
- **MongoDB**: Running instance of MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nitish847235/CSV-Image-Compressure.git
   cd image-processing-system

2. Install the required dependencies:
   ```bash
   npm install
2. Install the required dependencies:
   ```bash
   npm install

3. Set up environment variables:
    Create a .env file in the root directory with the following variables
   ```bash
   PORT=9000
    MONGODB_URI=mongodb://localhost:27017/imageProcessingDB

4. Start the application:
   ```bash
   npm run dev


