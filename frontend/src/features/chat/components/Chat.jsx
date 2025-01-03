import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton, Stack, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { generateResponseAsync } from "../ChatSlice";
import { selectGeneratedResponseState } from "../ChatSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Chat({ selectedCourse }) {
  const dispatch = useDispatch();
  const response = useSelector(selectGeneratedResponseState)

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setMessages([...messages, { text: response, sender: "AI" }]);
  },[response])

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");

      dispatch(generateResponseAsync({
        prompt:newMessage,
        lectureId:selectedCourse._id
      }))
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "90vh",
        p: 2,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ mb: 2, borderBottom: "1px solid #ddd", pb: 1 }}>
        <Typography variant="h6">
          {selectedCourse ? `${selectedCourse.name} Sohbet` : "Sohbet"}
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((message, index) => (
          <Stack
            key={index}
            direction="row"
            justifyContent={message.sender === "user" ? "flex-end" : "flex-start"}
          >
            <Box
              sx={{
                p: 1,
                maxWidth: "70%",
                borderRadius: 2,
                backgroundColor: message.sender === "user" ? "#1976d2" : "#f0f0f0",
                color: message.sender === "user" ? "#fff" : "#000",
              }}
            >
              {message.text}
            </Box>
          </Stack>
        ))}
      </Box>

      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Mesaj yazın..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={newMessage.trim() === ""}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}
