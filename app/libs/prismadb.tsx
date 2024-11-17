import { PrismaClient } from '@prisma/client'

declare global {
    let prisma : PrismaClient | undefined
}
// @ts-expect-error : just ignore it
const client = globalThis.prisma || new PrismaClient()
// @ts-expect-error : just ignore it
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client;

// reducing hot reload