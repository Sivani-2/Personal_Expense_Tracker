import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navigation.css";
import "../index.css"   

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning! ☀");
    else if (hour < 18) setGreeting("Good Afternoon! 🌤");
    else setGreeting("Good Evening! 🌙");
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center p-10 bg-gray-100 shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{greeting}</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Manage your finances smartly with Expense Tracker. 
          Keep track of your spending and save money effortlessly!
        </p>

        {/* Conditional Button Based on Authentication */}
        <button 
          onClick={() => navigate(user ? (user.role === "admin" ? "/admin" : "/expenses") : "/signup")} 
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {user ? `Go to ${user.role === "admin" ? "Admin Panel" : "Dashboard"}` : "Get Started"}
        </button>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Why Choose Expense Tracker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "🔍 Track Every Penny", text: "Monitor your expenses easily and understand where your money goes." },
              { title: "📊 Smart Analytics", text: "Visualize spending patterns with detailed charts and insights." },
              { title: "🔒 Secure & Private", text: "Your financial data is safe with us, encrypted for your protection." }
              
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-6 mt-50">
  <p>📧 Email us at <a href="mailto:support@expensetracker.com" className="underline hover:text-gray-300">support@expensetracker.com</a></p>
  <p>📍 Follow us on <a href="https://twitter.com/ExpenseTracker" className="underline hover:text-gray-300">Twitter</a></p>
  <p>&copy; 2025 Expense Tracker. All Rights Reserved.</p>
</footer>

    </div>
  );
};

export default Home;