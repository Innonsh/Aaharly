import { Meal } from "../../types/exploreplans/explorePlans";

export const DUMMY_MEALS: Meal[] = [
    {
        id: "1",
        title: "Weekly Fat Loss Plan",
        pricePerWeek: "₹1439/Week",
        subtitle: "Includes 2 meals/day",
        image: null,
    },
    {
        id: "2",
        title: "Weekly Balanced Plan",
        pricePerWeek: "₹1499/Week",
        subtitle: "Includes 3 meals/day",
        image: null,
    },
    {
        id: "3",
        title: "Weekly Muscle Gain Plan",
        pricePerWeek: "₹1559/Week",
        subtitle: "Includes 4 meals/day",
        image: null,
    },
];

export const FILTERS = ["Starter", "Balanced", "Essential", "Premium", "All"];
