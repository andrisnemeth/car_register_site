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
import { fetchUsers, fetchChangedTypeUsers } from "../api/users";
import { fetchUserReqs } from "../api/userReqs";
import { AddUserIcon } from "../assets/icons/AddUserIcon";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMatch,
  validateLongText,
} from "../helpers/inputFieldValidators";
import { postRegister, deleteUserById, editTypeOfUserById } from "../api/users";
import { toast } from "react-toastify";
import "../styles/Admin.css";
import { addNewReq } from "../api/userReqs";
import Home from "./Home";
import { getAuthData } from "../helpers/auth";

function Admin() {
  //Modal visibility
  const [addNewUserModalVisible, setAddNewUserModalVisible] = useState(false);
  const [addNewUserReqModalVisible, setAddNewUserReqModalVisible] =
    useState(false);
  // Lists
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [userReqs, setUserReqs] = useState([]);
  const [reqsCount, setReqsCount] = useState(0);
  const [changedTypeUsers, setChangedTypeUsers] = useState([]);
  const [changedTypeUsersCount, setChangedTypeUsersCount] = useState(0);
  const [isUserListVisible, setIsUserListVisible] = useState(false);
  const [isUserReqListVisible, setIsUserReqListVisible] = useState(false);
  const [isChangedTypeUserListVisible, setIsChangedTypeUserListVisible] =
    useState(false);
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

  const reqContentHelper = React.useMemo(() => {
    if (!reqContent)
      return {
        text: "",
        color: "default",
      };
    const isValidReqContent = validateLongText(reqContent);

    return {
      text: isValidReqContent
        ? "Megfelelően kitöltött mező"
        : "Kérjük, adjon meg legalább 1 karaktert. Maximum karakterszám 255.",
      color: isValidReqContent ? "success" : "warning",
    };
  }, [reqContent]);

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
        setUsersCount((prevCount) => prevCount + 1);
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
    console.log(localStorage.getItem("userId"));
    if (reqContent.length === 0) {
      setShakeReqContent(true);
      reqContentHelper.color = "error";
      reqContentHelper.text = "Kérjük tölse ki ezt a mezőt";
    }
    setTimeout(() => setShakeReqContent(false), 750);

    if (validateLongText(reqContent)) {
      try {
        const userId = localStorage.getItem("userId");
        await addNewReq({
          uploadingUserId: userId,
          reqContent,
        });
        setReqsCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteUserClick = async (ctuserid) => {
    await deleteUserById(ctuserid);
    setChangedTypeUsers(
      changedTypeUsers.filter((user) => user.id !== ctuserid)
    );
    setUsersCount((prevCount) => prevCount - 1);
    setChangedTypeUsersCount((prevCount) => prevCount - 1);
  };

  const handleAdminUserClick = async (ctuserid, typeOfUser) => {
    const newTypeOfUser = "admin";
    await editTypeOfUserById(ctuserid, newTypeOfUser);
    setChangedTypeUsers(
      changedTypeUsers.filter((user) => user.id !== ctuserid)
    );
    setUsersCount((prevCount) => prevCount + 1);
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
    reqContentHelper.text = "";
  };

  //Render Lists
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, [usersCount]);

  useEffect(() => {
    fetchUserReqs().then((data) => {
      setUserReqs(data);
    });
  }, [reqsCount]);

  useEffect(() => {
    fetchChangedTypeUsers().then((data) => {
      setChangedTypeUsers(data);
    });
  }, [changedTypeUsersCount]);

  useEffect(() => {
    getAuthData();
  }, []);

  //List visibility

  const handleToggleUserList = () => {
    setIsUserListVisible(!isUserListVisible);
  };

  const handleToggleChangedTypeUserList = () => {
    setIsChangedTypeUserListVisible(!isChangedTypeUserListVisible);
  };

  const handleToggleUserReqList = () => {
    setIsUserReqListVisible(!isUserReqListVisible);
  };

  const userId = localStorage.getItem("userId");
  if (!userId) {
    return <Home />;
  }

  return (
    <div className="admin_page_container">
      <h1>Admin felület</h1>
      <h3 style={{ marginTop: "3rem" }}>Új felhasználó hozzáadása</h3>
      <Button
        iconRight={<AddUserIcon fill="currentColor" flat />}
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
          <Checkbox
            size="xs"
            isRounded
            onChange={() => setTypeOfUser("admin")}
            checked={typeOfUser === "admin"}
          >
            Admin
          </Checkbox>
          <Checkbox
            size="xs"
            isRounded
            onChange={() => setTypeOfUser("user")}
            checked={typeOfUser === "user"}
          >
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
              <Table.Column>Fiók típusa</Table.Column>
            </Table.Header>
            <Table.Body items={users}>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.fullName}</Table.Cell>
                  <Table.Cell>{user.typeOfUser}</Table.Cell>
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
      <h3 style={{ marginTop: "4rem" }}>Változott felhasználói kérések</h3>
      <h3>Felhasználói kérések</h3>
      {isChangedTypeUserListVisible && (
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
              <Table.Column></Table.Column>
            </Table.Header>
            <Table.Body items={changedTypeUsers}>
              {changedTypeUsers.map((ctuser) => (
                <Table.Row key={ctuser.id}>
                  <Table.Cell>{ctuser.email}</Table.Cell>
                  <Table.Cell>{ctuser.fullName}</Table.Cell>
                  <Table.Cell>
                    {ctuser.typeOfUser === "tobedeleted"
                      ? "Törlést kér"
                      : "Admin jogosultságot kér"}
                  </Table.Cell>
                  <Table.Cell>
                    {ctuser.typeOfUser === "tobedeleted" && (
                      <Button
                        color="error"
                        flat
                        size="xs"
                        onPress={() => handleDeleteUserClick(ctuser.id)}
                      >
                        Törlés
                      </Button>
                    )}
                    {ctuser.typeOfUser === "tobeadmin" && (
                      <Button
                        color="success"
                        flat
                        size="xs"
                        onPress={() => handleAdminUserClick(ctuser.id)}
                      >
                        Jóváhagyás
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Button
            className="admin_page_close_list_button"
            rounded
            size="sm"
            onClick={handleToggleChangedTypeUserList}
          >
            Lista bezárása
          </Button>
        </>
      )}
      {!isChangedTypeUserListVisible && changedTypeUsers.length > 0 && (
        <Button
          className="admin_page_button"
          rounded
          size="lg"
          onClick={handleToggleChangedTypeUserList}
        >
          Felhasználói kérések listázása
        </Button>
      )}
      {!isChangedTypeUserListVisible && changedTypeUsers.length === 0 && (
        <p aria-label="changedTypeUser_p_tag">
          Jelenleg nincs változott státuszú fiók
        </p>
      )}
      <h3 style={{ marginTop: "4rem" }}>Új észrevétel hozzáadása</h3>
      <Button
        className="admin_page_button"
        size="lg"
        rounded
        onPress={setAddNewUserReqModalVisible}
      >
        Új felhasználói észrevétel rögzítése
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
            Új felhasználói észrevétel rögzítése
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            className={shakeReqContent ? "shake" : ""}
            onChange={(e) => setReqContent(e.target.value)}
            required
            bordered
            fullWidth
            size="md"
            status={reqContentHelper.color}
            color={reqContentHelper.color}
            helperColor={reqContentHelper.color}
            helperText={reqContentHelper.text}
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
      <h3>Felhasználói észrevételek</h3>
      {isUserReqListVisible && (
        <>
          <Table
            aria-label="Felhasználói észrevételek lista"
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
      {!isUserReqListVisible && userReqs.length === 0 && (
        <p aria-label="userReqs_p_tag">
          Jelenleg nincs felhasználói észrevétel
        </p>
      )}
      {!isUserReqListVisible && userReqs.length > 0 && (
        <Button
          className="admin_page_button"
          rounded
          size="lg"
          onClick={handleToggleUserReqList}
        >
          Felhasználói észrevételek listázása
        </Button>
      )}
    </div>
  );
}

export default Admin;
