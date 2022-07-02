import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';

import {CartItem} from 'components/CartItem';
import {useShoppingCart} from 'context/ShoppingCartContext';
import {formatCurrency} from 'utilities/formatCurrency';

import storeItems from 'data/items.json';

interface Props {
    isOpen: boolean;
}

export const ShoppingCart = ({isOpen}: Props) => {
    const {closeCart, cartItems} = useShoppingCart();

    return (
        <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}

                    <div className="ms-auto fw-bold fs-5">
                        Total:{' '}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find(
                                    ({id}) => id === cartItem.id
                                );
                                return (
                                    total +
                                    (item?.price || 0) * cartItem.quantity
                                );
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
