"use client";

import { CART_ROUTE, HOME_ROUTE, LOGIN_ROUTE, navMenu } from "@/constants/routes";
import Link from "next/link";
import { usePathname, useRouter} from "next/navigation";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import useAuthStore from "@/stores/authStore";
import usePreferenceStore from "@/stores/preferenceStore";
import useCartStore from "@/stores/cartStore";

const Header = () => {

  const { isAuthenticated, logout} = useAuthStore.getState();
  const { toggleTheme} = usePreferenceStore.getState();

  const theme = usePreferenceStore((state)=>state.theme);
  const products= useCartStore((state)=>state.products)

  
  const router = useRouter();
   const pathName = usePathname();


  function handleLogout(){
    logout();
    router.replace(LOGIN_ROUTE)

  }
    if(pathName.startsWith("/admin")) return;

  return (
    <header className="py-4 shadow-md bg-white dark:bg-gray-950 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="FashionWear"
              height={32}
              width={32}
              className="h-9"
            />
            <h1 className="text-2xl font-bold mt-1 text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text">
              FashionWear
            </h1>
          </div>
          <nav className="items-center gap-3 hidden md:flex">
            {navMenu.map((menu) => {
              const isActive =
                pathName == menu.route ||
                (menu.route !== HOME_ROUTE && pathName.startsWith(menu.route));
              return (
                <Link
                  key={menu.route}
                  className={`text-dark dark:text-gray-200 px-2 py-1 hover:text-primary ${isActive ? "text-primary" : ""}`}
                  href={menu.route}
                >
                  {menu.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <button
            onClick={toggleTheme}
              className=" px-2 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-white"
            >
              {theme=="light"?"🌙":"🌞"}
            </button>
          
         
           {isAuthenticated ?(
            <>   <Link href={CART_ROUTE} className="px-4 pt-1 pb-2 rounded-3xl bg-gray-100 dark:bg-gray-700 h-auto">
              🛒
              <span className="bg-primary px-2 py-0.5 text-xs rounded-xl text-white">
               {products.length}
              </span>
            </Link>
              <button
              type="button"
              className="hover:bg-primary text-white px-5 py-1.5 rounded-lg bg-primary-dark cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button></>
           ):(
            <Link
              className="hover:bg-primary text-white px-5 py-1.5 rounded-lg bg-primary-dark"
              href={LOGIN_ROUTE}
            >
              Login
            </Link>
             )} 
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
