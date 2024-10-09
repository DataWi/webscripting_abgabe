import { signIn } from "next-auth/react";
import HomeTestimonialSection from "./testimonials";
import Categories from "./categories";
import { CareerSection, HomeHeroSection } from "./hero";
import { JoinUs } from "./join";
import { Col, Row } from "react-bootstrap";

export default function HomePageContent() {
  return (
    <Row>
      <Col>
        <HomeHeroSection />
        <CareerSection />
        <Categories />
        <HomeTestimonialSection />
        <JoinUs />
      </Col>
    </Row>
  );
}
