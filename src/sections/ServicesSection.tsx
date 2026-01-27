import Image from "next/image";

const ServicesSection = () => {
  return (
    <section className="w-screen flex justify-center items-center my-32">
      <div className="w-full max-w-[1136px] flex flex-col gap-10 justify-start items-center">
        <h1 className="w-full text-7xl text-start text-nowrap">
          Ways I can help
        </h1>
        <div className="w-full flex justify-start items-start gap-10 bg-red-300">
          <Image
            src="/images/Landing_Page.svg"
            alt="Landing Page"
            width={528.26}
            height={442.82}
          />
          <div className="flex flex-col items-start">
            <h1 className="w-full text-6xl text-start text-nowrap">
              Landing page
            </h1>
            <p className="text-xl font-oxygen text-black my-5">Perfect for:</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
