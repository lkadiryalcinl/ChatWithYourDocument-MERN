    import React, { useEffect } from "react";
    import { Modal, Box, Typography, TextField, Button, Stack, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from "@mui/material";
    import { useDispatch, useSelector } from "react-redux";
    import { selectFiles, getFilesAsync, createLecturesAsync } from "../ChatSlice";
    import { selectStudents, getAllStudentsAsync } from "../../user/UserSlice";
    import { selectLoggedInUser } from "../../auth/AuthSlice.jsx";

    const CourseCreateModal = ({ open, onClose }) => {
        const dispatch = useDispatch();
        const Files = useSelector(selectFiles) || [];  
        const Students = useSelector(selectStudents) || []; 
        const loggedInUser = useSelector(selectLoggedInUser);

        useEffect(() => {
            if (open) {
                fetchData();
            }
        }, [open]);

        const fetchData = () => {
            dispatch(getFilesAsync());
            dispatch(getAllStudentsAsync());
        };

        const [courseName, setCourseName] = React.useState("");
        const [selectedFiles, setSelectedFiles] = React.useState([]);
        const [selectedStudents, setSelectedStudents] = React.useState([]);

        const handleSubmit = () => {
            dispatch(createLecturesAsync({
                name:courseName,
                instructorId:loggedInUser._id,
                fileIds:selectedFiles,
                studentIds:selectedStudents,
            }))
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
                        Ders Oluştur
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="Ders Adı"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <FormControl fullWidth size="small">
                            <InputLabel>Dosyaları Seçiniz</InputLabel>
                            <Select
                                multiple
                                value={selectedFiles}
                                onChange={(e) => setSelectedFiles(e.target.value)}
                                renderValue={(selected) => selected.map((id) => Files.find((file) => file._id === id)?.docName).join(", ")}
                            >
                                {Files.map((file) => (
                                    <MenuItem key={file._id} value={file._id}>
                                        <Checkbox checked={selectedFiles.includes(file._id)} />
                                        <ListItemText primary={file.docName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel>Öğrencileri Seçiniz</InputLabel>
                            <Select
                                multiple
                                value={selectedStudents}
                                onChange={(e) => setSelectedStudents(e.target.value)}
                                renderValue={(selected) => selected.map((id) => Students.find((student) => student._id === id)?.name).join(", ")}
                            >
                                {Students.map((student) => (
                                    <MenuItem key={student._id} value={student._id}>
                                        <Checkbox checked={selectedStudents.includes(student._id)} />
                                        <ListItemText primary={student.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                            Oluştur
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        );
    };

    export default CourseCreateModal;
