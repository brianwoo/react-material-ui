import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { Note } from "../pages/Notes";
import { blue, green, pink, yellow } from "@mui/material/colors";
import { DeleteOutlined } from "@mui/icons-material";


const NoteCard = ({ note, handleDelete }: { note: Note, handleDelete: (id: number) => {} }) => {

    const avatar = {
        bgcolor: (note: Note) => {
            if (note.category === 'work') {
                return yellow[700];
            }
            else if (note.category === 'money') {
                return green[500];
            }
            else if (note.category === 'todos') {
                return pink[500];
            }
            else {
                return blue[500];
            }
        }
    }


    return (
        <>
            <Card elevation={1}>
                <CardHeader avatar={
                    <Avatar sx={{ bgcolor: avatar.bgcolor(note) }}>
                        {note.category.charAt(0).toUpperCase()}
                    </Avatar>
                }
                    action={
                        <IconButton onClick={() => handleDelete(note.id)}>
                            <DeleteOutlined />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>

        </>
    );
}

export default NoteCard;