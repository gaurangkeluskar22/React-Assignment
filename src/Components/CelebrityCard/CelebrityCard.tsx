import { useState } from "react";
import "./CelebrityCard.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { BsPencil as EditIcon } from "react-icons/bs";
import { RiDeleteBin6Line as DeleteIcon } from "react-icons/ri";
import { generateAge } from "../../utils/constants";
import { MdOutlineCancel as CancelIcon } from "react-icons/md";
import approveImg from "../../assets/images/approve.png";
import { genderDetails } from "../../utils/constants";
import Celebrity from "../../Types/Celebrity";

interface CelebrityCardProps {
  data: Celebrity;
  index: number;
  openedAccordion: number | null;
  handleShowDetails: (id: number) => void;
  setShowDeletePopUp: React.Dispatch<
    React.SetStateAction<{ show: boolean; id: number | null }>
  >;
  setIsEditingCard: React.Dispatch<React.SetStateAction<boolean>>;
  setCelebrityData: React.Dispatch<React.SetStateAction<Celebrity[]>>;
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({
  data,
  index,
  openedAccordion,
  handleShowDetails,
  setShowDeletePopUp,
  setIsEditingCard,
  setCelebrityData,
}) => {
  const [cardData, setCardData] = useState<Celebrity>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMadeChanges, setIsMadeChanges] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState({
    name: { message: "", show: false },
    dob: { message: "", show: false },
    country: { message: "", show: false },
    description: { message: "", show: false },
  });

  const [userAge, setUserAge] = useState(generateAge(data?.dob));
  const isAdult = userAge >= 18;

  const handleEdit = () => {
    setIsEditing(true);
    setIsEditingCard(true);
  };

  const handleDelete = (id: number) => {
    setShowDeletePopUp({ show: true, id: id });
  };

  const handleCancle = (): void => {
    setIsEditing(false);
    setIsEditingCard(false);
    setIsMadeChanges(false);
    setShowWarning({
      name: { message: "", show: false },
      dob: { message: "", show: false },
      country: { message: "", show: false },
      description: { message: "", show: false },
    });
  };

  const handleChange = (e: any) => {
    setIsMadeChanges(true);
    let value = e?.target?.value;
    const name = e?.target?.name;

    if (name === "country") {
      if (/\d/.test(value)) {
        setShowWarning((prev) => ({
          ...prev,
          [name]: { show: true, message: "numbers are not valid" },
        }));
      }
    }

    if (name === "dob") {
      setUserAge(value);
      setCardData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (isNaN(Number(value))) {
        setShowWarning((prev) => ({
          ...prev,
          [name]: { show: true, message: "string is not valid" },
        }));
      } else {
        setShowWarning((prev) => ({
          ...prev,
          [name]: { show: false, message: "" },
        }));
      }
    }

    if (value.trim()?.length === 0) {
      setShowWarning((prev) => ({
        ...prev,
        [name]: { show: true, message: "Field is required" },
      }));
    } else if (!["dob", "country"].includes(name)) {
      setShowWarning((prev) => ({
        ...prev,
        [name]: { show: false, message: "" },
      }));
    }

    if (name === "name") {
      const newName = value.split(" ");
      setCardData((prev) => ({
        ...prev,
        first: newName[0] || "",
        last: newName[1] || "",
      }));

      setShowWarning((prev) => ({
        ...prev,
        [name]: {
          show: !newName[0]?.length ? true : !newName[1]?.length ? true : false,
          message: !newName[0]?.length
            ? "first name is required"
            : !newName[1]?.length
            ? "last name is required"
            : "",
        },
      }));
    }

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const val = Object.values(showWarning).some((item) => item?.show === true);
    if (val) {
      return;
    }

    // setCelebrityData((prevData) => {
    //   const updatedData = [...prevData];
    //   updatedData[index] = cardData;
    //   return updatedData;
    // });

    setIsEditing(false);
    setIsEditingCard(false);
    setIsMadeChanges(false);
  };

  return (
    <div className="celebrity-card-wrapper" key={cardData?.id}>
      <div
        className="celebrity-card-header"
        onClick={() => handleShowDetails(cardData?.id)}
      >
        <div className="celebrity-profile-details-section">
          <img
            src={cardData?.picture}
            alt="profile-pic"
            loading="lazy"
            className="celebrity-profile-pic"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {isEditing ? (
              <input
                type="text"
                name="name"
                className="celebrity-name"
                value={`${cardData.first} ${cardData.last}`}
                onChange={handleChange}
              />
            ) : (
              <span className="celebrity-name">
                {cardData?.first + " " + cardData?.last}
              </span>
            )}
            <span className="grid-item celebrity-details-label-warning">
              {showWarning["name"].message}
            </span>
          </div>
        </div>
        {openedAccordion === cardData?.id ? (
          <FaAngleUp fill="#767679" />
        ) : (
          <FaAngleDown fill="#767679" />
        )}
      </div>
      <div
        className="celebrity-card-body"
        style={{ display: openedAccordion === cardData?.id ? "block" : "none" }}
      >
        <div className="grid">
          <span className="grid-item celebrity-details-label">Age</span>
          <span className="grid-item celebrity-details-label">Gender</span>
          <span className="grid-item celebrity-details-label">Country</span>
          {isEditing ? (
            <>
              <input
                className="grid-item celebrity-details"
                name="dob"
                value={userAge}
                onChange={handleChange}
              />
              <select
                className="grid-item celebrity-details"
                name="gender"
                value={cardData?.gender}
                onChange={handleChange}
              >
                {genderDetails.map((gender) => {
                  return <option value={gender}>{gender}</option>;
                })}
              </select>
              <input
                type="text"
                className="grid-item celebrity-details"
                name="country"
                value={cardData?.country}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <span className="grid-item celebrity-details">
                {userAge + " Years"}
              </span>
              <span className="grid-item celebrity-details">
                {cardData?.gender}
              </span>
              <span className="grid-item celebrity-details">
                {cardData?.country}
              </span>
            </>
          )}
          <span className="grid-item celebrity-details-label-warning">
            {showWarning["dob"].message}
          </span>
          <span className="grid-item celebrity-details-label-warning">{}</span>
          <span className="grid-item celebrity-details-label-warning">
            {showWarning["country"].message}
          </span>
        </div>
        <div className="celebrity-details-description-section">
          <span className="celebrity-details-label">Description</span>
          {isEditing ? (
            <textarea
              className="celebrity-details description-section"
              name="description"
              value={cardData.description}
              rows={5}
              onChange={handleChange}
            />
          ) : (
            <span className="celebrity-details description-section">
              {cardData?.description}
            </span>
          )}
          <span className="grid-item celebrity-details-label-warning">
            {showWarning["description"].message}
          </span>
        </div>
        <div className="celebrity-details-action-buttons">
          {isEditing ? (
            <>
              <CancelIcon
                fill="#FF3500"
                fontSize={"1.7rem"}
                className="c-p"
                onClick={handleCancle}
              />
              <button
                disabled={!isMadeChanges}
                style={{ background: "white", border: "none" }}
                onClick={isMadeChanges ? handleSave : undefined}
              >
                <img
                  src={approveImg}
                  className="c-p approve-img"
                  style={{ cursor: isMadeChanges ? "pointer" : "not-allowed" }}
                />
              </button>
            </>
          ) : (
            <>
              <DeleteIcon
                fill="#FF3500"
                fontSize={"1.5rem"}
                className="c-p"
                onClick={() => handleDelete(cardData?.id)}
              />
              <EditIcon
                fill="#007AFF"
                fontSize={"1.5rem"}
                style={{
                  cursor: isAdult ? "pointer" : "not-allowed",
                }}
                onClick={isAdult ? handleEdit : undefined}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CelebrityCard;
