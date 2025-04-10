-- Create keepalive_counter table
CREATE TABLE IF NOT EXISTS keepalive_counter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_keepalive_counter_updated_at
    BEFORE UPDATE ON keepalive_counter
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial record
INSERT INTO keepalive_counter (count) VALUES (0)
ON CONFLICT DO NOTHING; 