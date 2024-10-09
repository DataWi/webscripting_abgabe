import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import PurchaseList from "@/components/courses/purchase";
import AuthForm from "@/components/auth/auth-form";
import { UserContextProvider } from "@/components/users/singleUserContext";
import { useAuth } from "@/components/auth/authContextProvider";
import useHttp from "@/components/util/hooks/useHttp";
import { usePathname, useRouter } from "next/navigation";

const Content = () => {
  const pathName = usePathname();
  if (!pathName) return;
  const userId = pathName.split("/")[2];
  const router = useRouter();

  const { isLoading, sendRequest, error, data, clear } = useHttp();
  const { user, token } = useAuth();
  const [targetUser, setTargetUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!token || !userId) return;
    if (!user || !user.isAdmin) router.push("/404");
    setTimeout(() => {
      sendRequest({
        url: `http://localhost/api/v1/users/${userId}`,
        method: "GET",
        reqIdentifer: "user",
        token: token,
      });
    }, 500);
  }, [sendRequest, userId]);

  useEffect(() => {
    if (error) router.push("/404");
    if (!isLoading && !error && data) {
      setTargetUser(data.data);
    }
    clear();
  }, [isLoading, error, data]);

  const handleSubmit = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6}>
          <h1>Account Information</h1>
          <Button variant='outline-primary' onClick={() => handleShow()}>
            Show / Edit
          </Button>

          <Modal show={show} onHide={handleClose}>
            <AuthForm inModal={true} userId={userId} />
          </Modal>
        </Col>
      </Row>
      <hr />
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6}>
          {/* <h1>Purchases</h1>
          {!isLoading && user ? (
            <PurchaseList purchaseIds={user.purchaseIds} />
          ) : (
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          )} */}
        </Col>
      </Row>
    </Container>
  );
};

export default function Home() {
  return <Content />;
}
