import type { LangCode } from '../types/farm';
import { appStrings } from './i18n/app';
import { commonStrings } from './i18n/common';
import { guidanceStrings } from './i18n/guidance';
import { scanStrings } from './i18n/scan';
import { screenStrings } from './i18n/screens';
import { landingStrings } from './i18n/landing';

export const languageOptions: {code: LangCode;label: string;}[] = [
{ code: 'ceb', label: 'Cebuano' },
{ code: 'en', label: 'English' },
{ code: 'fil', label: 'Filipino' }];


export const DEFAULT_LANGUAGE: LangCode = 'ceb';

const all = {
  ...commonStrings,
  ...appStrings,
  ...scanStrings,
  ...guidanceStrings,
  ...screenStrings,
  ...landingStrings
};

export type TKey = keyof typeof all;
export type TVars = Record<string, string | number>;

const en = {} as Record<TKey, string>;
const ceb = {} as Record<TKey, string>;
(Object.keys(all) as TKey[]).forEach((k) => {
  en[k] = all[k][0];
  ceb[k] = all[k][1];
});

/** Filipino is partial; missing keys fall back to English. */
const fil: Partial<Record<TKey, string>> = {
  'nav.home': 'Tahanan',
  'nav.fields': 'Mga Bukid',
  'nav.scan': 'I-scan',
  'nav.records': 'Talaan',
  'nav.profile': 'Profile',
  'common.next': 'Susunod',
  'common.back': 'Bumalik',
  'common.skip': 'Laktawan ang intro',
  'common.getStarted': 'Magsimula',
  'common.tryDemo': 'Subukan ang Demo',
  'common.save': 'I-save',
  'common.saveContinue': 'I-save at Magpatuloy',
  'common.saveChanges': 'I-save ang Pagbabago',
  'common.cancel': 'Kanselahin',
  'common.close': 'Isara',
  'common.edit': 'I-edit',
  'common.viewAll': 'Tingnan Lahat',
  'common.change': 'Palitan',
  'common.keepEditing': 'Ituloy ang Pag-edit',
  'common.discard': 'Itapon',
  'common.retry': 'Subukan muli',
  'common.notRecorded': 'Hindi naitala',
  'common.optional': 'Opsyonal',
  'common.done': 'Tapos',
  'common.signOut': 'Mag-sign Out',
  'common.viewField': 'Tingnan ang Bukid',
  'common.addObservation': 'Magdagdag ng Obserbasyon',
  'common.scanLeaf': 'I-scan ang Dahon ng Palay',
  'common.savePreferences': 'I-save ang Kagustuhan',
  'common.stopSharing': 'Itigil ang Pagbabahagi',
  'common.language': 'Wika',
  'onb.1.title': 'Suriin ang iyong palay',
  'onb.1.text': 'Kumuha ng litrato ng dahon para masuri ang posibleng sakit.',
  'onb.2.title': 'Alamin ang susunod na hakbang',
  'onb.2.text': 'Basahin ang praktikal na gabay at itala ang iyong mga obserbasyon.',
  'onb.3.title': 'Bantayan ang iyong mga bukid',
  'onb.3.text': 'I-save ang mga talaan ng bukid at sundan ang mga pagbabago.',
  'auth.signIn': 'Mag-sign In',
  'auth.createAccount': 'Gumawa ng Account',
  'auth.forgot': 'Nakalimutan ang Password?',
  'auth.confirmPassword': 'Kumpirmahin ang password',
  'auth.fullName': 'Buong pangalan',
  'auth.show': 'Ipakita',
  'auth.hide': 'Itago',
  'auth.welcomeBack': 'Maligayang pagbabalik',
  'auth.createTitle': 'Gumawa ng iyong account',
  'auth.resetTitle': 'I-reset ang password',
  'auth.backToSignIn': 'Bumalik sa Sign In',
  'auth.or': 'o',
  'form.displayName': 'Pangalang ipapakita',
  'form.province': 'Lalawigan',
  'form.city': 'Lungsod o munisipalidad',
  'form.locationDetail': 'Sitio, purok, o paglalarawan ng lugar',
  'form.mobile': 'Numero ng mobile',
  'form.coop': 'Kooperatiba o samahan ng magsasaka',
  'form.profilePhoto': 'Larawan sa profile',
  'form.language': 'Gustong wika',
  'field.name': 'Pangalan ng bukid',
  'field.area': 'Lawak (ektarya)',
  'field.variety': 'Barayti ng palay',
  'field.plantingDate': 'Petsa ng pagtatanim',
  'field.stage': 'Kasalukuyang yugto ng palay',
  'field.notes': 'Mga tala',
  'field.photo': 'Larawan ng bukid',
  'field.addField': 'Magdagdag ng Bukid',
  'field.editField': 'I-edit ang Bukid',
  'field.saveField': 'I-save ang Bukid',
  'field.stageDetails': 'Detalye',
  'field.stageLocation': 'Lokasyon',
  'field.stageReview': 'Suriin',
  'field.archive': 'I-archive ang Bukid',
  'field.restore': 'Ibalik ang Bukid',
  'home.greeting': 'Magandang araw',
  'home.subtitle': 'Suriin natin ang iyong palay ngayon.',
  'home.myField': 'Aking Bukid',
  'home.allFields': 'Lahat ng Bukid',
  'home.recentScans': 'Mga Bagong Scan',
  'fields.subtitle': 'Itago ang mga talaan ng iyong bukid sa iisang lugar.',
  'fields.search': 'Hanapin ayon sa pangalan o lokasyon',
  'fields.all': 'Lahat',
  'fields.active': 'Aktibo',
  'fields.archived': 'Naka-archive',
  'profile.edit': 'I-edit ang Profile',
  'profile.sharing': 'Pagbabahagi ng Datos',
  'profile.replay': 'Ulitin ang Intro',
  'obs.label': 'Obserbasyon ng magsasaka',
  'obs.date': 'Petsa ng obserbasyon'
};

export const translations: Record<LangCode, Partial<Record<TKey, string>>> & {en: Record<TKey, string>;} = {
  en,
  fil,
  ceb
};

/** Non-hook translator. Replaces {name} placeholders with vars. */
export function translate(lang: LangCode, key: TKey, vars?: TVars): string {
  const raw = translations[lang]?.[key] ?? translations.en[key] ?? String(key);
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (m, name: string) => vars[name] !== undefined ? String(vars[name]) : m);
}

/** English text → key, so messages produced as English strings (e.g. validators) can be shown in any language. */
const byEnglish = new Map<string, TKey>((Object.keys(en) as TKey[]).map((k) => [en[k], k]));

export function translateText(lang: LangCode, text: string): string {
  const key = byEnglish.get(text);
  return key ? translate(lang, key) : text;
}

export function isTKey(key: string): key is TKey {
  return key in translations.en;
}