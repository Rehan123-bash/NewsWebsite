"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Category = {
  id: number;
  name: string;
};

type Tag = {
  id: number;
  name: string;
};

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [category, setCategory] = useState("");
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [status, setStatus] = useState("draft");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<Category[]>("/categories/");
      return response.data;
    }
  });

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await api.get<Tag[]>("/tags/");
      return response.data;
    }
  });

  useEffect(() => {
    if (categories?.length && !category) {
      setCategory(String(categories[0].id));
    }
  }, [categories, category]);

  function toggleTag(tagId: number) {
    setTagIds((current) => (current.includes(tagId) ? current.filter((id) => id !== tagId) : [...current, tagId]));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await api.post("/articles/", {
        title,
        summary,
        content,
        status,
        featured_image: featuredImage,
        category: category ? Number(category) : null,
        tag_ids: tagIds,
        meta_title: metaTitle,
        meta_description: metaDescription,
        keywords,
        canonical_url: canonicalUrl,
        og_image: ogImage
      });
      router.push("/admin/articles");
    } catch {
      setError("Unable to create article. Check the backend connection and required fields.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">New Article</h2>
          <p className="text-sm text-slate-500">Draft the story, attach tags, and save it to the newsroom.</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Article title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Summary</label>
                <Textarea value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  className="min-h-72"
                  placeholder="Write the article body here"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
                >
                  {categories?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Featured image URL</label>
                <Input value={featuredImage} onChange={(event) => setFeaturedImage(event.target.value)} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags?.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                        tagIds.includes(tag.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta title</label>
                <Input value={metaTitle} onChange={(event) => setMetaTitle(event.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta description</label>
                <Textarea value={metaDescription} onChange={(event) => setMetaDescription(event.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Keywords</label>
                <Input value={keywords} onChange={(event) => setKeywords(event.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Canonical URL</label>
                <Input value={canonicalUrl} onChange={(event) => setCanonicalUrl(event.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">OG image URL</label>
                <Input value={ogImage} onChange={(event) => setOgImage(event.target.value)} />
              </div>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <Button type="submit" disabled={saving} className="w-full">
                {saving ? "Saving..." : "Save article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
