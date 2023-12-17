export type Address = { address: string; city: string };
export type PresentDeliveryList<T> = {
  [k in keyof T]: Address;
};
