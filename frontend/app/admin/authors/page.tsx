import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AuthorsPage() {
  return (
    <div className="p-6 lg:p-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Authors</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">Author profiles will sit here once the backend profile endpoints land.</p>
        </CardContent>
      </Card>
    </div>
  );
}
