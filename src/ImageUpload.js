import React, { useState } from "react";
import { Dropbox } from "dropbox";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const fileUrl = URL.createObjectURL(selectedFile);
    setFileUrl(fileUrl);
  };

  const handleUpload = () => {
    const dbx = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN });
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      const fileData = reader.result;
      dbx.filesUpload({ path: "/" + file.name, contents: fileData })
        .then(function (response) {
          console.log(response);
          alert("File uploaded successfully");
        })
        .catch(function (error) {
          console.error(error);
          alert("Error uploading file");
        });
    };
  };

  return (
    <div>
      <input type="file" accept="image/*, video/*" onChange={handleFileUpload} />
      {fileUrl && <img src={fileUrl} alt="Selected file" />}
      <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
    </div>
  );
};

export default UploadImage;
