export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export interface CartLineItem<TProduct> {
  product: TProduct;
  quantity: number;
}

export function toCartLineItems<TProduct extends { id: number }>(
  items: { productId: number; quantity: number }[],
  products: TProduct[]
): CartLineItem<TProduct>[] {
  return items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
}
