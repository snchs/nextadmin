"use client"

import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import Select from 'react-select';
import './barchart_f.css'
// import myImage from './logo.jpg';



const Barchart_f = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAp, setSelectedAp] = useState([]); 

  useEffect(() => {
    fetch('/data.json')
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
    
    if (selectedCategory && selectedCategory.length > 0) {
      filtered = filtered.filter(item => selectedCategory.includes(item.category));
    }
    
    if (selectedYear && selectedYear.length > 0) {
      filtered = filtered.filter(item => selectedYear.includes(item.year));
    }
  
    if (selectedType && selectedType.length > 0) {
      filtered = filtered.filter(item => selectedType.includes(item.type));
    }
    if (selectedAp && selectedAp.length > 0) {
      filtered = filtered.filter(item => selectedAp.includes(item.ap));
    }
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
      {/* <img src={myImage} alt="MTS DOCS" style={{ width: '5%', height: 'auto' }} /> */}

      <h1 style={{ marginRight: '10px' }}>MTS DOCS</h1>
    </div>  
        <h1>Данные с накоплением</h1>
      <div className='container'>
      <Select
          options={categories.map(cat => ({ label: cat, value: cat }))}
          onChange={selectedOptions => setSelectedCategory(selectedOptions.map(option => option.value))}
          placeholder="Выберите категорию"
          isMulti
        />
        <Select
          options={years.map(year => ({ label: year, value: year }))}
          onChange={selectedOptions => setSelectedYear(selectedOptions.map(option => option.value))}
          placeholder="Выберите год"
          isMulti
        />
        <Select
          options={types.map(type => ({ label: type, value: type }))}
          onChange={selectedOptions => setSelectedType(selectedOptions.map(option => option.value))}
          placeholder="Выберите тип"
          isMulti
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

export default Barchart_f;