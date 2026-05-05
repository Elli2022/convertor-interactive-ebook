"use client";

import Image from "next/image";

import { useRevealOnIntersect } from "@/hooks/useRevealOnIntersect";

const PrestigelessSection: React.FC = () => {
  const textContainerRef = useRevealOnIntersect<HTMLDivElement>();

  return (
    <section className="text-center w-full relative overflow-hidden flex flex-col items-center justify-center bg-white px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24 group">
      <div
        className="absolute right-0 top-1/2 h-[50vw] w-[50vw] rounded-full bg-[#D3E0E5] md:h-[35vw] md:w-[35vw]"
        style={{ transform: "translate(25%, -50%)" }}
      />

      <div
        data-scroll-animate="rise"
        className="z-10 mx-auto w-full max-w-4xl md:order-last"
      >
        <Image
          src="/images/imageConvertor2.png"
          alt="Convertor-team i workshop"
          width={2865}
          height={1046}
          sizes="(min-width: 1280px) 896px, 100vw"
          className="h-auto w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
        />
      </div>

      <div
        ref={textContainerRef}
        className="z-10 mx-auto mb-8 w-full max-w-4xl text-left lg:mb-12"
      >
        <h1 className="mt-6 text-left font-century-gothic-pro text-3xl font-bold text-black sm:text-4xl md:mt-5 md:text-center md:text-5xl lg:text-6xl">
          Vi är <span className="text-[#33ABBD]">prestigelösa</span>
        </h1>
        <p className="section-copy mt-4 break-words text-black text-base font-extralight md:text-lg lg:text-xl">
          Vi har ögonen på bollen och vet vad som är viktigt. Och för oss
          handlar det varken om titlar eller formalia, utan om att skapa de
          allra bästa förutsättningarna – för våra kunder och för varandra, som
          kollegor.
          <br />
          <br />
          På Convertor utvecklas vi tillsammans, vi tror på öppenhet och
          transparens och vi vet att vår allra största tillgång är människorna
          vi har omkring oss.
        </p>
      </div>
    </section>
  );
};

export default PrestigelessSection;
