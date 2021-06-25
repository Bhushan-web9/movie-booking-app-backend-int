import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "../../common/header/Header";
import "./Home.css";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import moviesData from "../../common/moviesData.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import artists from "../../common/artists";
// import genres from "../../common/genre";
import Details from "../details/Details.js";
import { Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  upcomingMoviesHeading: {
    textAlign: "center",
    background: "#ff9999",
    padding: "8px",
    fontSize: "1rem",
  },
  gridListUpcomingMovies: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
  },
  gridListMain: {
    transform: "translateZ(0)",
    cursor: "pointer",
    margin: "0%",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

const Home = (props) => {
  const [state, setState] = useState({
    movieName: "",
    upcomingMovies: [],
    releasedMovies: [],
    genres: [],
    artists: [],
    releaseDateStart: "",
    releaseDateEnd: "",
    moviesData: [],
  });
  const [filterMovie,setFilterMovie]=useState();
  const [genres,setGenres]=useState([]);
  const [artists,setArtists]=useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    let dataShows = null;
    fetch("http://localhost:8085/api/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: dataShows,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setState((prev) => ({ ...prev, "moviesData": response }));
        setFilterMovie(response);
      });

      fetch("http://localhost:8085/api/genres",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: dataShows,
      })
      .then((response) => response.json())
      .then((response) => {
       setGenres(response)
      });
      fetch("http://localhost:8085/api/artists",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: dataShows,
      })
      .then((response) => response.json())
      .then((response) => {
        console.log("artist data",response)
       setArtists(response)
      });
  }, []);

  useEffect(()=>{
    
  })

  const history = useHistory();
  const movieNameChangeHandler = (event) => {
    setState((prev) => ({ ...prev, "movieName": event.target.value }));
    
  };

  const genreSelectHandler = (event) => {
    setState((prev) => ({ ...prev, "genres": event.target.value }));
  };

  const artistSelectHandler = (event) => {
    setState((prev) => ({ ...prev, "artists": event.target.value }));

  };

  const releaseDateStartHandler = (event) => {
    setState((prev) => ({ ...prev, "releaseDateStart": event.target.value }));
  };

  const releaseDateEndHandler = (event) => {
    setState((prev) => ({ ...prev, "releaseDateEnd": event.target.value }));

  };

  const movieClickHandler = (movieId) => {
    let path = `/movie/${movieId}`;
    history.push({
      pathname: path,
      state: movieId,
    });
  };

  const { classes } = props;
  const searchMovies=()=>{
    fetch(`http://localhost:8085/movies?status=RELEASED&title=${state.movieName}&genres=${state.genres}&artists=${state.artists}&start_date=${state.releaseDateStart}&end_date=${state.releaseDateEnd}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      }
    })
      .then((response) => response.json())
      .then((response)=>{
        setFilterMovie(response)
        console.log(filterMovie)
        console.log("serach movie response",response.length,response);
      })
  }
  return (
    <div>
    {console.log(state.moviesData)}
      <Header baseUrl={props.baseU} />
      <div id="upcoming">
        <span>Upcoming Movies</span>
      </div>
      <div>
        <GridList cols={5} className={classes.gridListUpcomingMovies}>
          {state.moviesData && state.moviesData.map((tile) => (
            <GridListTile key={tile.id} className="a">
              <img
                src={tile.poster_url}
                alt={tile.title}
                className="movie-poster"
              />
              <GridListTileBar title={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className="flex-container">
        <div className="left">
          <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
            {filterMovie &&
              filterMovie.map((movie) => (
                <GridListTile
                  onClick={() => movieClickHandler(movie.movieid)}
                  className="released-movie-grid-item"
                  key={"grid" + movie.movieid}
                >
                  {/* <Link to={`/movie/${movie.movieid}`}> */}

                  <img
                    src={movie.poster_url}
                    className="movie-poster2"
                    alt={movie.title}
                  />
                  {/* </Link> */}
                  <GridListTileBar
                    title={movie.title}
                    subtitle={
                      <span>
                        Release Date:
                        {new Date(movie.release_date).toDateString()}
                      </span>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
        <div className="right">
          <Card>
            <CardContent>
              <FormControl className={classes.formControl}>
                <Typography className={classes.title} color="textSecondary">
                  FIND MOVIES BY:
                </Typography>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input id="movieName" onChange={movieNameChangeHandler} />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Genres
                </InputLabel>
                <Select
                  multiple
                  input={<Input id="select-multiple-checkbox-genre" />}
                  renderValue={(selected) => selected.join(",")}
                  value={state && state.genres}
                  onChange={
                    genreSelectHandler}
                    MenuProps={MenuProps}
                >
                  <MenuItem value="0">None</MenuItem>
                  { genres && genres.map((genre) => (
                    <MenuItem key={genre.genre} value={genre.genre}>
                      <Checkbox
                        checked={state.genres && state.genres.indexOf(genre.genre) > -1}
                      />
                      <ListItemText primary={genre.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Artists
                </InputLabel>
                <Select
                  multiple
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(",")}
                  value={state && state.artists}
                  onChange={artistSelectHandler}
                  MenuProps={MenuProps}

                >
                  <MenuItem value="0">None</MenuItem>
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.artistid}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        checked={ state.artists &&  state.artists.indexOf(
                            artist.first_name + " " + artist.last_name
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="releaseDateStart"
                  label="Release Date Start"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={releaseDateStartHandler}

                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="releaseDateEnd"
                  label="Release Date End"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={releaseDateEndHandler}
                />
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControl}>
                <Button variant="contained" color="primary"
                onClick={searchMovies}
                >
                  APPLY
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(Home);
