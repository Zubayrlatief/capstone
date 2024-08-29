import { getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDb } from '../model/productsDb.js'

//fetch all products
const fetchProducts = async(req,res)=>{
    res.json(await getProductsDb())
}

//fetch//get
const fetchProduct = async(req,res)=>{
    res.json(await getProductDb(req.params.id))
}

//insert//add
const insertProduct = async(req,res)=>{
    let { prodName, quantity, amount, description, Category, prodUrl } =req.body
    await insertProductDb( prodName, quantity, amount, description, Category, prodUrl )
    res.send('product was inserted successfully')
}

//delete a product
const deleteProduct = async(req,res)=>{
    await deleteProductDb(req.params.id)
    res.send('product has been deleted')
}

//update/patch a product
const updateProduct = async (req, res) => {
    try {
        let { prodName, quantity, amount, description, category, prodUrl} = req.body;
        let product = await getProductDb(req.params.id);
        prodName?prodName=prodName:prodName = product.prodName
        quantity?quantity=quantity:quantity = product.quantity
        amount?amount=amount:amount = product.amount
        description?description=description:description = product.description
        category?category=category:category = product.category
        prodUrl?prodUrl=prodUrl:prodUrl = product.prodUrl
        await updateProductDb(prodName, quantity, amount, description, category, prodUrl,  req.params.id);
        res.status(200).send('Product was updated successfully');
    } catch (error) {
        res.status(404).send('An error occurred while updating the product');
    }
};

export {fetchProducts, fetchProduct, insertProduct, deleteProduct, updateProduct}