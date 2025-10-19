import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar, TrendingUp } from 'lucide-react';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('monthly-expense');
  const [selectedMonth, setSelectedMonth] = useState('2025-10');

  const monthlyExpenseData = [
    { month: 'Jan', amount: 2340 },
    { month: 'Feb', amount: 2150 },
    { month: 'Mar', amount: 2680 },
    { month: 'Apr', amount: 2420 },
    { month: 'May', amount: 2890 },
    { month: 'Jun', amount: 2560 },
    { month: 'Jul', amount: 2730 },
    { month: 'Aug', amount: 2450 },
    { month: 'Sep', amount: 2610 },
    { month: 'Oct', amount: 2450 }
  ];

  const categoryData = [
    { name: 'Groceries', value: 450, color: '#3B82F6' },
    { name: 'Transport', value: 380, color: '#10B981' },
    { name: 'Entertainment', value: 520, color: '#8B5CF6' },
    { name: 'Utilities', value: 600, color: '#F59E0B' },
    { name: 'Dining', value: 300, color: '#EF4444' },
    { name: 'Others', value: 200, color: '#6B7280' }
  ];

  const budgetAdherenceData = [
    { category: 'Groceries', budget: 500, spent: 450 },
    { category: 'Transport', budget: 300, spent: 380 },
    { category: 'Entertainment', budget: 200, spent: 520 },
    { category: 'Utilities', budget: 400, spent: 600 },
    { category: 'Dining', budget: 250, spent: 300 }
  ];

  const savingsProgressData = [
    { month: 'Jan', savings: 500 },
    { month: 'Feb', savings: 1050 },
    { month: 'Mar', savings: 1680 },
    { month: 'Apr', savings: 2150 },
    { month: 'May', savings: 2720 },
    { month: 'Jun', savings: 3380 },
    { month: 'Jul', savings: 4020 },
    { month: 'Aug', savings: 4650 },
    { month: 'Sep', savings: 5180 },
    { month: 'Oct', savings: 5420 }
  ];

  const forecastData = [
    { month: 'Nov', actual: null, forecast: 5950 },
    { month: 'Dec', actual: null, forecast: 6480 },
    { month: 'Jan', actual: null, forecast: 7020 },
    { month: 'Feb', actual: null, forecast: 7550 },
    { month: 'Mar', actual: null, forecast: 8090 },
    { month: 'Apr', actual: null, forecast: 8630 }
  ];

  const reports = [
    { id: 'monthly-expense', label: 'Monthly Expenditure Analysis' },
    { id: 'category-distribution', label: 'Category-wise Expense Distribution' },
    { id: 'budget-adherence', label: 'Budget Adherence Tracking' },
    { id: 'savings-progress', label: 'Savings Goal Progress' },
    { id: 'forecast', label: 'Forecasted Savings Trends' }
  ];

  const handleExportReport = () => {
    alert('Report exported successfully! (This is a demo feature)');
  };

  const renderReport = () => {
    switch(selectedReport) {
      case 'monthly-expense':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Expenditure Analysis</h3>
            <p className="text-gray-600 mb-6">Track your monthly spending patterns over time</p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyExpenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#3B82F6" name="Expenses ($)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatBox label="Average Monthly Expense" value="$2,528" />
              <StatBox label="Highest Month" value="May - $2,890" />
              <StatBox label="Lowest Month" value="Feb - $2,150" />
            </div>
          </div>
        );

      case 'category-distribution':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Category-wise Expense Distribution</h3>
            <p className="text-gray-600 mb-6">Visualize how your expenses are distributed across categories</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 mb-4">Breakdown by Category</h4>
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                      <span className="font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-800">${item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'budget-adherence':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Budget Adherence Tracking</h3>
            <p className="text-gray-600 mb-6">Compare your actual spending against budgeted amounts</p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={budgetAdherenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#10B981" name="Budget ($)" />
                <Bar dataKey="spent" fill="#EF4444" name="Spent ($)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Alert:</strong> You've exceeded your budget in 3 categories: Transport, Entertainment, and Utilities
              </p>
            </div>
          </div>
        );

      case 'savings-progress':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Savings Goal Progress</h3>
            <p className="text-gray-600 mb-6">Monitor your cumulative savings growth over time</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={savingsProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={3} name="Total Savings ($)" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatBox label="Current Savings" value="$5,420" />
              <StatBox label="Monthly Growth Rate" value="+8.2%" />
              <StatBox label="Goal Target" value="$10,000" />
            </div>
          </div>
        );

      case 'forecast':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Forecasted Savings Trends</h3>
            <p className="text-gray-600 mb-6">Projected savings based on current trends</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={[...savingsProgressData.slice(-3), ...forecastData]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={3} name="Actual ($)" connectNulls />
                <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeWidth={3} strokeDasharray="5 5" name="Forecast ($)" connectNulls />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Projection:</strong> At the current savings rate, you'll reach $8,630 by April 2026, which is 86.3% of your $10,000 goal.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Financial Reports</h2>
          <p className="text-gray-600 mt-1">Analyze your financial data with comprehensive reports</p>
        </div>
        <button
          onClick={handleExportReport}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={20} className="mr-2" />
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-2">
          {reports.map(report => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedReport === report.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {report.label}
            </button>
          ))}
        </div>
      </div>

      {renderReport()}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title="Total Income" 
            value="$5,200" 
            icon={TrendingUp} 
            color="bg-green-500" 
          />
          <SummaryCard 
            title="Total Expenses" 
            value="$2,450" 
            icon={TrendingUp} 
            color="bg-red-500" 
          />
          <SummaryCard 
            title="Net Savings" 
            value="$2,750" 
            icon={TrendingUp} 
            color="bg-blue-500" 
          />
          <SummaryCard 
            title="Savings Rate" 
            value="52.9%" 
            icon={TrendingUp} 
            color="bg-purple-500" 
          />
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
}