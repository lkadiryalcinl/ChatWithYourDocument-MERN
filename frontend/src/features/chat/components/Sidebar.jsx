import React, { useEffect } from "react";
import { Box, Typography, Divider, List, ListItemButton, ListItemText, IconButton, Button } from "@mui/material";
import { UploadFile, Add, Logout } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectLoggedInUser } from "../../auth/AuthSlice.jsx";
import { selectLectures, getLecturesAsync } from "../ChatSlice.jsx";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ selectedCourse, setSelectedCourse, openDocumentModal, openCourseModal }) {
  
  const loggedInUser = useSelector(selectLoggedInUser);
  const isInstructor = loggedInUser?.role === "Instructor";
  const lectures = useSelector(selectLectures) || []; // Fallback to empty array

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLecturesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    } else if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/chat");
    }
  }, [loggedInUser, navigate]);

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <Box
      sx={{
        width: "20%",
        backgroundColor: "#F7F7F7",
        borderRight: "1px solid #E0E0E0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        p: 2,
      }}
    >
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#333" }}>
            Dersler
          </Typography>
          {isInstructor && (
            <Box>
              <IconButton onClick={openDocumentModal}>
                <UploadFile />
              </IconButton>
              <IconButton onClick={openCourseModal}>
                <Add />
              </IconButton>
            </Box>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {lectures.map((lecture, index) => (
            <ListItemButton
              key={index}
              selected={selectedCourse?.name === lecture.name}
              onClick={() => setSelectedCourse(lecture)}
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
                primary={lecture.name}
                primaryTypographyProps={{ color: "#333" }}
                secondary={`${lecture.files.length} dosya`}
                secondaryTypographyProps={{ color: "#666" }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ textAlign: "center", mb: 1, fontWeight: "bold", color: "#333" }}>
          Hoşgeldiniz, {loggedInUser?.name}
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          fullWidth
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Çıkış Yap
        </Button>
      </Box>
    </Box>
  );
}
