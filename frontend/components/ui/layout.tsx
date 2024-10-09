import { Container } from "react-bootstrap";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { CartProvider } from "../courses/cartContext";
import { AuthContextProvider } from "../auth/authContextProvider";

export type Paths =
  | "Home"
  | "Profile"
  | "Courses"
  | "Login"
  | "My-Learning"
  | "Logout"
  | "Cart";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    // make container full width
    <AuthContextProvider>
      <CartProvider>
        <Container
          fluid
          className='p-0 d-flex flex-column overflow-hidden min-vh-100'>
          <Header />
          {children}
          <div className='flex-grow-1' />
          <Footer />
        </Container>
      </CartProvider>
    </AuthContextProvider>
  );
};

import "bootstrap/dist/css/bootstrap.min.css";
