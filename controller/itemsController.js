import { getItemsDb, getItemDb, insertItemDb, deleteItemDb, updateItemDb } from '../model/itemsDb.js'

//fetch all Items
const fetchItems = async(req,res)=>{
    res.json(await getItemsDb())
}

//fetch//get
const fetchItem = async(req,res)=>{
    res.json(await getItemDb(req.params.id))
}

//insert//add
const insertItem = async(req,res)=>{
    let { prodName, quantity, amount, description, Category, prodUrl } =req.body
    await insertItemDb( prodName, quantity, amount, description, Category, prodUrl )
    res.send('item was inserted successfully')
}

//delete a item
const deleteItem = async(req,res)=>{
    await deleteItemDb(req.params.id)
    res.send('item has been deleted')
}

//update/patch a item
const updateItem = async (req, res) => {
    try {
        let { prodName, quantity, amount, description, category, prodUrl} = req.body;
        let item = await getItemDb(req.params.id);
        prodName?prodName=prodName:prodName = item.prodName
        quantity?quantity=quantity:quantity = item.quantity
        amount?amount=amount:amount = item.amount
        description?description=description:description = item.description
        category?category=category:category = item.category
        prodUrl?prodUrl=prodUrl:prodUrl = item.prodUrl
        await updateItemDb(prodName, quantity, amount, description, category, prodUrl,  req.params.id);
        res.status(200).send('item was updated successfully');
    } catch (error) {
        res.status(404).send('An error occurred while updating the item');
    }
};

export {fetchItems, fetchItem, insertItem, deleteItem, updateItem}