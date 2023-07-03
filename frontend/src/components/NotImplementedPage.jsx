import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { TbArrowBackUp } from "react-icons/tb";
import { Zoom } from "react-awesome-reveal";

export default function NotImplementedPage() {
  const navigate = useNavigate();

  return (
    <Zoom duration={500} triggerOnce>
      <h1 style={{ padding: "90px", fontSize: "2rem", textAlign: "center" }}>
        Ez az oldal még nem elérhető
      </h1>
      <Button
        style={{ margin: "auto" }}
        size="lg"
        icon={<TbArrowBackUp />}
        auto
        color="primary"
        onPress={() => navigate(-1)}
      >
        Back
      </Button>
    </Zoom>
  );
}
