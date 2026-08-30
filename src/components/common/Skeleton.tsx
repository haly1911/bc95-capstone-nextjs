import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton = ({ className = "", ...props }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-muted-foreground/10 dark:bg-muted-foreground/20 ${className}`}
      {...props}
    />
  );
};

export default Skeleton;