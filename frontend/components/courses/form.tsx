import { Course, CategoryCheck } from "../../pages/courses";
import { Card, Col, Row, Image, Form } from "react-bootstrap";

type CategoryChecksProps = {
  categories: CategoryCheck[];
  handleCategoryChange: (category: string, checked: boolean) => void;
};

export const CategoryChecks = ({
  categories,
  handleCategoryChange,
}: CategoryChecksProps) => {
  return (
    <>
      {categories.map((type, index) => (
        <Col key={`${index}`}>
          <div className='mb-3'>
            <Form.Check // prettier-ignore
              type='checkbox'
              checked={type.checked}
              id={`${type.category}`}
              label={`${type.category}`}
              onChange={() =>
                handleCategoryChange(type.category, !type.checked)
              }
            />
          </div>
        </Col>
      ))}
    </>
  );
};

export const CourseItem = (
  course: Course,
  handleAddToCart?: (course: Course) => void
) => (
  <Card key={course.id} className='m-2' style={{ border: "none" }}>
    <hr />
    <Row>
      <Col xs={6} md={4} className='mr-0' style={{ maxHeight: "12rem" }}>
        <Image
          src={course.imageUrl}
          alt={course.title}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      </Col>
      <Col className='p-0' xs={6} md={8}>
        <Card.Body className='p-0'>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>{course.description}</Card.Text>
          <Card.Subtitle className='text-muted'>
            {course.instructor}
          </Card.Subtitle>
          <Card.Text className='fs-6'>{course.price} €</Card.Text>
          <Card.Text className='fs-5 text-muted'>{course.category}</Card.Text>
          <Card.Link className='link-secondary' href={`/courses/${course.id}`}>
            Details
          </Card.Link>
          {handleAddToCart && (
            <Card.Link
              href='#'
              className='link-success'
              onClick={() => handleAddToCart(course)}>
              Add to Cart
            </Card.Link>
          )}
        </Card.Body>
      </Col>
    </Row>
  </Card>
);
