import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Target, TrendingUp, Calendar } from 'lucide-react';

export default function Savings() {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', targetAmount: 10000, currentAmount: 5420, deadline: '2026-12-31', priority: 'High' },
    { id: 2, name: 'Vacation to Europe', targetAmount: 5000, currentAmount: 1200, deadline: '2026-06-30', priority: 'Medium' },
    { id: 3, name: 'New Laptop', targetAmount: 2000, currentAmount: 800, deadline: '2025-12-31', priority: 'Medium' },
    { id: 4, name: 'Home Down Payment', targetAmount: 50000, currentAmount: 12000, deadline: '2028-12-31', priority: 'High' }
  ]);

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [goalFormData, setGoalFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    priority: 'Medium'
  });

  const [contributeAmount, setContributeAmount] = useState('');

  const priorities = ['Low', 'Medium', 'High'];

  const handleGoalSubmit = () => {
    if (!goalFormData.name || !goalFormData.targetAmount || !goalFormData.deadline) return;
    
    if (editingGoal) {
      setGoals(goals.map(g => 
        g.id === editingGoal.id 
          ? { 
              ...g, 
              name: goalFormData.name,
              targetAmount: parseFloat(goalFormData.targetAmount),
              currentAmount: parseFloat(goalFormData.currentAmount || 0),
              deadline: goalFormData.deadline,
              priority: goalFormData.priority
            }
          : g
      ));
    } else {
      setGoals([...goals, { 
        id: Date.now(),
        name: goalFormData.name,
        targetAmount: parseFloat(goalFormData.targetAmount),
        currentAmount: parseFloat(goalFormData.currentAmount || 0),
        deadline: goalFormData.deadline,
        priority: goalFormData.priority
      }]);
    }
    resetGoalForm();
  };

  const handleContribute = () => {
    if (!contributeAmount || !selectedGoal) return;
    
    setGoals(goals.map(g => 
      g.id === selectedGoal.id 
        ? { ...g, currentAmount: g.currentAmount + parseFloat(contributeAmount) }
        : g
    ));
    setContributeAmount('');
    setSelectedGoal(null);
    setShowContributeModal(false);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setGoalFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline,
      priority: goal.priority
    });
    setShowGoalModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this savings goal?')) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const resetGoalForm = () => {
    setGoalFormData({ name: '', targetAmount: '', currentAmount: '', deadline: '', priority: 'Medium' });
    setEditingGoal(null);
    setShowGoalModal(false);
  };

  const openContributeModal = (goal) => {
    setSelectedGoal(goal);
    setShowContributeModal(true);
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Savings Goals</h2>
          <p className="text-gray-600 mt-1">Track your financial goals and progress</p>
        </div>
        <button
          onClick={() => setShowGoalModal(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Goal
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Savings Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Target</p>
            <p className="text-3xl font-bold text-blue-600">${totalTarget.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Saved</p>
            <p className="text-3xl font-bold text-green-600">${totalSaved.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Remaining</p>
            <p className="text-3xl font-bold text-gray-800">${(totalTarget - totalSaved).toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="text-gray-600">{overallProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map(goal => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysRemaining = getDaysRemaining(goal.deadline);
          const priorityColors = {
            Low: 'bg-gray-100 text-gray-800',
            Medium: 'bg-yellow-100 text-yellow-800',
            High: 'bg-red-100 text-red-800'
          };

          return (
            <div key={goal.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{goal.name}</h3>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[goal.priority]}`}>
                      {goal.priority} Priority
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      <span>{daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(goal)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Amount</span>
                  <span className="font-semibold text-gray-800">${goal.currentAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target Amount</span>
                  <span className="font-semibold text-gray-800">${goal.targetAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining</span>
                  <span className="font-semibold text-blue-600">${(goal.targetAmount - goal.currentAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target Date</span>
                  <span className="font-semibold text-gray-800">{goal.deadline}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => openContributeModal(goal)}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <TrendingUp size={18} className="mr-2" />
                Add Contribution
              </button>
            </div>
          );
        })}
      </div>

      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingGoal ? 'Edit Savings Goal' : 'Add New Savings Goal'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                <input
                  type="text"
                  value={goalFormData.name}
                  onChange={(e) => setGoalFormData({...goalFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Emergency Fund"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={goalFormData.targetAmount}
                  onChange={(e) => setGoalFormData({...goalFormData, targetAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={goalFormData.currentAmount}
                  onChange={(e) => setGoalFormData({...goalFormData, currentAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                <input
                  type="date"
                  value={goalFormData.deadline}
                  onChange={(e) => setGoalFormData({...goalFormData, deadline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={goalFormData.priority}
                  onChange={(e) => setGoalFormData({...goalFormData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={resetGoalForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGoalSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingGoal ? 'Update' : 'Add'} Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showContributeModal && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Add Contribution to {selectedGoal.name}
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Current Amount</span>
                  <span className="font-semibold text-gray-800">${selectedGoal.currentAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target Amount</span>
                  <span className="font-semibold text-gray-800">${selectedGoal.targetAmount.toFixed(2)}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contribution Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={contributeAmount}
                  onChange={(e) => setContributeAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              {contributeAmount && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">New Total</span>
                    <span className="font-semibold text-green-600">
                      ${(selectedGoal.currentAmount + parseFloat(contributeAmount || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowContributeModal(false);
                    setSelectedGoal(null);
                    setContributeAmount('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContribute}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Contribution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}