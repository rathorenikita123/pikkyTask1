const express = require('express');
const app = express();
const port = 3000;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getFoodList = async () => {
  await delay(115);
  return [
    { name: 'Goan Fish Curry', description: 'A traditional Goan curry with fish and spices', price: 250 },
    { name: 'Prawn Balchao', description: 'Spicy prawn pickle', price: 300 },
    { name: 'Bebinca', description: 'A Goan multi-layered dessert', price: 150 },
    { name: 'Chicken Cafreal', description: 'Spicy green chicken curry', price: 200 }
  ];
};

const getFoodLocations = async () => {
  await delay(120000); 
  return [
    { name: 'Goan Fish Curry', locations: ['Restaurant A', 'Restaurant B'] },
    { name: 'Prawn Balchao', locations: ['Restaurant C', 'Restaurant D'] },
    { name: 'Bebinca', locations: ['Restaurant E', 'Restaurant F'] },
    { name: 'Chicken Cafreal', locations: ['Restaurant G', 'Restaurant H'] }
  ];
};

const getFoodNutritionalInfo = async () => {
  await delay(300);
  return [
    { name: 'Goan Fish Curry', calories: 200, protein: 20, fat: 10, carbs: 15 },
    { name: 'Prawn Balchao', calories: 150, protein: 15, fat: 5, carbs: 10 },
    { name: 'Bebinca', calories: 250, protein: 5, fat: 15, carbs: 35 },
    { name: 'Chicken Cafreal', calories: 220, protein: 25, fat: 12, carbs: 8 }
  ];
};

const getStockOutFoods = async () => {
  await delay(100);
  return ['Prawn Balchao', 'Bebinca'];
};

const getAllFoodData = async () => {
  const foodList = await getFoodList();
  const foodLocations = await getFoodLocations();
  const foodNutritionalInfo = await getFoodNutritionalInfo();
  const stockOutFoods = await getStockOutFoods();

  const mergedData = foodList.map(food => {
    const locations = foodLocations.find(loc => loc.name === food.name)?.locations || [];
    const nutritionalInfo = foodNutritionalInfo.find(nut => nut.name === food.name) || {};
    const isStockOut = stockOutFoods.includes(food.name);

    return {
      ...food,
      locations,
      nutritionalInfo,
      stockOut: isStockOut
    };
  });

  return mergedData;
};

app.get('/food', async (req, res) => {
  try {
    const data = await getAllFoodData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
