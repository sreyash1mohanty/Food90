import { CDN_URL } from "../utils/constant";
const RestaurantCard=(props)=>{
    const {resData}=props;
    const {name,cuisines,costForTwo,sla,cloudinaryImageId,avgRating}=resData?.info;
    const makegroup=(array,size)=>{
        const results=[];
        for(let i=0;i<array.length;i+=size){
            results.push(array.slice(i,i+size));
        }
        return results;
    }
    const cuisineChunks = makegroup(cuisines, 4);
    return (
        <div className="res-card">
            <img className="res-img" alt="res-photo" 
            src={CDN_URL+ cloudinaryImageId}/>
            <h3>{name}</h3>
            {/* <h4>{cuisines.join(",")}</h4> */}
            {cuisineChunks.map((chunk, index) => (
                <h4 key={index}>{chunk.join(", ")}</h4>
            ))}
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>Delivery in: {sla.deliveryTime} minutes!!!</h4>
        </div>
    )
}
export default RestaurantCard;