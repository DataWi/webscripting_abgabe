import { Course } from "@/pages/courses";
import { MouseEvent, useEffect, useState } from "react";
import { Button, Container, Form, NavDropdown, Stack } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useCart } from "./cartContext";
import { useAuth } from "../auth/authContextProvider";
import useHttp from "../util/hooks/useHttp";
import { useRouter } from "next/router";

interface CartProps {
  name: string;
  [key: string]: any;
}

type PurchaseRequestBody = {
  course_id: number[];
  total: number;
};

export default function Cart({ name, ...props }: CartProps) {
  const [show, setShow] = useState(false);
  const { cartItems, removeFromCart, price, clearCart } = useCart()!;
  const router = useRouter();

  const { token, user } = useAuth();
  const { isLoading, sendRequest, error, clear, data } = useHttp();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(token, user);
    if (!user) router.push("/auth");

    e.preventDefault();
    const purchaseBody: PurchaseRequestBody = {
      course_id: cartItems.map((item) => item.id),
      total: price,
    };
    const requestParams = {
      url: "http://localhost/api/v1/purchase",
      method: "POST",
      reqIdentifer: "purchase",
      token: token,
      body: JSON.stringify(purchaseBody),
    };
    setTimeout(() => sendRequest(requestParams), 500);
  };

  useEffect(() => {
    if (!isLoading && !error && data) {
      clearCart();
    }
    clear();
  }, [isLoading, error, data, sendRequest]);

  return (
    <>
      <NavDropdown.Item onClick={handleShow} className='me-2'>
        {name}
      </NavDropdown.Item>
      <Offcanvas
        style={{ overflow: "scroll" }}
        scroll={true}
        backdrop={false}
        show={show}
        onHide={handleClose}
        {...props}>
        <Container>
          <Form>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <hr />
            <Offcanvas.Body>
              <Stack>
                {cartItems.map((item) => CartItem(item, removeFromCart))}
              </Stack>
            </Offcanvas.Body>
            <br />
            <Stack direction='horizontal'>
              <h3>Total: {price} €</h3>
              <Button
                onClick={(e) => submitHandler(e)}
                type='button'
                variant='outline-primary'
                className='ms-auto'>
                Checkout
              </Button>
            </Stack>
          </Form>
        </Container>
      </Offcanvas>
    </>
  );
}

const CartItem = (course: Course, handleRemove: (id: number) => void) => (
  <div key={course.id} className='d-flex flex-column justify-content-between'>
    <h3>{course.title}</h3>
    <p className='text-secondary'>{course.instructor}</p>
    <p className='fs-5 text-muted'>{course.price} €</p>
    <Button variant='outline-danger' onClick={() => handleRemove(course.id)}>
      Remove
    </Button>
    <hr />
  </div>
);
