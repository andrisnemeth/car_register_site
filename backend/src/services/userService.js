import * as userRepo from "../repositories/userRepo";

export async function getAllUsers(){
  const users = await userRepo.getAllUsers();

  return { allUsers: users}
}