# Article Fetcher Application

Deployed URL:  https://assignment-digi5.vercel.app/

Video Link: https://youtu.be/nrj4JAKwl8g

## Overview
The Article Fetcher Application is designed to fetch articles from Time.com, display them in a list format, and provide additional features such as search functionality and summary generation. The application is built with a responsive design to ensure a smooth experience across various devices and screen sizes. It includes error handling to manage and display issues gracefully.

## Features
- **Fetch Articles:** The application retrieves articles from Time.com and lists them with their publication date and title.
- **Show More:** Users can click on an article to view more details.
- **Search Functionality:** Easily search for specific articles using keywords.
- **Responsive Design:** The interface adapts to different screen sizes and devices for optimal viewing.
- **Error Handling:** Includes mechanisms to gracefully handle and display errors.

## Additional Feature
- **Summary Generation:** After scraping the article URL, the application generates a summary using Langchain and Mistral.

## Getting Started
To run the application, follow these steps:

### Frontend
1. Navigate to the frontend directory.
2. Install the necessary dependencies using `npm install`.
3. Start the development server with `npm run dev`.

### Backend (Required for additional feature ONLY)
1. Create a `.env` file and add your API key for LLM services with the key `api_key`.
2. Install the required dependencies using `npm install`.
3. Run the backend server by executing `python main.py`.


## Contact
For any questions or further information, please contact:

Aditya Maurya

adi22maurya@gmail.com

+91 9721560807
