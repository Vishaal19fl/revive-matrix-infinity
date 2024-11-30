import React from 'react';
import "./Messages.scss";
import { Link } from 'react-router-dom';

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  const fakeMessages = [
    {
      id: 1,
      user: "Vishaal S",
      message: "Hello, I have ordered your intermediate plan",
      date: "1 hour ago"
    },
    {
      id: 2,
      user: "John Doe",
      message: "I would like to change the logo design",
      date: "2 hours ago"
    },
    
  ];

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Chat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fakeMessages.map((message) => (
              <tr className="active" key={message.id}>
                <td>{message.user}</td>
                <td>
                  <Link to={`/message/123`} className="link">
                    {message.message.substring(0, 100)}...
                  </Link>
                </td>
                <td>{message.date}</td>
                <td className='chat'>
                  <Link to={`/message/123`} className="link">
                    <button>Open Chat</button>
                  </Link>
                </td>
                <td>
                  <button>Mark as Read</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
