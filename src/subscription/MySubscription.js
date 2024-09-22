import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MySubscriptionPage.css'; // Add custom styles if needed
import Header from '../components/Header';

const MySubscriptionPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    dailyPrice: '',
    monthlyPrice: '',
    yearlyPrice: ''
  });


  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/subscriptions`, {headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }});
      setSubscription(response.data[0]);
      setFormValues({
        dailyPrice: response.data[0]?.daily,
        monthlyPrice: response.data[0]?.monthly,
        yearlyPrice: response.data[0]?.yearly
      });
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setFormValues({
      dailyPrice: subscription.dailyPrice,
      monthlyPrice: subscription.monthlyPrice,
      yearlyPrice: subscription.yearlyPrice
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/api/subscriptions`, 
          formValues, 
          {
            headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
          }
        );
        setEditing(false);
        fetchSubscription(); // Refresh the subscription details
      } catch (error) {
        console.error('Error updating subscription:', error);
      }
      
  };

  return (
    <div className="subscription-container">
      <Header />
      <h1 className="subscription-header">My Subscription</h1>
   
    
        <div className="subscription-details">
          {editing ? (
            <form onSubmit={handleSubmit} className="subscription-form">
              <div className="form-group">
                <label htmlFor="dailyPrice">Daily Price:</label>
                <input
                  type="number"
                  id="dailyPrice"
                  name="dailyPrice"
                  value={formValues.dailyPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="monthlyPrice">Monthly Price:</label>
                <input
                  type="number"
                  id="monthlyPrice"
                  name="monthlyPrice"
                  value={formValues.monthlyPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="yearlyPrice">Yearly Price:</label>
                <input
                  type="number"
                  id="yearlyPrice"
                  name="yearlyPrice"
                  value={formValues.yearlyPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Save</button>
              <button type="button" onClick={handleCancelClick} className="cancel-button">Cancel</button>
            </form>
          ) : (
            <>
              <div className="subscription-price">
                <h2>Daily Price:</h2>
                <p>${subscription?.daily}</p>
              </div>
              <div className="subscription-price">
                <h2>Monthly Price:</h2>
                <p>${subscription?.monthly}</p>
              </div>
              <div className="subscription-price">
                <h2>Yearly Price:</h2>
                <p>${subscription?.yearly}</p>
              </div>
              <button onClick={handleEditClick} className="edit-button">Edit Prices</button>
            </>
          )}
        </div>
     
    </div>
  );
};

export default MySubscriptionPage;
