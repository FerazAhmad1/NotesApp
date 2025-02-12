import { Box, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

// eslint-disable-next-line react/prop-types
const NoteItem = ({ note, children }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      p={1}
      boxShadow={3}
      borderRadius={2}
      bgcolor="background.paper"
      width={"70vw"}
      height={100}
      mx="auto"
      overflow="hidden"
      position={"relative"}
    >
      <EditNoteIcon color="primary" sx={{ fontSize: 50 }} />
      <Typography
        variant="body1"
        sx={{
          wordBreak: "break-word",
          overflowY: "auto",
          maxHeight: "100%",
        }}
        color="black"
      >
        {note}
      </Typography>
      {children}
    </Box>
  );
};

export default NoteItem;
