const sequelize = require('../api/models/sequelize');
const Store = require('../api/models/store');
const Plan = require('../api/models/plan');
const Collection = require('../api/models/collection');
const path = require('path');

// Create mock data
const createMockData = async () => {
    try {
      await sequelize.sync({ force: true }); // Drop and recreate the tables
  
      // Create a store
      const store = await Store.create({
        businessName: 'Mock Store',
        ownerName: 'John Doe',
        phoneNumber: '1234567890',
        status: 'active'
      });

      // Create 10 plans for the store
      for (let i = 1; i <= 10; i++) {
        const planDate = new Date();
        planDate.setDate(planDate.getDate() - Math.floor(Math.random() * 3) + 10);

        const plan = await Plan.create({
          customerName: `Customer ${i}`,
          customerPhoneNumber: `987654321${i%10}`,
          installmentFrequency: 'monthly',
          totalInstallments: 11,
          startedAt: planDate,
          status: 'active',
          storeId: store.id,
        });

        await Collection.create({
          datetime: planDate,
          amount: 1000,
          storeId: store.id,
          planId: plan.id
        });
      }
  
      console.log('Mock data created successfully.');
    } catch (error) {
      console.error('Error creating mock data:', error);
    } finally {
      sequelize.close(); // Close the database connection
    }
  };
  
  // Run the script
  createMockData();