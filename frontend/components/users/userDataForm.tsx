import { use, useEffect, useRef, useState } from "react";
import {
  Form,
  FloatingLabel,
  ButtonGroup,
  Button,
  Container,
} from "react-bootstrap";
import useHttp from "../util/hooks/useHttp";
import { useAuth } from "../auth/authContextProvider";
import { useRouter } from "next/router";
import useInput from "../util/hooks/useInput";
import { validate } from "../util/validators";

type UserForm = {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  isAdmin: boolean;
  state?: string;
  city?: string;
  postalCode?: string;
  street?: string;
};
const UserForm = ({
  id,
  username,
  email,
  firstname,
  lastname,
  city = "",
  postalCode = "",
  street = "",
}: UserForm) => {
  if (!email) return null;

  const userEmailref = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const adminRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);

  const {
    value: firstName = firstname,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => validate(value, [{ type: "MINLENGTH", val: 3 }]));

  const {
    value: lastName = lastname,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => validate(value, [{ type: "MINLENGTH", val: 3 }]));

  const {
    value: userCity = city,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput((value) => validate(value, [{ type: "MINLENGTH", val: 3 }]));

  const {
    value: userPostalCode = postalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
  } = useInput((value) => validate(value, [{ type: "MINLENGTH", val: 3 }]));

  const {
    value: userStreet = street,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
  } = useInput((value) => validate(value, [{ type: "MINLENGTH", val: 3 }]));

  return (
    <UserDataFormStateWrapper
      refs={{
        firstNameRef,
        lastNameRef,
        cityRef,
        postalCodeRef,
        streetRef,
      }}
      userId={id}>
      <h1>Update {username}</h1>
      <Form.Group>
        <FloatingLabel
          controlId='floatingFirstName'
          label={firstname ? firstname : "Firstname"}
          className='mb-3'>
          <Form.Control
            type='text'
            placeholder={firstname ? firstname : "Firstname"}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            isInvalid={firstNameHasError}
            isValid={firstNameIsValid}
            value={firstName}
            ref={firstNameRef}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId='floatingLastName'
          label={lastname ? lastname : "Lastname"}
          className='mb-3'>
          <Form.Control
            type='text'
            placeholder={lastname}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            isInvalid={lastNameHasError}
            isValid={lastNameIsValid}
            value={lastName}
            ref={lastNameRef}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId='floatingCity'
          label={city ? city : "City"}
          className='mb-3'>
          <Form.Control
            type='text'
            placeholder={city ? city : "City"}
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            isInvalid={cityHasError}
            isValid={cityIsValid}
            value={userCity}
            ref={cityRef}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId='floatingPostalCode'
          label={postalCode ? postalCode.toString() : "Postal Code"}
          className='mb-3'>
          <Form.Control
            type='text'
            placeholder={postalCode ? postalCode.toString() : "Postal Code"}
            onChange={postalCodeChangeHandler}
            onBlur={postalCodeBlurHandler}
            isInvalid={postalCodeHasError}
            isValid={postalCodeIsValid}
            value={userPostalCode}
            ref={postalCodeRef}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId='floatingStreet'
          label={street ? street : "Street"}
          className='mb-3'>
          <Form.Control
            type='text'
            placeholder={street ? street : "Street"}
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            isInvalid={streetHasError}
            isValid={streetIsValid}
            value={userStreet}
            ref={streetRef}
          />
        </FloatingLabel>
      </Form.Group>
    </UserDataFormStateWrapper>
  );
};

type ref = {
  firstNameRef: React.RefObject<HTMLInputElement>;
  lastNameRef: React.RefObject<HTMLInputElement>;
  cityRef: React.RefObject<HTMLInputElement>;
  postalCodeRef: React.RefObject<HTMLInputElement>;
  streetRef: React.RefObject<HTMLInputElement>;
};

type WrapperProps = {
  children: React.ReactNode;
  refs: ref;
  userId: string;
};

const UserDataFormStateWrapper = ({ children, refs, userId }: WrapperProps) => {
  const { isLoading, error, data, sendRequest, clear } = useHttp();
  const [formError, setFormError] = useState<string | null>(null);
  const { token } = useAuth();

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    type UserRequestBody = {
      firstname?: string;
      lastname?: string;
      city?: string;
      postalcode?: string;
      street?: string;
    };

    const requestBody: UserRequestBody = {
      firstname: refs.firstNameRef.current?.value,
      lastname: refs.lastNameRef.current?.value,
      city: refs.cityRef.current?.value,
      postalcode: refs.postalCodeRef.current?.value,
      street: refs.streetRef.current?.value,
    };

    setTimeout(() => {
      sendRequest({
        url: "http://localhost/api/v1/users/" + userId,
        method: "PATCH",
        reqIdentifer: "updateUser",
        token: token,
        body: JSON.stringify(requestBody),
      });
    }, 500);
  };

  useEffect(() => {
    if (error) setFormError(error);
    if (!isLoading && !error && data) {
      console.log(data);
      setFormError("User updated successfully");
    }
    clear();
  }, [isLoading, error, data]);

  return (
    <Form onSubmit={() => submitHandler}>
      {formError && <p>{formError}</p>}
      {children}
      <br />
      {isLoading && <p>Loading...</p>}
      <ButtonGroup aria-label='Update Account'>
        <Button
          className='btn-outline-primary'
          variant='lightdark'
          onClick={(e) => submitHandler(e)}>
          Update Account
        </Button>
      </ButtonGroup>
    </Form>
  );
};

const UserDataForm = ({ id }: { id: string }) => {
  const { isLoading, error, data, sendRequest, clear } = useHttp();
  const { token } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<UserForm | null>(null);

  useEffect(() => {
    if (!token) return;
    setTimeout(() => {
      sendRequest({
        url: "http://localhost/api/v1/users/" + id,
        method: "GET",
        reqIdentifer: "auth",
        token: token,
      });
    }, 500);
  }, [sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      setUser(data.data);
    }
    clear();
  }, [isLoading, error, data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) router.push("/404");
  if (!isLoading && user) {
    return (
      <Container>
        <UserForm {...user} />
      </Container>
    );
  }
};

export default UserDataForm;
