import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type RecentSearchesProps = {
  searchHistory: [string];
};

const RecentSearches: React.FC<RecentSearchesProps> = ({ searchHistory }) => {
  return (
    <div className="recent_search_div">
      <ul>
        <h4>Recently Searched:</h4>
        {searchHistory.map((search: string, index: number) => (
          <motion.li key={index} whileHover={{ scale: 1.07 }}>
            <Link to={"/location/" + search}>
              {(search[0].toUpperCase() + search.slice(1)).length > 11
                ? (search[0].toUpperCase() + search.slice(1)).substring(0, 15)
                : search[0].toUpperCase() + search.slice(1)}{" "}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
