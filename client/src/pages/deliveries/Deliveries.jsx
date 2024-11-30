import React, { useEffect, useRef, useState } from "react";
import "./Deliveries.scss";

import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { gigs, logistics } from "../../data";
import { ServiceCard2 } from "../../components/serviceCard2/ServiceCard2";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import { LogisticCard } from "../../components/logisticCard/LogisticCard";

function Deliveries() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="deliveries">
      
      <div className="container">
        
        <h1>Available Deliveries</h1>
        <p>
          Select any one or more of the options to deliver
        </p>
        
        <div className="cards" >
        {logistics.map((gig)=>(
            <LogisticCard key={gig.id} item={gig}/>
          ))}
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <ServiceCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Deliveries;
