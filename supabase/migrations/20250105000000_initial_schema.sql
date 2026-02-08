-- Create vacancy table
CREATE TABLE IF NOT EXISTS public.vacancy (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  employer TEXT NOT NULL,
  position TEXT NOT NULL,
  salary_min INTEGER NOT NULL,
  salary_max INTEGER NOT NULL,
  experience TEXT,
  employment_type TEXT NOT NULL,
  work_mode TEXT NOT NULL,
  schedule TEXT NOT NULL,
  close_date TIMESTAMP WITH TIME ZONE,
  responsibilities TEXT NOT NULL,
  requirements TEXT NOT NULL,
  additional_requirements TEXT,
  working_conditions TEXT NOT NULL,
  contact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create resume table
CREATE TABLE IF NOT EXISTS public.resume (
  id TEXT PRIMARY KEY,
  position TEXT NOT NULL,
  employment_type TEXT NOT NULL,
  salary_expected INTEGER NOT NULL,
  experience TEXT NOT NULL,
  achievements TEXT,
  skills TEXT NOT NULL,
  contact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vacancy_created_at ON public.vacancy(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resume_created_at ON public.resume(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.vacancy ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for vacancy table - Allow all operations for everyone
CREATE POLICY "Allow public read access to vacancy"
  ON public.vacancy
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to vacancy"
  ON public.vacancy
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to vacancy"
  ON public.vacancy
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to vacancy"
  ON public.vacancy
  FOR DELETE
  USING (true);

-- Create RLS policies for resume table - Allow all operations for everyone
CREATE POLICY "Allow public read access to resume"
  ON public.resume
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to resume"
  ON public.resume
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to resume"
  ON public.resume
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to resume"
  ON public.resume
  FOR DELETE
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to auto-update updated_at
CREATE TRIGGER vacancy_updated_at
  BEFORE UPDATE ON public.vacancy
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER resume_updated_at
  BEFORE UPDATE ON public.resume
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
