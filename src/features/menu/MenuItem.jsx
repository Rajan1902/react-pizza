
import Button from "../../UI/Button";
import { formatCurrency } from "../../utilities/helpers";

function MenuItem( {pizza} ) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-75 grayscale": ""}`}/>
      <div className="flex flex-col grow pt-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="uppercase text-sm text-stone-500 font-medium">Sold out</p>}
          <Button type = 'small'>add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
