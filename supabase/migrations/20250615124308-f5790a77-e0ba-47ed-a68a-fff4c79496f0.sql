
-- Create a table to store date proposals
CREATE TABLE public.date_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  instagram_username TEXT NOT NULL,
  proposed_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (everyone can insert and view for this public proposal)
ALTER TABLE public.date_proposals ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert proposals (public proposal form)
CREATE POLICY "Anyone can create date proposals" 
  ON public.date_proposals 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to view proposals (so you can see the responses)
CREATE POLICY "Anyone can view date proposals" 
  ON public.date_proposals 
  FOR SELECT 
  USING (true);
