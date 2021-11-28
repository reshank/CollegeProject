export const getTotalPrice = (products) => {
  const price = products?.reduce(
    (acc, current) => acc + current?.price * current?.quantity,
    0
  );

  return price;
};

export const getColorByStatus = (status) => {
  let color = "green";

  switch (status) {
    case "In stock":
      color = "green";
      break;

    case "Out of stock":
      color = "red";
      break;

    default:
      color = "";
      break;
  }

  return color;
};

export const getBackgroundColorByStatus = (status) => {
  let color = "red";

  switch (status) {
    case "Just placed":
      color = "orange";
      break;

    case "Accepted":
      color = "green";
      break;

    case "Rejected":
    case "Cancelled":
      color = "red";
      break;

    case "Shipped":
      color = "yellow";
      break;

    case "Delivered":
      color = "blue";
      break;

    default:
      color = "";
      break;
  }

  return color;
};

export const getShowStepper = (data: {
  products: number;
  categories: number;
  orders: number;
  totalRevenue: number;
  slug: string;
  location?: string;
}) => {
  if (data?.products === 0) {
    return true;
  }

  if (data?.categories === 0) {
    return true;
  }

  if (data?.location === "") {
    return true;
  }

  return false;
};

export const getStepperIndex = (data: {
  products: number;
  categories: number;
  orders: number;
  totalRevenue: number;
  slug: string;
  location?: string;
}) => {
  if (data?.categories === 0) {
    return 1;
  }

  if (data?.products === 0) {
    return 2;
  }

  if (data?.location === "") {
    return 3;
  }

  return 1;
};

export const getActiveTab = (pathname) => {
  if (pathname === "/admin/dashboard") {
    return 0;
  }

  if (pathname === "/admin/products") {
    return 1;
  }

  if (pathname === "/admin/category") {
    return 2;
  }

  if (pathname === "/admin/orders") {
    return 3;
  }

  if (pathname === "/admin/manage") {
    return 4;
  }

  return 5;
};

export const getActiveShopTab = (pathname) => {
  if (pathname === "/[shop_name]") {
    return 0;
  }

  if (pathname === "/[shop_name]/checkout") {
    return 1;
  }

  if (pathname === "/[shop_name]/search") {
    return 2;
  }

  return 0;
};

export const formatNumber = (num) => {
  let country = "NP";
  if (typeof window !== "undefined") {
    country = localStorage.getItem("country");
  }

  let currency = "NPR";
  if (country === "IN") {
    currency = "INR";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(num);
};

export const intToString = (num: number) => {
  if (num < 1000) {
    return num;
  }
  var si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].v) {
      break;
    }
  }
  return (
    (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[i].s
  );
};
