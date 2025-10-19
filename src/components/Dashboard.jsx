import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [stats] = useState({
    totalExpenses: 2450.75,
    monthlyBudget: 3000.00,
    totalSavings: 5420.30,
    savingsGoal: 10000.00
  });

  const [recentExpenses] = useState([
    { id: 1, category: 'Groceries', amount: 85.50, date: '2025-10-18', description: 'Weekly shopping' },
    { id: 2, category: 'Transport', amount: 45.00, date: '2025-10-17', description: 'Fuel' },
    { id: 3, category: 'Entertainment', amount: 120.00, date: '2025-10-16', description: 'Movie tickets' },
    { id: 4, category: 'Utilities', amount: 150.00, date: '2025-10-15', description: 'Electricity bill' }
  ]);

  const budgetUsage = (stats.totalExpenses / stats.monthlyBudget) * 100;
  const savingsProgress = (stats.totalSavings / stats.savingsGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Expenses"
          value={`$${stats.totalExpenses.toFixed(2)}`}
          icon={DollarSign}
          color="bg-red-500"
          trend="-12%"
          trendUp={false}
        />
        <StatCard
          title="Monthly Budget"
          value={`$${stats.monthlyBudget.toFixed(2)}`}
          icon={TrendingUp}
          color="bg-blue-500"
          subtitle={`${budgetUsage.toFixed(1)}% used`}
        />
        <StatCard
          title="Total Savings"
          value={`$${stats.totalSavings.toFixed(2)}`}
          icon={TrendingUp}
          color="bg-green-500"
          trend="+8%"
          trendUp={true}
        />
        <StatCard
          title="Savings Goal"
          value={`$${stats.savingsGoal.toFixed(2)}`}
          icon={Target}
          color="bg-purple-500"
          subtitle={`${savingsProgress.toFixed(1)}% achieved`}
        />
      </div>

      {/* Budget Alert */}
      {budgetUsage > 80 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg flex items-start">
          <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-yellow-800">Budget Warning</h3>
            <p className="text-yellow-700 text-sm mt-1">
              You've used {budgetUsage.toFixed(1)}% of your monthly budget. Consider reducing expenses.
            </p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Progress */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Overview</h3>
          <div className="space-y-4">
            <ProgressBar 
              label="Monthly Budget" 
              value={budgetUsage} 
              color="blue"
              amount={`$${stats.totalExpenses.toFixed(2)} / $${stats.monthlyBudget.toFixed(2)}`}
            />
            <ProgressBar 
              label="Savings Goal" 
              value={savingsProgress} 
              color="green"
              amount={`$${stats.totalSavings.toFixed(2)} / $${stats.savingsGoal.toFixed(2)}`}
            />
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Expenses by Category</h3>
          <div className="space-y-3">
            <CategoryBar label="Groceries" amount={450} total={2450.75} color="bg-blue-500" />
            <CategoryBar label="Transport" amount={380} total={2450.75} color="bg-green-500" />
            <CategoryBar label="Entertainment" amount={520} total={2450.75} color="bg-purple-500" />
            <CategoryBar label="Utilities" amount={600} total={2450.75} color="bg-yellow-500" />
            <CategoryBar label="Others" amount={500.75} total={2450.75} color="bg-gray-500" />
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Expenses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map(expense => (
                <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">{expense.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{expense.description}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-800">
                    ${expense.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, trend, trendUp, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trendUp ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, color, amount }) {
  const colorClass = color === 'blue' ? 'bg-blue-500' : 'bg-green-500';
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{amount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`${colorClass} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1 block">{value.toFixed(1)}%</span>
    </div>
  );
}

function CategoryBar({ label, amount, total, color }) {
  const percentage = (amount / total) * 100;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">${amount.toFixed(2)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}