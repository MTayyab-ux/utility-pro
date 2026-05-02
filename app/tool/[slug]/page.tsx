import { toolsData } from "../../../src/lib/tools-data";
import UniversalTool from "../../../components/universal-tools";
import { notFound } from "next/navigation";

// Next.js 15 mein params aik Promise hota hai
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // tools-data file se sahi tool ka configuration nikaalna
  const config = toolsData[slug as keyof typeof toolsData];

  // Agar tool list mein nahi milta to 404 page dikhao
  if (!config) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <UniversalTool config={config} slug={slug} />
    </div>
  );
}