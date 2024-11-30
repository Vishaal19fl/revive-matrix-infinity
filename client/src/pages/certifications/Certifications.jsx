import React, { useState } from 'react';
import "./Certifications.scss";
import { Link } from 'react-router-dom';

const Certifications = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const fakeMessages = [
    {
      id: 1,
      user: "Venkatesh",
      message: "Web Development Course",
      date: "25 Jan 2022"
    },
    {
      id: 2,
      user: "Venkatesh",
      message: "Modern React Course",
      date: "12 July 2023"
    },
    
  ];

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Certifications</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Course</th>
              <th>Date</th>
              <th>Completion Status</th>
              <th>Certificate</th>
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
                  Completed
                </td>
                <td>
                <button className="btn" onClick={() => openModal('/img/work-progress.jpg')}>View Certificate</button>
                </td>
              </tr>
            ))}
          </tbody>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <img src='https://cdn.discordapp.com/attachments/725646168759205929/1239050284945379328/certificate.jpg?ex=66418300&is=66403180&hm=bcc08a2d4513200f3dfc239ac0a0f8ce446e2bc3f64c76fe45ebcd22e546b826&' alt="Progress" />
              </div>
            </div>
          )}
        </table>
        
      </div>
    </div>
  );
};

export default Certifications;
