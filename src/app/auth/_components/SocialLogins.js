import appleLogo from "@/assets/images/apple.png";
import googleLogo from "@/assets/images/google.png";
import Image from "next/image";

const SocialLogins = () => {
  return (
    <section className="border-b pb-5 border-gray-200 dark:text-white">
      <div className="flex items-center justify-between gap-5">
        <button className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-xs">
          <Image
            src={googleLogo}
            height={32}
            width={32}
            alt="google"
            className="h-4 w-auto"
          />
          Login with Google
        </button>
        <button className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-xs">
          <Image
            src={appleLogo}
            height={32}
            width={32}
            alt="apple"
            className="h-4 w-auto"
          />
          Login with Apple
        </button>
      </div>
    </section>
  );
};

export default SocialLogins;