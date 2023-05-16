import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export interface Note {
  title: string,
  details: string,
  category: string,
  id: number,
};

const Notes = () => {

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((resp: Response) => {
        if (!resp.ok) {
          throw new Error('Could not fetch data');
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setNotes(data);
      })
      .catch((err) => {
        // catches network errors + http not OK errors
        console.error(err);
      })
  }, []);

  const handleDelete = async (id: number) => {
    fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE'
    })
      .then((resp: Response) => {
        if (!resp.ok) {
          throw new Error('Could not delete data');
        }
      })
      .catch((err) => {
        console.error(err);
      });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Container>
      {/* <Grid container spacing={3}> */}
      {/* {
        notes.map((note) => {
          return (
            <Grid item key={note.id} xs={12} md={6} lg={4}>
              <NoteCard note={note} handleDelete={handleDelete}></NoteCard>
            </Grid>
          );
        })
      } */}
      {/* </Grid> */}
      <Masonry breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {
          notes.map((note) => {
            return (
              <div key={note.id}>
                <NoteCard note={note} handleDelete={handleDelete}></NoteCard>
              </div>
            );
          })
        }
      </Masonry>
    </Container>);
}

export default Notes;