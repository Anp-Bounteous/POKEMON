import { z } from "zod";

export const inputCheck = z.object({
  name: z.string().min(1, "Please enter a Pokémon name").max(50),
});

export type InputCheck = z.infer<typeof inputCheck>;

