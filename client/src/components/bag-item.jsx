import { Button, Stack } from "react-bootstrap";
import { useShoppingContext } from "../context/shopping-context";
import { formatCurrency } from "../utilities/currency-format";

export function BagItem({ id, amount }) {
  const { removeFromBag, products } = useShoppingContext();
  const bagItem = products.find((item) => item._id === id);
  if (!bagItem) return null;
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={`http://localhost:5000${bagItem.imageUrl}`}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {bagItem.name}
          {amount > 1 && (
            <span style={{ fontSize: ".9rem" }} className="text-muted">
              {` x${amount}`}
            </span>
          )}
        </div>
        <div style={{ fontSize: ".9rem" }} className="text-muted">
          {formatCurrency(bagItem.price)}
        </div>
      </div>
      <div>{formatCurrency(bagItem.price * amount)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromBag(bagItem._id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
