import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Draft articles", value: "18" },
  { label: "Published today", value: "7" },
  { label: "Scheduled", value: "4" },
  { label: "Total views", value: "128k" }
];

const activity = [
  { title: "Government reshuffle leads the feed", tag: "Politics", time: "5m ago" },
  { title: "Markets open higher after overnight gains", tag: "Business", time: "17m ago" },
  { title: "City beats rival in a late comeback", tag: "Sports", time: "32m ago" }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge>Admin Dashboard</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Newsroom control center</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Manage publishing, reviewers, categories, tags, and media from one place.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New article
          </Button>
          <Button variant="secondary" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Breaking news
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <p className="text-sm text-slate-500">{item.label}</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Publishing queue</p>
                <h3 className="text-xl font-semibold">Recent activity</h3>
              </div>
              <Button variant="ghost">View all</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activity.map((item, index) => (
              <div key={item.title}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.time}</p>
                  </div>
                  <Badge>{item.tag}</Badge>
                </div>
                {index < activity.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Quick actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/admin/articles"
                className="flex w-full items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200"
              >
                <TrendingUp className="h-4 w-4" />
                Manage articles
              </Link>
              <Link
                href="/admin/categories"
                className="flex w-full items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200"
              >
                <Users className="h-4 w-4" />
                Manage categories
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Next build step</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Hook this shell to the Django APIs, then add the article editor and media library.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
