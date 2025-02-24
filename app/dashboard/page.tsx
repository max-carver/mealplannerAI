import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/prisma/db";

export default async function DashboardPage() {
  const session = await auth();

  const mealPlans = await db.mealPlan.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session?.user?.name?.split(" ")[0]}!
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Meal Plans</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add your meal plans list component here */}
            {mealPlans.length > 0 ? (
              <div className="flex flex-col gap-4">
                {mealPlans.map((mealPlan) => (
                  <div key={mealPlan.id}>{mealPlan.description}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                You haven't created any meal plans yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Shopping</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add your shopping list component here */}
            <p className="text-sm text-muted-foreground">
              No upcoming shopping lists.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
