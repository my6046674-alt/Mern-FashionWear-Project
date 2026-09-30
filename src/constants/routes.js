import { FaChartPie, FaShoppingBag, FaShoppingCart, FaUsers } from "react-icons/fa";

export const HOME_ROUTE = "/";
export const ABOUT_ROUTE = "/about";
export const CONTACT_ROUTE = "/contact";
export const PRODUCTS_ROUTE = "/products";
export const ORDER_ROUTE = "/orders";
export const ORDERS_ROUTE = "/orders";
export const LOGIN_ROUTE = "/auth/login";
export const REGISTER_ROUTE = "/auth/register";
export const CART_ROUTE = "/cart";

// Admin routes
export const PRODUCT_MANAGEMENT_ROUTE = "/admin/product-management";
export const DASHBOARD_ROUTE = "/admin/dashboard";
export const ORDER_MANAGEMENT_ROUTE = "/admin/order-management";
export const USER_MANAGEMENT_ROUTE = "/admin/user-management";


export const navMenu = [
  {
    label: "Home",
    route: HOME_ROUTE,
  },
  {
    label: "About",
    route: ABOUT_ROUTE,
  },
  {
    label: "Products",
    route: PRODUCTS_ROUTE,
  },

  {
    label: "Orders",
    route: ORDERS_ROUTE,
  },
  {
    label: "Contact",
    route: CONTACT_ROUTE,
  },
];

export const adminMenu = [
  {
    label: "Dashboard",
    route: DASHBOARD_ROUTE,
    Icon: FaChartPie,
  },
  {
    label: "Cart",
    route: CART_ROUTE,
    Icon: FaShoppingCart,
  },
  {
    label: "Product Management",
    route: PRODUCT_MANAGEMENT_ROUTE,
    Icon: FaShoppingBag,
  },
  {
    label: "Order Management",
    route: ORDER_MANAGEMENT_ROUTE,
    Icon: FaShoppingCart,
  },
  {
    label: "User Management",
    route: USER_MANAGEMENT_ROUTE,
    Icon: FaUsers,
  },
];
