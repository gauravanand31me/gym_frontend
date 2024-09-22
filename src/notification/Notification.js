import React from 'react';
import './Notification.css';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      message: 'John Doe registered for the 06:00 AM slot at Powerhouse Gym',
      icon: faClock,
      profileImg: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      message: 'Jane Smith purchased a yearly subscription at Powerhouse Gym',
      icon: faTicketAlt,
      profileImg: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 3,
      message: 'Alex Johnson registered for the 08:00 AM slot at GymX',
      icon: faClock,
      profileImg: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 4,
      message: 'Emily Davis purchased a monthly subscription at Gold’s Gym',
      icon: faTicketAlt,
      profileImg: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  return (
    <div className="container notifications-container">
      <Header />
      <h2>Notifications</h2>
      <ul className="list-group">
        {notifications.map(notification => (
          <li key={notification.id} className="list-group-item">
            <img src={notification.profileImg} alt="profile" className="profile-img" />
            <div className="notification-content">
              <FontAwesomeIcon icon={notification.icon} />
              <span>{notification.message}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
