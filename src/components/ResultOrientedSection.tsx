"use client";

import Image from "next/image";

import { useParallaxY } from "@/hooks/useParallaxY";
import { useRevealOnIntersect } from "@/hooks/useRevealOnIntersect";

const ResultOrientedSection: React.FC = () => {
  const sectionRevealRef = useRevealOnIntersect<HTMLElement>();
  const resultBlobRef = useParallaxY(30);

  return (
    <section
      ref={sectionRevealRef}
      className="text-center w-full relative overflow-hidden flex flex-col lg:flex-row items-center justify-center bg-[#D3E0E5] px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24 group"
    >
      <div
        ref={resultBlobRef}
        className="parallax-blob-result absolute bottom-0 left-0 h-[65vw] w-[65vw] rounded-full bg-white md:h-[25vw] md:w-[25vw]"
      />

      <div
        data-scroll-animate="rise"
        className="flex w-full justify-center lg:w-1/2 lg:justify-end"
        style={{ maxWidth: "503px" }}
      >
        <Image
          src="/images/imageConvertor3.png"
          alt="Presentation hos Convertor"
          width={2877}
          height={1920}
          sizes="(min-width: 1024px) 503px, 100vw"
          className="z-10 h-auto w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] lg:h-[503px] lg:w-[503px]"
        />
      </div>

      <div className="z-10 flex w-full flex-col justify-center text-left lg:ml-14 lg:w-1/2">
        <h1 className="mt-6 font-century-gothic-pro text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl lg:mt-0 lg:text-6xl">
          Vi är{" "}
          <span className="relative inline-block pb-[0.14em]" data-accent-line>
            <span className="text-[#33ABBD]">resultatdrivna</span>
            <span className="accent-line" aria-hidden />
          </span>
        </h1>
        <p className="section-copy mt-4 text-base font-extralight text-black md:text-lg lg:text-xl">
          På Convertor gör vi skillnad, på riktigt. Vi lockar inte med tomma
          ord och fina löften utan erbjuder alla våra kunder konkreta och
          mätbara resultat.
          <br />
          <br />
          Vi glömmer aldrig affären och uppgiften vi är här för att lösa –
          oavsett om det handlar om att sälja fler hästförsäkringar, få fler
          människor att bli kunder i en trevlig, lokal bank eller upptäcka hur
          härligt det är att äga en husbil.
        </p>
      </div>
    </section>
  );
};

export default ResultOrientedSection;
