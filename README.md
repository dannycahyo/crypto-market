# Crypto Market

This project is a replication of the [Pintu Market Page](https://pintu.co.id/market). The main focus is on the tokens list, with additional features such as Tags filtering, Sort, and Search.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Improvement Opportunities](#improvement-opportunities)

## Features

- **Tokens List**: Display a list of tokens fetched from the provided API endpoints.
- **Tags Filtering**: Filter the tokens list based on selected tags.
- **Sort**: Sort the tokens list based on different criteria.
- **Search**: Search for specific tokens in the tokens list.
- **Responsive Design**: The application is fully responsive and works across different device sizes.

## Demo

- **Website** [Live Demo](https://crypto-market-apps.vercel.app/)
- **Story Book** [Storybook Documentation](https://crypto-market-apps-stories.vercel.app/)

## Installation

Before starting, make sure you have Node.js and npm installed on your machine.

1. Clone this repository:

```bash
git clone https://github.com/yourusername/crypto-market.git
```

2. Install the dependencies:

```bash
cd crypto-market
npm install
```

## Usage

To run the application in development mode, use:

```bash
npm run dev
```

To build the application for production, use:

```bash
npm run build
```

To start the application in production mode, use:

```bash
npm run start
```

To run the storybook documentation, use:

\*Notes.
Please kindly run the application development server as well to get the data from the API.

```bash
npm run storybook
```

## Testing

To run the test, use:

\*Notes.
Please kindly run the storybook server as well.

```bash
npm run test-storybook
```

To get the coverage of the overall test, use:

```bash
npm run test-storybook -- --coverage
```

## Project Architecture

The project architecture is designed with a layered structure that emphasizes separation of concerns, maintainability, and scalability. It consists of the following key components and their relationships:

![project architecture](https://res.cloudinary.com/du5jbmwz5/image/upload/v1687848750/Screenshot_2023-06-27_at_13.50.41_dvaxvd.png)

### Routes

The [Routes](https://github.com/dannycahyo/crypto-market/tree/main/src/pages) layer is responsible for handling URL routing and mapping them to the appropriate screens. It parses query parameters and route parameters, forwarding them as props to the screens. This enables dynamic content rendering based on the URL.

### Screens

The [Screens](https://github.com/dannycahyo/crypto-market/tree/main/src/market/screens) layer comprises React components that provide the user interface for individual pages or screens. These components, also known as dummy components, do not handle their own state management or data fetching. Instead, they orchestrate various smart components (Widgets) to create a cohesive and interactive user experience.

### Widgets

The [Widgets](https://github.com/dannycahyo/crypto-market/tree/main/src/market/widgets) layer consists of smart components that enhance interactivity and functionality in the user interface. These components have their own state and combine business logic from the [Services](https://github.com/dannycahyo/crypto-market/blob/main/src/market/services.ts) layer with UI elements from the [Components](https://github.com/dannycahyo/crypto-market/tree/main/src/market/components) layer. They drive the interactive features of the application and facilitate data fetching and manipulation.

### Components

The [Components](https://github.com/dannycahyo/crypto-market/tree/main/src/market/components) layer encompasses dummy components focused on providing the user interface for the widgets. These components rely on data received through props from the widgets and do not manage their own state.

### Services

The [Services](https://github.com/dannycahyo/crypto-market/blob/main/src/market/services.ts) layer plays a central role in integrating with external APIs. It provides a cohesive interface for fetching data from various endpoints and handling data mutations. In this project, services are implemented as custom hooks that utilize the query hook from the `@tanstack/react-query` library for data fetching. By centralizing the integration in the Services layer, other parts of the application can easily consume fetched data and handle necessary mutations without being concerned about specific API endpoints or implementation details.

### Fetcher

The [Fetcher](https://github.com/dannycahyo/crypto-market/blob/main/src/market/fetcher.ts) layer contains utility functions for making API requests. Its sole responsibility is handling network requests and does not include any application-specific business logic. The fetcher functions can be utilized by the Services layer to retrieve data from external APIs.

### Models

The [Models](https://github.com/dannycahyo/crypto-market/blob/main/src/market/models.ts) layer defines the structure and shape of the data used within the application. It focuses on establishing clear and consistent data models for entities such as Currency, PriceChange, or other relevant data structures.

---

This layered architecture promotes separation of concerns, enhances maintainability, and facilitates scalability. Each layer has a well-defined responsibility and can be developed and maintained independently, resulting in a more modular and flexible codebase.

By adhering to this architectural approach, the project achieves a clear separation of concerns, making it easier to understand, extend, and maintain the codebase.

## Folder Structure

In this section, we will explore the folder structure of the project and provide an overview of the main directories and their purposes.

```
src
  - constant
  - hooks
  - market
    - components
      - CurrencyList.tsx
      - CurrencyList.stories.tsx
      - TokenCard.tsx
      - TokenCard.stories.tsx
      - ...
    - widgets
      - MarketTagDetailTopSection
      - TokenListWidget
      - ...
    - screens
      - MarketListScreen.tsx
      - MarketListScreen.stories.tsx
      - MarketTagDetailScreen.tsx
      - MarketTagDetailScreen.stories.tsx
      - ...
    - fetcher.ts
    - services.ts
    - models.ts
  - mock
    - handler
  - pages
    - api
    - index.tsx
    - market
      - tag
        - [slug].ts
  - uikits
    - components
      - Container
      - SearchInput
      - Skeleton
      - ...
  - utils
```

- `constant`: This folder contains constants or configuration files that are used throughout the project. It may include values such as API endpoints, default settings, or other static data.

- `hooks`: The `hooks` folder is responsible for housing custom React hooks. Hooks are reusable functions that encapsulate common logic or behaviors and can be shared across components. These hooks can be used to handle state management, or any other custom functionality.

- `market`: The `market` module in this project follows a domain-driven development (DDD) approach, which aims to facilitate a well-organized folder structure and promote code clarity and maintainability. DDD emphasizes the separation and grouping of different components based on their respective domains, allowing for better organization and understanding of the codebase. The market module includes several folders that represent different layers and components, such as screens, widgets, components, fetcher, services, and models. Each of these folders encapsulates functionality related to a specific domain within the market module.

- `mock`: The `mock` folder contains everything related to mocking, in this case it contains handlers for mocking API requests. It is used for testing purposes which can be used to simulate API responses.

- `pages`: The `pages` folder contains the application's page components, which are responsible for handling the routing and mapping URLs to the appropriate screens. It may include API routes, index page, or other specific page components.

- `uikits`: The `uikits` folder houses UI kits or reusable UI components that can be shared across different modules or features. These components are typically designed to be highly reusable and customizable, providing a consistent user interface throughout the application.

- `utils`: The `utils` folder includes utility functions or helper modules that provide common functionalities or reusable code snippets. These functions can be used throughout the project for tasks such as data manipulation, date formatting, or other generic operations.

The folder structure outlined above helps to organize the project's source code into logical modules and components, making it easier to navigate, maintain, and scale the application.

## Improvement Opportunities

- SEO Optimization: The application could be improved by adding meta tags, canonical tags, implementing sitemaps, adding robots.txt, improving load times, and ensuring accessibility standards are met.
- Performance Optimization: Further performance improvements could be achieved by implementing code splitting, and web performance metrics like First Contentful Paint, Largest Contentful Paint, Total Blocking Time, and Speed Index could be improved.
- User Experience: The user experience could be enhanced by adding more interactive elements by adding animations and improving the overall design.
- Translation: The application could be translated into multiple languages to reach a wider audience.
