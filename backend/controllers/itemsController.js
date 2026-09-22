import itemsModel from "../modals/itemsModal.js";

// 1. Create Item(s) — handles single object OR array of objects
export const createItems = async (req, res, next) => {
  try {
    const isBulk = Array.isArray(req.body);

    if (isBulk) {
      // Bulk insert — used for seeding multiple items at once
      const itemsToInsert = req.body.map((item) => ({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image || item.imageUrl,
      }));

      const saved = await itemsModel.insertMany(itemsToInsert);
      return res.status(201).json(saved);
    }

    // Single item —
    const { name, description, price, category, image, imageUrl } = req.body;

    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : image || imageUrl;

    const newItem = new itemsModel({
      name,
      description,
      price,
      category,
      image: imagePath,
    });

    const saved = await newItem.save();
    return res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Item already exists" });
    }
    return res.status(400).json({ message: err.message });
  }
};

// 2. Get All Items
export const getItems = async (req, res, next) => {
  try {
    const items = await itemsModel.find().sort({ createdAt: -1 });
    const host = `${req.protocol}://${req.get("host")}`;

    const withFullUrl = items.map((item) => {
      const itemObj = item.toObject();
      const image = itemObj.image;
      const isAbsolute = /^https?:\/\//i.test(image || "");

      return {
        ...itemObj,
        imageUrl: image ? (isAbsolute ? image : `${host}${image}`) : "",
      };
    });

    return res.status(200).json(withFullUrl);
  } catch (err) {
    next(err);
  }
};

// 3. Delete Item
export const deleteItems = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await itemsModel.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    next(err);
  }
};
