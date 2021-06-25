import React, {  useState,useEffect,useContext } from "react";
import ReactDOM from "react-dom";
import Header from "../../common/header/Header";
// import moviesData from "../../common/moviesData";
import Typography from "@material-ui/core/Typography";
import "./Details.css";
import Home from "../../screens/home/Home";
import YouTube from "react-youtube";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import BookShow from "../bookshow/BookShow";
import {Link, useHistory,useParams} from 'react-router-dom'
import { changeContext } from "../../contexApi/changeContex";
const Details =(props)=> {
  const [state,setState]=useState({
    movie: {},
    starIcons: [
      {
        id: 1,
        stateId: "star1",
        color: "black",
      },
      {
        id: 2,
        stateId: "star2",
        color: "black",
      },
      {
        id: 3,
        stateId: "star3",
        color: "black",
      },
      {
        id: 4,
        stateId: "star4",
        color: "black",
      },
      {
        id: 5,
        stateId: "star5",
        color: "black",
      },
    ],
    componentRender:false
  })
  let history=useHistory();
  const {isLoggedIn,setIsLoggedIn,setIsOpenModal}=useContext(changeContext);

  // console.log("props",history)
  const {id}=useParams();
  console.log("The value of param",id);
  useEffect(()=>{
    let dataShows=null;
    fetch(`http://localhost:8085/api/movies/${history.location.state}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: dataShows,
      })
      .then((response)=>response.json())
      .then((response)=>{
        console.log("response in details",response)
    setState((prev) => ({ ...prev, "movie": response[0] }));
        // setState({movie:response[0]});
        console.log("The value of state",state)
      })
  },[])

  const backToHomeHandler = () => {
    ReactDOM.render(<Home />, document.getElementById("root"));
  };
  const artistClickHandler = (url) => {
    window.location = url;
  };
  const starClickHandler = (id) => {
    let starIconList = [];
    for (let star of state.starIcons) {
      let starNode = star;
      if (star.id <= id) {
        starNode.color = "yellow";
      } else {
        starNode.color = "black";
      }
      starIconList.push(starNode);
    }
    setState({ starIcons: starIconList });
  };
  
  // render() {
    let movie = state.movie;
    console.log("Movie Data",movie)
    const opts = {
      height: "300",
      width: "700",
      playerVars: {
        autoplay: 1,
      },
    };
    const bookShowClick=()=>{
      // isLoggedIn,setIsLoggedIn,setIsOpenModal
      if(isLoggedIn)
      {
        history.push({
          pathname:`/movies/${history.location.state}/shows`,
        })
      }else{
        setIsOpenModal(true);
      }
    }
    return (
        <>
          <div className="details">
          <Header />
          {/* <Link to={{pathname:`/movies/${history.location.state}/shows`}}> */}
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right", position: "absolute", right: 100, top: 7,marginRight: '3%' }}
           onClick={bookShowClick}
           >
            BOOK NOW
          </Button>
          {/* </Link> */}
          <div className="back">
          <Link to="/">
            <Typography >
              &#60; Back to Home
            </Typography>
          </Link>
          </div>
          <div className="flex-containerDetails">
            <div className="leftDetails">
              <img src={movie && movie.poster_url && movie.poster_url} alt={movie &&movie.title&& movie.title} />
            </div>
            <div className="middleDetails">
              <div>
                <Typography variant="headline" component="h2">
                  {movie && movie.title&& movie.title}
                </Typography>
              </div>
              <br />
              <div>
                <Typography>
                  <span className="bold">Genres: </span> {movie && movie.genres && movie.genres.join(", ")}
                </Typography>
              </div>
              <div>
                <Typography>
                  <span className="bold">Duration:</span> {movie &&movie.duration && movie.duration}
                </Typography>
              </div>
              <div>
                <Typography>
                  <span className="bold">Release Date:</span>
                  {new Date(movie && movie.release_date && movie.release_date).toDateString()}
                </Typography>
              </div>
              <div>
                <Typography>
                  <span className="bold"> Rating:</span> {movie && movie.critics_rating &&movie.critics_rating}
                </Typography>
              </div>
              <div className="marginTop16">
                <Typography>
                  <span className="bold">Plot:</span>
                  <a href={movie && movie.wiki_url}>(Wiki Link)</a> {movie && movie.storyline}
                </Typography>
              </div>
              <div className="trailerContainer">
                <Typography>
                  <span className="bold">Trailer:</span>
                </Typography>
                <YouTube
                  videoId={movie &&movie.trailer_url&& movie.trailer_url.split("?v=")[1]}
                  opts={opts}
                 
                />
              </div>
            </div>
            <div className="rightDetails">
              <Typography>
                <span className="bold">Rate movie: </span>
              </Typography>
              {state && state.starIcons && state.starIcons.map((star) => (
                <StarBorderIcon
                  className={star.color}
                  key={"star" + star.id}
                  onClick={() => starClickHandler(star.id)}
                />
              ))}
              <div className="bold marginBottom16 marginTop16">
                <Typography>
                  <span className="bold">Artists:</span>
                </Typography>
              </div>
              <div className="paddingRight">
                <GridList cellHeight={160} cols={2}>
                  {movie && movie.artists && movie.artists != null &&
                    movie.artists.map((artist) => (
                      <GridListTile
                        className="gridTile"
                        onClick={() => artistClickHandler(artist.wiki_url)}
                        key={artist.id}
                      >
                        <img
                          src={artist.profile_url}
                          alt={artist.first_name + " " + artist.last_name}
                        />
                        <GridListTileBar
                          title={artist.first_name + " " + artist.last_name}
                        />
                      </GridListTile>
                    ))}
                </GridList>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
// }
export default Details;
