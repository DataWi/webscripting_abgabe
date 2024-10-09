import { Col, Container, Image, Row } from "react-bootstrap";

export const JoinUs = () => (
  <Container className='mt-3'>
    <Row>
      <Col xs={6} md={4}>
        <Image
          fluid
          roundedCircle
          src='http://localhost:3001/backend/api/join'
          alt='Join Us'
        />
      </Col>
      <Col className='my-auto'>
        <h1>Join Us</h1>
        <p>
          We are always looking for talented individuals to join our team. If
          you are passionate about education and technology, we would love to
          hear from you.
        </p>
        <p>
          We offer competitive salaries, flexible working hours, and a
          supportive work environment.
        </p>
        <p>
          Apply {""}
          <a href='mailto:' className='text-primary'>
            Here
          </a>
        </p>
      </Col>
    </Row>
  </Container>
);
