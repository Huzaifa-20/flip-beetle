import AnimatedTextSection from "@/components/AnimatedTextSection";
import Button from "@/components/ui/Button";

const MissionSection = () => {
  return (
    <div className="w-full h-full my-16 sm:my-32 sm:mb-0"
      data-theme="cream"
    >
      <AnimatedTextSection
        sentence="GREAT BRANDS AREN'T BUILT FROM TEMPLATES. THEY'RE BUILT FROM UNDERSTANDING YOUR VISION, YOUR AUDIENCE, YOUR GOALS."
        highlightWord="UNDERSTANDING"
        animationType="word-by-word"
      />
      <div className="flex justify-center mt-10 sm:mt-14">
        <Button
          href="https://cal.com/studio-crobe"
          external
          variant="filled"
          theme="cream"
        >
          Book a Call
        </Button>
      </div>
    </div>
  );
};

export default MissionSection;
