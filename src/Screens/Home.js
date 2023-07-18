import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [fooditem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div><Navbar /></div>
      <div><Carousel /></div>
      <div className='container'>
        {foodCat !== [] &&
          foodCat.map((data) => (
            <div key={data._id}>
              <div className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr />
              {fooditem !== [] &&
                fooditem
                  .filter((item) => item.CategoryName === data.CategoryName)
                  .map((filterItems) => (
                    <div key={filterItems._id}>
                      <Card></Card>
                    </div>
                  ))}
            </div>
          ))}
        <Card />
      </div>
      <div><Footer /></div>
    </div>
  );
}
