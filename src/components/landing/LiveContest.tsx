import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";

const leaders = [
  { rank: 1, name: "Chisom M.", points: 3460, avatar: 5 },
  { rank: 2, name: "Daniel O.", points: 3320, avatar: 15 },
  { rank: 3, name: "Sarah A.", points: 3275, avatar: 25 },
  { rank: 4, name: "Emmanuel B.", points: 3090, avatar: 35 },
  { rank: 5, name: "Hannah K.", points: 2985, avatar: 45 },
];

export default function LiveContest() {
  return (
    <section id="contests" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Live Contest</p>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Compete. Win. Get Rewarded.</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Join exciting contests, climb the leaderboard and win amazing prizes.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Contest card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C0836] via-[#2A0E4E] to-[#16062C] p-6 sm:p-8 text-white lg:col-span-3 flex flex-col justify-between shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">JAMB Challenge 2025</h3>
                <p className="mt-1 text-xs sm:text-sm text-violet-200">Test your knowledge. Win big.</p>

                <div className="mt-5">
                  <span className="inline-block rounded-md bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    Grand Prize
                  </span>
                  <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">₦50,000</p>
                  <p className="mt-1 text-xs sm:text-sm text-violet-200">+ Other exciting rewards</p>
                </div>
              </div>

              {/* Mobile trophy preview alongside the prize */}
              <div className="sm:hidden shrink-0 -mt-2 -mr-2 w-28 h-28 relative">
                <Image
                  src="/assets/images/jamb-challenge-trophy.png"
                  alt="JAMB Challenge 2025 Trophy"
                  fill
                  sizes="112px"
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                  priority
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-violet-100">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-orange-400" /> Ends in 10D : 14H : 32M
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-violet-300" /> Participants 2,341
              </span>
            </div>
          </div>

          <div className="mt-7 relative z-10">
            <Link
              href="https://test.classore.com/contest"
              className="inline-block w-full sm:w-auto text-center rounded-xl bg-orange-500 px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-orange-600 transition-colors"
            >
              Join Contest
            </Link>
          </div>

          {/* Desktop/tablet trophy */}
          <div className="hidden sm:block absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-48 h-48 lg:w-56 lg:h-56 pointer-events-none">
            <Image
              src="/assets/images/jamb-challenge-trophy.png"
              alt="JAMB Challenge 2025 Trophy"
              fill
              sizes="(max-width: 1024px) 192px, 224px"
              className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="rounded-3xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Leaderboard</p>
              <h3 className="font-bold text-gray-900">Top Performers</h3>
            </div>
            <Link href="/signin" className="text-xs font-semibold text-violet-700 hover:underline">
              View Full →
            </Link>
          </div>

          <div className="mt-4 space-y-1">
            {leaders.map((l) => (
              <div key={l.rank} className="flex items-center gap-3 rounded-xl px-2 py-2">
                <span className="w-4 text-sm font-semibold text-gray-400">{l.rank}</span>
                <Image
                  src={`https://i.pravatar.cc/64?img=${l.avatar}`}
                  alt={l.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="flex-1 text-sm font-medium text-gray-800">{l.name}</span>
                <span className="text-sm font-semibold text-gray-500">{l.points.toLocaleString()} pts</span>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-xl bg-violet-50 px-2 py-2">
              <span className="w-4 text-sm font-semibold text-violet-700">24</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-200 text-xs font-bold text-violet-700">
                Y
              </div>
              <span className="flex-1 text-sm font-bold text-violet-700">You</span>
              <span className="text-sm font-semibold text-violet-700">1,250 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile carousel dots */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mt-4">
        <span className="h-1.5 w-5 rounded-full bg-violet-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
      </div>

      <div className="mt-8 text-center">
        <Link
          href="https://test.classore.com/contest"
          className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          View All Contests
        </Link>
      </div>
    </section>
  );
}
