import React, { useState } from 'react';
import { X, Send, ShieldAlert } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

const INQUIRY_TYPES = ['PAS-1', 'ANCHOR', 'ID.me', '앱 사용법'];

export default function ContactForm({ onClose }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [inquiryTypes, setInquiryTypes] = useState([]);
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const canSubmit = name.trim() && contact.trim() && inquiryTypes.length > 0 && message.trim() && agreed && !submitting;

  const toggleType = (t) => {
    setInquiryTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await base44.entities.ContactInquiry.create({
        name: name.trim(),
        contact: contact.trim(),
        inquiry_type: inquiryTypes,
        message: message.trim(),
      });
      setDone(true);
    } catch (err) {
      // let error bubble up visually
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="bg-background w-full sm:max-w-lg sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-b-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-base font-bold text-foreground">문의하기</h2>
              <p className="text-[11px] text-muted-foreground/70">Contact Us</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-lg font-bold text-foreground mb-2">문의가 접수되었습니다</h3>
            <p className="text-[11px] text-muted-foreground/70 mb-2">Your inquiry has been received</p>
            <p className="text-sm text-muted-foreground mb-6">입력해주신 연락처로 답변드리겠습니다. 감사합니다.</p>
            <Button onClick={onClose} className="px-8">확인 / OK</Button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="overflow-y-auto px-5 py-4 space-y-4 flex-1">
              {/* Privacy warning */}
              <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-red-800 leading-relaxed">
                  <p><strong>민감정보 안내:</strong> SSN(사회보장번호), 은행 계좌번호, 세금 보고서, 신분증 사진 등은 절대 보내지 마세요.</p>
                  <p className="text-[10px] text-red-700/70 mt-1"><strong>Privacy Notice:</strong> Never send SSN, bank account numbers, tax returns, or ID photos.</p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">이름 <span className="text-[11px] font-normal text-muted-foreground/70">Name</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="선택"
                  className="w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">연락 가능한 이메일 / 전화 <span className="text-[11px] font-normal text-muted-foreground/70">Email / Phone</span></label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="선택 (예: example@email.com 또는 201-123-4567)"
                  className="w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Inquiry type — multi-select */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">
                  문의 유형 <span className="text-xs font-normal text-muted-foreground">(여러 개 선택 가능)</span>
                </label>
                <p className="text-[11px] text-muted-foreground/60 mb-1.5">Inquiry Type (multiple selection allowed)</p>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleType(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                        inquiryTypes.includes(t)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-foreground border-input hover:bg-muted'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">간단한 질문 <span className="text-[11px] font-normal text-muted-foreground/70">Your Question</span></label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="자유 입력"
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer p-3 bg-muted rounded-lg">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-input text-primary flex-shrink-0"
                />
                <span className="text-xs text-foreground leading-relaxed">
                  저는 Social Security Number, 은행정보, 세금 보고서, 신분증 사진 등 민감정보를 보내지 않아야 함을 이해했습니다.
                  <span className="block text-[10px] text-muted-foreground/70 mt-1">
                    I understand I must not send sensitive information such as SSN, bank details, tax returns, or ID photos.
                  </span>
                </span>
              </label>
            </form>

            {/* Sticky submit button — always visible */}
            <div className="px-5 py-3 border-t border-border flex-shrink-0">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full py-6 text-base font-bold gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    전송 중... <span className="text-[10px] font-normal opacity-70">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> 문의 보내기 <span className="text-[10px] font-normal opacity-70">/ Submit</span>
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}