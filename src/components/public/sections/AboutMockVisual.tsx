import {
  BadgeCheck,
  CalendarClock,
  CreditCard,
  Languages,
  MessageCircle,
  ShieldCheck,
  Target,
  UserPlus,
  Users,
  Video,
  Wallet,
} from "lucide-react";

function Rail({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-2 rounded-full bg-brand-100 ${className}`}
    />
  );
}

export function AboutHeroMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-3xl bg-brand-950 p-5 text-white">
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="relative flex h-full flex-col rounded-[1.35rem] border border-white/12 bg-white/8 p-5 shadow-2xl shadow-brand-950/30">
        <div className="flex items-center justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-400 text-ink shadow-accent">
            <Languages className="h-6 w-6" />
          </span>
          <div className="flex gap-1.5">
            {["AZ", "EN", "RU"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-extrabold text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid flex-1 grid-cols-[0.85fr_1fr] gap-4">
          <div className="flex flex-col justify-between rounded-2xl bg-white p-4 text-ink shadow-card">
            <div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Video className="h-7 w-7" />
              </div>
              <div className="mt-5 space-y-2.5">
                <Rail className="w-4/5 bg-brand-200" />
                <Rail className="w-3/5" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <span className="rounded-xl bg-brand-50 px-2 py-3 text-center font-display text-lg font-extrabold text-brand-700">
                1:1
              </span>
              <span className="rounded-xl bg-accent-100 px-2 py-3 text-center font-display text-lg font-extrabold text-accent-800">
                ₼
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl bg-brand-600 p-4 shadow-brand">
            <div className="absolute left-5 right-5 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/20" />
            {[
              { Icon: Target, className: "left-4 top-5" },
              { Icon: UserPlus, className: "right-5 top-20" },
              { Icon: BadgeCheck, className: "bottom-7 left-12" },
            ].map(({ Icon, className }, index) => (
              <span
                key={index}
                className={`absolute grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-700 shadow-card ${className}`}
              >
                <Icon className="h-7 w-7" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutMissionMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-3xl border border-brand-100 bg-brand-50 p-5 shadow-card">
      <div className="grid h-full grid-cols-[1fr_0.78fr] gap-4">
        <div className="flex flex-col rounded-2xl bg-white p-5 shadow-soft">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-700 text-white shadow-brand">
            <Wallet className="h-6 w-6" />
          </span>
          <div className="mt-6 space-y-3">
            <Rail className="w-5/6 bg-brand-200" />
            <Rail className="w-2/3" />
            <Rail className="w-3/4" />
          </div>
          <div className="mt-auto rounded-2xl border border-brand-100 bg-brand-50 p-4">
            <div className="flex items-center justify-between">
              <CreditCard className="h-6 w-6 text-brand-700" />
              <span className="font-display text-3xl font-extrabold text-brand-700">
                0
              </span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white">
              <div className="h-2 w-3/4 rounded-full bg-accent-400" />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {[ShieldCheck, BadgeCheck, CalendarClock].map((Icon, index) => (
            <div
              key={index}
              className="grid place-items-center rounded-2xl bg-white text-brand-700 shadow-soft"
            >
              <Icon className="h-9 w-9" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutMarketplaceMock() {
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-3xl bg-white p-5 shadow-card ring-1 ring-brand-100">
      <div className="absolute inset-x-10 top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-100" />
      <div className="relative grid h-full grid-cols-[0.82fr_1fr_0.82fr] items-center gap-4">
        <div className="rounded-2xl bg-brand-50 p-4 shadow-soft">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft">
            <Users className="h-7 w-7" />
          </span>
          <div className="mt-5 space-y-2">
            <Rail className="w-4/5 bg-brand-200" />
            <Rail className="w-3/5" />
          </div>
        </div>

        <div className="grid place-items-center">
          <div className="grid h-28 w-28 place-items-center rounded-[2rem] bg-brand-700 text-white shadow-brand">
            <MessageCircle className="h-12 w-12" />
          </div>
        </div>

        <div className="rounded-2xl bg-accent-100 p-4 shadow-soft">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-accent-700 shadow-soft">
            <Video className="h-7 w-7" />
          </span>
          <div className="mt-5 space-y-2">
            <Rail className="w-5/6 bg-accent-300" />
            <Rail className="w-1/2 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
