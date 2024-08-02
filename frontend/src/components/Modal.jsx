export const Modal = ({ show, onClose, children }) => {
    if (!show) {
      return null;
    }
  
    return (
      <>
        <div className="backdrop" onClick={onClose}></div>
        <div className="modal">
          <button className="close-button" onClick={onClose}>X</button>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </>
    );
  };
  
 