import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = "2022-11-16"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: typeof document !== 'undefined', 
})