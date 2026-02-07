import AnimatedTextSection from "@/components/AnimatedTextSection";

const MissionSection = () => {
  return (
    <div className="w-full h-full mt-16 mb-0 sm:mt-32 sm:mb-0"
      data-theme="cream"
    >
      <AnimatedTextSection
        sentence="We partner with ambitious brands to create digital experiences that feel true and drive momentum."
        highlightWord="ambitious"
        animationType="word-by-word"
      />
    </div>
  );
};

export default MissionSection;
