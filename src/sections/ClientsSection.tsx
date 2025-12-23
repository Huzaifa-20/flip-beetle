import Image from "next/image";

const ClientsSection = () => {
  return (
    <section className="w-screen flex justify-center items-center my-32">
      <div className="w-full max-w-[1136px] flex flex-col gap-10 justify-center items-center">
        {/* First Row */}
        <div className="w-full flex items-center justify-between px-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">Interior Designer</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 -translate-y-12">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">Freelancer</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">Restaurant Owner</h1>
          </div>
        </div>

        {/* Second Row */}
        <div className="w-1/2 flex items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">Tech Startup</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">IT Consuktant</h1>
          </div>
        </div>

        {/* Third Row */}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">Fitness Trainer</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 ">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">Still You</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">Photographer</h1>
          </div>
        </div>

        {/* Fourth Row */}
        <div className="w-1/2 flex items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">psychologist</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={150}
              height={150}
              unoptimized
            />
            <h1 className="text-xl">naturopath</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
