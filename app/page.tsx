"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { LinearClient } from "@linear/sdk";
import { ActivityCalendar } from "react-activity-calendar";

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLinearActivity() {
      if (!session?.accessToken) return;

      setLoading(true);
      try {
        const linearClient = new LinearClient({
          accessToken: session.accessToken,
        });

        // Get user's activities for the last 365 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 365);

        const me = await linearClient.viewer;
        const myIssues = await me?.assignedIssues();

        console.log("[myIssues]", JSON.stringify(myIssues));
        myIssues.nodes.forEach((issue) => {
          console.log("------");
          console.log("[issue]", JSON.stringify(issue));
          const history = issue.history;
          console.log("[history]", JSON.stringify(history));
        });

        // Fetch user's issues and comments
        const [issues, comments] = await Promise.all([
          linearClient.issues({
            filter: {
              createdAt: {
                gte: startDate.toISOString(),
                lte: endDate.toISOString(),
              },
            },
            first: 100,
            includeArchived: true,
          }),
          linearClient.comments({
            filter: {
              createdAt: {
                gte: startDate.toISOString(),
                lte: endDate.toISOString(),
              },
            },
          }),
        ]);

        // Process activities into daily counts
        const dailyCounts = new Map<string, number>();

        // Initialize counts for all days in the last 365 days
        for (let i = 0; i < 365; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          dailyCounts.set(date.toISOString().split("T")[0], 0);
        }

        // Count issues and get their activity
        for (const issue of issues.nodes) {
          const date = new Date(issue.createdAt).toISOString().split("T")[0];
          dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
        }

        // Count comments
        comments.nodes.forEach((comment) => {
          const date = new Date(comment.createdAt).toISOString().split("T")[0];
          dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
        });

        // Convert to array format for the chart
        const chartData = Array.from(dailyCounts.entries())
          .map(([date, count]) => ({
            date,
            count,
          }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setActivityData(
          chartData.map(({ date, count }) => ({
            date,
            count,
            level: Math.min(Math.floor(count / 2), 4) as 0 | 1 | 2 | 3 | 4,
          }))
        );
      } catch (error) {
        console.error("Error fetching Linear activity:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.accessToken) {
      fetchLinearActivity();
    }
  }, [session?.accessToken]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Linear Activity Graph</h1>
        <button
          onClick={() => signIn("linear")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign in with Linear
        </button>
      </div>
    );
  }

  if (activityData.length > 0) {
    console.log("[activityData]", JSON.stringify(activityData));
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Linear Activity</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          Loading activity data...
        </div>
      ) : (
        <div className="h-auto w-full flex justify-center p-4 rounded-lg">
          {activityData.length > 0 ? (
            <ActivityCalendar
              data={activityData.map(({ date, count }) => ({
                date,
                count,
                level: Math.min(Math.floor(count / 2), 4) as 0 | 1 | 2 | 3 | 4,
              }))}
              labels={{
                totalCount: "{{count}} contributions in the last year",
              }}
              style={{
                maxWidth: "100%",
              }}
              totalCount={activityData.reduce(
                (sum, data) => sum + data.count,
                0
              )}
              showWeekdayLabels
            />
          ) : (
            <p>waiting for data</p>
          )}
        </div>
      )}
    </div>
  );
}
