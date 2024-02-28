import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [mobile, setMobile] = useState("");
  const [mail, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  const [mailError, setMailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const validateEmail = () => {
    const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setMailError(mailPattern.test(mail) ? "" : "Please enter a valid email.");
  };

  const validateMobile = () => {
    const mobilePattern = /^[0-9]{10}$/;
    setMobileError(
      mobilePattern.test(mobile) ? "" : "Please enter a valid mobile number."
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail();
    validateMobile();

    if (!name || !street || !address) {
      alert("Please enter valid information.");
      return;
    }

    if (mailError || mobileError) {
      alert("Please enter valid email and mobile.");
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartDetails = JSON.parse(localStorage.getItem("cartDetails"));

    const updatedOrderDetails = {
      name,
      street,
      mobile,
      mail,
      address,
      paymentOption: "Cash",
      ...cartDetails,
      cartItems,
    };

    localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
    localStorage.removeItem("cart");
    localStorage.removeItem("cartDetails");

    setShowSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div style={styles.checkoutContainer}>
      <div style={styles.checkoutForm}>
        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>Checkout</legend>
          {showSuccess ? (
            <div style={styles.successMessage}>
              Order Successful! Redirecting...
            </div>
          ) : (
            <>
              <div style={styles.gridContainer}>
                <div style={styles.formGroup}>
                  <label htmlFor="name" style={styles.label}>
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    style={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="mail" style={styles.label}>
                    Mail:
                  </label>
                  <input
                    type="text"
                    id="mail"
                    style={styles.input}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    onBlur={validateEmail}
                  />
                  {mailError && (
                    <span style={styles.validationMessage}>{mailError}</span>
                  )}
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="mobile" style={styles.label}>
                    Mobile Number:
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    style={styles.input}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    pattern="[0-9]{10}"
                    onBlur={validateMobile}
                  />
                  {mobileError && (
                    <span style={styles.validationMessage}>{mobileError}</span>
                  )}
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="street" style={styles.label}>
                    Street Name:
                  </label>
                  <input
                    type="text"
                    id="street"
                    style={styles.input}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="address" style={styles.label}>
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  style={styles.input}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="payment" style={styles.label}>
                  Select Mode Of Payment:
                </label>
                <select
                  id="payment"
                  style={styles.input}
                  value={paymentOption}
                  onChange={(e) => handlePaymentOptionChange(e.target.value)}
                >
                  <option value={"cash"}>Cash</option>
                </select>
              </div>
              <button style={styles.confirmButton} onClick={handleSubmit}>
                Confirm Order
              </button>
            </>
          )}
        </fieldset>
      </div>
    </div>
  );
};

const styles = {
  checkoutContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  checkoutForm: {
    width: "400px",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  fieldset: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "10px",
  },
  legend: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  formGroup: {
    marginBottom: "15px",
    position: "relative",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  validationMessage: {
    position: "absolute",
    top: "100%",
    left: 0,
    fontSize: "12px",
    color: "red",
  },
  select: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#333",
    fontSize: "16px",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.3s",
  },
  selectHover: {
    border: "1px solid #666",
  },
  selectFocus: {
    border: "1px solid #4caf50",
  },
  selectDisabled: {
    backgroundColor: "#eee",
    color: "#888",
    cursor: "not-allowed",
  },

  successMessage: {
    fontSize: "18px",
    color: "#4caf50",
    textAlign: "center",
    animation: "fade-in 1s ease-in-out",
  },
  "@keyframes fade-in": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
};

export default Checkout;
