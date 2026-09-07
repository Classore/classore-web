import Image from "next/image";
import Link from "next/link";

interface CTABannerProps {
  icon?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  subtitle: string;
  onOpenDownloadModal?: () => void;
}

export default function CTABanner({
  icon,
  imageSrc,
  imageAlt = "Banner illustration",
  imageWidth = 140,
  imageHeight = 100,
  title,
  subtitle,
  onOpenDownloadModal,
}: CTABannerProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-violet-700 via-violet-800 to-violet-950 px-6 py-8 text-center sm:px-10 lg:flex-row lg:text-left shadow-xl">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {imageSrc ? (
            <div className="relative flex h-20 w-24 sm:h-24 sm:w-32 shrink-0 items-center justify-center drop-shadow-xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="h-full w-full object-contain"
              />
            </div>
          ) : icon ? (
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              {icon}
            </span>
          ) : null}
          <div>
            <h3 className="text-2xl font-extrabold text-white">{title}</h3>
            <p className="mt-1 max-w-md text-sm text-violet-200">{subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-orange-600"
          >
            Get Started Free
          </Link>
          <button
            onClick={onOpenDownloadModal}
            className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Download App ↓
          </button>
        </div>
      </div>
    </section>
  );
}

