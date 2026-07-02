"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export default function CategoriesPage() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<Category[]>("/categories/");
      return response.data;
    }
  });

  return (
    <div className="p-6 lg:p-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Categories</h2>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {data?.map((category) => (
            <div key={category.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-slate-500">{category.description || category.slug}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
