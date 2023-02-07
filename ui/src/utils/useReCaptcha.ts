import { ReCaptchaProvider, useReCaptcha } from "next-recaptcha-v3";
import type { ReactNode } from "react";

// mock for cypress in ci

export function getUseReCatpacha(): typeof useReCaptcha {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return process.env.NEXT_PUBLIC_DISABLE_RECAPTCHA
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((() => ({ executeRecaptcha: () => "noop" })) as any)
    : useReCaptcha;
}

export function getReCaptchaProvider(): typeof ReCaptchaProvider {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return process.env.NEXT_PUBLIC_DISABLE_RECAPTCHA
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((({ children }: { children: ReactNode }) => children) as any)
    : ReCaptchaProvider;
}
