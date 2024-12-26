import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import DocumentUploadModal from "./DocumentUploadModal";
import CourseCreateModal from "./CourseCreateModal";
import { Box, Stack } from "@mui/material";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [isCourseModalOpen, setCourseModalOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        color: "#000",
      }}
    >
      <Sidebar
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        openDocumentModal={() => setDocumentModalOpen(true)}
        openCourseModal={() => setCourseModalOpen(true)}
      />
      <Box sx={{ width: "80%", p: 4 }}>
        <Stack direction="column" spacing={4}>
          <Chat selectedCourse={selectedCourse} />
        </Stack>
      </Box>
      <DocumentUploadModal
        open={isDocumentModalOpen}
        onClose={() => setDocumentModalOpen(false)}
      />
      <CourseCreateModal
        open={isCourseModalOpen}
        onClose={() => setCourseModalOpen(false)}
      />
    </Box>
  );
}
