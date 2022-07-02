import {FC} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {formatCurrency} from 'utilities/formatCurrency';
import {useShoppingCart} from 'context/ShoppingCartContext';

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

export const StoreItem: FC<StoreItemProps> = ({id, imgUrl, name, price}) => {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useShoppingCart();

    return (
        <Col>
            <Card className="h-100">
                <Card.Img
                    src={imgUrl}
                    variant="top"
                    height="200px"
                    style={{objectFit: 'cover'}}
                />

                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex flex-wrap justify-content-between align-items-baseline">
                        <span className="fs-2">{name}</span>
                        <span className="text-muted">
                            {formatCurrency(price)}
                        </span>
                    </Card.Title>

                    <div className="mt-auto">
                        {!getItemQuantity(id) ? (
                            <Button
                                className="w-100"
                                onClick={() => increaseCartQuantity(id)}
                            >
                                + Add to Cart
                            </Button>
                        ) : (
                            <div className="d-flex align-items-center flex-column">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <Button
                                        onClick={() => decreaseCartQuantity(id)}
                                    >
                                        -
                                    </Button>
                                    <div>
                                        <span className="fs-3">
                                            {getItemQuantity(id)}
                                        </span>{' '}
                                        in cart
                                    </div>
                                    <Button
                                        onClick={() => increaseCartQuantity(id)}
                                    >
                                        +
                                    </Button>
                                </div>
                                <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};
