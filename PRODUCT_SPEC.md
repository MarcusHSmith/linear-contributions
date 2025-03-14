# Linear Activity Graph - Product Specification

## Product Goal

Create a web application that visualizes a user's Linear activity over time, similar to GitHub's contribution graph. This tool helps users track their productivity and engagement with Linear issues and comments.

## Core Features

### 1. Linear Authentication

- Users can sign in with their Linear account
- Secure OAuth2 authentication flow
- Access token management for API requests

### 2. Activity Data Collection

- Fetch user's activities from the last 365 days
- Collect data from:
  - Created/updated issues
  - Comments made
- Filter activities by date range
- Aggregate activities by day

### 3. Activity Visualization

- Bar chart showing daily activity counts
- X-axis: Dates over the past year
- Y-axis: Number of activities per day
- Interactive tooltips showing:
  - Exact date
  - Number of activities
- Color-coded bars (Linear's brand color: #5E6AD2)

### 4. User Interface

- Clean, modern design
- Responsive layout
- Loading states for data fetching
- Sign in/out functionality
- Error handling and user feedback

## Technical Implementation

### Authentication

- NextAuth.js for OAuth2 flow
- Linear OAuth endpoints:
  - Authorization: https://linear.app/oauth/authorize
  - Token: https://api.linear.app/oauth/token
  - User Info: https://api.linear.app/graphql

### Data Fetching

- Linear SDK for API interactions
- GraphQL queries for:
  - Issues
  - Comments
- Date filtering using createdAt field

### Visualization

- Recharts library for bar chart
- Responsive container for different screen sizes
- Date formatting for readability
- Sorted data by date

### Tech Stack

- Next.js 15.2.2
- TypeScript
- Tailwind CSS
- NextAuth.js
- Linear SDK
- Recharts

## Environment Setup

Required environment variables:

```
LINEAR_CLIENT_ID=your_linear_client_id
LINEAR_CLIENT_SECRET=your_linear_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Development Workflow

1. Clone repository
2. Install dependencies: `yarn install`
3. Set up environment variables
4. Run development server: `yarn dev`
5. Build for production: `yarn build`
6. Start production server: `yarn start`

## Future Enhancements

1. Add more activity types (e.g., reactions, labels)
2. Implement different visualization options
3. Add date range selection
4. Include activity details in tooltips
5. Add export functionality
6. Implement activity filtering by type
7. Add team activity comparison
8. Include activity trends and statistics

## Success Metrics

- Successful authentication flow
- Accurate activity data collection
- Smooth visualization rendering
- Responsive UI across devices
- Error handling and recovery
- Performance optimization
