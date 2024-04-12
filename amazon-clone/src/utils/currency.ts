export const currencyConverter = (price: number) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return rupiah.format(price);
};
