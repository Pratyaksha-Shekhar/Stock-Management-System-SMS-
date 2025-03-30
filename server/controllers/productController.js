const pool = require('../db')

const registerProduct = async (req, res) => {
  const { sku, product_name, quantity, unit_price, supplier_id } = req.body

  try {
    // Validate input fields
    if (!sku || !product_name || quantity == null || unit_price == null) {
      return res
        .status(400)
        .send(
          'Missing required fields: sku, product_name, quantity, or unit_price'
        )
    }

    // Insert product into the database
    const query = `INSERT INTO Products (sku, product_name, quantity, unit_price, supplier_id)
                   VALUES (?, ?, ?, ?, ?)`
    const [result] = await pool.query(query, [
      sku,
      product_name,
      quantity,
      unit_price,
      supplier_id,
    ])

    // Respond with success
    res.status(201).send({
      message: 'Product registered successfully',
      productId: result.insertId,
    })

    console.log('Product registered successfully:', result.insertId)
  } catch (err) {
    console.error('Error registering product:', err)
    res.status(500).send('An error occurred while registering the product')
  }
}

// show all product
const showAllProducts = async (req, res) => {
  try {
    // Query to fetch all products
    const query =
      'SELECT product_id, sku, product_name, quantity, unit_price, supplier_id FROM Products'
    const [rows] = await pool.query(query)

    // Respond with the list of products
    res.status(200).send({
      message: 'Products fetched successfully',
      products: rows,
    })

    console.log('Products fetched successfully:', rows)
  } catch (err) {
    console.error('Error fetching products:', err)
    res.status(500).send('An error occurred while fetching products')
  }
}

// search a product by product name

const showProductByName = async (req, res) => {
  const { name } = req.params // Extract product_name from route parameters

  try {
    // Query to fetch a product by product_name
    const query = `
        SELECT product_id, sku, product_name, quantity, unit_price, supplier_id 
        FROM Products 
        WHERE product_name = ?
      `
    const [rows] = await pool.query(query, [name])

    // Check if the product exists
    if (rows.length === 0) {
      return res.status(404).send('Product not found')
    }

    // Respond with the product details
    res.status(200).send({
      message: 'Product fetched successfully',
      product: rows[0],
    })

    console.log('Product fetched successfully:', rows[0])
  } catch (err) {
    console.error('Error fetching product:', err)
    res.status(500).send('An error occurred while fetching the product')
  }
}

// ramove a product

const removeProduct = async (req, res) => {
  const { id } = req.params // Extract product_id from route parameters

  try {
    // Query to delete a product by product_id
    const query = 'DELETE FROM Products WHERE product_id = ?'
    const [result] = await pool.query(query, [id])

    // Check if the product was deleted
    if (result.affectedRows === 0) {
      return res.status(404).send('Product not found')
    }

    // Respond with success
    res.status(200).send({
      message: 'Product removed successfully',
      productId: id,
    })

    console.log('Product removed successfully:', id)
  } catch (err) {
    console.error('Error removing product:', err)
    res.status(500).send('An error occurred while removing the product')
  }
}

module.exports = {
  registerProduct,
  showAllProducts,
  showProductByName,
  removeProduct,
}
