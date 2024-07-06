
import useRestaurantMenu from '../utils/useRestaurantMenu';
import Shimmer from './Shimmer.js';
import { CDN_URL, MENU_API_URL, MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY } from "../utils/constant";
import { useParams } from "react-router-dom";
const RestaurantMenu = () => {
    const { resId } = useParams();
    const [resInfo,menuItems]=useRestaurantMenu(
        MENU_API_URL,
        resId,
        MENU_ITEM_TYPE_KEY, 
        RESTAURANT_TYPE_KEY
    );
    if (!resInfo) return <Shimmer />;
    const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, city, locality } = resInfo;
    return (
        <div className="menu-container">
            <div className="menu-header">
                <div className="res-details">
                    <h1 className="restaurant-name">{name}</h1>
                    {cuisines && Array.isArray(cuisines) && (
                        <h3 className="restaurant-cuisines">{cuisines.join(", ")}</h3>
                    )}
                    <h3 className="cost-for-two">{costForTwoMessage}</h3>
                    <h3 className="avg-rating">Rating: {avgRating}</h3>
                    <h3 className="location">{locality}, {city}</h3>
                </div>
                <div className="res-img-container">
                    <img className="res-img" alt="Restaurant" src={CDN_URL + cloudinaryImageId} />
                </div>
            </div>
            <div className="restaurant-menu-content">
                <div className="menu-items-container">
                    <h3 className="menu-title">Recommended</h3>
                    <div className="menu-cards">
                        {menuItems.map((item) => (
                            <div className="menu-card" key={item?.id}>
                                <div className="menu-card-details">
                                    <h3 className="item-title">{item?.name}</h3>
                                    <p className="item-cost">
    {`₹${(item.price || item.defaultPrice || item.finalPrice) / 100}`}
</p>

                                    <p className="item-desc">{item?.description}</p>
                                </div>
                                <div className="menu-card-actions">
                                    {item?.imageId && (
                                        <img
                                            className="menu-item-img"
                                            src={CDN_URL + item?.imageId}
                                            alt={item?.name}
                                        />
                                    )}
                                     <button className="add-btn">ADD +</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
