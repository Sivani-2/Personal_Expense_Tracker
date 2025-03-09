import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // ✅ Wrap fetchUsers in useCallback
  const fetchUsers = useCallback(async () => {
    if (!user?.token) return;
    try {
      const res = await axios.get(`https://personal-expense-tracker-4ud2.onrender.com/api/admin/users`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, [user?.token]); // ✅ Add user.token as dependency

  // ✅ Wrap fetchExpenses in useCallback
  const fetchExpenses = useCallback(async () => {
    if (!user?.token) return;
    try {
      const res = await axios.get(`https://personal-expense-tracker-4ud2.onrender.com/api/admin/expenses`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }, [user?.token]); // ✅ Add user.token as dependency

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchUsers();
      fetchExpenses();
    }
  }, [user, fetchUsers, fetchExpenses]); // ✅ Now includes functions in dependency array

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://personal-expense-tracker-4ud2.onrender.com/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`https://personal-expense-tracker-4ud2.onrender.com/api/admin/expenses/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setExpenses((prevExpenses) => prevExpenses.filter((e) => e._id !== id));
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
