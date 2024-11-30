import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";

import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { gigs } from "../../data";
import { ServiceCard2 } from "../../components/serviceCard2/ServiceCard2";
import ServiceCard from "../../components/serviceCard/ServiceCard";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [lora, setlora] = useState([]);

  useEffect(() => {
    const fetchLora = async () => {
      try {
        const response = await newRequest.get('/loradata');
        console.log(response.data);
        setlora(response.data.loradata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLora();
  }, []);

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
    <div className="gigs">
      
      <div className="container">
        
        <h1>Donation Requests</h1>
        <p>
          Select among these requests to donate
        </p>
        
        <div className="cards" >
        {gigs.map((gig)=>(
            <ServiceCard2 key={gig.id} item={gig}/>
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

export default Gigs;
