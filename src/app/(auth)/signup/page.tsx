import type { Metadata } from "next";
import { pageMetadata } from "@/app/shared-metadata";
import AuthField from "@/components/auth/AuthField";
import AuthScreen, { AuthHeading, AuthSwitch } from "@/components/auth/AuthScreen";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Create an Account",
  description: "Create a free ByteSpace account to learn from hundreds of courses or publish your own.",
  path: "/signup",
});

export default function SignupPage() {
  return (
    <AuthScreen
      tagline="Sign up and come in"
      intro="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost"
    >
      <AuthHeading eyebrow="Create an Account" title="Welcome to ByteSpace" />

      {/* TODO: submit to a server action once there are user accounts. Until then only the browser validates it. */}
      <form action="#" method="post" className="mt-10 flex flex-col gap-6">
        <AuthField id="signup-name" label="Full Name" name="name" autoComplete="name" placeholder="Jamie Davis" required />
        <AuthField
          id="signup-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="designer@example.com"
          required
        />
        <AuthField
          id="signup-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="********"
          minLength={8}
          required
        />
        <Button type="submit" className="self-end">
          Continue
        </Button>
      </form>

      <AuthSwitch prompt="Already have an account?" href="/login" label="Login" className="mt-10 md:mt-[122px]" />
    </AuthScreen>
  );
}
