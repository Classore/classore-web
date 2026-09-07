import Image from "next/image";

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto flex w-full max-w-[480px] items-center justify-center lg:max-w-[540px]">
      {/* Decorative background glow matching the design */}
      <div className="absolute -inset-4 -z-10 rounded-full bg-violet-100/60 blur-3xl" />

      {/* The 3D phone mockup container */}
      <div className="relative w-full drop-shadow-2xl">
        <Image
          src="/assets/images/hero-phone-screen.png"
          alt="Classore mobile app screen"
          width={827}
          height={1024}
          priority
          unoptimized
          className="h-auto w-full object-contain select-none"
        />
      </div>
    </div>
  );
}
