import { PaymentMethodOption, PlanDetails } from "../../types/payment/payment";

export const WEEKLY_PLAN_DETAILS: PlanDetails = {
    title: "Weekly fat loss plan",
    subtitle: "Includes 2 meals/day",
    startDate: "1 Nov",
    deliveryAddress: "Home",
    price: "₹ 1439",
    discount: "₹ -360",
    total: "₹ 1079"
};

export const PAYMENT_METHODS: PaymentMethodOption[] = [
    {
        id: 'UPI',
        title: 'UPI',
        subtitle: 'Pay Via Google PAY, Phone Pay, Paytm'
    },
    {
        id: 'Card',
        title: 'Credit / Debit Card',
        subtitle: 'Pay Via any Credit or Debit Card'
    }
];
