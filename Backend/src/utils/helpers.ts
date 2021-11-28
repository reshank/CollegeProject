import { add } from "date-fns";
import differenceInCalendarDays from "date-fns/fp/differenceInCalendarDays";
import { IExtraCharge, IOrderDetails } from "../interfaces/IOrder";

export const generateOrderId = (number) => {
  const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let res = "";
  for (let i = 0; i < number; i++) {
    let rnd = Math.floor(Math.random() * list.length);
    res = res + list.charAt(rnd);
  }
  return res;
};

export const getTotalPrice = (products: IOrderDetails[]) => {
  const price: number = products?.reduce(
    (acc: number, current: IOrderDetails) =>
      acc + current?.price * current?.quantity,
    0
  );

  return price;
};

export const getNextExpiryDate = (
  plan: string,
  earlierPlan: string,
  daysToExpire: number
) => {
  //TODO : add previous expires date.
  let nextExpiryDate = new Date();

  switch (plan) {
    case "monthly":
      if (earlierPlan === "trail") {
        nextExpiryDate = add(new Date(), {
          days: 30,
        });
      }

      nextExpiryDate = add(new Date(), {
        days: 30 + daysToExpire,
      });
      break;

    default:
      break;
  }

  return nextExpiryDate;
};

export const getDaysLeftToExpire = (date: Date): number => {
  let data = differenceInCalendarDays(new Date(), date);

  return data;
};

export const getTotalExtraCharge = ({
  extraCharges,
  itemTotal,
}: {
  extraCharges: IExtraCharge[];
  itemTotal: number;
}) => {
  let total = 0;

  extraCharges.map((charge) => {
    if (charge.type === "percent") {
      total += Number((charge.percent / 100) * itemTotal);
    }
    total += Number(charge.amount);
  });

  return total;
};
