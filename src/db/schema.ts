import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const assistantTable = pgTable('assistant', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().notNull(),
})
