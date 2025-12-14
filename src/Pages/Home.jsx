import React from "react";

import { Link } from "react-router";
import Banner from "../Components/Banner/Banner";
import useAuth from "../Hooks/useAuth";
import Spinner from "../Components/Spinner/Spinner";
import AdvertisedTickets from "../Components/AdvertisedTickets/AdvertisedTickets";
import LatestTickets from "../Components/LatestTickets/LatestTickets";
const Home = () => {
  const {userLoading} = useAuth()
  if(userLoading){
    return <Spinner></Spinner>
  }
  return (
    <>
      <Banner></Banner>
      <AdvertisedTickets></AdvertisedTickets>
      <LatestTickets></LatestTickets>
    </>
  );
};

export default Home;
