# MERN_Dashboard
## Introduction

This project aims to offer a comprehensive dashboard solution utilizing the MERN stack. It provides a user-friendly interface with multiple tabs for handling various aspects of data visualization, geographical insights, and sales analytics. The frontend is developed with React, integrating Nivo for graph components and MUI for visual components. Meanwhile, the backend utilizes Express.js and MongoDB via Mongoose for data handling.


### Client Tabs:
- **Dashboard: Displays an overview of essential metrics and insights.
- **Transactions: Tracks and visualizes transaction details.
- **Geography: Provides geographical data visualization for insights.

### Sales:
- **Overview: Presents a general overview of sales performance.
- **Monthly: Visualizes monthly sales trends and patterns.
- **Breakdown: Provides a detailed breakdown of sales data.
### Other Scenes:
- **EnergyInsights: Provides insights related to energy data.
- **EnergyProductionTrends: Visualizes trends in energy production.
- **IndustryImpact: Analyzes the impact on various industries.
- **InsightCorrelationHeatmap: Displays a heatmap of insight correlations.
- **LikelihoodHeatmap: Presents a heatmap of likelihood data.
- **NaturalGasConsumption: Focuses on natural gas consumption insights.
- **PestleFactorDistribution: Analyzes the distribution of PESTLE factors.
- **RecoveryOfCrudeOilProduction: Provides insights on the recovery of crude oil production.
- **RegionalFocus: Offers a focused view on regional data.
- **RegressionDashboard: Displays regression-based insights.
- **SourcewiseInsights: Provides insights based on data sources.
- **StablePetroleumConsumption: Analyzes stable petroleum consumption.
- **TimeSeriesAnalysis: Offers time-series-based analysis.
- **TopicInsights: Presents insights on various topics.

### Visual Customization

- **Light and Dark Mode**: The dashboard offers users the flexibility to switch between light and dark mode, ensuring optimal viewing comfort under different preferences and lighting conditions.

### Responsiveness

- **Responsive Design**: The dashboard is designed to be responsive, adapting seamlessly to various screen sizes and devices. Whether accessed from desktops, tablets, or mobile devices, users can expect a consistent and user-friendly experience across different platforms.

## Technologies Used ##

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Nivo**: Data visualization library for React.
- **Material-UI (MUI/MUI-X)**: React UI components for modern web applications.
- **React Router DOM**: For client-side routing within the application.

### Backend

- **Node.js**: JavaScript runtime environment for server-side development 18 or above.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.

#### Environment Variables Setup

- **The project relies on environment variables for configuration. Follow the instructions below to set up the necessary environment variables:

#### Client-side Environment Variables

- **Create a '.env' file in the 'client' directory and add the following variable:

+++++++
VITE_APP_BASE_URL="http://localhost:5000"
+++++++

- **This variable defines the base URL for API requests in the client-side code.

#### Server-side Environment Variables

Create a '.env' file in the 'server' directory and add the following variables:

+++++++++
MONGO_URL="YOUR_MONGODB_URL"
PORT=5000
+++++++++
Example_URL
MONGODB_URI=mongodb+srv://apple:apple_4@cluster0.2cf3cf.mongodb.net/React_ass?retryWrites=true&w=majority&appName=Cluster0
PORT=5000

- **Ensure to replace `YOUR_MONGODB_URL` with your actual MongoDB URL. The `PORT` variable specifies the port number for the server.

1. Install and run client dependencies:

cd client
npm install npm i
npm run dev


2. Install and run server dependencies:

cd server
npm install/npm i
npm start

3. To sart both client and server:
cd Mern_Dashboard
npm install/npm i
npm start

- **Open web browser and visit http://localhost:5173 to visit the website.
