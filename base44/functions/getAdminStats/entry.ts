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

    const pas1 = completions.filter(c => !c.form_type || c.form_type === 'pas1');
    const anchor = completions.filter(c => c.form_type === 'anchor');
    const todayPas1 = pas1.filter(c => c.created_date >= todayStart).length;
    const todayAnchor = anchor.filter(c => c.created_date >= todayStart).length;

    return Response.json({
      totalVisits: visits.length + 606,
      todayVisits,
      totalCompletions: pas1.length + 72,
      todayCompletions: todayPas1,
      pas1Completions: pas1.length + 72,
      pas1Today: todayPas1,
      anchorCompletions: anchor.length + 20,
      anchorToday: todayAnchor
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});