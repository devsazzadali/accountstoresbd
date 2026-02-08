-- Add image_url column to listings table
ALTER TABLE public.listings 
ADD COLUMN image_url text;