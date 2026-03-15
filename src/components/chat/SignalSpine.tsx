import EngineBubble from "./EngineBubble";
import UserBubble from "./UserBubble";

interface SignalSpineItemProps {
  number?: number;
  isEngine: boolean;
  children?: React.ReactNode;
}

const SignalSpineItem: React.FC<SignalSpineItemProps> = ({
  number,
  isEngine,
  children,
}) => {
  return (
    <div className="group relative flex items-start gap-4 md:gap-10">
      {/* The Anchoring Column: w-14 (56px) */}
      <div className="relative z-10 flex justify-center shrink-0 w-10 md:w-14">
        {isEngine ? (
          <div className="flex items-center justify-center bg-gray-300 rounded-full size-10 md:size-14 transition-colors group-hover:bg-gray-400">
            <span className="font-brand text-lg md:text-2xl leading-none text-black">
              {number}
            </span>
          </div>
        ) : (
          /* For User messages, we use a spacer with the same width 
             to keep the bubble content pushed to the right consistently */
          <div className="size-14 flex items-center justify-center">
            <div className="size-1 bg-black/10 rounded-full" />
          </div>
        )}
      </div>
      <div className="flex-1 pt-1">{children}</div>
    </div>
  );
};

export const SignalSpine = () => {
  return (
    <div className="relative max-w-5xl mx-auto py-16">
      {/* Spine: Exact center of 56px (w-14) is 28px */}
      <div
        className="absolute left-5 md:left-7 top-0 bottom-0 w-px pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity translate-x-[-0.5px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, black 20px, transparent 4px)`,
          backgroundSize: "1px 30px",
          backgroundRepeat: "repeat-y",
        }}
      />

      <div className="flex flex-col gap-16">
        <SignalSpineItem number={20} isEngine={true}>
          <EngineBubble />
        </SignalSpineItem>
        <SignalSpineItem isEngine={false}>
          <UserBubble />
        </SignalSpineItem>
      </div>
    </div>
  );
};
