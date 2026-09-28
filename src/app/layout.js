import { ToastContainer } from "react-toastify";
import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import Header from "@/components/Header";

export const metadata = {
  title: {
    default: "E-Fashion",
    template: "%s | E-Fashion",
  },
  description: "Shop fashionable clothes and shoes at E-Fashion.",
  keywords: ["online fashion", "clothes", "shoes", "Nepal"],
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body >
        
        <MainLayout>
          <Header/>
          {children}
        </MainLayout>
        <ToastContainer position="top-center" autoClose={2000} />
      </body>
    </html>
  );
};

export default RootLayout;
