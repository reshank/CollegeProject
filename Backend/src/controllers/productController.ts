import * as Yup from "yup";
import slugify from "slugify";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import { IProduct } from "../interfaces/IProduct";
import { ICategory } from "../interfaces/ICategory";
import errorHandler from "../utils/errorHandler";
import sanitizeHtml from "sanitize-html";

// @desc    Create a new product
// @route   POST /product/create
// @access  Private
export const create = async (req, res) => {
  const {
    name,
    category,
    price,
    description,
    bestSelling,
    images,
    discountPrice,
    status,
    sizes,
  } = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required("Product name is a required field"),
    category: Yup.string().required("Category is a required field"),
    price: Yup.string().required("Product price is a required field"),
    description: Yup.string().required(
      "Product description is a required field"
    ),
  });

  try {
    await schema.validate(
      {
        name,
        category,
        price,
        description,
      },
      { abortEarly: false }
    );

    let categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        errors: ["Category doesnot exist!"],
      });
    }

    let slug = slugify(name, {
      lower: true,
    });

    let productExists = await Product.findOne({
      slug,
      shop: req.shop._id,
    });

    if (productExists) {
      return res.status(400).json({
        errors: ["Product with this name/slug already exists!"],
      });
    }

    await Product.create({
      name,
      price,
      category,
      description: sanitizeHtml(description),
      slug,
      shop: req.shop._id,
      bestSelling,
      images,
      discountPrice,
      status,
      sizes,
    });

    res.status(201).json("Product has been created successfully");
  } catch (err) {
    //yup error catch here
    errorHandler(res, err);
  }
};

// @desc    Update existing product
// @route   PUT /product/update
// @access  Private
export const update = async (req, res) => {
  const {
    name,
    category,
    price,
    description,
    bestSelling,
    status,
    images,
    discountPrice,
    sizes,
  } = req.body;

  const { productId } = req.params;

  const schema = Yup.object().shape({
    name: Yup.string().required("Product name is a required field"),
    category: Yup.string().required("Category is a required field"),
    price: Yup.string().required("Product price is a required field"),
    description: Yup.string().required(
      "Product description is a required field"
    ),
    status: Yup.string()
      .oneOf(["In stock", "Out of stock"], "Status value doesnot matched")
      .required("Product status is a required field"),
  });

  try {
    await schema.validate(
      {
        name,
        category,
        price,
        description,
        status,
      },
      { abortEarly: false }
    );

    //get the requested to update category.
    let product: IProduct = await Product.findOne({
      _id: productId,
      shop: req.shop._id,
    });

    if (!product) {
      return res.status(404).json({
        errors: ["Product requested doesnot exist!"],
      });
    }

    if (product.category?.toString() !== category) {
      let categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(404).json({
          errors: ["Category doesnot exist!"],
        });
      }
    }

    let slug = product.slug;
    //update the slug
    if (product.name !== name) {
      slug = slugify(name, {
        lower: true,
      });

      let productExists = await Product.findOne({
        slug,
        shop: req.shop._id,
      });

      if (productExists) {
        return res.status(400).json({
          errors: [
            "Product with this name/slug already exists!. Please try another name.",
          ],
        });
      }
    }

    let updatedData = {
      name,
      slug,
      price,
      category,
      description: sanitizeHtml(description),
      bestSelling,
      status,
      images,
      discountPrice,
      sizes,
    };

    let updatedProduct: IProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
      },
      updatedData,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      id: updatedProduct._id,
      name: updatedProduct.name,
      slug: updatedProduct.slug,
      price: updatedProduct.price,
      category: updatedProduct.category,
      description: updatedProduct.description,
      bestSelling: updatedProduct.bestSelling,
      status: updatedProduct.status,
      images: updatedProduct.images,
      discountPrice: updatedProduct.discountPrice,
      sizes: updatedProduct.sizes,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    List all the products of shop
// @route   POST /product/list
// @access  Public
export const list = async (req, res) => {
  const { category, query, skip } = req.query;

  try {
    let searchQuery: any = {
      shop: req.shop._id,
    };

    if (category && category !== "" && category !== "all") {
      let categoryExists: ICategory = await Category.findOne({
        slug: category,
      });

      searchQuery = {
        ...searchQuery,
        category: categoryExists._id,
      };
    }

    if (query && query !== "") {
      let searchExp = new RegExp(query.split(" ").join("|"), "gi");

      searchQuery = {
        ...searchQuery,
        name: { $regex: searchExp },
      };
    }

    let products: IProduct[] = await Product.find(searchQuery)
      .populate("category", ["name"])
      .limit(9)
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    let totalDocuments = await Product.countDocuments(searchQuery);

    return res.status(200).json({
      products,
      totalDocuments,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Get detail of the product by productId
// @route   POST /product/detail/:productId
// @access  Public
export const detail = async (req, res) => {
  const { productId } = req.params;

  const schema = Yup.object().shape({
    productId: Yup.string().required("Product ID is a required field"),
  });
  try {
    await schema.validate(
      {
        productId,
      },
      { abortEarly: false }
    );

    //check if the slug matches
    let product: IProduct = await Product.findOne({
      slug: productId,
      shop: req.shop._id,
    }).populate("category", ["name"]);

    //check if the id matches, if nothings, show error
    if (!product) {
      product = await Product.findOne({
        _id: productId,
        shop: req.shop._id,
      }).populate("category", ["name"]);
    }

    if (!product) {
      return res.status(404).json({
        errors: ["This product doesnot exist or has been removed"],
      });
    }

    return res.status(200).json({
      id: product._id,
      name: product.name,
      images: product.images,
      category: product.category,
      price: product.price,
      discountPrice: product.discountPrice,
      description: product.description,
      bestSelling: product.bestSelling,
      status: product.status,
      sizes: product.sizes,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Remove the product by productId
// @route   DELETE /product/delete/:productId
// @access  Private/Admin
export const remove = async (req, res) => {
  const { productId } = req.params;

  const schema = Yup.object().shape({
    productId: Yup.string().required("Product ID is a required field"),
  });
  try {
    await schema.validate(
      {
        productId,
      },
      { abortEarly: false }
    );

    let product = await Product.findOne({
      _id: productId,
      shop: req.shop._id,
    });

    if (!product) {
      return res.status(404).json({
        errors: ["This product doesnot exist or has been removed"],
      });
    }

    product.remove();

    return res.status(200).json({
      message: "Product removed successfully",
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    List all the bestSelling products of shop
// @route   POST /product/bestSelling
// @access  Public
export const bestSelling = async (req, res) => {
  try {
    let products = await Product.find({
      shop: req.shop._id,
      bestSelling: true,
    })
      .populate("category", ["name"])
      .limit(10)
      .sort({ updatedAt: -1 });

    res.status(200).json({
      products,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    List all the recently products of shop
// @route   POST /product/recent
// @access  Public
export const recent = async (req, res) => {
  try {
    let products = await Product.find({
      shop: req.shop._id,
    })
      .populate("category", ["name"])
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json({
      products,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Search for the products.
// @route   POST /shop/search
// @access  Public
export const search = async (req, res) => {
  const { category, query, minPrice, maxPrice, skip } = req.body;

  try {
    let searchQuery: any = {
      shop: req.shop._id,
    };

    if (category && category !== "" && category !== "all") {
      let categoryExists: ICategory = await Category.findOne({
        slug: category,
      });

      searchQuery = {
        ...searchQuery,
        category: categoryExists._id,
      };
    }

    if (minPrice) {
      searchQuery = {
        ...searchQuery,
        price: { $gte: minPrice },
      };
    }

    if (maxPrice) {
      searchQuery = {
        ...searchQuery,
        price: { ...searchQuery.price, $lte: maxPrice },
      };
    }

    if (query && query !== "") {
      let searchExp = new RegExp(query.split(" ").join("|"), "gi");

      searchQuery = {
        ...searchQuery,
        name: { $regex: searchExp },
      };
    }

    let products: IProduct[] = await Product.find(searchQuery)
      .populate("category", ["name"])
      .limit(8)
      .skip(skip)
      .sort({ createdAt: -1 });

    let totalDocuments = await Product.countDocuments(searchQuery);

    return res.status(200).json({
      products,
      totalDocuments,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};
