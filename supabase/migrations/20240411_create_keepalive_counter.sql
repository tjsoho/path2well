-- Create the keepalive_counter table
CREATE TABLE IF NOT EXISTS public.keepalive_counter (
    id BIGSERIAL PRIMARY KEY,
    count INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 