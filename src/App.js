import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";
import "./app.css"

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
        setPokemon(res.data.results.map((p) => p.name));
        setLoading(false);
      });

    //this function will run for canceling the old request of fetch,use for handling if user make multiple
    //fetch requests
    return () =>cancel();
    
  }, [currentPageUrl]);


  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "LOADING...";



  return(
  <>
  <PokemonList pokemon={pokemon} />
  <Pagination  gotoPrevPage={prevPageUrl?gotoPrevPage :null}
       gotoNextPage={nextPageUrl?gotoNextPage:null}/>
  </>
  )
}

export default App;
