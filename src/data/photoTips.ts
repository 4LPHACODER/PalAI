import { FocusIcon, LeafIcon, SearchIcon, SunIcon } from 'lucide-react';
import type { TKey } from './translations';

export const photoTips: {icon: typeof SunIcon;titleKey: TKey;textKey: TKey;}[] = [
{ icon: SunIcon, titleKey: 'tip.light.title', textKey: 'tip.light.text' },
{ icon: LeafIcon, titleKey: 'tip.one.title', textKey: 'tip.one.text' },
{ icon: FocusIcon, titleKey: 'tip.focus.title', textKey: 'tip.focus.text' },
{ icon: SearchIcon, titleKey: 'tip.spots.title', textKey: 'tip.spots.text' }];