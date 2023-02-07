import { GlobeIcon } from "./icons/GlobeIcon";
import { TwitchIcon } from "./icons/TwitchIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YouTubeIcon } from "./icons/YouTubeIcon";

export function Footer() {
  return (
    <footer className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © 2023{" "}
        <a href="https://webdevcody.com" className="hover:underline">
          WebDevCody.com
        </a>
      </span>
      <ul className="mt-6 grid grid-cols-2 flex-wrap items-center gap-8 text-xs text-gray-500 dark:text-gray-400 sm:mt-0 sm:grid-cols-3 md:mt-3 md:flex">
        <li>
          <a
            href="https://webdevcody.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-white hover:text-wdc-primary"
            aria-current="page"
          >
            <GlobeIcon />
            Website
          </a>
        </li>
        <li>
          <a
            href="https://youtube.com/@webdevcody"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-white hover:text-wdc-primary"
          >
            <YouTubeIcon />
            YouTube
          </a>
        </li>

        <li>
          <a
            href="https://twitch.com/webdevcody"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-white hover:text-wdc-primary"
          >
            <TwitchIcon />
            Twitch
          </a>
        </li>

        <li>
          <a
            href="https://twitter.com/webdevcody"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-white hover:text-wdc-primary"
          >
            <TwitterIcon />
            Twitter
          </a>
        </li>
      </ul>
    </footer>
  );
}
