import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingContext } from "../context/shopping-context";
import { formatCurrency } from "../utilities/currency-format";
import { BagItem } from "./bag-item";

export function Bag() {
  const { closeBag, isOpen, bagItems, products } = useShoppingContext();
  return (
    <Offcanvas show={isOpen} onHide={closeBag} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Bag</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {bagItems.length === 0 ? (
          <div className="text-muted">{"The bag is empty"}</div>
        ) : (
          <Stack gap={3}>
            {bagItems.map((item) => (
              <BagItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fs-5 fw-bold">
              Total price:{" "}
              {formatCurrency(
                bagItems.reduce((total, bagItem) => {
                  const item = products.find((i) => i._id === bagItem.id);
                  return total + (item?.price || 0) * bagItem.amount;
                }, 0)
              )}
            </div>
            <Button>Pay</Button>
          </Stack>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
