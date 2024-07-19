import { useEffect, useState } from "react";
import { data } from "../../utils/constants";
import Celebrity from "../../Types/Celebrity";
import "./HomePage.css";
import CelebrityCard from "../../Components/CelebrityCard/CelebrityCard";
import { HiMagnifyingGlass } from "react-icons/hi2";
import DeletePopUp from "../../Components/DeletePopUp/DeletePopUp";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";

const HomePage = () => {
  const [celebrityData, setCelebrityData] = useState<Celebrity[]>(data);
  const [openedAccordion, setOpenedAccordion] = useState<number | null>(null);
  const [isEditingCard, setIsEditingCard] = useState<boolean>(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState<{
    show: boolean;
    id: number | null;
  }>({ show: false, id: null });
  const [searchText, setSearchText] = useState<string>("");
  const [searchTextData, setSearchTextData] = useState<Celebrity[]>([]);
  const [isCardDeleted, setIsCardDeleted] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText.length || isCardDeleted) {
        const searchData = celebrityData.filter((item) =>
          (item.first + " " + item.last)
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
        setSearchTextData(searchData);
        setIsCardDeleted(false);
      } else {
        setSearchTextData([]);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText, isCardDeleted, celebrityData]);

  const handleShowDetails = (id: number) => {
    if (!isEditingCard) {
      setOpenedAccordion((prev) => (prev !== id ? id : null));
    }
  };

  const handleSearch = (e: any): void => {
    setIsEditingCard(false);
    setOpenedAccordion(null);
    const value = e.target.value;
    setSearchText(value);
  };

  const handleDelete = (): void => {
    if (showDeletePopUp.id !== null) {
      const newData = celebrityData.filter(
        (item) => item.id !== showDeletePopUp.id
      );
      setCelebrityData(newData);
      setShowDeletePopUp({ show: false, id: null });
      setIsCardDeleted(true);
    }
  };

  const handleClosePopUp = (): void => {
    setShowDeletePopUp({ show: false, id: null });
  };

  const displayedData = searchText.length ? searchTextData : celebrityData;
  
  return (
    <>
      <div className="celebrity-page-wrapper">
        <div className="celebrity-search-box-wrapper">
          <HiMagnifyingGlass fontSize="25" fill="#767679" />
          <input
            type="text"
            placeholder="Search user"
            className="celebrity-search-box"
            onChange={handleSearch}
          />
        </div>
        {displayedData.length ? (
          displayedData.map((item, index) => (
            <CelebrityCard
              key={item?.id}
              data={item}
              index={index}
              openedAccordion={openedAccordion}
              handleShowDetails={handleShowDetails}
              setShowDeletePopUp={setShowDeletePopUp}
              setIsEditingCard={setIsEditingCard}
              setCelebrityData={setCelebrityData}
            />
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
      {showDeletePopUp.show && (
        <DeletePopUp
          handleClosePopUp={handleClosePopUp}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default HomePage;
