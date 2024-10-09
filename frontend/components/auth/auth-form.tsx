import { useState, useRef, FormEvent, RefObject, useEffect, use } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import useHttp from "../util/hooks/useHttp";
import { validate } from "../util/validators";
import useInput from "../util/hooks/useInput";
import { useAuth } from "./authContextProvider";
import type { sendRequestParams } from "../util/hooks/useHttp";

/** AUTH INPUT FIELDS DEFINITION */

type AuthFormProps = {
  inModal: boolean;
  userId?: string;
};

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export default function AuthForm({ inModal = false, userId }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) =>
    validate(value, [
      { type: "EMAIL" },
      {
        type: "REQUIRE",
      },
    ])
  );

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) =>
    validate(value, [
      {
        type: "MINLENGTH",
        val: 3,
      },
      {
        type: "MAXLENGTH",
        val: 30,
      },
      {
        type: "REQUIRE",
      },
    ])
  );

  const {
    value: enderedPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) =>
    validate(value, [{ type: "REQUIRE" }, { type: "MINLENGTH", val: 8 }])
  );

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) =>
    validate(value, [
      { type: "REQUIRE" },
      { type: "MINLENGTH", val: 8 },
      { type: "EQUALS", val: enderedPassword },
    ])
  );

  const formIsValid = isLogin
    ? enteredNameIsValid && enteredPasswordIsValid
    : enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid;

  return (
    <AuthStateWrapper
      user_id={userId}
      inModal={inModal}
      refs={{
        emailInputRef,
        passwordInputRef,
        nameInputRef,
        confirmPasswordInputRef,
      }}
      isLogin={isLogin}
      toggleLogin={() => setIsLogin(!isLogin)}
      isValid={formIsValid}>
      <Form.Group>
        <FloatingLabel
          controlId='floatingUsername'
          label='Username'
          className='mb-3'>
          <Form.Control
            type='string'
            placeholder='Username'
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            isInvalid={nameInputHasError}
            isValid={enteredNameIsValid}
            value={enteredName}
            required
            ref={nameInputRef}
          />
        </FloatingLabel>
      </Form.Group>
      {!isLogin && (
        <Form.Group>
          <FloatingLabel
            controlId='floatingEmail'
            label='Email Address'
            className='mb-3'>
            <Form.Control
              type='email'
              placeholder='Email Address'
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              isInvalid={emailInputHasError}
              isValid={enteredEmailIsValid}
              value={enteredEmail}
              required
              ref={emailInputRef}
            />
          </FloatingLabel>
        </Form.Group>
      )}
      <Form.Group>
        <FloatingLabel
          controlId='floatingPassword'
          label='Password'
          className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            isValid={enteredPasswordIsValid}
            isInvalid={passwordInputHasError}
            value={enderedPassword}
            required
            ref={passwordInputRef}
          />
        </FloatingLabel>
      </Form.Group>
      {!isLogin && (
        <Form.Group>
          <FloatingLabel
            controlId='floatingPasswordConfirm'
            label='Confirm Password'
            className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              onChange={confirmPasswordChangedHandler}
              onBlur={confirmPasswordBlurHandler}
              isInvalid={confirmPasswordInputHasError}
              value={enteredConfirmPassword}
              isValid={enteredConfirmPasswordIsValid}
              required
              ref={confirmPasswordInputRef}
            />
          </FloatingLabel>
        </Form.Group>
      )}
      <br />
    </AuthStateWrapper>
  );
}

// ** MODAL WRAPPEER DEFINITION */

type WrapInModalProps = {
  children: React.ReactNode;
  handleSubmit: (event: FormEvent) => void;
  inModal: boolean;
};

const WrapInModal = ({ children, inModal, handleSubmit }: WrapInModalProps) => {
  if (!inModal) return <>{children}</>;
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Authenticate to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant='outline-primary' onClick={(e) => handleSubmit(e)}>
          Authenticate
        </Button>
      </Modal.Footer>
    </>
  );
};

//** STATE WRAPPER DEFINITION */

type ref = {
  emailInputRef: RefObject<HTMLInputElement>;
  passwordInputRef: RefObject<HTMLInputElement>;
  nameInputRef: RefObject<HTMLInputElement>;
  confirmPasswordInputRef: RefObject<HTMLInputElement>;
};

type AuthStateWrapperProps = {
  children: React.ReactNode;
  inModal: boolean;
  refs: ref;
  isLogin: boolean;
  toggleLogin: () => void;
  isValid: boolean;
  user_id?: string;
};

const AuthStateWrapper = ({
  children,
  inModal,
  refs,
  isLogin,
  toggleLogin,
  isValid,
  user_id,
}: AuthStateWrapperProps) => {
  const { isLoading, error, data, sendRequest, clear } = useHttp();
  const { login, token } = useAuth();
  const baseUrl = "http://localhost";
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      const params: sendRequestParams = {
        url: `${baseUrl}/api/csrf`,
        method: "GET",
        reqIdentifer: "csrf",
      };
      sendRequest(params);
    }, 500);
  }, [sendRequest]);

  useEffect(() => {
    if (data && data.csrf) {
      setCsrfToken(data.csrf);
    }

    const target = inModal ? `/users/${user_id}/account` : "/courses";

    if (data && data.token) {
      login(
        {
          id: data.id,
          email: data.email,
          username: data.username,
          isAdmin: data.admin,
        },
        data.token,
        target
      );
      clear();
    }
  }, [data, isLoading, error]);

  const {
    emailInputRef,
    passwordInputRef,
    nameInputRef,
    confirmPasswordInputRef,
  } = refs;

  async function handleRegister() {
    type RegisterBody = {
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
    };

    const name = nameInputRef.current!.value;
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const confirmPassword = confirmPasswordInputRef.current!.value;

    const body: RegisterBody = {
      email,
      username: name,
      password,
      confirmPassword,
    };

    setTimeout(() => {
      const params: sendRequestParams = {
        url: `${baseUrl}/auth/register`,
        method: "POST",
        reqIdentifer: "register",
        body: JSON.stringify(body),
        csrf: csrfToken,
        token,
      };
      sendRequest(params);
    }, 500);
  }
  console.log(csrfToken);

  async function handleLogin() {
    const nameInput: string = nameInputRef.current!.value;
    const enteredPassword: string = passwordInputRef.current!.value;

    type LoginBody = {
      email?: string;
      username?: string;
      password: string;
    };

    const body: LoginBody = { password: enteredPassword };
    nameInput.includes("@")
      ? (body["email"] = nameInput)
      : (body["username"] = nameInput);

    setTimeout(() => {
      const params: sendRequestParams = {
        url: `${baseUrl}/auth/login`,
        method: "POST",
        reqIdentifer: "login",
        body: JSON.stringify(body),
        csrf: csrfToken,
        token,
      };
      sendRequest(params);
    }, 500);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValid) return;

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  }

  const layoutClasses = !inModal
    ? "justify-content-md-center mt-5"
    : "justify-content-center";

  if (isLoading)
    return (
      <Row className='justify-content-md-center mt-3'>
        <Spinner animation='border' />
      </Row>
    );

  return (
    <Container>
      <Row className={layoutClasses}>
        <Col xs={12} md={!inModal ? 6 : 10}>
          <WrapInModal inModal={inModal} handleSubmit={handleSubmit}>
            {!inModal && <h1>{isLogin ? "Login" : "Sign Up"}</h1>}
            {error && (
              <Container className='bg-light text-danger'>{error}</Container>
            )}
            <Form>
              {children}

              {!inModal && (
                <ButtonGroup aria-label='Sign in'>
                  <Button
                    className='btn-outline-primary'
                    variant='lightdark'
                    onClick={(e) => handleSubmit(e)}>
                    {isLogin ? "Login" : !inModal && "Create Account"}
                  </Button>
                  {!inModal && (
                    <Button
                      variant='white'
                      className='btn-outline-secondary'
                      onClick={() => toggleLogin()}>
                      {isLogin
                        ? "Create new account"
                        : "Login with existing account"}
                    </Button>
                  )}
                </ButtonGroup>
              )}
            </Form>
          </WrapInModal>
        </Col>
      </Row>
    </Container>
  );
};
