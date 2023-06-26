import { Button, Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
// import React, { useContext } from "react";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePassword,
} from "../helpers/inputFieldValidators";

function Login() {
  // const { currentUser, setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  // Input field helpers
  const emailHelper = React.useMemo(() => {
    if (!email)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateEmail(email);

    return {
      text: isValid ? "Valid email" : "Please enter a valid email address",
      color: isValid ? "success" : "warning",
    };
  }, [email]);

  const passHelper = React.useMemo(() => {
    if (!password)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validatePassword(password);
    return {
      text: isValidPass
        ? "Valid password"
        : "Please enter minimum eight characters",
      color: isValidPass ? "success" : "warning",
    };
  }, [password]);

  // Handlers
  let response;

  const loginHandler = async () => {
    if (!email) {
      setShakeEmail(true);
      emailHelper.color = "error";
      emailHelper.text = "Please enter your email address";
    } else if (!validateEmail(email)) {
      setShakeEmail(true);
      emailHelper.color = "error";
    }
    if (!password) {
      setShakePassword(true);
      passHelper.color = "error";
      passHelper.text = "Please enter your password";
    } else if (!validatePassword(password)) {
      setShakePassword(true);
      passHelper.color = "error";
    }
    setTimeout(() => setShakeEmail(false), 750);
    setTimeout(() => setShakePassword(false), 750);

    try {
      // response = await postLogin({ email, password });

      if (response) {
        const verified = response.isVerified;
        if (verified) {
          // localStorage.setItem('name', response.name);
          // localStorage.setItem('email', response.email);
          // localStorage.setItem('token', response.token);
          // localStorage.setItem('admin', String(response.isAdmin));
          // setCurrentUser({
          //   name: response.name,
          //   email: response.email,
          //   token: response.token,
          //   isAdmin: response.isAdmin,
          // });
          notifyLoggedIn();
        } else {
          notifyNotVerified();
        }
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        const errors = [];
        errors.push(error.message.split(";"));

        for (let i = 0; i < errors.length; i++) {
          setShakeEmail(true);
          setShakePassword(true);
          emailHelper.color = "error";
          passHelper.color = "error";
          emailHelper.text = errors[0][i];
          passHelper.text = errors[0][i];
          setTimeout(() => {
            setShakeEmail(false);
            setShakePassword(false);
          }, 750);
        }
      }
    }
  };

  // Notifications
  const notifyLoggedIn = () =>
    toast.success(`Sikeres bejelentkezés. Welcome to Fox Ticket, ${response.name}!`);

  const notifyNotVerified = () =>
    toast.warn("Please verify your email address before logging in.");

  return (
    <>
      <div
        className="registration_form_container"
        style={{ marginBottom: "12rem" }}
      >
        <h2 className="registration_form_headline">Bejelentkezés</h2>
        <div className="registration_form_content">
          <Input
            clearable
            className={shakeEmail ? "shake" : ""}
            onChange={(e) => setEmail(e.target.value)}
            rounded
            bordered
            status={emailHelper.color}
            color={emailHelper.color}
            helperColor={emailHelper.color}
            helperText={emailHelper.text}
            labelPlaceholder="E-mail cím:"
            type="text"
            size="md"
            fullWidth
          />
          <Spacer y={2.5} />
          <Input.Password
            className={shakePassword ? "shake" : ""}
            onChange={(e) => setPassword(e.target.value)}
            required
            rounded
            bordered
            status={passHelper.color}
            color={passHelper.color}
            helperColor={passHelper.color}
            helperText={passHelper.text}
            type="password"
            labelPlaceholder="Jelszó:"
            fullWidth
            size="md"
          />
        </div>
        <Button
          rounded
          type="submit"
          id="registration_submit_button"
          onPress={loginHandler}
        >
          Bejelentkezés
        </Button>
      </div>
    </>
  );
}
export default Login;
