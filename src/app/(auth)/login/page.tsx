import type { Metadata } from "next";
import { pageMetadata } from "@/app/shared-metadata";
import AuthField from "@/components/auth/AuthField";
import AuthScreen, { AuthHeading, AuthSwitch } from "@/components/auth/AuthScreen";
import SocialLogin from "@/components/auth/SocialLogin";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Sign In",
  description: "Sign in to ByteSpace to pick up your courses where you left off.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <AuthScreen
      tagline="Sign in with ease"
      intro="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
    >
      <AuthHeading eyebrow="Sign In" title="Welcome Back" />

      {/* TODO: submit to a server action once there are user accounts. Until then only the browser validates it. */}
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

      <SocialLogin />

      <AuthSwitch prompt="New user?" href="/signup" label="Create an account" className="mt-10 md:mt-[73px]" />
    </AuthScreen>
  );
}
