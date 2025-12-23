import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="w-screen min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "radial-gradient(circle, #b3af9a 1.25px, transparent 1.25px)",
        backgroundSize: "36px 36px",
      }}
    >
      {/* <h1 className="w-full max-w-[750px] text-8xl font-semibold text-center leading-[80%] tracking-tight">
        Ready to{" "}
        <span className="inline-block font-bold animate-flip">FLIP</span> the
        right side up?
      </h1> */}
      <h1 className="w-full max-w-[600px] text-7xl text-center">
        Ready to FLIP the right side up?
      </h1>
      <div className="w-full flex justify-center items-center mt-8">
        <div className="relative flex items-center">
          <Image
            src="/images/Anxious_Beetle.gif"
            alt="Animation"
            width={250}
            height={250}
            unoptimized
          />
          <div className="absolute left-full flex items-center gap-4">
            <Image
              src="/icons/ArrowIcon.svg"
              alt="ArrowIcon"
              width={65}
              height={20}
            />
            <p className="font-oxygen whitespace-nowrap">
              This is you,
              <br />
              anxious to build a
              <br />
              digital presence
            </p>
          </div>
        </div>
      </div>
      <p className="w-full max-w-[600px] text-xl font-oxygen text-center mt-12">
        Whether you&apos;re an expert, a startup, or a small business,
        you&apos;re in the right place for a professionally crafted website.
      </p>
    </section>
  );
};

export default HeroSection;
