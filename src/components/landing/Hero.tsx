import Image from "next/image";
import Link from "next/link";
import { Zap, Download } from "lucide-react";
import PhoneMockup from "./PhoneMockup";

const avatarIds = [11, 22, 33, 44];

interface HeroProps {
  onOpenDownloadModal?: () => void;
}

export default function Hero({ onOpenDownloadModal }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 pt-8 pb-10 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:pt-14 lg:pb-16 lg:px-8">
        {/* Left Column: Headline, CTAs, Social Proof */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-6 lg:pt-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
            <Zap className="h-3.5 w-3.5 fill-violet-700 text-violet-700" />
            <span>New: JAMB Challenge 2025 is Live! Win amazing prizes</span>
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.35rem]">
            Learn. Practice.
            <br />
            <span className="text-violet-700">Succeed.</span>
          </h1>

          <p className="mt-4 max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
            Classore is your all-in-one learning and test preparation platform. Learn with
            videos, practice with CBT, compete with others and achieve your best.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-violet-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-800"
            >
              Get Started Free
            </Link>
            <button
              type="button"
              onClick={onOpenDownloadModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Download App <Download className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
            <div className="flex -space-x-2.5">
              {avatarIds.map((id) => (
                <Image
                  key={id}
                  src={`https://i.pravatar.cc/64?img=${id}`}
                  alt="Classore student"
                  width={38}
                  height={38}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug text-left">
              Join <span className="font-bold text-gray-900">200,000+</span> students
              <br /> already learning on Classore
            </p>
          </div>
        </div>

        {/* Right Column: Phone Mockup */}
        <div className="flex items-center justify-center lg:col-span-6 lg:-mt-2">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
