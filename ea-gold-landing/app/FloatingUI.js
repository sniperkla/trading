"use client";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ChatBalloon from "./ChatBalloon";

export default function FloatingUI() {
  const pathname = usePathname();
  // Hide on /register and /[lang]/register
  const isRegisterPage =
    pathname === "/register" ||
    /^\/[a-z]{2}\/register$/.test(pathname);

  if (isRegisterPage) return null;

  return (
    <>
      <LanguageSwitcher />
      <ChatBalloon />
    </>
  );
}