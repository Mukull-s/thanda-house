# Thanda House 🍻

Thanda House is a modern, Gen-Z inspired eCommerce website focused on delivering a wide variety of beer brands across India. It’s built to provide a premium, fast, and stylish shopping experience for users, with smooth animations, modern design, and a strong visual identity.

## 🔥 Key Highlights

- Fast and clean user interface
- High-quality design and UI/UX
- Product listings for various beer brands
- Future support for cart, checkout, and payments
- AI-powered search and recommendations *(coming soon)*

## 🛠️ Tech Stack

- HTML
- Tailwind CSS
- JavaScript
- Figma (for wireframes and UI design)
- [More technologies will be added as the project grows]


## 🚧 Project Status

Currently in design and development phase.  
Wireframing and UI/UX planning is in progress.


##Backend Folder Structure
thanda-house-backend/
├── config/          # DB connection, cloudinary config, payment gateway keys
│    └── db.js
│    └── cloudinary.js
│    └── razorpay.js
├── controllers/     # Logic for handling API requests
│    └── authController.js
│    └── productController.js
│    └── cartController.js
│    └── orderController.js
│    └── paymentController.js
│    └── userController.js
├── models/          # Mongoose models
│    └── User.js
│    └── Product.js
│    └── Cart.js
│    └── Order.js
├── middlewares/     # Middlewares like auth, admin check
│    └── authMiddleware.js
│    └── errorMiddleware.js
│    └── uploadMiddleware.js (for images)
├── routes/          # Route definitions
│    └── authRoutes.js
│    └── productRoutes.js
│    └── cartRoutes.js
│    └── orderRoutes.js
│    └── paymentRoutes.js
│    └── userRoutes.js
├── utils/           # Helper utilities
│    └── generateToken.js
│    └── apiResponse.js
├── .env             # Environment variables
├── server.js        # Entry Point
└── package.json     # npm scripts and packages


---

> 🍺 Built with love, design, and code by [Mukul Singhal]


