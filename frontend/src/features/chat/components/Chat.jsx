import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/AuthSlice";

export const ChatWithDocument = () => {
  const [file, setFile] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const loggedInUser = useSelector(selectLoggedInUser);
  const isAdminOrInstructor = loggedInUser?.isAdmin;

  const handleFileUpload = () => {
    if (!file || courseName.trim() === "") {
      toast.error("Please select a file and enter a course name.");
      return;
    }

    setCourses((prev) => {
      const updatedCourses = [...prev];
      const existingCourse = updatedCourses.find((c) => c.name === courseName);

      if (existingCourse) {
        existingCourse.files.push(file.name);
      } else {
        updatedCourses.push({ name: courseName, files: [file.name] });
      }
      return updatedCourses;
    });

    setFile(null);
    setCourseName("");
    toast.success("File uploaded successfully!");
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    setMessages([
      ...messages,
      { user: "You", text: inputMessage, course: selectedCourse?.name },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          user: "Document",
          text: `Response to "${inputMessage}" in ${selectedCourse?.name}`,
        },
      ]);
    }, 1000);

    setInputMessage("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff", // Arkaplan her zaman beyaz
        display: "flex",
        color: "#000",
      }}
    >
      {/* Sol Panel */}
      <Box
        sx={{
          width: "20%",
          backgroundColor: "#F7F7F7",
          borderRight: "1px solid #E0E0E0",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          sx={{ color: "#333" }}
        >
          Dersler
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {courses.map((course, index) => (
            <ListItemButton
              key={index}
              selected={selectedCourse?.name === course.name}
              onClick={() => setSelectedCourse(course)}
              sx={{
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor: "#EDEDED",
                  borderLeft: "4px solid #000",
                },
                "&:hover": { backgroundColor: "#F0F0F0" },
              }}
            >
              <ListItemText
                primary={course.name}
                primaryTypographyProps={{ color: "#333" }}
                secondary={`${course.files.length} dosya`}
                secondaryTypographyProps={{ color: "#666" }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Sağ Bölüm */}
      <Box sx={{ width: "80%", p: 4 }}>
        <Stack direction="row" spacing={4} alignItems="flex-start">
          {/* Dosya Yükleme */}
          {isAdminOrInstructor && (
            <Paper
              elevation={1}
              sx={{
                width: "30%",
                p: 3,
                border: "1px solid #DDD",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" mb={2}>
                Doküman Yükle
              </Typography>
              <TextField
                label="Ders Adı"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                type="file"
                fullWidth
                onChange={(e) => setFile(e.target.files[0])}
                sx={{ mb: 2 }}
              />
              <LoadingButton
                onClick={handleFileUpload}
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "#FFF",
                  "&:hover": { backgroundColor: "#333" },
                }}
                fullWidth
              >
                Yükle
              </LoadingButton>
            </Paper>
          )}

          {/* Chat */}
          <Paper
            sx={{
              flex: 1,
              p: 3,
              border: "1px solid #DDD",
              backgroundColor: "#FAFAFA",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" mb={2}>
              {selectedCourse
                ? `Chat: ${selectedCourse.name}`
                : "Bir ders seçin"}
            </Typography>
            <Box
              sx={{
                height: "400px",
                overflowY: "auto",
                p: 2,
                backgroundColor: "#FFF",
                border: "1px solid #E0E0E0",
                borderRadius: 2,
                mb: 2,
              }}
            >
              {selectedCourse &&
                messages
                  .filter((m) => m.course === selectedCourse.name)
                  .map((msg, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.user === "You" ? "flex-end" : "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          backgroundColor:
                            msg.user === "You" ? "#EDEDED" : "#F5F5F5",
                          borderRadius: 2,
                          maxWidth: "70%",
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {msg.text}
                      </Box>
                    </Box>
                  ))}
            </Box>
            <Stack direction="row" spacing={2}>
              <TextField
                placeholder="Mesajınızı yazın..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                fullWidth
                size="small"
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "#FFF",
                  "&:hover": { backgroundColor: "#333" },
                }}
                onClick={handleSendMessage}
              >
                Gönder
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};


export default ChatWithDocument;