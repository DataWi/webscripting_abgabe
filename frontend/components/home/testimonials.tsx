import { Card, Col, Container, Row } from "react-bootstrap";

export default function HomeTestimonialSection() {
  return (
    <Container fluid className='bg-light'>
      <h1 className='display-5 text-center py-5 text-bold'>
        {" "}
        How learners achieve their goals
      </h1>
      <Container className='pb-3'>
        <Row>
          <DisplayCard
            title='Achieving AWS Certification Success with Precision Content'
            name='John D.'
            text='I am thrilled to share that after just a few months of taking this course, I successfully passed my exam and am now an AWS Certified Cloud Practitioner! The content was spot on with what the CCP exam covered.'
            course='Introduction to AWS'
            link1='#'
          />
          <DisplayCard
            title='From Learner to Certified: My UX Design Journey'
            name='Emily R.'
            text='I couldn’t be happier to announce that after diligently following this course for a few months, I passed my exam and achieved my UX Design certification! The material was exactly what I needed to excel in the field.'
            course='All about UX Design'
            link1='#'
          />
          <DisplayCard
            title='Dedicated Study Leads to Project Management Triumph'
            name='Michael S.'
            text='I am proud to say that after several months of dedicated study with this course, I passed my exam and am now a certified Project Management Professional! The course content perfectly matched the exam requirements.'
            course='Project Management - the practical approach'
            link1='#'
          />
        </Row>
      </Container>
    </Container>
  );
}

type DisplayCardContent = {
  title: string;
  name: string;
  text: string;
  course: string;
  link1: string;
};

function DisplayCard({ title, name, text, course, link1 }: DisplayCardContent) {
  return (
    <Col className='mb-2'>
      <Card style={{ minWidth: "18rem", height: "100%" }}>
        <Card.Body className='flex-grow-1'>
          <Card.Title className='text-muted'>{title}</Card.Title>
          <Card.Text className='mt-1'>{text}</Card.Text>
          <Card.Subtitle className='mb-2'>{name}</Card.Subtitle>
        </Card.Body>
        <Card.Footer style={{ height: "4rem" }}>
          <Card.Link className='text-muted link-dark' href={link1}>
            {course}
          </Card.Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}
