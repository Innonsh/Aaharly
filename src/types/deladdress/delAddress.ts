export interface DeliveryCardProps {
    title: string;
    selectedAddress: string | null;
    onSelect: (address: string) => void;
    isOpen: boolean;
    toggleOpen: () => void;
    zIndex: number;
    onAddNewAddress: () => void;
}

export interface MealCardProps {
    type: 'Lunch' | 'Dinner';
    image: React.FC<any>;
}

export interface AddressCardProps {
    type: 'Home' | 'Office' | 'College';
    address: string;
}
