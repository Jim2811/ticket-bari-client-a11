import React from "react";

import { Link } from "react-router";
import Banner from "../Components/Banner/Banner";
import useAuth from "../Hooks/useAuth";
import Spinner from "../Components/Spinner/Spinner";
import AdvertisedTickets from "../Components/AdvertisedTickets/AdvertisedTickets";
import LatestTickets from "../Components/LatestTickets/LatestTickets";
import WhyChooseUs from "../Components/WhyChooseUs/WhyChooseUs";
import Partners from "../Components/Partners/Partners";
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
      <WhyChooseUs></WhyChooseUs>
      <Partners></Partners>
    </>
  );
};

export default Home;
