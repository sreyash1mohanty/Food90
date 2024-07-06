    import { useEffect, useState } from "react";
    const useRestaurantMenu = (
        MENU_API_URL,
        resId,
        MENU_ITEM_TYPE_KEY, 
        RESTAURANT_TYPE_KEY,
    ) => {
        const [resInfo, setResInfo] = useState(null);
    const [menuItems, setMenuItems] = useState([]); 
    useEffect(() => {
        getRestaurantInfo();
    }, [resId]);
    async function getRestaurantInfo() {
        try {
        const response = await fetch(MENU_API_URL + resId);
        if (!response.ok) {
            const err = response.status;
            throw new Error(err);
        } else {
            const json = await response.json();
            // Set restaurant data
            const restaurantData =
            json?.data?.cards
                ?.map((x) => x.card)
                ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
                ?.info || null;
            setResInfo(restaurantData);
            // Set menu item data
            const menuItemsData =
            json?.data?.cards
                .find((x) => x.groupedCard)
                ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
                (x) => x.card?.card
                )
                ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
                ?.map((x) => x.itemCards)
                .flat()
                .map((x) => x.card?.info) || [];
            const uniqueMenuItems = [];
            menuItemsData.forEach((item) => {
            if (!uniqueMenuItems.find((x) => x.id === item.id)) {
                uniqueMenuItems.push(item);
            }
            });
            setMenuItems(uniqueMenuItems);
        }
        } catch (err) {
        setMenuItems([]);
        setResInfo(null);
        console.error(err);
        }
    }
    return [resInfo, menuItems];
    };

export default useRestaurantMenu;