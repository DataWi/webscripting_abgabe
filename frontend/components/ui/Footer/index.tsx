import { Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className='page-footer font-small blue pt-4 bg-secondary text-white mt-2'>
      <div className='container-fluid text-left'>
        <div className='row'>
          <div className='col-md-6 mt-md-0 p-4'>
            <h5 className='text-uppercase'>About Us</h5>
            <p>
              EduQuest is dedicated to providing high-quality online education
              to learners around the globe. Our mission is to empower
              individuals through accessible and affordable learning
              opportunities.
            </p>
            <p>
              <strong>Contact Us</strong>
              <br />
              Email: support@eduquest.com <br /> Phone: +1 (800) 123-4567 <br />
              Address: 123 Learning Lane, Knowledge City, EduLand
            </p>
          </div>

          <hr className='clearfix w-100 d-md-none pb-0' />

          <div className='col-md-3 mb-md-0 mb-3 p-4'>
            <h5 className='text-uppercase'>Follow Us</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='#!' className='link-light'>
                  Facebook
                </a>
              </li>
              <li>
                <a href='#!' className='link-light'>
                  Instagram
                </a>
              </li>
              <li>
                <a href='#!' className='link-light'>
                  TikTok
                </a>
              </li>
              <li>
                <a href='#!' className='link-light'>
                  X
                </a>
              </li>
            </ul>
          </div>

          <div className='col-md-3 mb-md-0 mb-3 p-4'>
            <h5 className='text-uppercase'>Quick Links</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='/' className='link-light'>
                  Home
                </a>
              </li>
              <li>
                <a href='/courses' className='link-light'>
                  Courses
                </a>
              </li>
              <li>
                <a href='/auth' className='link-light'>
                  Log in / Sign up
                </a>
              </li>
              <li>
                <a href='./shop/cart' className='link-light'>
                  Cart
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='footer-copyright text-center py-3'>
        © 2024 Copyright:{" "}
        <a href='http://localhost:3000/' className='link-light'>
          EduQuest.com
        </a>
      </div>
    </footer>
  );
};
