import React, { useState, useEffect } from 'react';
import './Toggle.css'; // Import file CSS
import { updateDonVangThi } from '../../api/donvangthiService'; // Import hàm updateDonVangThi

function ToggleSwitch({ donVangThiId, currentStatus, onUpdate }) {
  const [buttonContent, setButtonContent] = useState(currentStatus || 'Accept');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setButtonContent(currentStatus || 'Accept');
  }, [currentStatus]);

  const handleClick = async () => {
    setLoading(true);
    const newStatus = buttonContent === 'Accept' ? 'Ignore' : 'Accept';
    try {
      await updateDonVangThi({ id: donVangThiId, TRANG_THAI: newStatus });
      setButtonContent(newStatus);
      setShowConfirmation(false);
      if (onUpdate) {
        onUpdate(donVangThiId, newStatus);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <button 
        className={`toggle-button ${buttonContent === 'Ignore' ? 'ignore' : ''}`}
        onClick={handleConfirmation}
        disabled={loading}
      >
        {buttonContent}
      </button>

      {showConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>Bạn có chắc chắn về lựa chọn của mình không?</p>
            <button onClick={handleClick} className="confirm-button">Confirm</button>
            <button onClick={handleClose} className="close-button">Close</button>
          </div>
        </div>
      )}

      {error && <p className="error-message">Lỗi: {error}</p>}
    </div>
  );
}

export default ToggleSwitch;
