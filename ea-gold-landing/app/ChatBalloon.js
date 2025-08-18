"use client";
    import { usePathname } from 'next/navigation';
    import { useState } from 'react';
    import { X, ChevronLeft } from 'lucide-react';

    const LINE_URL = "https://lin.ee/Vv8zh6d5";
    const TELEGRAM_URL = "https://t.me/mapa_trading_bot";

    export default function ChatBalloon() {
      const [collapsed, setCollapsed] = useState(false);
      const pathname = usePathname();
      const lang = pathname.split('/')[1] || 'en';
      const isThai = lang === 'th';
      const href = isThai ? LINE_URL : TELEGRAM_URL;

      return (
        <>
          <style>{`
            .chat-bounce {
              animation: bounce 1.2s infinite;
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0) scale(1);}
              20% { transform: translateY(-12px) scale(1.08);}
              40% { transform: translateY(0) scale(1);}
              60% { transform: translateY(-8px) scale(1.04);}
              80% { transform: translateY(0) scale(1);}
            }
            .chat-circle {
              background: ${isThai ? '#eaffea' : '#eaf4ff'};
              border-radius: 50%;
              width: 64px;
              height: 64px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.15);
              border: 3px solid ${isThai ? '#06C755' : '#0088cc'};
              position: relative;
              overflow: visible;
            }
            .chat-circle::after {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 50%;
              pointer-events: none;
              box-shadow: 0 0 16px 2px ${isThai ? '#06C75555' : '#0088cc55'};
              opacity: 0.3;
            }
            .chat-close-btn {
              position: absolute;
              top: 4px;
              right: 4px;
              background: rgba(255,255,255,0.9);
              border: 1px solid #ccc;
              border-radius: 50%;
              width: 22px;
              height: 22px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 1px 4px rgba(0,0,0,0.12);
              z-index: 2;
            }
            .chat-close-btn:hover {
              background: #ec0606ff;
            }
            .chat-toggle-btn {
              position: fixed;
              right: 16px;
              top: 50%;
              transform: translateY(-50%);
              z-index: 1000;
              background: #fff;
              border: 2px solid #ccc;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 1px 4px rgba(0,0,0,0.12);
            }
            .chat-toggle-btn:hover {
              background: #f5f5f5;
            }
          `}</style>
          {!collapsed ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'fixed',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1000,
                textDecoration: 'none',
              }}
              aria-label="Chat with administrator"
            >
              <div className="chat-circle chat-bounce" style={{ position: 'relative' }}>
                <span
                  className="chat-close-btn"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCollapsed(true);
                  }}
                  title="Hide"
                >
                  <X size={14} color="#333" />
                </span>
                <img
                  src="/images/chat.png"
                  alt="Chat"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.12))',
                  }}
                />
              </div>
            </a>
          ) : (
            <span
              className="chat-toggle-btn"
              onClick={() => setCollapsed(false)}
              title="Show chat balloon"
            >
              <ChevronLeft size={24} color="#333" style={{ transform: 'rotate(180deg)' }} />
            </span>
          )}
        </>
      );
    }