import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart2,TrendingUp,PieChart,Users,FileText,Linkedin,Twitter} from 'lucide-react';

import { useNavigate ,BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Papa from 'papaparse';
import './App.css';

const Sidebar = () => (
  <div className="nav-sidebar">
    <h1 className="nav-logo">BizAnalytics</h1>
    <nav className="nav-menu">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/upload" className="nav-link">Upload Data</Link>
      <Link to="/departments" className="nav-link">Department Analysis</Link>
    </nav>
  </div>
);

const GitHubIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">
      <Icon size={40} color="#4a90e2" />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">Welcome to BizAnalytics</h1>
    
    <div className="home-subtitle">
      <p>Transform Your Business Data into Actionable Insights</p>
    </div>
    
    <div className="features-grid">
      <FeatureCard 
        icon={BarChart2}
        title="Comprehensive Analysis"
        description="Deep dive into departmental performance with advanced visualizations"
      />
      <FeatureCard 
        icon={TrendingUp}
        title="Profit Tracking"
        description="Monitor and analyze profit trends across different departments"
      />
      <FeatureCard 
        icon={PieChart}
        title="Detailed Reporting"
        description="Generate insightful reports with interactive charts"
      />
    </div>
    
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <Users size={40} color="#67b26f" />
          <span>1. Upload CSV</span>
        </div>
        <div className="step">
          <FileText size={40} color="#4a90e2" />
          <span>2. Analyze Data</span>
        </div>
        <div className="step">
          <TrendingUp size={40} color="#27ae60" />
          <span>3. Gain Insights</span>
        </div>
      </div>
    </div>
    
    <div className="home-footer">
      <div className="social-icons">
      <a href="#" className="social-icon"><GitHubIcon /></a>
      <a href="#" className="social-icon"><Linkedin /></a>
        <a href="#" className="social-icon"><Twitter /></a>
      </div>
      <p>© 2024 BizAnalytics. All Rights Reserved.</p>
    </div>
  </div>
);

const UploadPage = ({ onUpload }) => {
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          onUpload(result.data);
          navigate('/departments');  // Automatically navigate to departments page
        },
      });
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2 className="upload-title">Upload Your CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="upload-input"
        />
        <p className="upload-hint">Upload a CSV file with departments and profits columns.</p>
      </div>
    </div>
  );
};

const DepartmentAnalysis = ({ 
  departments, 
  drawCombinedDepartmentChart, 
  drawPieCharts, 
  drawDepartmentCharts 
}) => {
  useEffect(() => {
    if (Object.keys(departments).length > 0) {
      drawCombinedDepartmentChart();
      drawPieCharts();
      Object.keys(departments).forEach((department) => drawDepartmentCharts(department));
    }
  }, [
    departments, 
    drawCombinedDepartmentChart, 
    drawPieCharts, 
    drawDepartmentCharts
  ]);

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">Department Analysis</h2>
      {Object.keys(departments).length > 0 ? (
        <>
          <div id="department-comparison" className="chart-container main-chart"></div>
          <div className="pie-charts-grid">
            <div id="pie-chart-expenses" className="chart-container"></div>
            <div id="pie-chart-profits" className="chart-container"></div>
          </div>
          {Object.keys(departments).map((department) => (
            <div key={department} className="department-section">
              <h3 className="department-title">{department} Analysis</h3>
              <div className="charts-grid">
                <div id={`${department}-expenditure`} className="chart-container"></div>
                <div id={`${department}-profit`} className="chart-container"></div>
                <div id={`${department}-profit-distribution`} className="chart-container"></div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="upload-hint">Please upload a CSV file to view department analysis.</p>
      )}
    </div>
  );
};

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [departments, setDepartments] = useState({});
  const [isGoogleChartsLoaded, setIsGoogleChartsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    script.onload = () => {
      window.google.charts.load('current', {
        packages: ['corechart'],
        callback: () => setIsGoogleChartsLoaded(true),
      });
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const processCsvData = (data) => {
    const departments = {};
    const columns = Object.keys(data[0]);

    columns.forEach((col, idx) => {
      if (col.toLowerCase().includes('profits')) {
        const deptName = columns[idx - 1];
        departments[deptName] = {
          expenditures: data.map(row => parseFloat(row[columns[idx - 1]]) || 0),
          profits: data.map(row => parseFloat(row[col]) || 0)
        };
      }
    });

    setDepartments(departments);
    setCsvData(data);
  };

  const drawCombinedDepartmentChart = useCallback(() => {
    if (!isGoogleChartsLoaded || !Object.keys(departments).length) return;

    const chartElement = document.getElementById('department-comparison');
    const chartData = new window.google.visualization.DataTable();
    chartData.addColumn('string', 'Department');
    chartData.addColumn('number', 'Expenditure');
    chartData.addColumn('number', 'Profit');
    
    chartData.addRows(
      Object.entries(departments).map(([name, data]) => [
        name,
        data.expenditures.reduce((a, b) => a + b, 0),
        data.profits.reduce((a, b) => a + b, 0),
      ])
    );
    
    const chart = new window.google.visualization.ColumnChart(chartElement);
    chart.draw(chartData, { 
      title: 'Department Comparison', 
      legend: 'top',
      colors: ['#4a90e2', '#67b26f']
    });
  }, [departments, isGoogleChartsLoaded]);

  const drawPieCharts = useCallback(() => {
    if (!isGoogleChartsLoaded || !Object.keys(departments).length) return;

    const expenseElement = document.getElementById('pie-chart-expenses');
    const profitElement = document.getElementById('pie-chart-profits');

    const expenseData = new window.google.visualization.DataTable();
    expenseData.addColumn('string', 'Department');
    expenseData.addColumn('number', 'Total Expenditure');
    expenseData.addRows(
      Object.entries(departments).map(([name, data]) => [
        name,
        data.expenditures.reduce((a, b) => a + b, 0),
      ])
    );
    const expenseChart = new window.google.visualization.PieChart(expenseElement);
    expenseChart.draw(expenseData, { 
      title: 'Total Expenditures by Department', 
      pieHole: 0.4,
      colors: ['#4a90e2', '#67b26f', '#e74c3c', '#f39c12']
    });

    const profitData = new window.google.visualization.DataTable();
    profitData.addColumn('string', 'Department');
    profitData.addColumn('number', 'Total Profit');
    profitData.addRows(
      Object.entries(departments).map(([name, data]) => [
        name,
        data.profits.reduce((a, b) => a + b, 0),
      ])
    );
    const profitChart = new window.google.visualization.PieChart(profitElement);
    profitChart.draw(profitData, { 
      title: 'Total Profits by Department', 
      pieHole: 0.4,
      colors: ['#27ae60', '#2980b9', '#8e44ad', '#f1c40f']
    });
  }, [departments, isGoogleChartsLoaded]);

  const drawDepartmentCharts = useCallback(
    (department) => {
      if (!isGoogleChartsLoaded || !departments[department]) return;

      const { expenditures, profits } = departments[department];

      const expenditureElement = document.getElementById(`${department}-expenditure`);
      const profitElement = document.getElementById(`${department}-profit`);
      const distributionElement = document.getElementById(`${department}-profit-distribution`);

      const expenditureData = new window.google.visualization.DataTable();
      expenditureData.addColumn('string', 'Time');
      expenditureData.addColumn('number', 'Expenditure');
      expenditureData.addRows(expenditures.map((value, index) => [`Time ${index + 1}`, value]));
      const expenditureChart = new window.google.visualization.LineChart(expenditureElement);
      expenditureChart.draw(expenditureData, {
        title: `${department} Expenditure Over Time`,
        legend: 'top',
        colors: ['#4a90e2'],
      });

      const profitData = new window.google.visualization.DataTable();
      profitData.addColumn('string', 'Time');
      profitData.addColumn('number', 'Profit');
      profitData.addRows(profits.map((value, index) => [`Time ${index + 1}`, value]));
      const profitChart = new window.google.visualization.LineChart(profitElement);
      profitChart.draw(profitData, {
        title: `${department} Profit Over Time`,
        legend: 'top',
        colors: ['#27ae60'],
      });

      const distributionData = new window.google.visualization.DataTable();
      distributionData.addColumn('number', 'Profit');
      distributionData.addRows(profits.map((value) => [value]));
      const distributionChart = new window.google.visualization.Histogram(distributionElement);
      distributionChart.draw(distributionData, {
        title: `${department} Profit Distribution`,
        legend: 'none',
        colors: ['#e74c3c'],
      });
    },
    [departments, isGoogleChartsLoaded]
  );

  return (
    <Router>
      <div className="app-wrapper">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage onUpload={processCsvData} />} />
            <Route
              path="/departments"
              element={
                <DepartmentAnalysis
                  departments={departments}
                  drawCombinedDepartmentChart={drawCombinedDepartmentChart}
                  drawPieCharts={drawPieCharts}
                  drawDepartmentCharts={drawDepartmentCharts}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;