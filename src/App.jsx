
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./App.css";

const products = [
  {
    name: "Fresh Fruits",
    description: "Crispy and naturally sweet apples.",
    item: "Apple - ₹120/kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"
  },
  {
    name: "Fresh Vegetables",
    description: "Healthy vegetables picked fresh.",
    item: "Vegetables - ₹60/kg",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400"
  },
  {
    name: "Dairy Products",
    description: "Fresh and nutritious dairy products.",
    item: "Milk - ₹60/L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"
  },
  {
    name: "Fresh Beverages",
    description: "Refreshing fruit juice for your day.",
    item: "Juice - ₹50/L",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400"
  },
  {
    name: "Fresh Bananas",
    description: "Sweet bananas for everyday nutrition.",
    item: "Banana - ₹50/dozen",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"
  },
  {
    name: "Fresh Curd",
    description: "A tasty addition to your daily meals.",
    item: "Curd - ₹40/pack",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
  }
];

function Home() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="hero">
        <h2>Today's Fresh Pick</h2>

        <div className="fresh-pick">
          <img
            src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"
            alt="Fresh Apple"
          />
          <h3>Fresh Apple</h3>
        </div>

        <p>Fresh quality products for your everyday needs!</p>
      </section>

      <section className="products" id="fresh-picks">
        <h2>Fresh Picks</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for groceries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={() => setSearch("")}>
            Reset
          </button>
        </div>

        <p className="cart-count">
          My Cart: {cart.length} items
        </p>

        <div className="product-container">
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <p className="price">{product.item}</p>

              <button
                onClick={() => setCart([...cart, product])}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p>No products found.</p>
        )}
      </section>
    </>
  );
}

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    mobile: "",
    gender: "",
    state: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setSubmitted(false);
  };

  const errors = {
    name: !/^[A-Za-z ]+$/.test(form.name.trim()),

    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),

    password: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password),

    age: !/^\d+$/.test(form.age) ||
      Number(form.age) < 18 ||
      Number(form.age) > 30,

    mobile: !/^\d{10}$/.test(form.mobile),

    gender: !form.gender,

    state: !form.state
  };

  const valid =
    form.name.trim() !== "" &&
    !errors.name &&
    form.email !== "" &&
    !errors.email &&
    !errors.password &&
    form.age !== "" &&
    !errors.age &&
    !errors.mobile &&
    !errors.gender &&
    !errors.state;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (valid) {
      setSubmitted(true);
    }
  };

  return (
    <section className="registration">
      <div className="register-card">

        <h2>User Registration</h2>

        <p>Create your FreshMart account</p>

        <form onSubmit={handleSubmit} noValidate>

          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Enter your name"
          />

          {form.name && errors.name && (
            <small>Name must contain letters only.</small>
          )}

          <label>Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="Enter your email"
          />

          {form.email && errors.email && (
            <small>Enter a valid email address.</small>
          )}

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            placeholder="Minimum 8 characters"
          />

          {form.password && errors.password && (
            <small>
              Use uppercase, lowercase, a number and at least 8 characters.
            </small>
          )}

          <label>Age</label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={updateField}
            placeholder="Enter age (18-30)"
          />

          {form.age && errors.age && (
            <small>Age must be between 18 and 30.</small>
          )}

          <label>Mobile Number</label>
          <input
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={updateField}
            placeholder="10-digit mobile number"
          />

          {form.mobile && errors.mobile && (
            <small>Enter exactly 10 digits.</small>
          )}

          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={updateField}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {form.gender === "" && (
            <small>Gender is required.</small>
          )}

          <label>State</label>
          <select
            name="state"
            value={form.state}
            onChange={updateField}
          >
            <option value="">Select state</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>

          {form.state === "" && (
            <small>State is required.</small>
          )}

          <button type="submit" disabled={!valid}>
            Submit Registration
          </button>

          {submitted && (
            <p className="success">
              Registration completed successfully!
            </p>
          )}

        </form>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>

      <header>
        <h1>FreshMart Online Grocery Store</h1>

        <p>Fresh food. Better life. Delivered to you!</p>
      </header>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/">Fresh Picks</Link>
        <Link to="/register">Registration</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer>
        <p>© 2026 FreshMart Online Grocery Store</p>
      </footer>

    </BrowserRouter>
  );
}

export default App;
