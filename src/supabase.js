import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://xwwgvwehnhxgbussfnfx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3d2d2d2Vobmh4Z2J1c3NmbmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNjM5NDksImV4cCI6MjA2MzczOTk0OX0.u11ILhoAZwF18fhnszbtkiJ3ARbBfzUeEhfmioxOOYU')

export default supabase;