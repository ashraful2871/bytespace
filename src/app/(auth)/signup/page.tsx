import type { Metadata } from "next";
import AuthField from "@/components/auth/AuthField";
import AuthScreen, { AuthHeading, AuthSwitch } from "@/components/auth/AuthScreen";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Create an Account",
};

export default function SignupPage() {
  return (
    <AuthScreen
      tagline="Sign up and come in"
      intro="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost"
    >
      <AuthHeading eyebrow="Create an Account" title="Welcome to ByteSpace" />

      {/* TODO: point the action at the sign-up endpoint once there are accounts (D6: native validation only). */}
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

      {/* Figma: the form ends at 524 and this line sits at 646. */}
      <AuthSwitch prompt="Already have an account?" href="/login" label="Login" className="mt-10 md:mt-[122px]" />
    </AuthScreen>
  );
}
