import Row from 'react-bootstrap/Row';

import {StoreItem} from 'components';

import storeItems from 'data/items.json';

export const Store = () => {
    return (
        <>
            <h1>Store</h1>
            <Row xs={1} md={2} lg={3} className="gap-3">
                {storeItems.map(item => (
                    <StoreItem
                        {...{
                            key: item.id,
                            ...item
                        }}
                    />
                ))}
            </Row>
        </>
    );
};
