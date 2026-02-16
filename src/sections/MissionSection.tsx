import AnimatedTextSection from "@/components/AnimatedTextSection";

const MissionSection = () => {
  return (
    <div className="w-full h-full mt-16 mb-0 sm:my-32 sm:mb-0"
      data-theme="cream"
    >
      <AnimatedTextSection
        sentence="GREAT BRANDS AREN'T BUILT FROM TEMPLATES. THEY'RE BUILT FROM UNDERSTANDING YOUR VISION, YOUR AUDIENCE, YOUR GOALS."
        highlightWord="UNDERSTANDING"
        animationType="word-by-word"
      />
    </div>
  );
};

export default MissionSection;
