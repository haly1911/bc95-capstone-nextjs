import {
  FaBriefcase,
  FaChartLine,
  FaHeadphones,
  FaLaptopCode,
  FaPalette,
  FaPencil,
  FaRobot,
  FaVideo,
} from "react-icons/fa6";

export const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();

  if (name.includes("design") || name.includes("ux") || name.includes("ui")) return FaPalette;
  if (name.includes("marketing") || name.includes("digital")) return FaChartLine;
  if (name.includes("writing") || name.includes("translation") || name.includes("content")) return FaPencil;
  if (name.includes("video") || name.includes("animation")) return FaVideo;
  if (name.includes("music") || name.includes("audio")) return FaHeadphones;
  if (name.includes("ai") || name.includes("robot")) return FaRobot;
  if (name.includes("code") || name.includes("react") || name.includes("ci/cd") || name.includes("programming"))
    return FaLaptopCode;

  return FaBriefcase;
};
