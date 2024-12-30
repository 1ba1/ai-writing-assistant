import { drizzle } from 'drizzle-orm/neon-http'
import { assistantTable } from './schema'
import { eq } from 'drizzle-orm'

const db = drizzle(import.meta.env.VITE_NEON_DB_URL)

export async function createUser(email: string) {
  return db
    .insert(assistantTable)
    .values({ email, credits: 5 })
    .onConflictDoNothing({ target: assistantTable.email })
}

export async function getCreditsFromEmail(email: string) {
  const result = await db
    .select({
      credits: assistantTable.credits,
    })
    .from(assistantTable)
    .where(eq(assistantTable.email, email))
  return result
}

export async function updateCredits(email: string, credits: number) {
  const result = await db
    .update(assistantTable)
    .set({ credits: credits - 1 })
    .where(eq(assistantTable.email, email))
    .returning({ updatedCredits: assistantTable.credits })
  return result
}
