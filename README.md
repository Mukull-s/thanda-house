# Thanda House 🍻


## 🔥 Key Features

* Lightning-fast, responsive user interface
* Fully mobile-optimized design
* Sleek UI/UX built with Tailwind CSS
* Curated beer product listings with detailed descriptions
* Firebase authentication (Google & Email)
* Planned: Cart, checkout, and Razorpay payment integration
* Planned: AI-powered product search & recommendation system

---

## 🛠️ Tech Stack

**Frontend:**

* React + Vite
* TypeScript
* Tailwind CSS
* Figma (for UI/UX design)

**Backend:**

* Node.js + Express.js
* MongoDB + Mongoose
* Firebase Auth
* Razorpay (for payments)
* Cloudinary (for image uploads)

---

## 🚧 Project Status

> Currently in development phase.
>
> * UI/UX wireframing completed
> * Core frontend pages are being developed
> * Backend APIs in progress

---

## 📁 Frontend Folder Structure

```bash
thanda-house-frontend/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🧰 Backend Folder Structure

```bash
thanda-house-backend/
├── config/
│   ├── db.js
│   ├── cloudinary.js
│   └── razorpay.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── paymentController.js
│   └── userController.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── generateToken.js
│   └── apiResponse.js
├── .env
├── server.js
└── package.json
```

---

## 🎨 Future Enhancements

* [ ] Razorpay integration for secure payments
* [ ] User cart and order history
* [ ] Admin panel for adding new products
* [ ] Social media login via OAuth
* [ ] Real-time delivery tracking (Phase 2)

---


> 🍻 Built with love, caffeine, and code by [Mukul Singhal]

Feel free to connect, contribute, or fork this repo 
