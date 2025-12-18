export type PaymentMethodType = 'UPI' | 'Card';

export interface PlanDetails {
    title: string;
    subtitle: string;
    startDate: string;
    deliveryAddress: string;
    price: string;
    discount: string;
    total: string;
}

export interface PaymentMethodOption {
    id: PaymentMethodType;
    title: string;
    subtitle: string;
}
