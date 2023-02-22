import Async from './Async';
import { getProductById } from './getProductById';

export default function App() {
  return (
    <Async action={() => getProductById(1)}>
      {(product) => (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
      )}
    </Async>
  );
}
