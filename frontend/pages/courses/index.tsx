import { useEffect, useState } from "react";
import { Col, Container, Row, Stack, Form } from "react-bootstrap";
import { CategoryChecks, CourseItem } from "@/components/courses/form";
import { useCart } from "@/components/courses/cartContext";
import useHttp from "@/components/util/hooks/useHttp";
import { useAuth } from "@/components/auth/authContextProvider";

export type Course = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  price: number;
  category: string;
};
export type CategoryCheck = {
  checked: boolean;
  category: string;
};

export default function Courses() {
  const { isLoading, error, data, sendRequest, clear } = useHttp();
  const { token } = useAuth();

  const [courseList, setCourseList] = useState([] as Course[]);
  const [courseCache, setCourseCache] = useState([] as Course[]);
  const [categories, setCategories] = useState([] as CategoryCheck[]);

  useEffect(() => {
    setTimeout(() => {
      sendRequest({
        url: "http://localhost/api/v1/courses",
        method: "GET",
        reqIdentifer: "courses",
        token,
      });
      clear();
    }, 500);
  }, [sendRequest, token]);

  useEffect(() => {
    if (courseCache.length > 0) return;
    if (!isLoading && !error && data) {
      if (courseList.length === 0) setCourseList(data.data);
      setCourseCache(data.data);
    }
    clear();
  }, [isLoading, error, data, token, courseCache, courseList]);

  const { addToCart } = useCart()!;

  const handleCategoryChange = (category: string, check: boolean) => {
    const newCategories = categories.map((cat) =>
      cat.category === category ? { ...cat, checked: check } : cat
    );
    setCategories(newCategories);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = (e.target as HTMLInputElement).value;
    const courseListFiltered = courseCache.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
    setCourseList(courseListFiltered);
  };

  useEffect(() => {
    if (categories.length === 0) {
      setCategories(
        courseCache
          .map((course) => ({ checked: false, category: course.category }))
          .reduce((acc, curr) => {
            if (!acc.find((cat) => cat.category === curr.category)) {
              acc.push(curr);
            }
            return acc;
          }, [] as CategoryCheck[])
      );
      return;
    }
  }, [courseCache]);

  useEffect(() => {
    if (categories.every((cat) => !cat.checked))
      return setCourseList(courseCache);

    const courseListFiltered = courseCache.filter((course) =>
      categories.some((cat) => cat.checked && cat.category === course.category)
    );
    setCourseList(courseListFiltered);
  }, [categories]);

  return (
    <Container>
      <Row>
        <Col md={2} className='pt-5 mt-5'>
          <h2>Filter</h2>
          <Form>
            <Form.Control
              type='text'
              placeholder='Search'
              onChange={handleSearch}
            />
            <br />
            {!isLoading && (
              <CategoryChecks
                categories={categories}
                handleCategoryChange={handleCategoryChange}
              />
            )}
          </Form>
        </Col>
        <Col className='flex-grow-1'>
          <Stack gap={2}>
            {courseList.length === 0 ? (
              <p>Loading....</p>
            ) : (
              courseList.map((course) => CourseItem(course, addToCart))
            )}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
