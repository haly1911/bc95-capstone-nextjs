"use client";

interface VideoPopupModalProps {
  videoSrc: string;
  onClose: () => void;
}

const VideoPopupModal = ({ videoSrc, onClose }: VideoPopupModalProps) => {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-background/50 p-4 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border/20 shadow-2xl">
          <video autoPlay controls playsInline className="absolute h-full w-full object-cover rounded-2xl">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPopupModal;
