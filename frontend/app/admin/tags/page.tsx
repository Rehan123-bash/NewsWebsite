import { Card, CardContent, CardHeader } from "@/components/ui/card";

const tags = ["Breaking", "Opinion", "Analysis", "Live", "Featured"];

export default function TagsPage() {
  return (
    <div className="p-6 lg:p-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Tags</h2>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700">
              {tag}
            </span>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
