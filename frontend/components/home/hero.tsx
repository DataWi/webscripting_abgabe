import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const HomeHeroSection = () => (
  <Container className='p-0'>
    <Container
      className='p-5 mb-3 bg-light text-lightdark'
      style={{
        backgroundImage: "url('http://localhost:3001/backend/api/hero')",
        backgroundSize: "cover",
        backgroundBlendMode: "soft-light",
        opacity: "0.8",
      }}>
      <Container fluid className='py-5'>
        <h1 className='display-5 fw-bold'>
          Master New Skills, Anytime, Anywhere
        </h1>
        <p className='col-md-8 fs-4'>
          Join our community of learners and gain access to a wide range of
          courses designed to help you achieve your goals. Whether you’re
          looking to advance your career or explore new hobbies, SkillWeave has
          something for everyone.
        </p>
        <Button variant='outline-dark'>Start Learning Today!</Button>
      </Container>
    </Container>
  </Container>
);

export const CareerSection = () => (
  <Container fluid className='mb-5 p-5 bg-secondary text-center text-light'>
    <h1 className='m-2 text-white'>Unlock your future with EduQuest</h1>
    <p className='fs-5  fw-light'>
      The career prospects for those who invest in their education through
      SkillWeave are incredibly promising. Our courses are designed to equip you
      with the skills and knowledge that are in high demand across various
      industries. Whether you’re aiming to become a certified professional in
      cloud computing, UX design, or project management, the opportunities are
      vast and rewarding.
    </p>
  </Container>
);
