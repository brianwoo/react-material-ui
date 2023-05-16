import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles({
//   btn: {
//     fontSize: 60,
//     backgroundColor: 'violet',
//   }
// });

const styles = {
  btn: {
    fontSize: 60,
    backgroundColor: 'violet',
    '&:hover': {
      backgroundColor: 'blue',
    }
  },
  field: {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block',
  }
};


const Create = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");
  const navigate = useNavigate();

  const handleSumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === '') {
      setTitleError(true);
    }
    if (details === '') {
      setDetailsError(true);
    }

    if (title && details) {
      console.log(title, details, category);
      fetch('http://localhost:8000/notes',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ title, details, category }),
        })
        .then(() => {
          navigate('/');
        })
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom>
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSumit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          sx={styles.field}
          id="outlined-basic"
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth required
          error={titleError} />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          sx={styles.field}
          id="outlined-basic"
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth required multiline rows={4}
          error={detailsError} />

        <FormControl sx={styles.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio color="secondary" />} label="Money" />
            <FormControlLabel value="todos" control={<Radio color="secondary" />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio color="secondary" />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio color="secondary" />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          // sx={styles.btn}
          endIcon={<KeyboardArrowRight />}
          color="secondary"
          variant="contained"
          disableElevation
          type="submit">
          Submit
        </Button>
      </form>

    </Container >
  );
}

export default Create;