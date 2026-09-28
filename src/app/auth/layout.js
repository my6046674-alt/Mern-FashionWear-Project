// "use client";

// import hero from "@/assets/images/auth-hero.jpg";
// import { HOME_ROUTE } from "@/constants/routes";
// import useAuthStore from "@/stores/authStore";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const Layout = ({ children }) => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const router = useRouter();

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.replace(HOME_ROUTE);
//     }
//   }, [isAuthenticated, router]);

//   if (isAuthenticated) return null;

//   return (
//     <section className="py-12">
//       <div className="container px-4 mx-auto">
//         <div className="lg:h-[75vh] w-full shadow-xl rounded-2xl overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2">
//             <Image
//               height={600}
//               width={600}
//               src={hero}
//               alt="Authentication"
//               className="hidden md:block w-full h-full object-cover"
//             />

//             <div>{children}</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Layout;
// =================================
"use client";
import Image from "next/image";

import hero from "@/assets/images/auth-hero.jpg";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HOME_ROUTE } from "@/constants/routes";

const AuthLayout = ({ children }) => {
  const { isAuthenticated } = useAuthStore.getState();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to homepage
      router.push(HOME_ROUTE);
    }
  }, []);

  if (isAuthenticated) return;

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="lg:min-h-[70vh] w-full shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Image
              height={500}
              width={600}
              src={hero}
              alt=""
              className="hidden md:block w-full object-cover h-full"
            />
            <div className=" dark:bg-gray-900">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;