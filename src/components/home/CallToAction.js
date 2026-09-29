import { REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section id="call-to-action" className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-linear-to-r from-primary to-primary-dark p-8 rounded-3xl flex items-center flex-col text-white gap-4">
          <h2 className="text-2xl font-bold">Join Fashion Wear</h2>
          <p className="text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error,
            nihil.
          </p>
          <Link
            href={REGISTER_ROUTE}
            className="bg-white px-8 py-2 rounded-3xl text-primary hover:shadow-lg"
          >
            Signup to Get 15% Off...
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;