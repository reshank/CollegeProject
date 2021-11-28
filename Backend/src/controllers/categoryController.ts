import * as Yup from "yup";
import slugify from "slugify";
import Category from "../models/categoryModel";
import { ICategory } from "../interfaces/ICategory";
import errorHandler from "../utils/errorHandler";

// @desc    Create a new category
// @route   POST /category/create
// @access  Private
export const create = async (req, res) => {
  const { name, image, bestSeller } = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required("Category name is a required field"),
  });

  try {
    await schema.validate(
      {
        name,
      },
      { abortEarly: false }
    );

    let slug = slugify(name, {
      lower: true,
    });

    let categoryExists = await Category.findOne({
      slug,
      shop: req.shop._id,
    });

    if (categoryExists) {
      return res.status(400).json({
        errors: ["Category with this name/slug already exists!"],
      });
    }

    await Category.create({
      name,
      slug,
      image,
      shop: req.shop._id,
      bestSeller,
    });

    res.status(201).json("Category has been created successfully");
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Update existing category
// @route   PUT /category/update/:categoryId
// @access  Private
export const update = async (req, res) => {
  const { name, image, bestSelling } = req.body;
  const { categoryId } = req.params;

  const schema = Yup.object().shape({
    name: Yup.string().required("Category name is a required field"),
    categoryId: Yup.string().required("Category ID is a required field"),
  });

  try {
    await schema.validate(
      {
        name,
        categoryId,
      },
      { abortEarly: false }
    );

    //get the requested to update category.
    let category: ICategory = await Category.findOne({
      _id: categoryId,
      shop: req.shop._id,
    });

    if (!category) {
      return res.status(404).json({
        errors: ["Category doesnot exist!"],
      });
    }

    let slug = category.slug;

    if (category.name !== name) {
      slug = slugify(name, {
        lower: true,
      });

      let categoryExists = await Category.findOne({
        slug,
        shop: req.shop._id,
      });

      if (categoryExists) {
        return res.status(400).json({
          errors: [
            "Category with this name/slug already exists!. Please try another name.",
          ],
        });
      }
    }

    let updatedData = {
      name,
      image,
      slug,
      bestSelling,
    };

    let updatedCategory: ICategory = await Category.findOneAndUpdate(
      {
        _id: categoryId,
      },
      updatedData,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      id: updatedCategory._id,
      name: updatedCategory.name,
      slug: updatedCategory.slug,
      image: updatedCategory.image,
      bestSelling: updatedCategory.bestSelling,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    List all the category of shop
// @route   POST /category/list
// @access  Public
export const list = async (req, res) => {
  const { query, skip } = req.query;

  try {
    let searchQuery: any = {
      shop: req.shop._id,
    };

    if (query && query !== "") {
      let searchExp = new RegExp(query.split(" ").join("|"), "gi");

      searchQuery = {
        ...searchQuery,
        name: { $regex: searchExp },
      };
    }

    let categories: ICategory[] = await Category.find(searchQuery)
      .limit(9)
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    let totalDocuments = await Category.countDocuments(searchQuery);

    return res.status(200).json({
      categories,
      totalDocuments,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};
// @desc    Get detail of the category by slug
// @route   POST /category/detail/:categoryId
// @access  Public
export const detail = async (req, res) => {
  const { categoryId } = req.params;

  const schema = Yup.object().shape({
    categoryId: Yup.string().required("Category ID is a required field"),
  });
  try {
    await schema.validate(
      {
        categoryId,
      },
      { abortEarly: false }
    );

    let category: ICategory = await Category.findOne({
      _id: categoryId,
      shop: req.shop._id,
    });

    if (!category) {
      return res.status(404).json({
        errors: ["This category doesnot exist or has been removed"],
      });
    }

    return res.status(200).json({
      id: category._id,
      name: category.name,
      image: category.image,
      bestSelling: category.bestSelling,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    Remove the category by category id
// @route   DELETE /category/delete/:categoryId
// @access  Private/Admin
export const remove = async (req, res) => {
  const { categoryId } = req.params;

  const schema = Yup.object().shape({
    categoryId: Yup.string().required("Category ID is a required field"),
  });
  try {
    await schema.validate(
      {
        categoryId,
      },
      { abortEarly: false }
    );

    let category = await Category.findOne({
      _id: categoryId,
      shop: req.shop._id,
    });

    if (!category) {
      return res.status(404).json({
        errors: ["This category doesnot exist or has been removed"],
      });
    }

    category.remove();

    return res.status(200).json({
      message: "Category removed successfully",
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

// @desc    List all the bestSeller categories of shop
// @route   POST /category/bestSeller
// @access  Public
export const bestSelling = async (req, res) => {
  try {
    let categories: ICategory[] = await Category.find({
      shop: req.shop._id,
      bestSelling: true,
    })
      .limit(10)
      .sort({ updatedAt: -1 });

    res.status(200).json({
      categories,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};
