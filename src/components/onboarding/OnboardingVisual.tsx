import React from 'react';
import { CheckIcon } from 'lucide-react';
import { images } from '../../data/images';

const checklist = [
{ text: 'Retake the photo tomorrow', done: true },
{ text: 'Check nearby plants', done: true },
{ text: 'Ask your technician', done: false }];


const timeline = [
{ date: 'Oct 4', img: images.diseaseSheathBlight, blur: true },
{ date: 'Oct 5', img: images.fieldRiverside, blur: false },
{ date: 'Oct 6', img: images.diseaseSheathBlight, blur: false }];


export function OnboardingVisual({ index }: {index: number;}) {
  if (index === 0) {
    return (
      <img
        src={images.onboardingScan}
        alt="Illustration of a phone photographing a rice leaf"
        className="aspect-square w-full max-w-[280px] rounded-[28px] object-cover" />);


  }

  if (index === 1) {
    return (
      <div className="w-full max-w-[300px] rounded-card border border-line bg-card p-4 shadow-card" role="img" aria-label="Example leaf result with a short checklist">
        <div className="flex items-center gap-3">
          <img src={images.diseaseSheathBlight} alt="" className="h-16 w-16 rounded-2xl object-cover" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink-muted">Example result</p>
            <p className="text-[17px] font-bold leading-tight text-primary-dark">Possible Sheath Blight</p>
            <span className="mt-1 inline-block rounded-full bg-warn-soft px-2 py-0.5 text-[12px] font-semibold text-warn">Follow-up needed</span>
          </div>
        </div>
        <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
          {checklist.map((c) =>
          <li key={c.text} className="flex items-center gap-2.5">
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${c.done ? 'bg-primary text-white' : 'border-2 border-line'}`}>
                {c.done && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
              </span>
              <span className={`text-[15px] ${c.done ? 'text-ink' : 'text-ink-muted'}`}>{c.text}</span>
            </li>
          )}
        </ul>
      </div>);

  }

  return (
    <div className="w-full max-w-[300px]" role="img" aria-label="A field card connected to dated observation photos">
      <div className="flex items-center gap-3 rounded-card border border-line bg-card p-3 shadow-card">
        <img src={images.fieldRiverside} alt="" className="h-14 w-14 rounded-xl object-cover" />
        <div>
          <p className="text-[16px] font-bold text-primary-dark">Riverside Plot</p>
          <p className="text-[13px] text-ink-muted">1.2 ha · Tillering</p>
        </div>
      </div>
      <div className="relative mx-6 h-8" aria-hidden>
        <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-primary/40" />
        <span className="absolute inset-x-[16%] top-4 h-0.5 bg-primary/40" />
        {[16, 50, 84].map((x) =>
        <span key={x} className="absolute top-4 h-4 w-0.5 -translate-x-1/2 bg-primary/40" style={{ left: `${x}%` }} />
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {timeline.map((p) =>
        <div key={p.date} className="flex flex-col items-center gap-1.5">
            <span className="h-[72px] w-full overflow-hidden rounded-2xl border-2 border-card shadow-card">
              <img src={p.img} alt="" className={`h-full w-full object-cover ${p.blur ? 'blur-[2px]' : ''}`} />
            </span>
            <span className="rounded-full bg-card px-2 py-0.5 text-[12px] font-semibold text-primary-dark ring-1 ring-line">{p.date}</span>
          </div>
        )}
      </div>
    </div>);

}