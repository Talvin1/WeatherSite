import "../SCSS/HomePage.scss";
import { useForm } from "react-hook-form";
import "../images/search.png";
import CenterHomepage from "../components/CenterHomepage";
import RecentSearches from "../components/RecentSearches";
import TempType from "../types/TempType";
type SearchData = { tempType: TempType; cityName: string };

interface HomepageProps {
  tempType: TempType;
  setTempType: (tempType: TempType) => void;
}

const Homepage: React.FC<HomepageProps> = ({ tempType, setTempType }) => {
  const { register, watch, setValue } = useForm<SearchData>({
    defaultValues: {
      tempType: tempType,
      cityName: "",
    },
  });

  const localStorageSearchHistory = localStorage.getItem("searchHistory") ?? "[]";
  const searchHistory = JSON.parse(localStorageSearchHistory);

  const TempForm = () => {
    const handleTempTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedTempType = e.target.value as TempType;
      setTempType(selectedTempType);
      setValue("tempType", selectedTempType); // Update the form value
    };

    return (
      <label className="form_label">
        Temperature Unit:
        <select {...register("tempType")} value={tempType} onChange={handleTempTypeChange} className="temp_select">
          <option className="tempOption" value="metric">
            °C
          </option>
          <option className="tempOption" value="imperial">
            °F
          </option>
          <option className="tempOption" value="kelvin">
            °K
          </option>
        </select>
      </label>
    );
  };

  return (
    <div className="page_div">
      <div className="top_bar">
        <TempForm />
        <h1 className="title">MEZEG</h1>
      </div>
      <div className="header_div">
        <CenterHomepage tempType={watch("tempType")} />
        <div className="recent_search_div">
          <RecentSearches searchHistory={searchHistory} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
