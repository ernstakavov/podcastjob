-- Create event table
CREATE TABLE IF NOT EXISTS public.event (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  conditions TEXT,
  program TEXT,
  contact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_event_created_at ON public.event(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.event ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for event table - Allow all operations for everyone
CREATE POLICY "Allow public read access to event"
  ON public.event
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to event"
  ON public.event
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to event"
  ON public.event
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to event"
  ON public.event
  FOR DELETE
  USING (true);

-- Create trigger to auto-update updated_at
CREATE TRIGGER event_updated_at
  BEFORE UPDATE ON public.event
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
