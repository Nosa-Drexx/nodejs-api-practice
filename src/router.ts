import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  getOneProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/products";
import {
  getUpdates,
  getOneUpdate,
  updateUpdate,
  createUpdate,
  deleteUpdate,
} from "./handlers/update";

const router = Router();

/* PRODUCTS*/
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  [body("name").isString(), handleInputErrors],
  updateProduct
);
router.post(
  "/product",
  [body("name").isString(), handleInputErrors],
  createProduct
);
router.delete("/product/:id", deleteProduct);

/* UPDATES*/
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  [
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    handleInputErrors,
  ],
  updateUpdate
);
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    handleInputErrors,
  ],
  createUpdate
);
router.delete(
  "/update/:id",
  [body("productId").isString(), handleInputErrors],
  deleteUpdate
);

/* UPDATEPOINT */
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.put(
  "/updatepoint/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
    handleInputErrors,
  ],
  (req, res) => {}
);
router.post(
  "/updatepoint",
  [
    body("updateId").exists().isString(),
    body("name").isString(),
    body("description").isString(),
    handleInputErrors,
  ],
  (req, res) => {}
);
router.delete(
  "/updatepoint/:id",
  [body("updateId").isString(), body("name").isString(), handleInputErrors],
  (req, res) => {}
);

export default router;
