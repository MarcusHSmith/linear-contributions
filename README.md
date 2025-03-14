# Linear Contributions

A simple web application that visualizes your Linear activity in a GitHub-style contributions graph. See your issue creation, comments, and other activities beautifully displayed in an activity heatmap.

## Features

- Sign in with your Linear account
- View your Linear activity over the past 365 days
- Activity heatmap showing daily contributions
- Tracks issue creation and comments
- Clean, modern UI built with Next.js and Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   LINEAR_CLIENT_ID=your-linear-client-id
   LINEAR_CLIENT_SECRET=your-linear-client-secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) and sign in with your Linear account

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [Linear SDK](https://developers.linear.app/docs/sdk/getting-started) - Linear API integration
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [React Activity Calendar](https://grubersjoe.github.io/react-activity-calendar/) - Activity visualization
