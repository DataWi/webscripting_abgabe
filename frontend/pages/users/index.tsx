import UsersList from "@/components/users/usersList";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import useHttp, { sendRequestParams } from "@/components/util/hooks/useHttp";
import { useAuth } from "@/components/auth/authContextProvider";
import { useRouter } from "next/router";

export type ResponseUser = {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
};

export default function Home() {
  const [usersList, setUserslist] = useState([] as ResponseUser[]);
  const [cachedUsers, setCachedUsers] = useState([] as ResponseUser[]);
  const { sendRequest, error, data, isLoading, clear } = useHttp();
  const { token, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    if (!user || !user.isAdmin) router.push("/404");
    setTimeout(() => {
      const requestParams: sendRequestParams = {
        url: "http://localhost/api/v1/users",
        method: "GET",
        reqIdentifer: "users",
        token: token,
      };
      sendRequest(requestParams);
    }, 500);
  }, [sendRequest, token]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      console.log(isLoading, cachedUsers, usersList);
      setCachedUsers(data.data);
      setUserslist(data.data);
    }
    clear();
  }, [isLoading, error, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserslist(cachedUsers);
    const search = (e.target as HTMLInputElement).value;
    const usersListFiltered = cachedUsers.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    setUserslist(usersListFiltered);
  };

  isLoading && <Spinner animation='border' />;

  return (
    <Container className='mt-2'>
      <Row className='m-2'>
        <Col md='auto'>
          <h2>Filter</h2>
        </Col>
        <Col>
          <Form>
            <Form.Control
              type='text'
              placeholder='Search'
              onChange={handleSearch}
            />
            <br />
          </Form>
        </Col>
      </Row>
      <UsersList users={usersList} />
    </Container>
  );
}
