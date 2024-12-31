import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import DocumentUploadModal from "./DocumentUploadModal";
import CourseUpsertModal from "./CourseUpsertModal";
import { Box, Stack } from "@mui/material";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [isCourseModalOpen, setCourseModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); 

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
        openCourseModal={() => {
          setModalMode("create");
          setCourseModalOpen(true);
        }}
        openUpdateCourseModal={(course) => {
          setModalMode("update");
          setSelectedCourse(course);
          setCourseModalOpen(true);
        }}
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
      <CourseUpsertModal
        open={isCourseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        mode={modalMode}
        course={selectedCourse}
      />
    </Box>
  );
}
