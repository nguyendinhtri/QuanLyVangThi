import React, { useState } from 'react';
import './Toggle.css'; // Import file CSS

function ToggleSwitch() {
  const [buttonContent, setButtonContent] = useState('Accept');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    if (buttonContent === 'Accept') {
      setButtonContent('Ignore');
      setShowConfirmation(true); // Hiển thị hộp thoại xác nhận
    } else {
      setButtonContent('Accept');
      setShowConfirmation(false); // Ẩn hộp thoại xác nhận
    }
  };

  const handleClose = () => {
    setShowConfirmation(false); // Đóng hộp thoại xác nhận
  };

  return (
    <div>
      <button 
        className={`toggle-button ${buttonContent === 'Ignore' ? 'ignore' : ''}`}
        onClick={handleClick}
      >
        {buttonContent}
      </button>

      {/* Hiển thị nội dung khi buttonContent là "Accept" */}
      {buttonContent === 'Accept' && (
        console.log("1")
      )}

      {/* Hiển thị nội dung khi buttonContent là "Ignore" */}
      {buttonContent === 'Ignore' && (
        console.log("1")
      )}

      {/* Hộp thoại xác nhận */}
      {showConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>You have selected Ignore. Are you sure?</p>
            <button onClick={handleClose} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToggleSwitch;
