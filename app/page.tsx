import { Sidebar } from "@/components/sidebar";
import { ReviewQueue } from "@/components/review-queue";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ReviewQueue />
    </div>
  );
}
