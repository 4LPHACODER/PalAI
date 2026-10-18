import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrandMark } from '../../components/BrandMark';
import { OnboardingVisual } from '../../components/onboarding/OnboardingVisual';
import { useSession } from '../../contexts/SessionContext';
import { languageOptions, TKey } from '../../data/translations';
import { useT } from '../../hooks/useT';

const slides: {title: TKey;text: TKey;}[] = [
{ title: 'onb.1.title', text: 'onb.1.text' },
{ title: 'onb.2.title', text: 'onb.2.text' },
{ title: 'onb.3.title', text: 'onb.3.text' }];


export function Onboarding() {
  const t = useT();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [params] = useSearchParams();
  const { session, language, setLanguage, completeOnboarding, signInDemo } = useSession();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const isReplay = params.get('replay') === '1' && !!session;
  const isLast = index === slides.length - 1;

  const finish = (target: string) => {
    completeOnboarding();
    navigate(session ? isReplay ? '/profile' : '/' : target, { replace: true });
  };

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-primary-soft">
      <div className="mx-auto flex min-h-screen w-full max-w-[640px] flex-col bg-canvas px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[calc(env(safe-area-inset-top)+12px)] min-[390px]:px-5 md:border-x md:border-line md:px-8">
        <header className="flex items-center justify-between gap-2">
          <BrandMark />
          <button type="button" onClick={() => finish('/signin')} className="-mr-2 h-12 px-2 text-[15px] font-semibold text-ink-muted">
            {isReplay ? t('common.done') : t('common.skip')}
          </button>
        </header>

        <div role="radiogroup" aria-label={t('common.language')} className="mt-4 grid grid-cols-3 gap-1 rounded-2xl bg-card p-1 ring-1 ring-line">
          {languageOptions.map((l) =>
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={language === l.code}
            lang={l.code}
            onClick={() => setLanguage(l.code)}
            className={`h-12 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
            language === l.code ? 'bg-primary text-white' : 'text-ink'}`
            }>
            
              {l.label}
            </button>
          )}
        </div>

        <section aria-roledescription="carousel" aria-label="Introduction" className="flex flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-1 flex-col"
              aria-live="polite">
              
              <div className="flex min-h-[300px] flex-1 items-center justify-center py-6">
                <OnboardingVisual index={index} />
              </div>
              <h1 className="text-center text-[28px] font-bold leading-tight text-primary-dark">{t(slides[index].title)}</h1>
              <p className="mx-auto mt-2 max-w-[320px] text-center text-[17px] leading-relaxed text-ink-muted">{t(slides[index].text)}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2" aria-label={`Step ${index + 1} of ${slides.length}`} role="img">
            {slides.map((s, i) =>
            <span
              key={s.title}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-200 ease-out ${i === index ? 'w-8 bg-primary' : 'w-2.5 bg-line'}`} />

            )}
          </div>
        </section>

        <div className="mt-6 flex gap-2">
          {index > 0 &&
          <button type="button" onClick={() => go(index - 1)} className="h-14 flex-1 rounded-2xl border border-line bg-card text-[17px] font-bold text-primary">
              {t('common.back')}
            </button>
          }
          <button
            type="button"
            onClick={() => isLast ? finish('/register') : go(index + 1)}
            className="h-14 flex-[2] rounded-2xl bg-primary text-[17px] font-bold text-white shadow-cta transition-transform duration-150 ease-out active:scale-[0.98]">
            
            {isLast ? isReplay ? t('common.done') : t('common.getStarted') : t('common.next')}
          </button>
        </div>
        {!session &&
        <button
          type="button"
          onClick={() => {
            signInDemo();
            navigate('/', { replace: true });
          }}
          className="mt-2 h-14 w-full rounded-2xl border-2 border-accent bg-accent-soft text-[17px] font-bold text-primary-dark">
          
            {t('common.tryDemo')}
          </button>
        }
      </div>
    </div>);

}