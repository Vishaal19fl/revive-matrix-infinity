import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className='link'>Customer Support</Link> 
        </span>
        <div className="messages">

        <div className="item owner">
          <img
              src="/img/svishaal4.png"
              alt=""
            />
            <p>
              Thank you
            </p>
          </div>
          
          
          <div className="item owner">
          <img
              src="/img/svishaal4.png"
              alt=""
            />
            <p>
              Hello, I have purchased your intermediate plan.
            </p>
          </div>
          <div className="item">
          <img
              src="/img/venky.png"
              alt=""
            />
            <p>
              Tell me your logo specifications
            </p>
          </div>
          <div className="item owner">
            <img
              src="/img/svishaal4.png"
              alt=""
            />
            <p>
            The logo should embody our brand's ethos of creativity and professionalism through a modern, minimalist design with vibrant colors, ensuring versatility and immediate visual impact across platforms.
            </p>
          </div>
          
          <div className="item">
          <img
              src="/img/venky.png"
              alt=""
            />
            <p>
            
          <img className="image" src="/img/logo2.png" alt="" />


            </p>
          </div>
          <div className="item">
          <img
              src="/img/venky.png"
              alt=""
            />
            <p>
            
          Is this ok?


            </p>
          </div>
          <div className="item owner">
          <img
              src="/img/svishaal4.png"
              alt=""
            />
            <p>
              Yeah
            </p>
          </div>
        </div>
        <hr />
        <div className="write">
          <textarea type="text" placeholder="Write your message" />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
