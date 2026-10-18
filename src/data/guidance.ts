import type { TKey } from './translations';
import { DiseaseCode, GuidanceStep, KnownDiseaseCode, ScanAnalysis, SourceRef } from '../types/farm';

export const GUIDANCE_VERSION = '2026-10-da-v2';

export interface DiseaseGuidance {
  code: DiseaseCode;
  titleKey: TKey;
  /** One short explanation shown under the possible disease. */
  labelKey: TKey;
  /** At most two signs for the farmer to inspect — never claimed as image findings. */
  signKeys: TKey[];
  analysis: ScanAnalysis;
  steps: GuidanceStep[];
}

const src = (docId: SourceRef['docId'], sectionKey: TKey, printedPage: string, pdfPage: number, pdfPages?: string): SourceRef => ({
  docId,
  sectionKey,
  printedPage,
  pdfPage,
  pdfPages
});

// Verified source mapping
const fieldExam = src('pagdumala', 'sec.fieldExam', '1', 4);
const nutrient = src('palaycheck', 'sec.nutrient', '20–24', 25, '25–29');
const prevention = src('palaycheck', 'sec.varietySync', '40', 45);
const bacterialBlight = src('hybrid', 'sec.bacterialBlight', '10–12', 12, '12–14');
const tungro = src('hybrid', 'sec.tungro', '13–16', 15, '15–18');

type StepSeed = [id: string, textKey: TKey, whenKey: TKey, type: GuidanceStep['type'], group: GuidanceStep['group'], sources: SourceRef[]];
const steps = (seeds: StepSeed[]): GuidanceStep[] =>
seeds.map(([id, textKey, whenKey, type, group, sources]) => ({ id, textKey, whenKey, type, group, sources }));

export const guidanceLibrary: Record<DiseaseCode, DiseaseGuidance> = {
  sheath_blight: {
    code: 'sheath_blight',
    titleKey: 'disease.sheath_blight.title',
    labelKey: 'disease.sheath_blight.label',
    signKeys: ['guide.sb.sign1', 'guide.sb.sign2'],
    analysis: { signsKey: 'guide.sb.signs', noteKeys: ['guide.sb.note'] },
    steps: steps([
    ['sb-1', 'guide.sb.s1', 'when.beforeRefertilize', 'prevention', 'now', [nutrient]],
    ['sb-2', 'guide.sb.s2', 'when.now', 'inspection', 'now', [fieldExam]],
    ['sb-3', 'guide.sb.s3', 'when.now', 'technician', 'now', [fieldExam]],
    ['sb-4', 'guide.sb.s4', 'when.nextPlanting', 'prevention', 'next', [prevention]]]
    )
  },
  tungro: {
    code: 'tungro',
    titleKey: 'disease.tungro.title',
    labelKey: 'disease.tungro.label',
    signKeys: ['guide.tu.sign1', 'guide.tu.sign2'],
    analysis: { signsKey: 'guide.tu.signs', noteKeys: ['guide.tu.note', 'guide.hybridNote'] },
    steps: steps([
    ['tu-1', 'guide.tu.s1', 'when.afterSigns', 'technician', 'now', [tungro]],
    ['tu-2', 'guide.tu.s2', 'when.beforeInsecticide', 'inspection', 'now', [tungro]],
    ['tu-3', 'guide.tu.s3', 'when.afterHarvest', 'prevention', 'next', [tungro]],
    ['tu-4', 'guide.tu.s4', 'when.nextPlanting', 'prevention', 'next', [tungro]]]
    )
  },
  blast: {
    code: 'blast',
    titleKey: 'disease.blast.title',
    labelKey: 'disease.blast.label',
    signKeys: ['guide.bl.sign1', 'guide.bl.sign2'],
    analysis: { signsKey: 'guide.bl.signs', noteKeys: ['guide.bl.note'] },
    steps: steps([
    ['bl-1', 'guide.bl.s1', 'when.beforeRefertilize', 'prevention', 'now', [nutrient]],
    ['bl-2', 'guide.bl.s2', 'when.now', 'inspection', 'now', [fieldExam]],
    ['bl-3', 'guide.bl.s3', 'when.now', 'technician', 'now', [fieldExam]],
    ['bl-4', 'guide.bl.s4', 'when.nextPlanting', 'prevention', 'next', [prevention]]]
    )
  },
  bacterial_blight: {
    code: 'bacterial_blight',
    titleKey: 'disease.bacterial_blight.title',
    labelKey: 'disease.bacterial_blight.label',
    signKeys: ['guide.bb.sign1', 'guide.bb.sign2'],
    analysis: { signsKey: 'guide.bb.signs', noteKeys: ['guide.hybridNote'] },
    steps: steps([
    ['bb-1', 'guide.bb.s1', 'when.beforeFertilize', 'prevention', 'now', [bacterialBlight]],
    ['bb-2', 'guide.bb.s2', 'when.beforeIrrigate', 'prevention', 'now', [bacterialBlight]],
    ['bb-3', 'guide.bb.s3', 'when.beforeIrrigate', 'technician', 'now', [bacterialBlight]],
    ['bb-4', 'guide.bb.s4', 'when.afterFieldCheck', 'technician', 'now', [bacterialBlight]]]
    )
  },
  uncertain: {
    code: 'uncertain',
    titleKey: 'disease.uncertain.title',
    labelKey: 'disease.uncertain.label',
    signKeys: [],
    // No disease-specific treatment is attached to an unknown result.
    analysis: { signsKey: null, noteKeys: [] },
    steps: []
  }
};

export const knownDiseases: KnownDiseaseCode[] = ['sheath_blight', 'tungro', 'blast', 'bacterial_blight'];

/** Default top-match confidence when a record has none stored. */
const defaultConfidence: Record<KnownDiseaseCode, number> = { blast: 91, sheath_blight: 87, tungro: 84, bacterial_blight: 89 };

/** Top match first, then the remaining diseases sharing what is left, so all values add up to 100. */
export function confidenceBreakdown(code: DiseaseCode, top?: number): {code: KnownDiseaseCode;pct: number;}[] {
  if (code === 'uncertain') return [];
  const main = Math.round(top ?? defaultConfidence[code]);
  const others = knownDiseases.filter((d) => d !== code);
  const weights = [0.55, 0.3, 0.15];
  let rest = 100 - main;
  const list = others.map((d, i) => {
    const pct = i === others.length - 1 ? rest : Math.round((100 - main) * weights[i]);
    rest -= pct;
    return { code: d, pct };
  });
  return [{ code, pct: main }, ...list];
}

/** Copies structured guidance for a disease code so a saved record keeps its exact version. */
export function guidanceForCode(code: DiseaseCode): {analysis: ScanAnalysis;steps: GuidanceStep[];} {
  const g = guidanceLibrary[code];
  return {
    analysis: { signsKey: g.analysis.signsKey, noteKeys: [...g.analysis.noteKeys] },
    steps: g.steps.map((s) => ({ ...s, sources: s.sources.map((r) => ({ ...r })) }))
  };
}