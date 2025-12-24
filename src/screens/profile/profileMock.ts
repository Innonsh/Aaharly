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
        key: "lose_weight",
        title: strings.profile.goalLoseTitle,
        subtitle: strings.profile.goalLoseSubtitle,
    },
    {
        key: "maintain_weight",
        title: strings.profile.goalMaintainTitle,
        subtitle: strings.profile.goalMaintainSubtitle,
    },
    {
        key: "gain_weight",
        title: strings.profile.goalGainTitle,
        subtitle: strings.profile.goalGainSubtitle,
    },
];
