import { Button } from "@nextui-org/react";
import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState();

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload() {
    
  }

  return (
    <>
      <div className="fileUpload_container">
        <input type="file" onChange={handleFile} />
        <Button onClick={handleUpload}>Upload</Button>
      </div>
    </>
  );
}

export default FileUpload;
