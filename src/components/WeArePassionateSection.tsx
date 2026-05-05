"use client";

import Image from "next/image";

import { useRevealOnIntersect } from "@/hooks/useRevealOnIntersect";

const WeArePassionateSection: React.FC = () => {
  const sectionRevealRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section
      ref={sectionRevealRef}
      className="text-center w-full relative overflow-hidden flex flex-col lg:flex-row items-center justify-center bg-[#15253E] px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24"
    >
      <div
        data-scroll-animate="rise"
        className="group flex w-full justify-center lg:order-2 lg:w-1/2 lg:justify-end lg:pl-14"
        style={{ maxWidth: "503px" }}
      >
        <Image
          src="/images/imageConvertor1.jpeg"
          alt="Convertor-team i möte"
          width={4096}
          height={2731}
          sizes="(min-width: 1024px) 503px, 100vw"
          className="h-auto w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 lg:h-[503px] lg:w-[503px]"
        />
      </div>

      <div className="w-full lg:order-1 lg:w-1/2 lg:text-left">
        <h1 className="mt-6 font-century-gothic-pro text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:mt-0 lg:text-6xl">
          Vi är{" "}
          <span className="relative inline-block pb-[0.14em]" data-accent-line>
            <span className="text-[#33ABBD]">passionerade</span>
            <span className="accent-line" aria-hidden />
          </span>
        </h1>
        <p className="section-copy mt-4 text-left text-base font-extralight text-white md:text-lg lg:text-xl">
          Vi är passionerade – det ligger i vårt DNA.
          <br />
          Vi är nyfikna på alla våra uppdragsgivares olika branscher, men också
          på de möjligheter vi med teknikens hjälp kan skapa tillsammans.
          <br />
          <br />
          Vi är alltid lojala mot uppgiften, drar oss inte för att utmana det
          förväntade och släpper inte greppet förrän vi levererat en lösning vi
          alla kan vara stolta över.
        </p>
      </div>
    </section>
  );
};

export default WeArePassionateSection;
