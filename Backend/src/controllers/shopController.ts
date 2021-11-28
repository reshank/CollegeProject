import * as Yup from "yup";

//models imports
import Shop from "../models/shopModel";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import Order from "../models/orderModel";
import { IOrder } from "../interfaces/IOrder";
import { IShop } from "../interfaces/IShop";
import add from "date-fns/add";
import { getDaysLeftToExpire, getNextExpiryDate } from "../utils/helpers";
import errorHandler from "../utils/errorHandler";
import Config from "../models/configModel";
import axios from "axios";
import { sendSuccess } from "../utils/responseHandler";

// @desc    Register a new shop
// @route   POST /shop/register
// @access  Public
export const register = async (req, res) => {
  const { name, slug, description } = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required("Shop name is a required field"),
    slug: Yup.string().required("Shop slug is a required field"),
  });

  try {
    await schema.validate(
      {
        name,
        slug,
      },
      { abortEarly: false }
    );

    let shopExists = await Shop.findOne({
      slug,
    });

    if (shopExists) {
      return res.status(400).json({
        errors: ["Url already exists. please change it to unique"],
      });
    }

    let shop: IShop = await Shop.create({
      name,
      slug,
      description,
      owner: req.user._id,
      plan: "trail",
      expiresAt: add(new Date(), {
        days: 15,
      }),
      location: "",
      image: {
        url: "",
      },
      socialData: {
        facebook: "",
        instagram: "",
        whatsapp: "",
        mobile: "",
      },
      otherData: {
        supportEmail: "support@qselly.com",
        delivery: "3-5 days",
      },
      shopView: 0,
    });

    await Config.create({
      key: "deliveryCharge",
      shop: shop._id,
      value: {
        amount: 100,
        freeAbove: 500,
        show: false,
      },
    });
    return sendSuccess({
      res,
      statusCode: 201,
      data: {
        id: shop._id,
      },
      message: "Your shop has been created successfully",
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Get the shop data and subscription
// @route   POST /shop/isAdmin
// @access  Private
export const adminData = async (req, res) => {
  try {
    let daysToExpire = getDaysLeftToExpire(req.shop.expiresAt);

    return res.status(200).json({
      isAllowed: true,
      daysToExpire: daysToExpire,
      plan: req.shop.plan,
      name: req.shop.name,
      country: req.shop.country,
      opened: req.shop.opened,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Get the shop data and subscription
// @route   POST /shop/detail
// @access  Private
export const detail = async (req, res) => {
  try {
    return res.status(200).json({
      name: req.shop.name,
      slug: req.shop.slug,
      image: req.shop.image,
      description: req.shop.description,
      location: req.shop.location,
      socialData: req.shop.socialData,
      otherData: req.shop.otherData,
      facebook: req.shop?.socialData?.facebook || "",
      instagram: req.shop?.socialData?.instagram || "",
      whatsapp: req.shop?.socialData?.whatsapp || "",
      mobile: req.shop?.socialData?.mobile || "",
      delivery: req.shop?.otherData?.delivery || "",
      supportEmail: req.shop?.otherData?.supportEmail || "",
      country: req.shop?.country || "NP",
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Get all the shop data for the admin panel.
// @route   POST /shop/getDashboardData
// @access  Private
export const getDashboardData = async (req, res) => {
  try {
    let products = await Product.countDocuments({
      shop: req.shop._id,
    });

    let categories = await Category.countDocuments({
      shop: req.shop._id,
    });

    let date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);

    let orders: IOrder[] = await Order.find({
      shop: req.shop._id,
      createdAt: { $gte: date, $lt: new Date() },
    });

    let totalRevenue = orders?.reduce(
      (acc: number, current: IOrder) => acc + current.grandTotal,
      0
    );

    let graphData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    orders.map((order) => {
      graphData[order?.createdAt?.getMonth()] =
        graphData[order?.createdAt?.getMonth()] + 1;
    });

    return res.status(200).json({
      products,
      categories,
      orders: orders?.length,
      location: req.shop.location,
      totalRevenue,
      slug: req.shop.slug,
      graphData,
      shopView: req.shop.shopView,
    });
  } catch (err) {
    return res.status(500).json({
      errors: ["Internal Server Error"],
    });
  }
};

// @desc    Get all the shop data for the admin panel.
// @route   POST /shop/renew
// @access  Private
export const renewPlan = async (req, res) => {
  const { plan } = req.body;

  const schema = Yup.object().shape({
    plan: Yup.string()
      .oneOf(["monthly", "yearly"], "Plan value doesnot matched")
      .required("Product plan is a required field"),
  });

  try {
    await schema.validate(
      {
        plan,
      },
      { abortEarly: false }
    );

    let daysToExpire = getDaysLeftToExpire(req.shop.expiresAt);

    const expiryDate: Date = getNextExpiryDate(
      plan,
      req?.shop?.plan,
      daysToExpire
    );

    let updatedData = {
      expiresAt: expiryDate,
      plan,
    };

    let shop: IShop = await Shop.findOneAndUpdate(
      {
        _id: req.shop._id,
      },
      updatedData,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    return res.status(200).json({
      shop,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Update shop detail
// @route   PATCH /shop/update
// @access  Private
export const update = async (req, res) => {
  const {
    name,
    description,
    location,
    image,
    slug,
    facebook,
    instagram,
    supportEmail,
    delivery,
    whatsapp,
    mobile,
    opened,
  } = req.body;

  try {
    let updatedData: IShop = req.shop;

    if (name) {
      if (name === "") {
        return res.status(400).json({
          errors: ["Shop name is a required field"],
        });
      }

      updatedData.name = name;
    }

    if (location) {
      if (location === "") {
        return res.status(400).json({
          errors: ["Shop location is a required field"],
        });
      }

      updatedData.location = location;
    }

    if (description) {
      updatedData.description = description;
    }

    if (image) {
      updatedData.image = image;
    }

    if (facebook) {
      updatedData.socialData.facebook = facebook;
    }

    if (instagram) {
      updatedData.socialData.instagram = instagram;
    }

    if (supportEmail) {
      updatedData.otherData.supportEmail = supportEmail;
    }

    if (delivery) {
      updatedData.otherData.delivery = delivery;
    }

    if (whatsapp) {
      updatedData.socialData.whatsapp = whatsapp;
    }

    if (mobile) {
      updatedData.socialData.mobile = mobile;
    }

    if (typeof opened === "boolean") {
      updatedData.opened = opened;
    }

    //only validate slug if the slug is different from the previous slug.
    if (slug && slug !== req.shop.slug) {
      let shopExists: IShop = await Shop.findOne({
        slug,
      });

      if (shopExists) {
        return res.status(400).json({
          errors: ["Shop with this url already exists!. Please try another."],
        });
      }

      updatedData.slug = slug;
    }

    await Shop.findOneAndUpdate(
      {
        _id: req.shop._id,
      },
      updatedData,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json("shop detail has been updated successfully");
  } catch (err) {
    errorHandler(res, err);
  }
};
