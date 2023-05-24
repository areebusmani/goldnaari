import sequelize from '../api/models/sequelize.js';
import {Store} from '../api/models/index.js';

// Create mock data
const createMockData = async () => {
    try {
      await sequelize.sync();
  
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

        const plan = await store.createPlan({
          customerName: `Customer ${i}`,
          customerPhoneNumber: `987654321${i%10}`,
          installmentAmount: 15000,
          installmentFrequency: 'monthly',
          totalInstallments: 11,
          startedAt: planDate,
          status: 'active',
        });

        const collection = await plan.createCollection({
          datetime: planDate,
          amount: 15000,
        });

        await collection.setStore(store);
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