import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SearchPage() {
  return (
    <div className="p-6 lg:p-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Search</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Search title, summary, content" />
          <p className="text-sm text-slate-500">This will connect to the Django search endpoint next.</p>
        </CardContent>
      </Card>
    </div>
  );
}
