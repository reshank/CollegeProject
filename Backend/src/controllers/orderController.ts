import * as Yup from "yup";
import Product from "../models/productModel";
import Otp from "../models/otpModel";
import Order from "../models/orderModel";
import {
  generateOrderId,
  getTotalExtraCharge,
  getTotalPrice,
} from "../utils/helpers";
import { IOrder } from "../interfaces/IOrder";
import { IProduct, ISize } from "../interfaces/IProduct";
import errorHandler from "../utils/errorHandler";
import Config from "../models/configModel";

// @desc    Create a new order
// @route   POST /order/create
// @access  Public
export const create = async (req, res) => {
  const {
    name,
    mobile,
    otp,
    city,
    state,
    fullAddress,
    orderDetails,
    paymentMethod,
  } = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required("Full name is a required field"),
    mobile: Yup.string()
      .min(11, "Mobile number must be valid")
      .max(13, "Mobile number must be valid")
      .required("Mobile is a required field"),
    otp: Yup.string()
      .min(6, "OTP must be valid")
      .required("OTP is a required field"),
    state: Yup.string().required("State is a required field"),
    city: Yup.string().required("City is a required field"),
    fullAddress: Yup.string().required("Full Address is a required field"),
    orderDetails: Yup.array().required("OrderDetails is a required field"),
    paymentMethod: Yup.string().required("PaymentMethod is a required field"),
  });

  try {
    await schema.validate(
      {
        name,
        mobile,
        otp,
        state,
        city,
        fullAddress,
        orderDetails,
        paymentMethod,
      },
      { abortEarly: false }
    );

    let otpVerfied = await Otp.findOne({ mobile, otp });

    if (!otpVerfied) {
      return res.status(400).json({
        errors: ["Invalid Otp."],
      });
    }

    let isInValid: boolean;

    (global as any).isInValid = false;
    await orderDetails.map(async (orderDetail) => {
      let product: IProduct = await Product.findOne({
        _id: orderDetail.product,
        shop: req.shop._id,
      });

      if (!product) {
        isInValid = true;
        return null;
      }

      if (product.status !== "In stock") {
        isInValid = true;
        return null;
      }

      //I have to get the price at order placement rather, for discount products and all stuff.
      orderDetail.price =
        product?.discountPrice > 0 ? product.discountPrice : product.price;

      if (orderDetail?.size !== "") {
        let data: ISize = product?.sizes.find(
          (data) => data.id === orderDetail.sizeId
        );

        orderDetail.price =
          data?.discountPrice > 0 ? data.discountPrice : data.price;
      }
    });

    if (isInValid) {
      return res.status(404).json({
        errors: ["Product might have been removed or stock is finished."],
      });
    }

    const itemTotal: number = getTotalPrice(orderDetails);

    //get the delivery charge data
    let delivery = await Config.findOne({
      key: "deliveryCharge",
      shop: req.shop._id,
    });

    let deliveryCharge: number = 0;
    let deliveryValue = delivery?.value;

    //if deliveryCharge is not shown.
    if (deliveryValue?.show === false) {
      deliveryValue = null;
    }

    if (deliveryValue) {
      //free above verification
      if (
        itemTotal >= deliveryValue?.freeAbove &&
        deliveryValue?.freeAbove != 0
      ) {
        //free delivery above the data
        deliveryCharge = 0;
      }

      deliveryCharge = Number(deliveryValue?.amount);
    }

    let extraCharges: any[] = await Config.find({
      key: "extraCharge",
      shop: req.shop._id,
    });

    extraCharges = extraCharges?.map((charge) => {
      if (charge?.value?.show === true) {
        return charge.value;
      }
    });

    let totalExtraCharge: number = getTotalExtraCharge({
      extraCharges,
      itemTotal,
    });

    const grandTotal =
      Number(itemTotal) + Number(deliveryCharge) + Number(totalExtraCharge);

    //Verify all the products
    let order = new Order({
      name,
      mobile,
      city,
      state,
      fullAddress,
      paymentMethod,
      orderDetails,
      shop: req.shop._id,
      orderId: `${generateOrderId(6)}`,
      itemTotal,
      deliveryCharge,
      grandTotal,
      extraCharges,
      message: "",
    });

    await order.save();

    return res.status(200).json("Order has been created successfully");
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    List all the orders of shop
// @route   POST /order/list
// @access  Private
export const list = async (req, res) => {
  const { query, skip, status } = req.query;

  try {
    let searchQuery: any = {
      shop: req.shop._id,
    };

    if (status !== "All" && status !== "") {
      searchQuery = {
        ...searchQuery,
        status,
      };
    }

    if (query && query !== "") {
      let searchExp = new RegExp(query.split(" ").join("|"), "gi");

      searchQuery = {
        ...searchQuery,
        $or: [
          {
            orderId: { $regex: searchExp },
          },
          {
            name: { $regex: searchExp },
          },
        ],
      };
    }

    let orders: IOrder[] = await Order.find(searchQuery)
      .limit(6)
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    let totalDocuments = await Order.countDocuments(searchQuery);

    return res.status(200).json({
      orders,
      totalDocuments,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Get detail of the order by admin by orderId
// @route   POST /order/detail/:orderId
// @access  Public
export const detail = async (req, res) => {
  const { orderId } = req.params;

  const schema = Yup.object().shape({
    orderId: Yup.string().required("Order ID is a required field"),
  });
  try {
    await schema.validate(
      {
        orderId,
      },
      { abortEarly: false }
    );

    let order: IOrder = await Order.findOne({
      _id: orderId,
      shop: req.shop._id,
    }).populate("orderDetails.product", ["name", "image"]);

    if (!order) {
      return res.status(400).json({
        errors: ["This order with this id doesnot exist."],
      });
    }

    res.status(200).json({
      id: order._id,
      name: order.name,
      mobile: order.mobile,
      city: order.city,
      state: order.state,
      fullAddress: order.fullAddress,
      paymentMethod: order.paymentMethod,
      orderDetails: order.orderDetails,
      orderId: order.orderId,
      status: order.status,
      createdAt: order.createdAt,
      deliveryCharge: order.deliveryCharge,
      itemTotal: order.itemTotal,
      grandTotal: order.grandTotal,
      extraCharges: order.extraCharges,
      message: order.message,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Track the order status
// @route   POST /order/track
// @access  Public
export const track = async (req, res) => {
  const { orderId } = req.params;

  const schema = Yup.object().shape({
    orderId: Yup.string()
      .required("Order ID is a required field")
      .length(
        6,
        "Please enter a valid order ID, It should be 6 characters long"
      ),
  });
  try {
    await schema.validate(
      {
        orderId,
      },
      { abortEarly: false }
    );

    let order: IOrder = await Order.findOne({
      orderId: orderId,
      shop: req.shop._id,
    }).populate("orderDetails.product", ["name", "image"]);

    if (!order) {
      return res.status(400).json({
        errors: ["This order with this id doesnot exist."],
      });
    }

    res.status(200).json({
      id: order._id,
      paymentMethod: order.paymentMethod,
      orderDetails: order.orderDetails,
      orderId: order.orderId,
      status: order.status,
      createdAt: order.createdAt,
      deliveryCharge: order.deliveryCharge,
      itemTotal: order.itemTotal,
      grandTotal: order.grandTotal,
      extraCharges: order.extraCharges,
      message: order.message,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Update the order by order id
// @route   PATCH /order/update/:orderId
// @access  Private
export const update = async (req, res) => {
  const { orderId } = req.params;
  const { status, message } = req.body;

  const schema = Yup.object().shape({
    orderId: Yup.string().required("Order ID is a required field"),
    status: Yup.string().required("Order status is a required field"),
  });
  try {
    await schema.validate(
      {
        orderId,
        status,
      },
      { abortEarly: false }
    );

    let order: IOrder = await Order.findOne({
      _id: orderId,
      shop: req.shop._id,
    });

    if (!order) {
      return res.status(400).json({
        errors: ["This order with this id doesnot exist."],
      });
    }

    if (order.shop.toString() !== req.shop._id.toString()) {
      return res.status(403).json({
        errors: ["You are not allowed to update this order."],
      });
    }

    let updatedData: any = {};

    if (status && status !== "") {
      updatedData.status = status;
    }

    if (message) {
      updatedData.message = message;
    }

    await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      updatedData,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      status: "Order updated successfully",
    });
  } catch (err) {
    errorHandler(res, err);
  }
};
