import { IoIosClose as CloseIcon } from "react-icons/io";
import "./DeletePopUp.css";

interface DeletePopUpProps {
  handleClosePopUp: () => void;
  handleDelete: () => void;
}

const DeletePopUp: React.FC<DeletePopUpProps> = ({
  handleClosePopUp,
  handleDelete,
}) => {
  return (
    <div className="delete-popup-wrapper">
      <div className="delete-popup">
        <div className="delete-popup-header">
          <span>Are you sure you want to delete?</span>
          <CloseIcon
            fill="#6A6A6D"
            fontSize={"2rem"}
            className="c-p"
            onClick={handleClosePopUp}
          />
        </div>
        <div className="delete-popup-buttons-section">
          <button onClick={() => handleClosePopUp()}>Cancel</button>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
