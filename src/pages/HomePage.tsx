import "../SCSS/HomePage.scss";
import { useForm } from "react-hook-form";
import "../images/search.png";
import CenterHomepage from "../components/CenterHomepage";
import RecentSearches from "../components/RecentSearches";
import TempType from "../types/TempType";
import TempForm from "../components/TempForm";
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

  return (
    <div className="page_div">
      <div className="top_bar">
        <TempForm setValue={setValue} register={register} tempType={watch("tempType")} setTempType={setTempType} />
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
