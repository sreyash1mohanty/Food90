import RestaurantCard from "./RestaurantCard";
import { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
// import Loader from "./Loader.js";
import Shimmer from "./Shimmer.js";
const Body=()=>{
    const [listOfRestraunts,setListOfRestraunts]=useState([]);
    const [filteredRestraunts,setFilteredRestraunts]=useState([]);
    const [searchText,setSearchText]=useState("");
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
            const response = await fetch(
                "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            );
            const json = await response.json();
            // console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            const topRestaurantsCard = json?.data?.cards?.find(
                card => card?.card?.card?.header?.title === "Top restaurant chains in Bangalore"
            );
            const fetchedRestaurants = topRestaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            console.log(fetchedRestaurants);
            setListOfRestraunts(fetchedRestaurants);
            setFilteredRestraunts(fetchedRestaurants);
    };
    const onlineStatus=useOnlineStatus();
    if(onlineStatus===false){
        return <h1 className="off-header">
            You are offline!!
        </h1>
    }
    return listOfRestraunts.length===0?<Shimmer/>:(
        <div className="body">
            <div className="filter">
                <div className="search"><input type="text" className="search-box" value={searchText}
                onChange={(e)=>{setSearchText(e.target.value);
                }}/>
                <button className="search-btn" onClick={()=>{
                    const filteredRes=listOfRestraunts.filter((res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                    setFilteredRestraunts(filteredRes);

                }}>Search</button></div>
                <button className="filter-btn" onClick={()=>{
                const filteredList=listOfRestraunts.filter((res)=>res.info.avgRating>4);
                console.log(filteredList);
                setListOfRestraunts(filteredList);
            }}>Top Rated Restaurants </button>
            </div>
            <div className="res-container">
                {filteredRestraunts.map(restaurant => <Link  key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}><RestaurantCard resData={restaurant}/></Link>)}
            </div>


        </div>
    )
}
export default Body;