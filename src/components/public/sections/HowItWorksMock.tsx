import {
  BadgeCheck,
  CalendarCheck,
  CalendarClock,
  CreditCard,
  MessageCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserPlus,
  Video,
  Wallet,
} from "lucide-react";

type MockKind = "student" | "tutor";

function Bar({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-2 rounded-full bg-brand-100 ${className}`}
    />
  );
}

function StudentGoalMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 p-4">
      <div className="absolute right-4 top-4 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-brand-300" />
        <span className="h-2 w-2 rounded-full bg-accent-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="grid h-full grid-cols-[0.8fr_1fr] gap-3 pt-4">
        <div className="grid place-items-center rounded-2xl bg-white text-brand-700 shadow-soft">
          <Search className="h-11 w-11" />
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white p-4 shadow-soft">
          <Bar className="w-4/5 bg-brand-200" />
          <Bar className="mt-3 w-2/3" />
          <div className="mt-5 grid grid-cols-2 gap-2">
            <span className="h-10 rounded-xl bg-brand-50" />
            <span className="h-10 rounded-xl bg-accent-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentCompareMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-brand-100">
      <div className="grid h-full grid-cols-3 gap-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className={`flex flex-col rounded-2xl p-3 shadow-soft ${
              item === 1 ? "bg-brand-700 text-white" : "bg-brand-50 text-ink"
            }`}
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-xl ${
                item === 1 ? "bg-white text-brand-700" : "bg-white text-brand-600"
              }`}
            >
              {item === 1 ? (
                <BadgeCheck className="h-5 w-5" />
              ) : (
                <SlidersHorizontal className="h-5 w-5" />
              )}
            </span>
            <div className="mt-auto space-y-2">
              <Bar className={item === 1 ? "w-5/6 bg-white/40" : "w-5/6 bg-brand-200"} />
              <Bar className={item === 1 ? "w-1/2 bg-white/25" : "w-1/2"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentLessonMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-2xl bg-brand-700 p-4 text-white">
      <div className="grid h-full grid-rows-[1fr_auto] gap-3">
        <div className="grid grid-cols-[1fr_0.72fr] gap-3">
          <div className="grid place-items-center rounded-2xl bg-white/12 ring-1 ring-white/15">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-brand-700 shadow-card">
              <Video className="h-10 w-10" />
            </div>
          </div>
          <div className="grid gap-3">
            <span className="grid place-items-center rounded-xl bg-white text-brand-700 shadow-soft">
              <MessageCircle className="h-6 w-6" />
            </span>
            <span className="grid place-items-center rounded-xl bg-accent-400 text-ink shadow-accent">
              <CalendarClock className="h-6 w-6" />
            </span>
          </div>
        </div>
        <div className="h-2 rounded-full bg-white/18">
          <div className="h-2 w-4/5 rounded-full bg-accent-400" />
        </div>
      </div>
    </div>
  );
}

function TutorProfileMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-brand-100">
      <div className="flex h-full flex-col rounded-2xl bg-brand-50 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-700 text-white shadow-brand">
            <UserPlus className="h-7 w-7" />
          </span>
          <span className="min-w-0 flex-1 space-y-2">
            <Bar className="w-4/5 bg-brand-200" />
            <Bar className="w-1/2" />
          </span>
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2">
          <span className="h-12 rounded-xl bg-white shadow-soft" />
          <span className="h-12 rounded-xl bg-white shadow-soft" />
          <span className="h-12 rounded-xl bg-accent-100 shadow-soft" />
        </div>
      </div>
    </div>
  );
}

function TutorVerifyMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-2xl bg-brand-950 p-4 text-white">
      <div className="absolute inset-x-8 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/18" />
      <div className="relative flex h-full items-center justify-between gap-3">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand-700 shadow-card">
          <BadgeCheck className="h-8 w-8" />
        </span>
        <span className="grid h-20 w-20 place-items-center rounded-[1.55rem] bg-accent-400 text-ink shadow-accent">
          <ShieldCheck className="h-10 w-10" />
        </span>
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand-700 shadow-card">
          <CalendarCheck className="h-8 w-8" />
        </span>
      </div>
    </div>
  );
}

function TutorEarningsMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 p-4">
      <div className="grid h-full grid-cols-[1fr_0.78fr] gap-3">
        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-700 text-white shadow-brand">
            <Wallet className="h-6 w-6" />
          </span>
          <div className="mt-5 space-y-2">
            <Bar className="w-5/6 bg-brand-200" />
            <Bar className="w-1/2" />
          </div>
          <div className="mt-5 h-2 rounded-full bg-brand-100">
            <div className="h-2 w-3/4 rounded-full bg-brand-600" />
          </div>
        </div>
        <div className="grid gap-3">
          <span className="grid place-items-center rounded-xl bg-accent-100 text-accent-800">
            <CreditCard className="h-6 w-6" />
          </span>
          <span className="grid place-items-center rounded-xl bg-white text-brand-700 shadow-soft">
            <Wallet className="h-6 w-6" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksMock({
  index,
  kind = "student",
}: {
  index: number;
  kind?: MockKind;
}) {
  if (kind === "tutor") {
    if (index === 0) return <TutorProfileMock />;
    if (index === 1) return <TutorVerifyMock />;
    return <TutorEarningsMock />;
  }

  if (index === 0) return <StudentGoalMock />;
  if (index === 1) return <StudentCompareMock />;
  return <StudentLessonMock />;
}
