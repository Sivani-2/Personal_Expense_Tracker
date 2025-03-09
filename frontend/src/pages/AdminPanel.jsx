import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    if (user && user.role === "admin") {
      fetchUsers();
      fetchExpenses();
    }
  }, [user]);
  const fetchUsers = async () => {
    console.log(user.token)
    try {
      const res = await axios.get(`https://personal-expense-tracker-4ud2.onrender.com/api/admin/users`, {
        headers: { Authorization: `Bearer ${user.token}`},
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`https://personal-expense-tracker-4ud2.onrender.com/api/admin/expenses`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://personal-expense-tracker-4ud2.onrender.com/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`https://personal-expense-tracker-4ud2.onrender.com/api/admin/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  if (!user || user.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.email})
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>All Expenses</h3>
      <ul>
        {expenses.map((e) => (
          <li key={e._id}>
            {e.title} - ${e.amount} (by {e.user.name})
            <button onClick={() => deleteExpense(e._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;