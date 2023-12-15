type Address = { address: string; city: string };
type PresentDeliveryList<T> = {
	[k in keyof T]: Address;
};
