import Image from "next/image";
import Link from "next/link";
import { GlobeIcon } from "./icons/GlobeIcon";
import { TwitchIcon } from "./icons/TwitchIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YouTubeIcon } from "./icons/YouTubeIcon";

export function NavBar() {
  return (
    <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center gap-4 ">
          <Image
            height="50"
            width="50"
            src="/wdc.jpeg"
            className="rounded-full"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white hover:text-wdc-primary">
            WebDevCody Newsletter
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
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
        </div>
      </div>
    </nav>
  );
}
