import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Text,
  Modal,
  Input,
  Checkbox,
  Spacer,
} from "@nextui-org/react";
import { fetchUsers } from "../api/users";
import { fetchUserReqs } from "../api/userReqs";
import { AddUserIcon } from "../assets/icons/AddUserIcon";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMatch,
} from "../helpers/inputFieldValidators";
import { postRegister } from "../api/users";
import { toast } from "react-toastify";
import "../styles/Admin.css";
import { addNewReq } from "../api/userReqs";
import Home from "./Home";

function Admin() {
  //Modal visibility
  const [addNewUserModalVisible, setAddNewUserModalVisible] = useState(false);
  const [addNewUserReqModalVisible, setAddNewUserReqModalVisible] =
    useState(false);
  // Lists
  const [users, setUsers] = useState([]);
  const [isUserListVisible, setIsUserListVisible] = useState(false);
  const [userReqs, setUserReqs] = useState([]);
  const [isUserReqListVisible, setIsUserReqListVisible] = useState(false);
  // Registration
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [typeOfUser, setTypeOfUser] = useState(null);
  const [uploadingUserId, setUploadingUserId] = useState(0);
  const [reqContent, setReqContent] = useState("");
  const [datePosted, setDatePosted] = useState("");
  //input validation helpers state
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakeFullName, setShakeFullName] = useState(false);
  const [shakeUsername, setShakeUsername] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [shakePasswordConf, setShakePasswordConf] = useState(false);
  const [shakeReqContent, setShakeReqContent] = useState(false);
  

  //helpers
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

  // Notification
  const notifySignUp = () => toast.success(`${email} sikeres regisztráció!`);

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

  const handleAddNewReq = async () => {
    console.log(localStorage.getItem('userId'))
    try {
      const userId = localStorage.getItem('userId')
      await addNewReq({
        uploadingUserId: userId,
        reqContent,
      });
    } catch (error) {
      console.log(error)
    }
  };

  const closeModalHandler = () => {
    setAddNewUserModalVisible(false);
    setEmail("");
    setFullName("");
    setUsername("");
    setPassword("");
    setPasswordConf("");
    emailHelper.text = "";
    fullNameHelper.text = "";
    usernameHelper.text = "";
    passHelper.text = "";
    passConfHelper.text = "";
  };

  const closeUserReqModalHandler = () => {
    setAddNewUserReqModalVisible(false);
    setUploadingUserId();
    setReqContent("");
    setDatePosted("");
  };

  //Render Lists
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    fetchUserReqs().then((data) => {
      setUserReqs(data);
    });
  }, []);

  //List visibility

  const handleToggleUserList = () => {
    setIsUserListVisible(!isUserListVisible);
  };

  const handleToggleUserReqList = () => {
    setIsUserReqListVisible(!isUserReqListVisible);
  };

  const userId = localStorage.getItem('userId');
  if (!userId) {
    // Redirect or show a loading screen until the userId is available
    return <Home />;
  }
  return (
    <div className="admin_page_container">
      <h1>Admin felület</h1>
      <h3 style={{ marginTop: "3rem" }}>Új felhasználó hozzáadása</h3>
      <Button
        iconRight={<AddUserIcon fill="currentColor" />}
        className="admin_page_button"
        size="lg"
        rounded
        onPress={setAddNewUserModalVisible}
      >
        Új felhasználó
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={addNewUserModalVisible}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Új felhasználó
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            className={shakeEmail ? "shake" : ""}
            onChange={(e) => setEmail(e.target.value)}
            required
            bordered
            status={emailHelper.color}
            color={emailHelper.color}
            helperColor={emailHelper.color}
            helperText={emailHelper.text}
            fullWidth
            size="md"
            placeholder="Email:"
            aria-labelledby="Email"
          />
          <Spacer y={0.2} />
          <Input
            clearable
            className={shakeFullName ? "shake" : ""}
            onChange={(e) => setFullName(e.target.value)}
            required
            bordered
            fullWidth
            size="md"
            status={fullNameHelper.color}
            color={fullNameHelper.color}
            helperColor={fullNameHelper.color}
            helperText={fullNameHelper.text}
            placeholder="Teljes név:"
            aria-labelledby="Teljes név"
          />
          <Spacer y={0.5} />
          <Input
            clearable
            className={shakeUsername ? "shake" : ""}
            onChange={(e) => setUsername(e.target.value)}
            required
            bordered
            fullWidth
            size="md"
            status={usernameHelper.color}
            color={usernameHelper.color}
            helperColor={usernameHelper.color}
            helperText={usernameHelper.text}
            placeholder="Felhasználónév:"
            aria-labelledby="Felhasználónév"
          />
          <Spacer y={0.5} />
          <Input
            clearable
            className={shakePassword ? "shake" : ""}
            onChange={(e) => setPassword(e.target.value)}
            required
            bordered
            fullWidth
            size="md"
            status={passHelper.color}
            color={passHelper.color}
            helperColor={passHelper.color}
            helperText={passHelper.text}
            placeholder="Jelszó:"
            aria-labelledby="Jelszó"
          />
          <Spacer y={0.5} />
          <Input.Password
            clearable
            className={shakePasswordConf ? "shake" : ""}
            onChange={(e) => setPasswordConf(e.target.value)}
            required
            bordered
            status={passConfHelper.color}
            color={passConfHelper.color}
            helperColor={passConfHelper.color}
            helperText={passConfHelper.text}
            labelPlaceholder="Jelszó még egyszer:"
            fullWidth
            size="md"
          />
          <Spacer y={0.5} />
          <Checkbox size="xs" isRounded onChange={() => setTypeOfUser("admin")} checked={typeOfUser === "admin"}>
            Admin
          </Checkbox>
          <Checkbox size="xs" isRounded onChange={() => setTypeOfUser("user")} checked={typeOfUser === "user"}>
            Felhasználó
          </Checkbox>
        </Modal.Body>
        <Modal.Footer>
          <Button auto rounded flat color="error" onPress={closeModalHandler}>
            Bezárás
          </Button>
          <Button auto rounded onPress={handleSignUp}>
            Regisztrálás
          </Button>
        </Modal.Footer>
      </Modal>
      <h3>Felhasználók</h3>
      {isUserListVisible && (
        <>
          <Table
            aria-label="Felhasználók lista"
            css={{
              height: "auto",
              minWidth: "100%",
              textAlign: "start",
              wordWrap: "break-word",
              zIndex: "1",
            }}
            color="primary"
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>E-mail cím</Table.Column>
              <Table.Column>Teljes név</Table.Column>
              <Table.Column>Státusz</Table.Column>
            </Table.Header>
            <Table.Body items={users}>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.fullName}</Table.Cell>
                  <Table.Cell>
                    {user.isActive ? "Active" : "Not Active"}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Button
            className="admin_page_close_list_button"
            rounded
            size="sm"
            onClick={handleToggleUserList}
          >
            Lista bezárása
          </Button>
        </>
      )}
      {!isUserListVisible && users.length > 0 && (
        <Button
          className="admin_page_button"
          rounded
          size="lg"
          onClick={handleToggleUserList}
        >
          Felhasználók listázása
        </Button>
      )}
      <h3 style={{ marginTop: "4rem" }}>Új kérés hozzáadása</h3>
      <Button
        className="admin_page_button"
        size="lg"
        rounded
        onPress={setAddNewUserReqModalVisible}
      >
        Új felhasználói kérés rögzítése
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={addNewUserReqModalVisible}
        onClose={closeUserReqModalHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Új felhasználói kérés rögzítése
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            onChange={(e) => setReqContent(e.target.value)}
            required
            bordered
            fullWidth
            size="md"
            color="primary"
            placeholder="Felhasználói észrevétel:"
            aria-labelledby="Felhasználói észrevétel"
          />
          <Spacer y={0.5} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            rounded
            flat
            color="error"
            onPress={closeUserReqModalHandler}
          >
            Bezárás
          </Button>
          <Button auto rounded onPress={handleAddNewReq}>
            Kérés rögzítése
          </Button>
        </Modal.Footer>
      </Modal>
      <h3>Felhasználói kérések</h3>
      {isUserReqListVisible && (
        <>
          <Table
            aria-label="Felhasználói kérések lista"
            css={{
              height: "auto",
              minWidth: "100%",
              textAlign: "start",
              wordWrap: "break-word",
            }}
            color="primary"
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>Hozzáadta</Table.Column>
              <Table.Column>Tartalom</Table.Column>
              <Table.Column>Dátum</Table.Column>
            </Table.Header>
            <Table.Body items={users}>
              {userReqs.map((req) => (
                <Table.Row key={req.id}>
                  <Table.Cell>{req.userId}</Table.Cell>
                  <Table.Cell className="admin_page_req_content">
                    {req.reqContent}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(req.datePosted).toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Button
            className="admin_page_close_list_button"
            rounded
            size="sm"
            onClick={handleToggleUserReqList}
          >
            Lista bezárása
          </Button>
        </>
      )}
      {!isUserReqListVisible && userReqs.length > 0 && (
        <Button
          className="admin_page_button"
          rounded
          size="lg"
          onClick={handleToggleUserReqList}
        >
          Felhasználói kérések listázása
        </Button>
      )}
    </div>
  );
}

export default Admin;
