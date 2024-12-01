import { useEffect, useState } from "react";
import { User } from "../../types";
import ProgressLoader from "../core/progressLoader";

const Story = ({
  onClose,
  activeUser,
  onNext,
  onPrev,
}: {
  onClose: () => void;
  activeUser: User;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => {
        setCurrentStoryIndex((prev) => {
          const nextIndex = prev < activeUser.stories.length - 1 ? prev + 1 : 0;
          if (prev === activeUser.stories.length - 1) {
            onNext();
          }
          setLoading(true);
          return nextIndex;
        });
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [onClose, activeUser, currentStoryIndex, loading]);

  const handlePrev = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setLoading(true);
    } else {
      // If we're at the first story (index 0), try to go to previous user
      try {
        onPrev();
        setLoading(true);
      } catch {
        // If onPrev throws (meaning we're at user index 0), close the story view
        onClose();
      }
    }
  };

  const handleNext = () => {
    if (currentStoryIndex < activeUser.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setLoading(true);
    } else {
      onNext();
      setCurrentStoryIndex(0);
      setLoading(true);
    }
  };

  return (
    <div
      id="item_story"
      className="absolute inset-0 overflow-hidden bg-black shadow"
    >
      <div className="absolute top-2 left-0 right-0 flex gap-2 z-10 px-1 ">
        {activeUser.stories.map((each, idx) => (
          <ProgressLoader
            isLoaded={!loading}
            isCurrent={idx === currentStoryIndex}
            isViewed={idx < currentStoryIndex}
            key={each.id}
          />
        ))}
      </div>
      <div className="relative w-full h-full">
        <img
          className={`w-full h-full object-cover transition-opacity duration-300 ease-in ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          src={activeUser?.stories[currentStoryIndex]?.url}
          onLoad={() => setLoading(false)}
          alt={`Story ${currentStoryIndex + 1}`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center z-10 ${
            loading ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div className="w-8 h-8 border-4 border-slate-300 border-t-black rounded-full animate-spin"></div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-4 text-white z-30 pt-8 text-2xl"
      >
        x
      </button>
      <div className={`absolute rounded-full top-6 left-2 opacity-90 flex`}>
        <img
          className="rounded-full h-8 w-8 object-cover"
          src={activeUser.previewUrl}
          alt={activeUser.username}
        />
        <p className="text-white pl-2">{activeUser.username}</p>
      </div>
      <div className="absolute w-full h-full inset-0 flex z-20">
        <div id="left_handler" onClick={handlePrev} className="flex-1"></div>
        <div id="right_handler" onClick={handleNext} className="flex-1"></div>
      </div>
    </div>
  );
};

export default Story;
