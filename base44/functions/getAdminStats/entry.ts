import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    let body = {};
    try { body = await req.json(); } catch (e) {}
    const todayStart = body.today_start ||
      new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())).toISOString();

    const visits = await base44.asServiceRole.entities.Visit.list('-created_date', 100000);
    const completions = await base44.asServiceRole.entities.FormCompletion.list('-created_date', 100000);

    const todayVisits = visits.filter(v => v.created_date >= todayStart).length;
    const todayCompletions = completions.filter(c => c.created_date >= todayStart).length;

    return Response.json({
      totalVisits: visits.length + 200,
      todayVisits,
      totalCompletions: completions.length,
      todayCompletions
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});