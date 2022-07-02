import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState
} from 'react';

import {ShoppingCart} from 'components';
import {useLocalStorage} from 'hooks/useLocalStorage';

export interface CartItem {
    id: number;
    quantity: number;
}

interface ContextProps {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartItems: CartItem[];
    cartQuantity: number;
}

export const ShoppingCartContext = createContext({} as ContextProps);

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider: FC<PropsWithChildren> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        'shopping-cart',
        []
    );

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const getItemQuantity = (id: number) =>
        cartItems.find(item => item.id === id)?.quantity || 0;

    const increaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (!currItems.find(item => item.id === id)) {
                return [...currItems, {id, quantity: 1}];
            }
            return currItems.map(item =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item
            );
        });
    };

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            }
            return currItems.map(item =>
                item.id === id ? {...item, quantity: item.quantity - 1} : item
            );
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    };

    const cartQuantity = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return (
        <ShoppingCartContext.Provider
            value={{
                openCart,
                closeCart,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartQuantity,
                cartItems
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
};
