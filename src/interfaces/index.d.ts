export interface Guitar {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export interface Cantidad {
  id: number
  times: number
}

export interface HeaderProps {
  flushCart: () => void;
  cart: Guitar[];
  isCartEmpty: boolean;
  totalPrice: number;
  addToCart: (item: Guitar) => void;
  itemLessTimes: (id: number) => void;
  removeItem: (id: number) => void;
  itemsAdded: (id: number) => number;
}

export export interface GuitarTdProps extends Omit<HeaderProps, 'flushCart' | 'cart' | 'isCartEmpty' | 'totalPrice'> {
  item: Guitar;
}
