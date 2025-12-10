import { Slide } from "../../types/onboarding/onboarding";
import Onboarding1 from "../../assets/Onboarding/Onboarding1.svg";
import Onboarding2 from "../../assets/Onboarding/Onboarding2.svg";
import Onboarding3 from "../../assets/Onboarding/Onboarding3.svg";
import strings from "../../localisation/content/en.json";

export const SLIDES: Slide[] = [
    {
        key: "meals",
        Illustration: Onboarding1,
        title: strings.onboarding.screen1Title,
        subtitle: strings.onboarding.screen1Subtitle,
    },
    {
        key: "screen1",
        Illustration: Onboarding2,
        title: strings.onboarding.screen2Title,
        subtitle: strings.onboarding.screen2Subtitle,
    },
    {
        key: "screen2",
        Illustration: Onboarding3,
        title: strings.onboarding.screen3Title,
        subtitle: strings.onboarding.screen3Subtitle,
    },
];
