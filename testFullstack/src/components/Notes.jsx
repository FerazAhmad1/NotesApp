import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import SlideTransition from "./SlideTransition";
import useApiHook from "./UseApiHook";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedNote, setEditedNote] = useState("");
  const [add, setAdd] = useState(false);
  const getNoteApiStatus = useApiHook();
  const updateNoteApiStatus = useApiHook();
  const deleteNoteApiStatus = useApiHook();
  const addNoteApiStatus = useApiHook();

  const [snackBar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    // Simulating API call with hardcoded data
    const fetchData = async () => {
      try {
        await getNoteApiStatus.fetchData({
          url: "http://localhost:8000/api/v1/notes",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {},
          params: {},
        });
      } catch (error) {
        console.log(error);
        setSnackbar({
          isOpen: true,
          message: error.data?.message || error.message || "Please login again",
          type: "error",
        });
        navigate("/");
        localStorage.clear();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const { data } = getNoteApiStatus;
    if (data) {
      setNotes(getNoteApiStatus.data.data);
    }
  }, [getNoteApiStatus]);

  const updateNote = async (id, updatedNote) => {
    try {
      // Simulated API call to update note

      // const updateresponse = await axios.patch(
      //   `http://localhost:8000/api/v1/notes/${id}`,
      //   { note: updatedNote },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      await updateNoteApiStatus.fetchData({
        url: `http://localhost:8000/api/v1/notes/${id}`,
        data: { note: updatedNote },
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: error.message || "SOMETHING WENT WRONG",
        type: "error",
      });
    }
  };
  useEffect(() => {
    const { data: updateresponse, error } = updateNoteApiStatus;

    if (error) {
      setSnackbar({
        isOpen: true,
        message: error.data?.message || error.message || "note updation fail",
        type: "error",
      });
      return;
    }
    if (updateresponse) {
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === editingId ? { ...n, ...updateresponse.data.data } : n
        )
      );

      setSnackbar({
        isOpen: true,
        message: updateresponse.data.data || "note updation fail",
        type: "success",
      });
    }
  }, [updateNoteApiStatus]);

  const deleteNote = async (id) => {
    try {
      // Simulated API call to delete note
      // const deleteResonse = await axios.delete(
      //   `http://localhost:8000/api/v1/notes/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      await deleteNoteApiStatus.fetchData({
        url: `http://localhost:8000/api/v1/notes/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      setSnackbar(() => ({
        message: error.response.data.message || "Not deleted",
        isOpen: true,
        type: "error",
      }));
    }
  };

  useEffect(() => {
    const { data: deleteResonse, error } = deleteNoteApiStatus;
    if (error) {
      setSnackbar(() => ({
        message: error.response.data.message || "Not deleted",
        isOpen: true,
        type: "error",
      }));
      return;
    }

    if (deleteResonse) {
      setNotes((prevNotes) =>
        prevNotes.filter((n) => {
          return n.id != deleteResonse.data.id;
        })
      );

      setSnackbar(() => ({
        message: "deleted successfully",
        isOpen: true,
        type: "error",
      }));
    }
  }, [deleteNoteApiStatus]);

  const handleEdit = (id, note) => {
    setEditingId(id);
    setEditedNote(note);
  };

  const handleSave = (id) => {
    updateNote(id, editedNote);
  };
  const addHandler = () => {
    setAdd(true);
  };

  const addNote = async () => {
    try {
      // const createNote = await axios.post(
      //   "http://localhost:8000/api/v1/notes",
      //   { note: editedNote },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      await addNoteApiStatus.fetchData({
        url: "http://localhost:8000/api/v1/notes",
        method: "POST",
        data: { note: editedNote },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      setSnackbar((prev) => ({
        ...prev,
        isOpen: true,
        message: error.message || "SOMETHING WRONG",
        type: "success",
      }));
    }
  };

  useEffect(() => {
    const { data: createNote, error } = addNoteApiStatus;
    if (error) {
      setSnackbar((prev) => ({
        ...prev,
        isOpen: true,
        message: error.data.message || error.message || "SOMETHING WRONG",
        type: "success",
      }));
      return;
    }
    if (createNote) {
      setNotes((prevState) => [...prevState, { ...createNote.data }]);
      setAdd(false);
      setEditedNote("");
      setSnackbar({
        isOpen: true,
        message: "added successfully",
        type: "success",
      });
    }
  }, [addNoteApiStatus]);

  return (
    <>
      <Box p={3}>
        <IconButton
          onClick={addHandler}
          color="primary"
          size="large"
          sx={{ ml: "auto", display: "block" }}
        >
          <AddIcon />
        </IconButton>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          alignItems={"center"}
        >
          {notes.map(({ id, note }) => (
            <Box key={id} display="flex" alignItems="center" gap={1} mb={2}>
              <NoteItem note={note}>
                <Box
                  display={"flex"}
                  gap={"24px"}
                  position={"absolute"}
                  top={"20px"}
                  right={"20px"}
                >
                  <IconButton
                    onClick={() =>
                      editingId === id ? handleSave(id) : handleEdit(id, note)
                    }
                  >
                    <EditIcon sx={{ color: "black" }} />
                  </IconButton>
                  <IconButton onClick={() => deleteNote(id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </NoteItem>
            </Box>
          ))}
        </Box>
      </Box>
      <Modal
        open={editingId !== null || add}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Box
            bgcolor="white"
            p={3}
            borderRadius={2}
            boxShadow={3}
            width={400}
            display={"flex"}
            flexDirection={"column"}
            gap={"30px"}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {add ? "Add your note" : "Edit your note"}
            </Typography>

            <TextField
              fullWidth
              value={editedNote}
              onChange={(e) => setEditedNote(e.target.value)}
              variant="outlined"
              size="medium"
              sx={{ bgcolor: "white", color: "black", borderRadius: 1 }}
            />
            <Box display={"flex"} justifyContent={"flex-end"} gap={"24px"}>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setAdd(false);
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={() => (add ? addNote() : handleSave(editingId))}
                variant="contained"
              >
                {add ? "Add" : "Save"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackBar.isOpen}
        autoHideDuration={1000}
        onClose={() => setSnackbar((prev) => ({ ...prev, isOpen: false }))}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, isOpen: false }))}
          severity={snackBar.type}
          variant="filled"
          sx={{ boxShadow: 3, borderRadius: 1 }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
      ;
    </>
  );
};

export default Notes;
