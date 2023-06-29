import { Button, Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePassword,
} from "../helpers/inputFieldValidators";
import { postLogin } from "../api/users";
import { saveToken, getCurrentUser } from '../helpers/auth';
import {UserContext} from "../contexts/UserContext";


function Login() {
  const { setCurrentUser } = useContext(UserContext);
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
      text: isValid ? "Megfelelően kitöltött mező!" : "Kérjük helyes e-mail címet adjon meg!",
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
        ? "Megfelelően kitöltött mező!"
        : "Please enter minimum eight characters",
      color: isValidPass ? "success" : "warning",
    };
  }, [password]);

  // Handlers
  let response;
  const handleLogin = async () => {
    if (!email) {
      setShakeEmail(true);
      emailHelper.color = "error";
      emailHelper.text = "Kérjük adja meg e-mail címét!";
    } else if (!validateEmail(email)) {
      setShakeEmail(true);
      emailHelper.color = "error";
    }
    if (!password) {
      setShakePassword(true);
      passHelper.color = "error";
      passHelper.text = "Kérjük adja meg jelszavát!";
    } else if (!validatePassword(password)) {
      setShakePassword(true);
      passHelper.color = "error";
    }
    setTimeout(() => setShakeEmail(false), 750);
    setTimeout(() => setShakePassword(false), 750);

    try {
      response = await postLogin({ email, password });

      if (response.success) {
        const { token } = response;
        saveToken(token);

        const currentUser = getCurrentUser();
        setCurrentUser(currentUser);

        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        notifyLoggedIn(response.fullName);
      }
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
  const notifyLoggedIn = (fullName) =>
    toast.success(`Sikeres bejelentkezés. Üdvözöljük az E-CAR oldalán, ${response.fullName}!`);

  return (
    <>
      <div
        className="login_form_container"
        style={{ marginBottom: "12rem" }}
      >
        <h2 className="login_form_headline">Bejelentkezés</h2>
        <div className="login_form_content">
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
          id="login_admin_submit_button"
          onPress={handleLogin}
        >
          Bejelentkezés
        </Button>
      </div>
    </>
  );
}
export default Login;
