import React from "react";
import { Link } from "react-router-dom";

const SubscriptionScreen = () => {
  // Directly hardcode all prices here
  const plans = [
    { toilets: 2, frequency: "2 Times", price: 889 },
    { toilets: 2, frequency: "4 Times", price: 1599 },
    { toilets: 3, frequency: "2 Times", price: 1349 },
    { toilets: 3, frequency: "4 Times", price: 2399 },
  ];

  const handleSubscribe = (plan) => {
    alert(
      `Subscribing to: ${plan.toilets} Toilets, ${plan.frequency} - ₹${plan.price}`
    );
    // Later: Navigate to payment or call API
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Toilet Cleaning Subscription</h2>
      <h4>Applicable to Viva City (Friday to Sunday)</h4>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>No of Toilets</th>
            <th style={thStyle}>2 Times Per Month</th>
            <th style={thStyle}>4 Times Per Month</th>
          </tr>
        </thead>
        <tbody>
          {[2, 3].map((num) => (
            <tr key={num}>
              <td style={tdStyle}>{num} Toilets</td>

              {/* 2 Times / Month */}
              <td style={tdStyle}>
                ₹
                {
                  plans.find(
                    (p) => p.toilets === num && p.frequency === "2 Times"
                  )?.price
                }
                <br />
                <button
                  style={buttonStyle}
                  onClick={() =>
                    handleSubscribe(
                      plans.find(
                        (p) =>
                          p.toilets === num && p.frequency === "2 Times"
                      )
                    )
                  }
                >
                  Book Now
                </button>
              </td>

              {/* 4 Times / Month */}
              <td style={tdStyle}>
                ₹
                {
                  plans.find(
                    (p) => p.toilets === num && p.frequency === "4 Times"
                  )?.price
                }
                <br />
                <button
                  style={buttonStyle}
                  onClick={() =>
                    handleSubscribe(
                      plans.find(
                        (p) =>
                          p.toilets === num && p.frequency === "4 Times"
                      )
                    )
                  }
                >
                  Book Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: "15px" }}><b>
        * Includes Common Washbasin Cleaning
        <br />* Applicable to Residential Flats only
        <br />* GST not included
        <br />* Tub, Partition Glass & Buckets extra
     </b> </p>
    </div>
  );
};

// Styles
const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

const buttonStyle = {
  marginTop: "5px",
  padding: "6px 12px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default SubscriptionScreen;
