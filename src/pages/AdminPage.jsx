import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Users, CalendarDays, FileCheck2, CalendarCheck, RefreshCw, Lock, ArrowLeft } from 'lucide-react';
import DownloadStructure from '@/components/DownloadStructure';

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const res = await base44.functions.invoke('getAdminStats', { today_start: todayStart });
      setStats(res.data);
    } catch (e) {
      const status = e?.response?.status;
      if (status === 403) {
        setError('관리자 권한이 필요합니다. 관리자 계정으로 로그인해 주세요.');
      } else {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-sm p-8 text-center">
          <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground font-medium mb-4">{error}</p>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> 홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const cards = [
    { label: '전체 방문자', value: stats?.totalVisits, icon: Users, color: 'blue' },
    { label: '오늘 방문자', value: stats?.todayVisits, icon: CalendarDays, color: 'green' },
    { label: 'PAS-1 PDF 완료자 (전체)', value: stats?.totalCompletions, icon: FileCheck2, color: 'purple' },
    { label: 'PAS-1 PDF 완료자 (오늘)', value: stats?.todayCompletions, icon: CalendarCheck, color: 'orange' },
  ];

  const colorMap = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    purple: 'from-purple-500 to-purple-700',
    orange: 'from-orange-500 to-orange-700',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">🔒 관리자 대시보드</h1>
            <p className="text-xs text-primary-foreground/70">방문자 및 PAS-1 신청 완료 통계</p>
          </div>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> 새로고침
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {loading && !stats ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className={`h-1.5 bg-gradient-to-r ${colorMap[card.color]}`} />
                  <div className="p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[card.color]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-0.5">{card.value ?? '—'}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 bg-muted rounded-xl p-4 text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-1">📊 통계 안내</p>
          <ul className="space-y-1">
            <li>• <strong>방문자</strong>: 브라우저 세션 기준 고유 방문자 수 (중복 제외)</li>
            <li>• <strong>PAS-1 PDF 완료자</strong>: PAS-1 양식 작성 후 "인쇄 / PDF 저장" 버튼을 누른 사용자 수</li>
            <li>• <strong>오늘</strong>: 현재 날짜 기준 자정부터 집계</li>
          </ul>
        </div>

        <div className="mt-6 bg-card rounded-2xl border border-border shadow-sm p-5">
          <h3 className="text-sm font-bold text-foreground mb-1">📋 앱 구조도</h3>
          <p className="text-xs text-muted-foreground mb-3">전체 페이지, 컴포넌트, 엔티티, 백엔드 함수 구조를 HTML 파일로 다운로드합니다.</p>
          <DownloadStructure />
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> 홈으로
          </Link>
        </div>
      </main>
    </div>
  );
}