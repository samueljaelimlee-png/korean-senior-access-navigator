import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { type, session_id, page } = body;

    if (!session_id) {
      return Response.json({ error: 'session_id required' }, { status: 400 });
    }

    if (type === 'visit') {
      await base44.asServiceRole.entities.Visit.create({ session_id, page: page || '/' });
      return Response.json({ status: 'ok' });
    }

    if (type === 'completion') {
      // Only deduplicate within the same calendar day (UTC)
      const todayStart = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())).toISOString();
      const existing = await base44.asServiceRole.entities.FormCompletion.filter({ session_id });
      const alreadyToday = existing.some(c => c.created_date >= todayStart);
      if (!alreadyToday) {
        await base44.asServiceRole.entities.FormCompletion.create({ session_id });
      }
      return Response.json({ status: 'ok' });
    }

    return Response.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});