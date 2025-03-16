import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart2, TrendingUp, PieChart, Users, FileText, 
  Linkedin, Twitter, Github, Menu, X
} from 'lucide-react';
import { useNavigate, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Papa from 'papaparse';
import { 
  BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Professional color theme
const COLORS = {
  // Primary brand colors - professional navy blues
  blue: ['#0f4c81', '#3a6ea5', '#6593c0', '#9dbfe2'],
  // Success/profit colors - restrained greens
  green: ['#2e7d32', '#4caf50', '#81c784', '#a5d6a7'],
  // Warning/alert colors - muted reds
  red: ['#c62828', '#e57373', '#ef9a9a', '#ffcdd2'],
  // Accent colors - warm gold tones
  yellow: ['#b8860b', '#daa520', '#f0c75e', '#f5deb3'],
  // Secondary accent - sophisticated purples
  purple: ['#4a148c', '#7b1fa2', '#9c27b0', '#ce93d8']
};

// Theme configuration
const THEME = {
  primary: '#0f4c81',       // Professional navy blue
  secondary: '#daa520',     // Warm gold accent
  background: '#f8f9fc',    // Very light blue-gray
  cardBg: '#ffffff',        // White
  textPrimary: '#2c3e50',   // Dark blue-gray
  textSecondary: '#6c757d', // Medium gray
  borderColor: '#e9ecef',   // Light gray
  success: '#2e7d32',       // Restrained green
  successLight: '#e8f5e9',  // Light green background
  progressBar: '#0f4c81',   // Same as primary
  hover: '#f1f5f9'          // Very light blue on hover
};

const Sidebar = () => {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white p-6" style={{ borderColor: THEME.borderColor }}>
      <div className="flex items-center gap-2 font-bold text-2xl mb-8" style={{ color: THEME.primary }}>
        <BarChart2 className="h-6 w-6" />
        <span>BizAnalytics</span>
      </div>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors" 
          style={{ color: THEME.textSecondary, ':hover': { backgroundColor: THEME.hover, color: THEME.primary } }}>
          <BarChart2 className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link to="/upload" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          style={{ color: THEME.textSecondary, ':hover': { backgroundColor: THEME.hover, color: THEME.primary } }}>
          <FileText className="h-5 w-5" />
          <span>Upload Data</span>
        </Link>
        <Link to="/departments" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          style={{ color: THEME.textSecondary, ':hover': { backgroundColor: THEME.hover, color: THEME.primary } }}>
          <TrendingUp className="h-5 w-5" />
          <span>Department Analysis</span>
        </Link>
      </nav>
      <div className="mt-auto">
        <Separator className="my-4" style={{ backgroundColor: THEME.borderColor }} />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a href="#" className="text-muted-foreground hover:text-foreground" style={{ color: THEME.textSecondary, ':hover': { color: THEME.primary } }}>
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground" style={{ color: THEME.textSecondary, ':hover': { color: THEME.primary } }}>
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground" style={{ color: THEME.textSecondary, ':hover': { color: THEME.primary } }}>
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          <span className="text-xs text-muted-foreground" style={{ color: THEME.textSecondary }}>© 2024</span>
        </div>
      </div>
    </div>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-6" style={{ backgroundColor: THEME.cardBg }}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 font-bold text-xl" style={{ color: THEME.primary }}>
            <BarChart2 className="h-5 w-5" />
            <span>BizAnalytics</span>
          </div>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            style={{ color: THEME.textSecondary, ':hover': { backgroundColor: THEME.hover, color: THEME.primary } }}>
            <BarChart2 className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/upload" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            style={{ color: THEME.textSecondary, ':hover': { backgroundColor: THEME.hover, color: THEME.primary } }}>
            <FileText className="h-5 w-5" />
            <span>Upload Data</span>
          </Link>
          <Link to="/departments" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            style={{ color: THEME.textSecondary, ':hover': { backgroundColor: THEME.hover, color: THEME.primary } }}>
            <TrendingUp className="h-5 w-5" />
            <span>Department Analysis</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card style={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }}>
    <CardHeader>
      <div className="mb-2 w-fit rounded-full p-2" style={{ backgroundColor: `${THEME.primary}15` }}>
        <Icon size={24} style={{ color: THEME.primary }} />
      </div>
      <CardTitle style={{ color: THEME.textPrimary }}>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p style={{ color: THEME.textSecondary }}>{description}</p>
    </CardContent>
  </Card>
);

const Home = () => (
  <div className="space-y-8 py-6" style={{ backgroundColor: THEME.background, color: THEME.textPrimary }}>
    <div className="flex flex-col items-center text-center space-y-4">
      <BarChart2 className="h-12 w-12" style={{ color: THEME.primary }} />
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Welcome to BizAnalytics</h1>
      <p style={{ color: THEME.textSecondary }} className="max-w-md">
        Transform Your Business Data into Actionable Insights
      </p>
    </div>
    
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    
    <Card className="border-none shadow-none" style={{ backgroundColor: 'transparent' }}>
      <CardHeader>
        <CardTitle className="text-center" style={{ color: THEME.textPrimary }}>How It Works</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full p-3" style={{ backgroundColor: `${THEME.primary}15` }}>
              <FileText className="h-6 w-6" style={{ color: THEME.primary }} />
            </div>
            <span className="font-medium" style={{ color: THEME.textPrimary }}>1. Upload CSV</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full p-3" style={{ backgroundColor: `${THEME.primary}15` }}>
              <BarChart2 className="h-6 w-6" style={{ color: THEME.primary }} />
            </div>
            <span className="font-medium" style={{ color: THEME.textPrimary }}>2. Analyze Data</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full p-3" style={{ backgroundColor: `${THEME.primary}15` }}>
              <TrendingUp className="h-6 w-6" style={{ color: THEME.primary }} />
            </div>
            <span className="font-medium" style={{ color: THEME.textPrimary }}>3. Gain Insights</span>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Separator style={{ backgroundColor: THEME.borderColor }} />
    
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <div className="flex gap-4">
        <a href="#" style={{ color: THEME.textSecondary, ':hover': { color: THEME.primary } }}>
          <Github className="h-5 w-5" />
        </a>
        <a href="#" style={{ color: THEME.textSecondary, ':hover': { color: THEME.primary } }}>
          <Linkedin className="h-5 w-5" />
        </a>
        <a href="#" style={{ color: THEME.textSecondary, ':hover': { color: THEME.primary } }}>
          <Twitter className="h-5 w-5" />
        </a>
      </div>
      <p className="text-sm" style={{ color: THEME.textSecondary }}>© 2024 BizAnalytics. All Rights Reserved.</p>
    </div>
  </div>
);

const UploadPage = ({ onUpload }) => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true);
      
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          onUpload(result.data);
          setIsUploading(false);
          navigate('/departments');  // Automatically navigate to departments page
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12" style={{ backgroundColor: THEME.background }}>
      <Card className="w-full max-w-md" style={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }}>
        <CardHeader>
          <CardTitle className="text-xl" style={{ color: THEME.textPrimary }}>Upload Your CSV</CardTitle>
          <CardDescription style={{ color: THEME.textSecondary }}>
            Upload a CSV file with departments and profits columns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label 
                htmlFor="file-upload" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors"
                style={{ 
                  borderColor: THEME.borderColor, 
                  ':hover': { borderColor: `${THEME.primary}80` } 
                }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-8 h-8 mb-2" style={{ color: THEME.textSecondary }} />
                  <p className="mb-2 text-sm" style={{ color: THEME.textSecondary }}>
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs" style={{ color: THEME.textSecondary }}>CSV file only</p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              {fileName && (
                <Alert style={{ 
                  backgroundColor: THEME.successLight, 
                  borderColor: THEME.success,
                  color: THEME.textPrimary
                }}>
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Selected file</AlertTitle>
                  <AlertDescription>{fileName}</AlertDescription>
                </Alert>
              )}
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: THEME.textSecondary }}>Uploading...</span>
                    <span style={{ color: THEME.textSecondary }}>80%</span>
                  </div>
                  <Progress value={80} className="h-2" style={{ 
                    backgroundColor: `${THEME.primary}20`, 
                    '& > div': { backgroundColor: THEME.progressBar } 
                  }} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DepartmentAnalysis = ({ departments }) => {
  // Format data for recharts
  const getBarChartData = () => {
    if (Object.keys(departments).length === 0) return [];
    
    return Object.entries(departments).map(([name, data]) => ({
      name,
      expenditure: data.expenditures.reduce((a, b) => a + b, 0),
      profit: data.profits.reduce((a, b) => a + b, 0),
    }));
  };
  
  const getPieChartData = (dataType) => {
    if (Object.keys(departments).length === 0) return [];
    
    return Object.entries(departments).map(([name, data]) => {
      const value = dataType === 'expenditure' 
        ? data.expenditures.reduce((a, b) => a + b, 0)
        : data.profits.reduce((a, b) => a + b, 0);
      
      return { name, value };
    });
  };
  
  const getLineChartData = (department, dataType) => {
    if (!departments[department]) return [];
    
    const values = dataType === 'expenditure' 
      ? departments[department].expenditures
      : departments[department].profits;
    
    return values.map((value, index) => ({
      month: `Month ${index + 1}`,
      value,
    }));
  };

  return (
    <div className="space-y-8 py-6" style={{ backgroundColor: THEME.background }}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: THEME.textPrimary }}>Department Analysis</h2>
      </div>
      
      {Object.keys(departments).length > 0 ? (
        <>
          <Card style={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }}>
            <CardHeader>
              <CardTitle style={{ color: THEME.textPrimary }}>Department Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getBarChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={THEME.borderColor} />
                    <XAxis dataKey="name" stroke={THEME.textSecondary} />
                    <YAxis stroke={THEME.textSecondary} />
                    <Tooltip contentStyle={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }} />
                    <Legend />
                    <Bar dataKey="expenditure" fill={COLORS.blue[0]} name="Expenditure" />
                    <Bar dataKey="profit" fill={COLORS.green[0]} name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }}>
              <CardHeader>
                <CardTitle style={{ color: THEME.textPrimary }}>Total Expenditures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={getPieChartData('expenditure')}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {getPieChartData('expenditure').map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS.blue[index % COLORS.blue.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card style={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }}>
              <CardHeader>
                <CardTitle style={{ color: THEME.textPrimary }}>Total Profits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={getPieChartData('profit')}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {getPieChartData('profit').map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS.green[index % COLORS.green.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {Object.keys(departments).map((department) => (
            <Card key={department} style={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }}>
              <CardHeader>
                <CardTitle style={{ color: THEME.textPrimary }}>{department} Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="expenditure">
                  <TabsList className="mb-4" style={{ backgroundColor: `${THEME.primary}15` }}>
                    <TabsTrigger value="expenditure" style={{ 
                      '&[data-state="active"]': { backgroundColor: THEME.primary, color: 'white' },
                      color: THEME.textPrimary
                    }}>Expenditure</TabsTrigger>
                    <TabsTrigger value="profit" style={{ 
                      '&[data-state="active"]': { backgroundColor: THEME.primary, color: 'white' },
                      color: THEME.textPrimary
                    }}>Profit</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="expenditure">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getLineChartData(department, 'expenditure')} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={THEME.borderColor} />
                          <XAxis dataKey="month" stroke={THEME.textSecondary} />
                          <YAxis stroke={THEME.textSecondary} />
                          <Tooltip contentStyle={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }} />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke={COLORS.blue[0]} name="Expenditure" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="profit">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getLineChartData(department, 'profit')} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={THEME.borderColor} />
                          <XAxis dataKey="month" stroke={THEME.textSecondary} />
                          <YAxis stroke={THEME.textSecondary} />
                          <Tooltip contentStyle={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }} />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke={COLORS.green[0]} name="Profit" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <Card style={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }}>
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
            <div className="rounded-full p-3 mb-4" style={{ backgroundColor: `${THEME.primary}15` }}>
              <FileText className="h-8 w-8" style={{ color: THEME.primary }} />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: THEME.textPrimary }}>No data available</h3>
            <p className="text-center max-w-sm mb-4" style={{ color: THEME.textSecondary }}>
              Please upload a CSV file to view department analysis
            </p>
            <Button asChild style={{ 
              backgroundColor: THEME.primary, 
              color: 'white',
              ':hover': { backgroundColor: `${THEME.primary}e0` }
            }}>
              <Link to="/upload">Upload Data</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [departments, setDepartments] = useState({});

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

  return (
    <Router>
      <div className="flex min-h-screen" style={{ backgroundColor: THEME.background }}>
        <Sidebar />
        
        <main className="flex-1">
          <div className="flex h-16 items-center gap-4 border-b px-6 md:hidden" 
            style={{ backgroundColor: THEME.cardBg, borderColor: THEME.borderColor }}>
            <MobileNav />
            <div className="font-semibold" style={{ color: THEME.textPrimary }}>BizAnalytics</div>
          </div>
          
          <div className="container mx-auto px-4 md:px-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<UploadPage onUpload={processCsvData} />} />
              <Route
                path="/departments"
                element={
                  <DepartmentAnalysis
                    departments={departments}
                  />
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;