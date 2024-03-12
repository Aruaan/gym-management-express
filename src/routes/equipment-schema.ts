import * as z from 'zod';
import { EquipmentType } from '../enums/Equipment.enum';

export const equipmentSchema = z.object({
  name: z.string().max(30),
  type: z.nativeEnum(EquipmentType),
  purchaseDate: z.date().optional().nullable(),
  notes: z.string().max(255).optional().nullable(),
});