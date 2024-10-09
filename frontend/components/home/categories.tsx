import { Col, Container, Row } from "react-bootstrap";

export default function Categories() {
  return (
    <Container className=' px-4 pb-5'>
      <h1 className='pb-2 border-bottom'>Top Categories</h1>
      <Row className='g-4  row-cols-1 row-cols-lg-3'>
        <Category
          title='Management'
          text='Management professionals drive success and efficiency, leading to high-level roles and significant impacts.'
          link='#'
        />
        <Category
          title='Programming'
          text='Programming offers dynamic careers with high demand, excellent growth prospects, and competitive salaries.'
          link='#'
        />
        <Category
          title='Marketing'
          text='Marketing experts boost brand awareness and customer engagement, with diverse career paths in traditional and digital sectors.'
          link='#'
        />
      </Row>
    </Container>
  );
}

type CategoryProps = {
  title: string;
  text: string;
  link: string;
};

const Category = ({ title, text, link }: CategoryProps) => (
  <Col className='feature p-5 d-flex flex-column'>
    <h2 className='text-secondary'>{title}</h2>
    <div
      className='feature-icon bg-primary bg-gradient'
      style={{
        opacity: 0.3,
      }}>
      <svg className='bi' width='1em' height='1em'>
        {/* <use xlink:href='#collection' /> */}
      </svg>
    </div>
    <p className='flex-grow-1'>{text}</p>
    <a href={link} className='icon-link link-info'>
      Start your journey here!
      <svg className='bi' width='1em' height='1em'>
        {/* <use xlink:href='#chevron-right' /> */}
      </svg>
    </a>
  </Col>
);
