const pool = require('../db')

const addSupplier = async (req, res) => {
  const { name, contact_details } = req.body

  try {
    // Validate input fields
    if (!name || !contact_details) {
      return res
        .status(400)
        .send('Missing required fields: name and contact_details')
    }

    // Insert supplier into the database
    const query = `INSERT INTO Suppliers (name, contact_details) VALUES (?, ?)`
    const [result] = await pool.query(query, [name, contact_details])

    res.status(201).send({
      message: 'Supplier added successfully',
      supplierId: result.insertId,
    })

    console.log('Supplier added successfully with ID:', result.insertId)
  } catch (err) {
    console.error('Error adding supplier:', err)
    res.status(500).send('An error occurred while adding the supplier')
  }
}

// fetch supplier
const getAllSuppliers = async (req, res) => {
  try {
    const query = 'SELECT supplier_id, name, contact_details FROM Suppliers'
    const [rows] = await pool.query(query)

    res.status(200).send({
      message: 'Suppliers fetched successfully',
      suppliers: rows,
    })

    console.log('Suppliers fetched successfully:', rows)
  } catch (err) {
    console.error('Error fetching suppliers:', err)
    res.status(500).send('An error occurred while fetching suppliers')
  }
}

const getSupplier = async (req, res) => {
  const { id } = req.params

  try {
    const query =
      'SELECT supplier_id, name, contact_details FROM Suppliers WHERE supplier_id = ?'
    const [rows] = await pool.query(query, [id])

    if (rows.length === 0) {
      return res.status(404).send('Supplier not found')
    }

    res.status(200).send({
      message: 'Supplier fetched successfully',
      supplier: rows[0],
    })

    console.log('Supplier fetched successfully:', rows[0])
  } catch (err) {
    console.error('Error fetching supplier:', err)
    res.status(500).send('An error occurred while fetching the supplier')
  }
}

// remove supplier

const removeSupplier = async (req, res) => {
  const { id } = req.params

  try {
    const query = 'DELETE FROM Suppliers WHERE supplier_id = ?'
    const [result] = await pool.query(query, [id])

    if (result.affectedRows === 0) {
      return res.status(404).send('Supplier not found')
    }

    res.status(200).send({
      message: 'Supplier removed successfully',
      supplierId: id,
    })

    console.log('Supplier removed successfully with ID:', id)
  } catch (err) {
    console.error('Error removing supplier:', err)
    res.status(500).send('An error occurred while removing the supplier')
  }
}

module.exports = { addSupplier, getAllSuppliers, getSupplier, removeSupplier }
