-- Database Schema for NeoBoost Lead Management & Progress Tracking

-- 1. Table: program_leads
-- Stores leads collected from program application forms
CREATE TABLE IF NOT EXISTS program_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    form_data JSONB NOT NULL,
    source VARCHAR(50), -- utm_source
    medium VARCHAR(50), -- utm_medium
    campaign VARCHAR(100), -- utm_campaign
    status VARCHAR(20) DEFAULT 'new', -- new, contacted, converted, lost
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table: client_progress
-- Tracks progress for the 3+1 reward system
CREATE TABLE IF NOT EXISTS client_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    program_id VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    
    -- Tracking targets
    total_sessions_required INTEGER DEFAULT 0,
    attended_sessions INTEGER DEFAULT 0,
    
    -- Reward eligibility markers
    attendance_ok BOOLEAN DEFAULT FALSE,
    journal_ok BOOLEAN DEFAULT FALSE,
    measurements_ok BOOLEAN DEFAULT FALSE,
    goal_achieved BOOLEAN DEFAULT FALSE,
    
    reward_eligible BOOLEAN DEFAULT FALSE,
    reward_claimed BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table: bookings
-- Syncs with Calendly bookings via webhooks
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES program_leads(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    program_id VARCHAR(50) NOT NULL,
    calendly_event_id VARCHAR(255),
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled, no-show
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE program_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Example: Admin access)
-- Note: Replace 'admin_role' with your actual admin identifier if using custom roles
CREATE POLICY "Leads are viewable by admins" ON program_leads
    FOR SELECT USING (auth.jwt() ->> 'email' IN ('contact@neo-boost.com')); -- Add relevant admin emails

CREATE POLICY "Users can view their own progress" ON client_progress
    FOR SELECT USING (auth.uid() = user_id);
