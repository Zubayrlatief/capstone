import { getItemsDb, getItemDb, insertItemDb, deleteItemDb, updateItemDb } from '../model/itemsDb.js';

// Fetch all Items
const fetchItems = async (req, res) => {
    try {
        const items = await getItemsDb();
        res.status(200).json(items); // 200 OK - Successfully fetched items
    } catch (error) {
        res.status(500).send('An error occurred while fetching items'); // 500 Internal Server Error
    }
};

// Fetch/Get a single item
const fetchItem = async (req, res) => {
    try {
        const item = await getItemDb(req.params.id);
        if (item) {
            res.status(200).json(item); // 200 OK - Successfully fetched item
        } else {
            res.status(404).send('Item not found'); // 404 Not Found - Item with given ID doesn't exist
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching the item'); // 500 Internal Server Error
    }
};

// Insert/Add a new item
const insertItem = async (req, res) => {
    try {
        let { prodName, quantity, amount, description, category, prodUrl } = req.body;
        await insertItemDb(prodName, quantity, amount, description, category, prodUrl);
        res.status(201).send('Item was inserted successfully'); // 201 Created - Successfully added a new item
    } catch (error) {
        res.status(400).send('Bad request. Please check the input data.'); // 400 Bad Request - Input data is invalid
    }
};

// Delete an item
const deleteItem = async (req, res) => {
    try {
        const item = await getItemDb(req.params.id);
        if (item) {
            await deleteItemDb(req.params.id);
            res.status(200).send('Item has been deleted'); // 200 OK - Successfully deleted the item
        } else {
            res.status(404).send('Item not found'); // 404 Not Found - Item with given ID doesn't exist
        }
    } catch (error) {
        res.status(500).send('An error occurred while deleting the item'); // 500 Internal Server Error
    }
};

// Update/Patch an item
const updateItem = async (req, res) => {
    try {
        let { prodName, quantity, amount, description, category, prodUrl } = req.body;
        let item = await getItemDb(req.params.id);
        if (item) {
            // Assign new values if provided, otherwise keep the existing ones
            prodName = prodName || item.prodName;
            quantity = quantity || item.quantity;
            amount = amount || item.amount;
            description = description || item.description;
            category = category || item.category;
            prodUrl = prodUrl || item.prodUrl;

            await updateItemDb(prodName, quantity, amount, description, category, prodUrl, req.params.id);
            res.status(200).send('Item was updated successfully'); // 200 OK - Successfully updated the item
        } else {
            res.status(404).send('Item not found'); // 404 Not Found - Item with given ID doesn't exist
        }
    } catch (error) {
        res.status(400).send('An error occurred while updating the item'); // 400 Bad Request - Input data is invalid or other client error
    }
};

export { fetchItems, fetchItem, insertItem, deleteItem, updateItem };
