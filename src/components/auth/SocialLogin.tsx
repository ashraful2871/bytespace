import { FacebookIcon, GoogleIcon } from "@/components/icons";

const providers = [
  { name: "Facebook", Icon: FacebookIcon },
  { name: "Google", Icon: GoogleIcon },
];

export default function SocialLogin() {
  return (
    <>
      <p className="mt-10 flex items-center gap-3 type-body-l text-neutral-500 sm:pr-[13px] md:mt-[73px]">
        <span aria-hidden className="h-px flex-1 bg-neutral-200" />
        or
        <span aria-hidden className="h-px flex-1 bg-neutral-200" />
      </p>

      <div className="mt-10 flex justify-center gap-4">
        {providers.map(({ name, Icon }) => (
          <button
            key={name}
            type="button"
            aria-label={`Sign in with ${name}`}
            className="flex size-[72px] items-center justify-center rounded-float border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden"
          >
            <Icon size={34} />
          </button>
        ))}
      </div>
    </>
  );
}
