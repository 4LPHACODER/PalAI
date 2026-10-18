import type { TKey } from './translations';
import { DaDocId } from '../types/farm';

export interface DaDocument {
  id: DaDocId;
  /** Official document title — kept in its original language. */
  title: string;
  fileName: string;
  scopeKey: TKey;
  /**
   * URL of the supplied PDF. Left null until the file is attached;
   * the app then shows the citation with "Guide not attached yet" instead of a link.
   */
  url: string | null;
  /** Documents used only for context are never cited in treatment steps. */
  citedInSteps: boolean;
}

export const daDocuments: Record<DaDocId, DaDocument> = {
  pagdumala: {
    id: 'pagdumala',
    title: 'Giya sa Pagdumala sa Humayan',
    fileName: 'Giya sa Pagdumala sa Humayan.pdf',
    scopeKey: 'doc.pagdumala.scope',
    url: "/Giya-sa-Pagdumala-sa-Humayan.pdf",
    citedInSteps: true
  },
  palaycheck: {
    id: 'palaycheck',
    title: 'Sistemang Palay Check',
    fileName: 'Sistemang Palay Check.pdf',
    scopeKey: 'doc.palaycheck.scope',
    url: "/Sistemang-Palay-Check.pdf",
    citedInSteps: true
  },
  hybrid: {
    id: 'hybrid',
    title: 'Giya sa Pagtanum ug Hybrid Rice',
    fileName: 'Giya sa Pagtanum ug Hybrid Rice.pdf',
    scopeKey: 'doc.hybrid.scope',
    url: "/Giya-sa-Pagtanum-ug-Hybrid-Rice.pdf",
    citedInSteps: true
  },
  climate: {
    id: 'climate',
    title: 'Climate Change ug Paghumayan',
    fileName: 'Climate Change ug Paghumayan.pdf',
    scopeKey: 'doc.climate.scope',
    url: "/Climate-Change-ug-Paghumayan.pdf",
    citedInSteps: false
  },
  caraga: {
    id: 'caraga',
    title: 'DA-Caraga Annual Report 2020',
    fileName: 'DA-Caraga Annual Report 2020.pdf',
    scopeKey: 'doc.caraga.scope',
    url: "/DA-Caraga_Annual-Report-2020.pdf",
    citedInSteps: false
  }
};

export function guideLink(docId: DaDocId, pdfPage: number): string | null {
  const url = daDocuments[docId].url;
  return url ? `${url}#page=${pdfPage}` : null;
}