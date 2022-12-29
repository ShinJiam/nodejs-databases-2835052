const ItemModel = require("../models/mongoose/Item")

class ItemService {
    static async getAll() {
        return ItemModel.find({}).sort({ CreatedAt: -1 }).exec();
    }

    static async getOne(Itemid) {
        return ItemModel.findById(Itemid).exec();
    }

    static async create(data) {
        const item = new ItemModel(data);
        return item.save();
    }

    static async update(Itemid, data) {
        return ItemModel.findByIdAndUpdate(Itemid, data).exec();
    }

    static async remove(Itemid) {
        return ItemModel.deleteOne({ _id: Itemid }).exec();
    }
}

module.exports = ItemService;