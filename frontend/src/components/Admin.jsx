import { useState, useEffect } from "react";
import { Button, Table, Text, Modal, Input } from "@nextui-org/react";
import { fetchUsers } from "../api/users";
import { AddUserIcon } from "../assets/icons/AddUserIcon";

function Admin() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [addNewUserModalVisible, setAddNewUserModalVisible] = useState(false);
  const [isUserListVisible, setIsUserListVisible] = useState(false);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleToggleUserList = () => {
    setIsUserListVisible(!isUserListVisible);
  };

  const closeModalHandler = () => {
    setAddNewUserModalVisible(false);
    setEmail("");
    setFullName("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="admin_page_container">
      <h1>Admin felület</h1>
      <h3>Új felhasználó hozzáadása</h3>
      <Button
        iconRight={<AddUserIcon fill="currentColor" />}
        className="admin_addnewuser_button"
        size="md"
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
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            aria-labelledby="Email"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Teljes név"
            aria-labelledby="Teljes név"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Felhasználónév"
            aria-labelledby="Felhasználónév"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Státusz"
            aria-labelledby="Státusz"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="default"
            size="lg"
            placeholder="Jelszó"
            aria-labelledby="Jelszó"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeModalHandler}>
            Bezárás
          </Button>
          <Button auto onPress={closeModalHandler}>
            Regisztrálás
          </Button>
        </Modal.Footer>
      </Modal>
      <h3>Felhasználók</h3>
      {isUserListVisible && (
        <>
          <Table
            aria-label="Example table with dynamic content"
            css={{
              height: "auto",
              minWidth: "100%",
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
                  <Table.Cell>{user.is_active ? 'Active' : 'Not Active'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Button rounded size='sm' onClick={handleToggleUserList}>Lista bezárása</Button>
        </>
      )}
      {!isUserListVisible && users.length > 0 && (
        <Button rounded size='sm' onClick={handleToggleUserList}>Open User List</Button>
      )}
      <h4>Felhasználói kérések</h4>
    </div>
  );
}

export default Admin;
