// This mock data is used in ProfileStep2Screen and ProfileStep3Screen.
// Note: The actual strings are pulled from the LocalizationContext, so the arrays here
// are primarily defining the keys and structure if needed, or we can export a function that
// takes the `strings` object and returns the data array.

import { ActivityOption, GoalOption } from "../../types/profile/profile";

export const getActivityOptions = (strings: any): ActivityOption[] => [
    {
        key: "sedentary",
        title: strings.profile.activitySedentaryTitle,
        subtitle: strings.profile.activitySedentarySubtitle,
    },
    {
        key: "moderate",
        title: strings.profile.activityModerateTitle,
        subtitle: strings.profile.activityModerateSubtitle,
    },
    {
        key: "active",
        title: strings.profile.activityActiveTitle,
        subtitle: strings.profile.activityActiveSubtitle,
    },
];

export const getGoalOptions = (strings: any): GoalOption[] => [
    {
        key: "lose",
        title: strings.profile.goalLoseTitle,
        subtitle: strings.profile.goalLoseSubtitle,
    },
    {
        key: "maintain",
        title: strings.profile.goalMaintainTitle,
        subtitle: strings.profile.goalMaintainSubtitle,
    },
    {
        key: "gain",
        title: strings.profile.goalGainTitle,
        subtitle: strings.profile.goalGainSubtitle,
    },
];
