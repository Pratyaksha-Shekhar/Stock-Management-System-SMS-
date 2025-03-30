const pool = require('../db')

// login user

const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    // Validate input fields
    if (!username || !password) {
      return res
        .status(400)
        .send('Missing required fields: username and password')
    }

    // Query to get the user from the database
    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?'
    const [rows] = await pool.query(query, [username, password])

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).send('Invalid username or password')
    }

    const user = rows[0] // Extract the user from the query result

    // Respond with success and user information (excluding the password)
    res.status(200).send({
      message: 'Login successful',
      user: {
        userId: user.user_id,
        username: user.username,
        role: user.role,
      },
    })

    console.log('User logged in:', user.username)
  } catch (err) {
    console.error('Error logging in user:', err)
    res.status(500).send('An error occurred while logging in')
  }
}

// register user
const registerUser = async (req, res) => {
  const { username, password, role } = req.body

  try {
    // Validate input fields
    if (!username || !password || !role) {
      return res
        .status(400)
        .send('Missing required fields: username, password, and role')
    }

    // Query to insert a new user
    const query =
      'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)'
    const [result] = await pool.query(query, [username, password, role])

    // Send success response
    res.status(201).send({
      message: 'User created successfully',
      userId: result.insertId,
    })

    console.log('User created with ID:', result.insertId)
  } catch (err) {
    console.error('Error inserting user:', err)
    res.status(500).send('An error occurred while registering the user')
  }
}

// show all user

const showAllUsers = async (req, res) => {
  try {
    // Query to fetch all users from the Users table
    const query = 'SELECT user_id, username, role FROM Users'
    const [rows] = await pool.query(query)

    // Respond with the list of users
    res.status(200).send({
      message: 'Users fetched successfully',
      users: rows,
    })

    console.log('Users fetched successfully:', rows)
  } catch (err) {
    console.error('Error fetching users:', err)
    res.status(500).send('An error occurred while fetching users')
  }
}

// show a particula user

const showUser = async (req, res) => {
  const { id } = req.params // Fetch the user_id from the route parameters

  try {
    // Query to fetch a specific user by user_id
    const query = 'SELECT user_id, username, role FROM Users WHERE user_id = ?'
    const [rows] = await pool.query(query, [id])

    // Check if the user exists
    if (rows.length === 0) {
      return res.status(404).send('User not found')
    }

    // Respond with the user details
    res.status(200).send({
      message: 'User fetched successfully',
      user: rows[0],
    })

    console.log('User fetched successfully:', rows[0])
  } catch (err) {
    console.error('Error fetching user:', err)
    res.status(500).send('An error occurred while fetching the user')
  }
}

// remove user

const removeUser = async (req, res) => {
  const { id } = req.params // Extract user_id from route parameters

  try {
    // Query to delete the user by user_id
    const query = 'DELETE FROM Users WHERE user_id = ?'
    const [result] = await pool.query(query, [id])

    // Check if the user was deleted
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found')
    }

    // Respond with success
    res.status(200).send({
      message: 'User removed successfully',
      userId: id,
    })

    console.log('User removed successfully:', id)
  } catch (err) {
    console.error('Error removing user:', err)
    res.status(500).send('An error occurred while removing the user')
  }
}

module.exports = { registerUser, loginUser, showAllUsers, showUser, removeUser }
