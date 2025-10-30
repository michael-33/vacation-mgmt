import { db } from "../db/knex.js";
import { User } from "../../domain/entities/user.js";

// repository functions for interacting with the users table
export const userRepo = {
  async findById(id: number): Promise<User | undefined> {
    return db<User>("users").where({ id }).first();
  },

  async findAll(): Promise<User[]> {
    return db<User>("users").select("*");
  },
};
