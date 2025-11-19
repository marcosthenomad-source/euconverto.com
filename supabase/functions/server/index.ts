import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.ts';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Supabase client
const getSupabaseClient = (useServiceRole = false) => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    useServiceRole 
      ? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      : Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );
};

// ==================== AUTH ROUTES ====================

// Signup (alias for register)
app.post('/make-server-12d56551/auth/signup', async (c) => {
  try {
    const { email, password, name, plan = 'launch' } = await c.req.json();

    const supabase = getSupabaseClient(true);
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, plan },
      email_confirm: true // Auto-confirm since email server not configured
    });

    if (error) {
      console.log(`Error creating user during signup: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store user data in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}`, {
      id: userId,
      email,
      name,
      plan,
      theme: 'light',
      language: 'pt',
      createdAt: new Date().toISOString(),
      assistants: [],
      leads: [],
      tags: []
    });

    return c.json({ 
      success: true, 
      userId,
      message: 'User created successfully' 
    });

  } catch (error) {
    console.log(`Server error during signup: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Register new user (3-step process)
app.post('/make-server-12d56551/auth/register', async (c) => {
  try {
    const { email, password, name, company } = await c.req.json();

    const supabase = getSupabaseClient(true);
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, company },
      email_confirm: true // Auto-confirm since email server not configured
    });

    if (error) {
      console.log(`Error creating user during registration: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store user data in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}`, {
      id: userId,
      email,
      name,
      company,
      plan: 'free',
      theme: 'light',
      language: 'pt',
      createdAt: new Date().toISOString(),
      assistants: [],
      leads: [],
      tags: []
    });

    return c.json({ 
      success: true, 
      userId,
      message: 'User created successfully' 
    });

  } catch (error) {
    console.log(`Server error during registration: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Login
app.post('/make-server-12d56551/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log(`Error during login: ${error.message}`);
      return c.json({ error: error.message }, 401);
    }

    return c.json({ 
      success: true,
      accessToken: data.session.access_token,
      userId: data.user.id,
      user: data.user
    });

  } catch (error) {
    console.log(`Server error during login: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Signin (alias for login)
app.post('/make-server-12d56551/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json();

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log(`Error during signin: ${error.message}`);
      return c.json({ error: error.message }, 401);
    }

    return c.json({ 
      success: true,
      accessToken: data.session.access_token,
      userId: data.user.id,
      user: data.user
    });

  } catch (error) {
    console.log(`Server error during signin: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Password recovery
app.post('/make-server-12d56551/auth/recover', async (c) => {
  try {
    const { email } = await c.req.json();

    const supabase = getSupabaseClient(true);
    
    const { error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email
    });

    if (error) {
      console.log(`Error generating recovery link: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      message: 'Recovery email sent (simulated - check Supabase logs for link)'
    });

  } catch (error) {
    console.log(`Server error during recovery: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Reset password
app.post('/make-server-12d56551/auth/reset-password', async (c) => {
  try {
    const { accessToken, newPassword } = await c.req.json();

    const supabase = getSupabaseClient(true);
    
    // Get user from token
    const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
    
    if (userError || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Update password
    const { error } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (error) {
      console.log(`Error resetting password: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.log(`Server error during password reset: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== USER ROUTES ====================

// Get user data
app.get('/make-server-12d56551/user', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ success: true, user: userData });

  } catch (error) {
    console.log(`Error fetching user data: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update user settings
app.put('/make-server-12d56551/user/settings', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const updates = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Update user data
    const updatedUser = { ...userData, ...updates };
    await kv.set(`user:${user.id}`, updatedUser);

    return c.json({ success: true, user: updatedUser });

  } catch (error) {
    console.log(`Error updating user settings: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== ASSISTANT ROUTES ====================

// Get user's assistant (singular - gets first/default assistant)
app.get('/make-server-12d56551/assistant', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    const assistantIds = userData?.assistants || [];

    if (assistantIds.length === 0) {
      return c.json(null);
    }

    // Get first assistant
    const assistant = await kv.get(`assistant:${assistantIds[0]}`);
    return c.json(assistant);

  } catch (error) {
    console.log(`Error fetching assistant: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update user's assistant (singular - updates first/default assistant)
app.put('/make-server-12d56551/assistant', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const updates = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    let assistantIds = userData?.assistants || [];

    // If no assistant exists, create one
    if (assistantIds.length === 0) {
      const assistantId = crypto.randomUUID();
      const assistant = {
        id: assistantId,
        userId: user.id,
        ...updates,
        createdAt: new Date().toISOString(),
        embedCode: `<script src="https://euconverto.com/widget.js" data-assistant="${assistantId}"></script>`
      };

      await kv.set(`assistant:${assistantId}`, assistant);
      userData.assistants = [assistantId];
      await kv.set(`user:${user.id}`, userData);

      return c.json({ success: true, assistant });
    }

    // Update existing assistant
    const assistantId = assistantIds[0];
    const assistant = await kv.get(`assistant:${assistantId}`);
    
    if (!assistant) {
      return c.json({ error: 'Assistant not found' }, 404);
    }

    const updatedAssistant = { ...assistant, ...updates };
    await kv.set(`assistant:${assistantId}`, updatedAssistant);

    return c.json({ success: true, assistant: updatedAssistant });

  } catch (error) {
    console.log(`Error updating assistant: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create assistant
app.post('/make-server-12d56551/assistants', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const assistantData = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const assistantId = crypto.randomUUID();
    const assistant = {
      id: assistantId,
      userId: user.id,
      ...assistantData,
      createdAt: new Date().toISOString(),
      embedCode: `<script src=\"https://euconverto.com/widget.js\" data-assistant=\"${assistantId}\"></script>`
    };

    await kv.set(`assistant:${assistantId}`, assistant);

    // Update user's assistants list
    const userData = await kv.get(`user:${user.id}`);
    if (userData) {
      userData.assistants = [...(userData.assistants || []), assistantId];
      await kv.set(`user:${user.id}`, userData);
    }

    return c.json({ success: true, assistant });

  } catch (error) {
    console.log(`Error creating assistant: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all assistants for user
app.get('/make-server-12d56551/assistants', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    const assistantIds = userData?.assistants || [];

    const assistants = await Promise.all(
      assistantIds.map(id => kv.get(`assistant:${id}`))
    );

    return c.json({ success: true, assistants: assistants.filter(Boolean) });

  } catch (error) {
    console.log(`Error fetching assistants: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update assistant
app.put('/make-server-12d56551/assistants/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const assistantId = c.req.param('id');
    const updates = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const assistant = await kv.get(`assistant:${assistantId}`);
    
    if (!assistant || assistant.userId !== user.id) {
      return c.json({ error: 'Assistant not found or unauthorized' }, 404);
    }

    const updatedAssistant = { ...assistant, ...updates };
    await kv.set(`assistant:${assistantId}`, updatedAssistant);

    return c.json({ success: true, assistant: updatedAssistant });

  } catch (error) {
    console.log(`Error updating assistant: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete assistant
app.delete('/make-server-12d56551/assistants/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const assistantId = c.req.param('id');
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const assistant = await kv.get(`assistant:${assistantId}`);
    
    if (!assistant || assistant.userId !== user.id) {
      return c.json({ error: 'Assistant not found or unauthorized' }, 404);
    }

    await kv.del(`assistant:${assistantId}`);

    // Update user's assistants list
    const userData = await kv.get(`user:${user.id}`);
    if (userData) {
      userData.assistants = (userData.assistants || []).filter(id => id !== assistantId);
      await kv.set(`user:${user.id}`, userData);
    }

    return c.json({ success: true });

  } catch (error) {
    console.log(`Error deleting assistant: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== LEADS ROUTES ====================

// Create lead (public endpoint - called by chat widget)
app.post('/make-server-12d56551/leads', async (c) => {
  try {
    const leadData = await c.req.json();
    const { assistantId, name, email, phone, serviceType, message } = leadData;

    const assistant = await kv.get(`assistant:${assistantId}`);
    
    if (!assistant) {
      return c.json({ error: 'Assistant not found' }, 404);
    }

    const leadId = crypto.randomUUID();
    const lead = {
      id: leadId,
      assistantId,
      userId: assistant.userId,
      name,
      email,
      phone,
      serviceType,
      message,
      status: 'new',
      tags: [],
      createdAt: new Date().toISOString()
    };

    await kv.set(`lead:${leadId}`, lead);

    // Update user's leads list
    const userData = await kv.get(`user:${assistant.userId}`);
    if (userData) {
      userData.leads = [...(userData.leads || []), leadId];
      await kv.set(`user:${assistant.userId}`, userData);
    }

    return c.json({ success: true, leadId });

  } catch (error) {
    console.log(`Error creating lead: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all leads for user
app.get('/make-server-12d56551/leads', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    const leadIds = userData?.leads || [];

    const leads = await Promise.all(
      leadIds.map(id => kv.get(`lead:${id}`))
    );

    // Return array directly, not wrapped in object
    return c.json(leads.filter(Boolean));

  } catch (error) {
    console.log(`Error fetching leads: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update lead
app.put('/make-server-12d56551/leads/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const leadId = c.req.param('id');
    const updates = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const lead = await kv.get(`lead:${leadId}`);
    
    if (!lead || lead.userId !== user.id) {
      return c.json({ error: 'Lead not found or unauthorized' }, 404);
    }

    const updatedLead = { ...lead, ...updates };
    await kv.set(`lead:${leadId}`, updatedLead);

    return c.json({ success: true, lead: updatedLead });

  } catch (error) {
    console.log(`Error updating lead: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete lead
app.delete('/make-server-12d56551/leads/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const leadId = c.req.param('id');
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const lead = await kv.get(`lead:${leadId}`);
    
    if (!lead || lead.userId !== user.id) {
      return c.json({ error: 'Lead not found or unauthorized' }, 404);
    }

    await kv.del(`lead:${leadId}`);

    // Update user's leads list
    const userData = await kv.get(`user:${user.id}`);
    if (userData) {
      userData.leads = (userData.leads || []).filter(id => id !== leadId);
      await kv.set(`user:${user.id}`, userData);
    }

    return c.json({ success: true });

  } catch (error) {
    console.log(`Error deleting lead: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== ADMIN ROUTES ====================

// Initialize admin account (run once)
app.post('/make-server-12d56551/admin/init', async (c) => {
  try {
    const ADMIN_EMAIL = 'admin@euconverto.com';
    const ADMIN_PASSWORD = 'Admin123!@#';

    const supabase = getSupabaseClient(true);
    
    // Check if admin already exists
    const existingAdmin = await kv.get('user:admin');
    if (existingAdmin) {
      return c.json({ message: 'Admin already exists' });
    }

    // Create admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      user_metadata: { 
        name: 'Administrator',
        company: 'EuConverto',
        role: 'admin'
      },
      email_confirm: true
    });

    if (error) {
      console.log(`Error creating admin: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store admin data
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email: ADMIN_EMAIL,
      name: 'Administrator',
      company: 'EuConverto',
      role: 'admin',
      plan: 'enterprise',
      theme: 'dark',
      language: 'pt',
      createdAt: new Date().toISOString(),
      assistants: [],
      leads: [],
      tags: []
    });

    await kv.set('user:admin', data.user.id);

    return c.json({ 
      success: true,
      message: 'Admin created successfully',
      credentials: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      }
    });

  } catch (error) {
    console.log(`Error initializing admin: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== EVENTS/CALENDAR ROUTES ====================

// Get all events for user
app.get('/make-server-12d56551/events', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    const eventIds = userData?.events || [];

    const events = await Promise.all(
      eventIds.map(id => kv.get(`event:${id}`))
    );

    return c.json(events.filter(Boolean));

  } catch (error) {
    console.log(`Error fetching events: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create event
app.post('/make-server-12d56551/events', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const eventData = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const eventId = crypto.randomUUID();
    const event = {
      id: eventId,
      userId: user.id,
      ...eventData,
      createdAt: new Date().toISOString()
    };

    await kv.set(`event:${eventId}`, event);

    // Update user's events list
    const userData = await kv.get(`user:${user.id}`);
    if (userData) {
      userData.events = [...(userData.events || []), eventId];
      await kv.set(`user:${user.id}`, userData);
    }

    return c.json({ success: true, event });

  } catch (error) {
    console.log(`Error creating event: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update event
app.put('/make-server-12d56551/events/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const eventId = c.req.param('id');
    const updates = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const event = await kv.get(`event:${eventId}`);
    
    if (!event || event.userId !== user.id) {
      return c.json({ error: 'Event not found or unauthorized' }, 404);
    }

    const updatedEvent = { ...event, ...updates };
    await kv.set(`event:${eventId}`, updatedEvent);

    return c.json({ success: true, event: updatedEvent });

  } catch (error) {
    console.log(`Error updating event: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete event
app.delete('/make-server-12d56551/events/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const eventId = c.req.param('id');
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const event = await kv.get(`event:${eventId}`);
    
    if (!event || event.userId !== user.id) {
      return c.json({ error: 'Event not found or unauthorized' }, 404);
    }

    await kv.del(`event:${eventId}`);

    // Update user's events list
    const userData = await kv.get(`user:${user.id}`);
    if (userData) {
      userData.events = (userData.events || []).filter(id => id !== eventId);
      await kv.set(`user:${user.id}`, userData);
    }

    return c.json({ success: true });

  } catch (error) {
    console.log(`Error deleting event: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== TAGS ROUTES ====================

// Get all tags for user
app.get('/make-server-12d56551/tags', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    const tags = userData?.tags || [];

    return c.json(tags);

  } catch (error) {
    console.log(`Error fetching tags: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create tag
app.post('/make-server-12d56551/tags', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { name, color } = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    const tags = userData?.tags || [];
    
    const newTag = {
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: new Date().toISOString()
    };

    tags.push(newTag);
    userData.tags = tags;
    await kv.set(`user:${user.id}`, userData);

    return c.json({ success: true, tag: newTag });

  } catch (error) {
    console.log(`Error creating tag: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== FEEDBACK ROUTES ====================

// Send feedback email
app.post('/make-server-12d56551/feedback', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { type, title, message } = await c.req.json();
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user data for name/email
    const userData = await kv.get(`user:${user.id}`);
    const userName = userData?.name || 'Utilizador';
    const userEmail = userData?.email || user.email;

    // Send email using Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      // Save feedback to database even if email fails
      const feedbackId = crypto.randomUUID();
      await kv.set(`feedback:${feedbackId}`, {
        id: feedbackId,
        userId: user.id,
        userEmail,
        userName,
        type,
        title,
        message,
        createdAt: new Date().toISOString()
      });
      
      return c.json({ 
        success: true, 
        message: 'Feedback guardado! (Email não configurado)' 
      });
    }

    // Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'EuConverto <feedback@euconverto.com>',
        to: ['marcosthenomad@gmail.com'],
        subject: `[EuConverto] ${type === 'bug' ? '🐛 Bug' : type === 'feature' ? '💡 Nova Funcionalidade' : type === 'improvement' ? '✨ Melhoria' : '💬 Feedback'}: ${title}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                .info-box { background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #667eea; }
                .label { font-weight: bold; color: #667eea; }
                .message-box { background: white; padding: 20px; border-radius: 6px; margin-top: 15px; white-space: pre-wrap; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">🎯 Novo Feedback Recebido</h2>
                </div>
                <div class="content">
                  <div class="info-box">
                    <p><span class="label">Tipo:</span> ${type === 'bug' ? '🐛 Bug' : type === 'feature' ? '💡 Nova Funcionalidade' : type === 'improvement' ? '✨ Melhoria' : '💬 Outro'}</p>
                    <p><span class="label">Título:</span> ${title}</p>
                    <p><span class="label">De:</span> ${userName} (${userEmail})</p>
                    <p><span class="label">User ID:</span> ${user.id}</p>
                    <p><span class="label">Data:</span> ${new Date().toLocaleString('pt-PT')}</p>
                  </div>
                  
                  <div class="message-box">
                    <p style="margin: 0 0 10px 0;"><span class="label">Mensagem:</span></p>
                    <p>${message}</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `
      })
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Error sending email:', errorData);
      
      // Save feedback even if email fails
      const feedbackId = crypto.randomUUID();
      await kv.set(`feedback:${feedbackId}`, {
        id: feedbackId,
        userId: user.id,
        userEmail,
        userName,
        type,
        title,
        message,
        createdAt: new Date().toISOString()
      });
      
      return c.json({ 
        success: true, 
        message: 'Feedback guardado! Email não enviado.' 
      });
    }

    // Save feedback to database for record
    const feedbackId = crypto.randomUUID();
    await kv.set(`feedback:${feedbackId}`, {
      id: feedbackId,
      userId: user.id,
      userEmail,
      userName,
      type,
      title,
      message,
      emailSent: true,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true, 
      message: 'Feedback enviado com sucesso!' 
    });

  } catch (error) {
    console.log(`Error sending feedback: ${error}`);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Health check
app.get('/make-server-12d56551/health', (c) => {
  return c.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'euconverto-api'
  });
});

Deno.serve(app.fetch);