import type { Metadata } from "next";
import { pageMetadata } from "@/app/shared-metadata";
import AuthField from "@/components/auth/AuthField";
import AuthScreen, { AuthHeading, AuthSwitch } from "@/components/auth/AuthScreen";
import { FacebookIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Sign In",
  description: "Sign in to ByteSpace to pick up your courses where you left off.",
  path: "/login",
});

const providers = [
  { name: "Facebook", Icon: FacebookIcon },
  { name: "Google", Icon: GoogleIcon },
];

export default function LoginPage() {
  return (
    <AuthScreen
      tagline="Sign in with ease"
      intro="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
    >
      <AuthHeading eyebrow="Sign In" title="Welcome Back" />

      {/* TODO: point the action at the sign-in endpoint once there are accounts (D6: native validation only). */}
      <form action="#" method="post" className="mt-10 flex flex-col gap-6">
        <AuthField
          id="login-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="designer@example.com"
          required
        />
        <AuthField
          id="login-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="********"
          required
        />
        <Button type="submit" className="self-end">
          Sign In
        </Button>
      </form>

      {/* Figma 50:362: the divider at 443 (the form ends at 370), the social row 40 below it. Its lines stop 13px
          short of the right edge, which puts "or" at x=211. */}
      <p className="mt-10 flex items-center gap-3 type-body-l text-neutral-500 sm:pr-[13px] md:mt-[73px]">
        <span aria-hidden className="h-px flex-1 bg-neutral-200" />
        or
        <span aria-hidden className="h-px flex-1 bg-neutral-200" />
      </p>
      {/* TODO: wire the providers once there are accounts; static buttons for now. */}
      <div className="mt-10 flex justify-center gap-4">
        {providers.map(({ name, Icon }) => (
          <button
            key={name}
            type="button"
            aria-label={`Sign in with ${name}`}
            className="flex size-[72px] items-center justify-center rounded-float border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden"
          >
            {/* The glyphs fill about 34px of Figma's 40px icon frames; the stand-ins have no inset. */}
            <Icon size={34} />
          </button>
        ))}
      </div>

      {/* Figma: the social row ends at 584 and this line sits at 657. */}
      <AuthSwitch prompt="New user?" href="/signup" label="Create an account" className="mt-10 md:mt-[73px]" />
    </AuthScreen>
  );
}
