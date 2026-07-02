"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Article = {
  id: number;
  title: string;
  status: string;
  updated_at: string;
};

export default function ArticlesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await api.get<Article[]>("/articles/");
      return response.data;
    }
  });

  return (
    <div className="p-6 lg:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Articles</h2>
            <Link href="/admin/articles/new">
              <Button>New article</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? <p className="text-sm text-slate-500">Loading articles...</p> : null}
          {data?.map((article) => (
            <div key={article.id} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
              <div>
                <p className="font-medium">{article.title}</p>
                <p className="text-sm text-slate-500">{article.updated_at}</p>
              </div>
              <span className="text-sm text-slate-600">{article.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
