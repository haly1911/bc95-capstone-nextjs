import { useRouter } from "next/navigation";

export const redirectToAuth = (router: ReturnType<typeof useRouter>) => {
  if (typeof window === "undefined") return;
  const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
  router.push(`/auth?callbackUrl=${currentPath}`);
};
