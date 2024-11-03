import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import Select from 'react-select';
import './App.css';
import myImage from './logo.jpg';



const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAp, setSelectedAp] = useState([]); 

  useEffect(() => {
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        // Sort the initial data by end_year in ascending order
        const sortedData = jsonData.sort((a, b) => b.end_year - a.end_year);
        setData(sortedData);
        setFilteredData(sortedData); // Set sorted data as default
      })
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  useEffect(() => {
    handleFilter();
  }, [selectedCategory, selectedYear, selectedType, selectedAp]);

  const categories = [...new Set(data.map(item => item.category))];
  const years = [...new Set(data.map(item => item.year))];
  const types = [...new Set(data.map(item => item.type))];

  const handleFilter = () => {
    let filtered = data;
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory.value);
    }
    if (selectedYear) {
      filtered = filtered.filter(item => item.year === selectedYear.value);
    }
    if (selectedType) {
      filtered = filtered.filter(item => item.type === selectedType.value);
    }
    if (selectedAp.length > 0) {
      filtered = filtered.filter(item => selectedAp.includes(item.ap));
    }
    // Sort filtered data by end_year in ascending order
    filtered.sort((a, b) => b.end_year - a.end_year);
    setFilteredData(filtered);
  };

  const handleApChange = (event) => {
    const value = event.target.value;
    setSelectedAp(prevSelectedAp =>
      prevSelectedAp.includes(value)
        ? prevSelectedAp.filter(ap => ap !== value)
        : [...prevSelectedAp, value]
    );
  };

  return (
    <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={myImage} alt="MTS DOCS" style={{ width: '5%', height: 'auto' }} />

      <h1 style={{ marginRight: '10px' }}>MTS DOCS</h1>
    </div>  
        <h1>Данные с накоплением</h1>
      <div className='container'>
        <Select
          options={categories.map(cat => ({ label: cat, value: cat }))}
          onChange={setSelectedCategory}
          placeholder="Выберите категорию"
        />
        <Select
          options={years.map(year => ({ label: year, value: year }))}
          onChange={setSelectedYear}
          placeholder="Выберите год"
        />
        <Select
          options={types.map(type => ({ label: type, value: type }))}
          onChange={setSelectedType}
          placeholder="Выберите тип"
        />
        <div>
          <label>
            <input
              type="checkbox"
              value="Актив"
              checked={selectedAp.includes('Актив')}
              onChange={handleApChange}
            />
            Актив
          </label>
          <label>
            <input
              type="checkbox"
              value="Пассив"
              checked={selectedAp.includes('Пассив')}
              onChange={handleApChange}
            />
            Пассив
          </label>
        </div>
      </div>
      <ChartComponent filteredData={filteredData} />
    </div>
  );
};

export default App;