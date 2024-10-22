import { petsService, usersService } from "../services/index.js";
import MockingService from "../services/mocking.js";

const getMockingPets = async (req, res) => {
  const pets = await MockingService.generateMockingPets(100);
  res.send({ status: "success", payload: pets });
};

const getMockingUsers = async (req, res) => {
  const users = await MockingService.generateMockingUsers(50);
  res.send({ status: "success", payload: users });
};

const generateData = async (req, res) => {
  const { users, pets } = req.body;
  try {
    //Generate fake users:
    const mockingUsers = await MockingService.generateMockingUsers(users);

    //Generate fake pets:
    const mockingPets = await MockingService.generateMockingPets(pets);

    //Insert generated data in Database:
    await Promise.all(
      mockingUsers.map((user) => usersService.create(user)),
      mockingPets.map((pet) => petsService.create(pet))
    );

    res.send({
      status: "success",
      message: "The data was generated and loaded successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error generating and loading data.");
  }
};

export default {
  getMockingPets,
  getMockingUsers,
  generateData,
};
