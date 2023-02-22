import { Product } from './models';

export const getProductById = (id: number) =>
  new Promise<Product>((resolve, reject) => {
    /**
     * Mocked back-end request response.
     */
    setTimeout(() => {
      const random = Math.floor(Math.random() * 4) + 1;

      if (random < 4) {
        resolve({
          id,
          name: 'Testowy Produkt',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        });
      } else {
        reject('Wystąpił błąd serwera!');
      }
    }, 1000);
  });
