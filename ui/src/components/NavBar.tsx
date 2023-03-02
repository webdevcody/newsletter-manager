import Image from "next/image";
import Link from "next/link";
import { GlobeIcon } from "./icons/GlobeIcon";
import { TwitchIcon } from "./icons/TwitchIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YouTubeIcon } from "./icons/YouTubeIcon";

const links = [
  {
    href: "https://webdevcody.com",
    content: (
      <>
        <GlobeIcon />
        <span className="hidden md:block">Website</span>
      </>
    ),
  },
  {
    href: "https://youtube.com/@webdevcody",
    content: (
      <>
        <YouTubeIcon />
        <span className="hidden md:block">YouTube</span>
      </>
    ),
  },
  {
    href: "https://twitch.com/webdevcody",
    content: (
      <>
        <TwitchIcon />
        <span className="hidden md:block">Twitch</span>
      </>
    ),
  },
  {
    href: "https://twitter.com/webdevcody",
    content: (
      <>
        <TwitterIcon />
        <span className="hidden md:block">Twitter</span>
      </>
    ),
  },
];

export function NavBar() {
  return (
    <nav className="border-gray-200 bg-cyan-200 px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center gap-4 ">
          <Image
            height="50"
            width="50"
            src="/wdc.jpeg"
            className="rounded-full"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            <span className="hidden md:inline-block">WebDevCody</span>{" "}
            Newsletter
          </span>
        </Link>
        <ul className="flex gap-4 md:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-wdc-primary"
                aria-current="page"
              >
                {link.content}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
