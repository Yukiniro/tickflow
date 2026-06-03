'use client';

import { useClock } from '@/hooks/use-clock';

export function DigitalWatch() {
  const { hours, minutes, seconds, ampm, mounted } = useClock();

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 金属斜面外框 */}
      <div className="digital-bezel rounded-3xl p-3 shadow-2xl">
        {/* 内嵌 LCD 屏幕 */}
        <div className="digital-screen relative flex flex-col items-center overflow-hidden rounded-2xl px-12 py-10">
          {/* 幽灵段码与活动数字叠放在同一网格单元,保证 88:88:88 精确叠在数字背后 */}
          <div className="grid font-mono text-[16vw] font-bold tabular-nums leading-none">
            <span aria-hidden className="digital-ghost pointer-events-none" style={{ gridArea: '1 / 1' }}>
              88<span>:</span>88<span>:</span>88
            </span>
            <span className="digital-digits" style={{ gridArea: '1 / 1' }}>
              {String(hours).padStart(2, '0')}
              {/* 点亮冒号每秒滴答闪烁(幽灵段码保持常亮),延续全站 tick 签名 */}
              <span key={`c1-${seconds}`} className="animate-tick inline-block">
                :
              </span>
              {String(minutes).padStart(2, '0')}
              <span key={`c2-${seconds}`} className="animate-tick inline-block">
                :
              </span>
              {String(seconds).padStart(2, '0')}
            </span>
          </div>
          {ampm && (
            <div className="digital-digits relative mt-2 text-[4vw] font-medium opacity-70">
              {ampm}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}