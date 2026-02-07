-- Add length constraint to delivery_info column in orders table
ALTER TABLE orders 
  ADD CONSTRAINT delivery_info_length_check 
  CHECK (delivery_info IS NULL OR length(delivery_info) <= 2000);