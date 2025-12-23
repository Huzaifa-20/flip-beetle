import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-screen flex flex-col justify-center items-center my-32">
      <div className="max-w-[1136px] flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-7xl text-start text-nowrap">Hi, im Sulti</h1>
          <p className="text-2xl text-start">A freelance Autist</p>
          <p className="font-oxygen text-lg text-start mt-4">
            I create comprehensive websites from scratch. Working with me you
            get memorable, unique websites tailored to your specific needs,
            hassle-free process and first class service.
          </p>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
          </div>
        </div>
      </div>
      <p className="w-full max-w-[500px] text-lg font-oxygen text-center mt-12">
        Whether you&apos;re an expert, a startup, or a small business,
        you&apos;re in the right place for a professionally crafted website.
      </p>
    </section>
  );
};

export default AboutSection;
