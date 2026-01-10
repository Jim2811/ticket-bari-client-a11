import React from "react";

import { Link } from "react-router";
import Banner from "../Components/Banner/Banner";
import useAuth from "../Hooks/useAuth";
import Spinner from "../Components/Spinner/Spinner";
import AdvertisedTickets from "../Components/AdvertisedTickets/AdvertisedTickets";
import LatestTickets from "../Components/LatestTickets/LatestTickets";
import WhyChooseUs from "../Components/WhyChooseUs/WhyChooseUs";
import Partners from "../Components/Partners/Partners";
import Statistics from "../Components/Statistics/Statistics";
import TravelTips from "../Components/TravelTips/TravelTips";
import FAQSection from "../Components/FAQ/FAQSection"
import Newsletter from "../Components/Newsletter/Newsletter"
import ContactSummaryBar from "../Components/ContactInfo/ContactSummaryBar"
const Home = () => {
  const { userLoading } = useAuth();
  if (userLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <Banner></Banner>
      <AdvertisedTickets></AdvertisedTickets>
      <LatestTickets></LatestTickets>
      <TravelTips></TravelTips>
      <Statistics></Statistics>
      <WhyChooseUs></WhyChooseUs>
      <Partners></Partners>
      <FAQSection></FAQSection>
      <Newsletter></Newsletter>
      <ContactSummaryBar />
    </>
  );
};

export default Home;
