import builderData from "@/data/builder.json";
import Portfolio from "@/components/package/Portfolio";
import type { BuilderData } from "@/types/builder";

export default function Home() {
  return <Portfolio data={builderData as BuilderData} />;
}
