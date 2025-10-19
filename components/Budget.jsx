import React, { useState } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Budget() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Groceries', limit: 500, spent: 450, period: 'Monthly' },
    { id: 2, category: 'Transport', limit: 300, spent: 380, period: 'Monthly' },
    { id: 3, category: 'Entertainment', limit: 200, spent: 120, period: 'Monthly' },
    { id: 4, category: 'Utilities', limit: 400, spent: 350, period: 'Monthly' },
    { id: 5, category: 'Dining', limit: 250, spent: 165, period: 'Monthly' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    period: 'Monthly'
  });

  const categories = ['Groceries', 'Transport', 'Entertainment', 'Utilities', 'Dining', 'Healthcare', 'Shopping', 'Others'];
  const periods = ['Weekly', 'Monthly', 'Yearly'];

  const handleSubmit = () => {
    if (!formData.category || !formData.limit) return;
    
    if (editingBudget) {
      setBudgets(budgets.map(b => 
        b.id === editingBudget.id 
          ? { ...b, category: formData.category, limit: parseFloat(formData.limit), period: formData.period }
          : b
      ));
    } else {
      setBudgets([...budgets, { 
        id: Date.now(),
        category: formData.category, 
        limit: parseFloat(formData.limit), 
        spent: 0,
        period: formData.period
      }]);
    }
    resetForm();
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      limit: budget.limit.toString(),
      period: budget.period
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setBudgets(budgets.filter(b => b.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ category: '', limit: '', period: 'Monthly' });
    setEditingBudget(null);
    setShowModal(false);
  };

  const getStatus = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return { color: 'red', label: 'Exceeded', icon: AlertTriangle };
    if (percentage >= 80) return { color: 'yellow', label: 'Warning', icon: AlertTriangle };
    return { color: 'green', label: 'On Track', icon: CheckCircle };
  };

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overallPercentage = (totalSpent / totalLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Budget Management</h2>
          <p className="text-gray-600 mt-1">Track and manage your spending limits</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Budget
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Budget Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Budget</p>
            <p className="text-3xl font-bold text-blue-600">${totalLimit.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-gray-800">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Remaining</p>
            <p className={`text-3xl font-bold ${totalLimit - totalSpent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(totalLimit - totalSpent).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="text-gray-600">{overallPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                overallPercentage >= 100 ? 'bg-red-500' : 
                overallPercentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map(budget => {
          const percentage = (budget.spent / budget.limit) * 100;
          const status = getStatus(budget.spent, budget.limit);
          const StatusIcon = status.icon;

          return (
            <div key={budget.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{budget.category}</h3>
                  <p className="text-sm text-gray-500">{budget.period}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(budget)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(budget.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className="font-semibold text-gray-800">${budget.spent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Limit</span>
                  <span className="font-semibold text-gray-800">${budget.limit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining</span>
                  <span className={`font-semibold ${budget.limit - budget.spent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${(budget.limit - budget.spent).toFixed(2)}
                  </span>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{percentage.toFixed(1)}%</span>
                    <div className={`flex items-center text-${status.color}-600 text-sm`}>
                      <StatusIcon size={16} className="mr-1" />
                      <span>{status.label}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        percentage >= 100 ? 'bg-red-500' : 
                        percentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingBudget ? 'Edit Budget' : 'Add New Budget'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={editingBudget !== null}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Limit ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.limit}
                  onChange={(e) => setFormData({...formData, limit: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {periods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBudget ? 'Update' : 'Add'} Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}