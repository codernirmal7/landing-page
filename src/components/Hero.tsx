import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedVideos, setLoadedVideos] = useState<number>(0);

  const totalVideos: number = 3;

  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const miniVideoRef = useRef<HTMLVideoElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = () => (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex()); // Fix the invocation
  };

  const getVideoSrc = (index: number) => {
    const videoIndex = ((index - 1) % totalVideos) + 1;
    return `videos/hero-${videoIndex}.mp4`;
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current?.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mini video player */}
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                ref={miniVideoRef}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center "
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* Background video player */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            onLoadedData={handleVideoLoad}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />

          <video
            src={getVideoSrc(
              currentIndex === totalVideos ? 1 : currentIndex + 1
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 max-w-3xl">
              {" "}
              <b>
                Free Fire{" "}
                <span className="text-yellow-500">Battle in Style</span>
              </b>
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Are you ready to take your game to the next level?
            </p>
            <div className="flex gap-3">
              <Button
                id="play"
                title={
                  <div className="flex flex-col items-start justify-center">
                   <span className="relative inline-flex overflow-hidden font-robert-regular text-sm uppercase">Download on the</span>
                   <h3 className="text-[1.3rem]">Apple store</h3>
                  </div>
                 }
                leftIcon={<FaApple className="fill-white" size={25} />}
                containerClass="!bg-black flex-center text-white"
              />
              <Button
                id="play"
                title={
                 <div className="flex flex-col items-start justify-center">
                  <span className="relative inline-flex overflow-hidden font-robert-regular text-sm uppercase">Get it on</span>
                  <h3 className="text-[1.3rem]">Google Play</h3>
                 </div>
                }
                leftIcon={<FaGooglePlay className="fill-white" size={25} />}
                containerClass="!bg-black flex-center gap-1 text-white "
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="special-font text-5xl md:text-6xl absolute bottom-5 uppercase right-5 z-40 text-blue-75">
        <b>Free Fire</b>
      </h1>
    </div>
  );
};
