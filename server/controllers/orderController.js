const pool = require('../db')

// create a new order
const createOrder = async (req, res) => {
  const {
    order_type,
    product_id,
    product_quantity,
    unit_price,
    orderer_contact_number,
  } = req.body

  try {
    // Validate input fields
    if (
      !order_type ||
      !product_id ||
      !product_quantity ||
      !unit_price ||
      !orderer_contact_number
    ) {
      return res.status(400).send('Missing required fields')
    }

    // Insert the new order into the database
    const query = `
        INSERT INTO Orders (order_type, product_id, product_quantity, unit_price, orderer_contact_number)
        VALUES (?, ?, ?, ?, ?)
      `
    const [result] = await pool.query(query, [
      order_type,
      product_id,
      product_quantity,
      unit_price,
      orderer_contact_number,
    ])

    res.status(201).send({
      message: 'Order created successfully',
      orderId: result.insertId,
    })

    console.log('Order created successfully with ID:', result.insertId)
  } catch (err) {
    console.error('Error creating order:', err)
    res.status(500).send('An error occurred while creating the order')
  }
}

// fetch all orders

const getAllOrders = async (req, res) => {
  try {
    const query = `
        SELECT order_id, order_type, product_id, product_quantity, unit_price, total_price, 
               orderer_contact_number, timeanddate
        FROM Orders
      `
    const [rows] = await pool.query(query)

    res.status(200).send({
      message: 'Orders fetched successfully',
      orders: rows,
    })

    console.log('Orders fetched successfully:', rows)
  } catch (err) {
    console.error('Error fetching orders:', err)
    res.status(500).send('An error occurred while fetching orders')
  }
}

// get a partucula order
const getOrder = async (req, res) => {
  const { id } = req.params

  try {
    const query = `
        SELECT order_id, order_type, product_id, product_quantity, unit_price, total_price, 
               orderer_contact_number, timeanddate
        FROM Orders
        WHERE order_id = ?
      `
    const [rows] = await pool.query(query, [id])

    if (rows.length === 0) {
      return res.status(404).send('Order not found')
    }

    res.status(200).send({
      message: 'Order fetched successfully',
      order: rows[0],
    })

    console.log('Order fetched successfully:', rows[0])
  } catch (err) {
    console.error('Error fetching order:', err)
    res.status(500).send('An error occurred while fetching the order')
  }
}

// remove order
const removeOrder = async (req, res) => {
  const { id } = req.params

  try {
    const query = 'DELETE FROM Orders WHERE order_id = ?'
    const [result] = await pool.query(query, [id])

    if (result.affectedRows === 0) {
      return res.status(404).send('Order not found')
    }

    res.status(200).send({
      message: 'Order removed successfully',
      orderId: id,
    })

    console.log('Order removed successfully with ID:', id)
  } catch (err) {
    console.error('Error removing order:', err)
    res.status(500).send('An error occurred while removing the order')
  }
}

module.exports = { getAllOrders, createOrder, getOrder, removeOrder }
