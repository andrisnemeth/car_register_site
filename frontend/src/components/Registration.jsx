import { Button, Input, Spacer, Checkbox } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMatch,
} from "../helpers/inputFieldValidators";
import "../styles/Registration.css";
import { postRegister } from "../api/users";

function Registration() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [typeOfUser, setTypeOfUser] = useState("");
  const [isActive, setIsActive] = useState("");

  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakeFullName, setShakeFullName] = useState(false);
  const [shakeUsername, setShakeUsername] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [shakePasswordConf, setShakePasswordConf] = useState(false);

  const emailHelper = React.useMemo(() => {
    if (!email)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateEmail(email);

    return {
      text: isValid ? "Valós email" : "Kérjük helyes e-mail címet adjon meg",
      color: isValid ? "success" : "warning",
    };
  }, [email]);

  const usernameHelper = React.useMemo(() => {
    if (!username)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateName(username);

    return {
      text: isValid
        ? `Megfelelően kitöltött mező!`
        : "Kérjük csak az általános formátumokat használja",
      color: isValid ? "success" : "warning",
    };
  }, [username]);

  const fullNameHelper = React.useMemo(() => {
    if (!fullName)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateName(fullName);

    return {
      text: isValid
        ? `Megfelelően kitöltött mező!`
        : "Kérjük csak az általános formátumokat használja",
      color: isValid ? "success" : "warning",
    };
  }, [fullName]);

  const passHelper = React.useMemo(() => {
    if (!password)
      return {
        text: "",
        color: "default",
      };
    const isValidPass = validatePassword(password);

    return {
      text: isValidPass
        ? "Megfelelő jelszó"
        : "Kérjük, adjon meg legalább nyolc karaktert, amiben található legalább egy kisbetű, nagybetű, szám és különleges karakter",
      color: isValidPass ? "success" : "warning",
    };
  }, [password]);

  const passConfHelper = React.useMemo(() => {
    if (!passwordConf)
      return {
        text: "",
        color: "default",
      };

    const isValidPass = validatePassword(passwordConf);
    const isMatching = validateMatch(password, passwordConf);

    return {
      text: isMatching
        ? "A megadott jelszók egyeznek"
        : "A megadott jelszók nem egyeznek",
      color: isValidPass && isMatching ? "success" : "warning",
    };
  }, [password, passwordConf]);

  // Handlers
  const handleSignUp = async () => {
    if (email.length === 0) {
      setShakeEmail(true);
      emailHelper.color = "error";
      emailHelper.text = "Kérjük tölse ki ezt a mezőt";
    }
    if (fullName.length === 0) {
      setShakeFullName(true);
      fullNameHelper.color = "error";
      fullNameHelper.text = "Kérjük tölse ki ezt a mezőt";
    }
    if (username.length === 0) {
      setShakeUsername(true);
      usernameHelper.color = "error";
      usernameHelper.text = "Kérjük tölse ki ezt a mezőt";
    }
    if (password.length === 0) {
      setShakePassword(true);
      passHelper.color = "error";
      passHelper.text = "Kérjük tölse ki ezt a mezőt";
    }
    if (passwordConf.length === 0) {
      setShakePasswordConf(true);
      passConfHelper.color = "error";
      passConfHelper.text = "Kérjük tölse ki ezt a mezőt";
    }
    if (validateEmail(email) === false) {
      setShakeEmail(true);
      emailHelper.color = "error";
    }
    if (validateName(fullName) === false) {
      setShakeFullName(true);
      fullNameHelper.color = "error";
    }
    if (validateName(username) === false) {
      setShakeUsername(true);
      usernameHelper.color = "error";
    }
    if (validatePassword(password) === false) {
      setShakePassword(true);
      passHelper.color = "error";
    }
    if (validateMatch(password, passwordConf) === false) {
      setShakePasswordConf(true);
      passConfHelper.color = "error";
    }

    setTimeout(() => setShakeEmail(false), 750);
    setTimeout(() => setShakeFullName(false), 750);
    setTimeout(() => setShakeUsername(false), 750);
    setTimeout(() => setShakePassword(false), 750);
    setTimeout(() => setShakePasswordConf(false), 750);

    if (
      validateEmail(email) &&
      validateName(username) &&
      validateName(fullName) &&
      validatePassword(password) &&
      validateMatch(password, passwordConf)
    ) {
      try {
        await postRegister({
          email,
          fullName,
          username,
          password,
          typeOfUser,
          isActive,
        });
        notifySignUp();
      } catch (error) {
        if (error.message.includes("Fiók már létezik")) {
          setShakeEmail(true);
          emailHelper.color = "error";
          emailHelper.text = error.message.replace("Validation error: ", "");
          setTimeout(() => setShakeEmail(false), 750);
        }
      }
    }
  };

  // Notifications
  const notifySignUp = () =>
    toast.success(
      `${email} sikeresen regisztrált! Kérjük, validálja az e-mail címét!`
    );

  return (
    <>
      <div className="registration_form_container">
        <h2 className="registration_form_headline">Regisztráció</h2>
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
          <Input
            clearable
            className={shakeFullName ? "shake" : ""}
            onChange={(e) => setFullName(e.target.value)}
            rounded
            bordered
            status={fullNameHelper.color}
            color={fullNameHelper.color}
            helperColor={fullNameHelper.color}
            helperText={fullNameHelper.text}
            labelPlaceholder="Teljes név:"
            type="text"
            size="md"
            fullWidth
          />
          <Spacer y={2.5} />
          <Input
            clearable
            className={shakeUsername ? "shake" : ""}
            onChange={(e) => setUsername(e.target.value)}
            rounded
            bordered
            status={usernameHelper.color}
            color={usernameHelper.color}
            helperColor={usernameHelper.color}
            helperText={usernameHelper.text}
            labelPlaceholder="Felhasználónév:"
            type="text"
            fullWidth
            size="md"
          />
          <Spacer y={2.5} />
          <Input.Password
            clearable
            className={shakePassword ? "shake" : ""}
            onChange={(e) => setPassword(e.target.value)}
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
          <Spacer y={2.5} />
          <Input.Password
            clearable
            className={shakePasswordConf ? "shake" : ""}
            onChange={(e) => setPasswordConf(e.target.value)}
            required
            rounded
            bordered
            status={passConfHelper.color}
            color={passConfHelper.color}
            helperColor={passConfHelper.color}
            helperText={passConfHelper.text}
            labelPlaceholder="Jelszó még egyszer:"
            fullWidth
            size="md"
          />
          <Spacer y={2} />
          <Checkbox isRounded onChange={() => setIsActive(1)}>
            Aktív
          </Checkbox>
          <Checkbox isRounded onChange={() => setIsActive(0)}>
            Nem aktív
          </Checkbox>
          <Spacer y={2} />
          <Checkbox isRounded onChange={() => setTypeOfUser("admin")}>
            Admin
          </Checkbox>
          <Checkbox isRounded onChange={() => setTypeOfUser("user")}>
            Felhasználó
          </Checkbox>
        </div>
        <Button
          rounded
          type="submit"
          id="registration_submit_button"
          onPress={handleSignUp}
        >
          Regisztráció
        </Button>
      </div>
    </>
  );
}

export default Registration;
