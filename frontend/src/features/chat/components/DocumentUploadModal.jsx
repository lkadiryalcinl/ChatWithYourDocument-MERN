import React from "react";
import { Modal, Box, Typography, TextField, Button, Stack } from "@mui/material";

import { uploadFileAsync } from "../ChatSlice"
import { useDispatch } from "react-redux";

const DocumentUploadModal = ({ open, onClose }) => {
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // dispatch(uploadFileAsync({ fileName, file }));
    console.log("Doküman Yüklendi:", { fileName, file });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #ddd",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Doküman Yükle
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Ders Adı"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            component="label"
            sx={{ backgroundColor: "#000", color: "#FFF", "&:hover": { backgroundColor: "#333" } }}
            fullWidth
          >
            Dosya Yükle
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#000",
              color: "#FFF",
              "&:hover": { backgroundColor: "#333" },
            }}
            fullWidth
          >
            Kaydet
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DocumentUploadModal;
