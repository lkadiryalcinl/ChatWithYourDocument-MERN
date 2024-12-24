const { seedUser } = require("./User");
const { seedFiles } = require("./File")
const { seedLectures } = require("./Lecture")
const { connectToDB } = require("../database/db");

const seedData = async () => {
    try {
        await connectToDB()
        console.log('Seed [started] please wait..');
        
        await seedUser();      
        await seedLectures();  
        await seedFiles();     

        console.log('Seed completed..');
    } catch (error) {
        console.log(error);
    }
}

seedData()