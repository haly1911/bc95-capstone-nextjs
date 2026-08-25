import Image from "next/image";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

const UserAvatar = ({ src, name, size = 36, className = "" }: UserAvatarProps) => {
  const displayName = name || "User";
  const initial = displayName.charAt(0).toUpperCase();
  if (src) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full overflow-hidden shrink-0 relative flex items-center justify-center ${className}`}
      >
        <Image
          loading="eager"
          src={src}
          alt={`${displayName}-avatar`}
          width={size}
          height={size}
          className="object-cover h-full w-full"
        />
      </div>
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className={`grid place-items-center rounded-full bg-linear-to-br from-primary to-accent font-bold text-primary-foreground shrink-0 ${className}`}
    >
      <span style={{ fontSize: Math.max(size * 0.4, 12) }}>{initial}</span>
    </div>
  );
};

export default UserAvatar;
