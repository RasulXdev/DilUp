import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function TutorsLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-white">
        <section className="mx-auto w-full max-w-[1500px] px-5 pb-16 pt-8 sm:px-7 lg:px-10">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-4 h-12 w-full max-w-3xl" />
          <div className="mt-8 grid gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-14 rounded-xl" />
            ))}
          </div>
          <div className="mt-8 space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-80 rounded-2xl" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
