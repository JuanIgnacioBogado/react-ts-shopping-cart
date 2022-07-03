import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import {
    useShoppingCart,
    CartItem as CartItemProps
} from 'context/ShoppingCartContext';
import {formatCurrency} from 'utilities/formatCurrency';

import storeItems from 'data/items.json';

export const CartItem = ({id, quantity}: CartItemProps) => {
    const {removeFromCart} = useShoppingCart();

    const item = storeItems.find(item => item.id === id);

    return item?.name ? (
        <Stack
            direction="horizontal"
            gap={2}
            className="d-flex align-items-center flex-wrap"
        >
            <img
                src={`/react-ts-shopping-cart${item.imgUrl}`}
                height={75}
                width={125}
                style={{objectFit: 'cover'}}
            />
            <div className="me-auto">
                <div>
                    {item.name}{' '}
                    {quantity > 1 && (
                        <span
                            className="text-muted"
                            style={{fontSize: '.65rem'}}
                        >
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{fontSize: '.75rem'}}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    ) : null;
};
