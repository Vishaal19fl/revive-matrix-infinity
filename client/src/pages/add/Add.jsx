import React, { useReducer } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (gig) => {
      try {
        const response = await newRequest.post("/gigs", gig);
        return response.data; 
      } catch (error) {
        console.error("Error posting gig:", error);
        throw error; 
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mygigs"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error); // Handle mutation errors
    },
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/gigs?search=");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Request</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Request Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Need Water Bottles"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
            <option value="select">Select</option>
              <option value="food">Food</option>
              <option value="medicine">Medicine</option>
              <option value="shelter item">Shelter item</option>
            </select>
            <label htmlFor="">Message Received</label>
            <textarea
              name="desc"
              id=""
              placeholder="Message received from LifeLine unit"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Add</button>
          </div>
          <div className="details">
            <label htmlFor="">Delivery Location</label>
            <input
              type="text"
              name="delLocation"
              placeholder="e.g. No.33, Sakthi Colony, Anna Nagar West"
              onChange={handleChange}
            />
            {/* <label htmlFor="">Delivery Time (Minutes)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} /> */}
            <label htmlFor="">Quantity</label>
            <input type="text" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
