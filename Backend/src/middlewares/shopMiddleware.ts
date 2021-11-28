import { IShop } from "../interfaces/IShop";
import Shop from "../models/shopModel";
import { getDaysLeftToExpire } from "../utils/helpers";

export const shopRegister = async (req, res, next) => {
  let shop: IShop = await Shop.findOne({
    owner: req.user._id,
  });

  if (shop) {
    return res.status(400).json({
      errors: ["Shop is already registered for this owner!"],
    });
  }

  return next();
};

export const getShop = async (req, res, next) => {
  let shop: IShop = await Shop.findOne({
    slug: req.body.shop_name,
  });

  if (!shop) {
    return res.status(400).json({
      errors: ["Shop is not listed!"],
    });
  }

  req.shop = shop;

  return next();
};

export const isAdmin = async (req, res, next) => {
  let shop: IShop = await Shop.findOne({
    owner: req.user._id,
  });

  if (!shop) {
    return res.status(400).json({
      errors: ["Shop is not registered for this owner!"],
    });
  }

  //only work if the plan value is not available.
  if (req.body.plan && req.body.plan !== "") {
    req.shop = shop;

    return next();
  }

  let daysToExpire = getDaysLeftToExpire(shop.expiresAt);

  if (daysToExpire < 0) {
    return res.status(200).json({
      message: ["Subscription has been expired!"],
      isAllowed: true,
      daysToExpire: daysToExpire,
      plan: shop.plan,
    });
  }

  req.shop = shop;

  return next();
};

export const available = async (req, res) => {
  const { shop_name } = req.params;

  let shop: IShop = await Shop.findOne({
    slug: shop_name,
  });

  if (!shop) {
    return res.status(404).json({
      errors: ["Shop is not listed!"],
    });
  }

  res.status(200).json({
    available: true,
    shop: {
      name: shop.name,
      description: shop.description,
      slug: shop.slug,
      image: shop.image || null,
      location: shop.location || null,
      socialData: shop.socialData,
      otherData: shop.otherData,
      opened: shop.opened,
    },
  });

  await Shop.findOneAndUpdate(
    {
      _id: shop._id,
    },
    {
      shopView: shop.shopView + 1,
    },
    {
      useFindAndModify: false,
    }
  );
};
