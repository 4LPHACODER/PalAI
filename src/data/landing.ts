import {
  CameraIcon,
  ClipboardListIcon,
  CrosshairIcon,
  FileTextIcon,
  GridIcon,
  LayersIcon,
  MapIcon,
  NotebookPenIcon,
  ScanSearchIcon,
  Share2Icon,
  SmartphoneIcon,
  WavesIcon,
  ScanIcon } from
'lucide-react';

export const mobileFeatures = [
{ icon: CameraIcon, label: 'Camera capture and photo upload' },
{ icon: ScanSearchIcon, label: 'Preliminary disease screening' },
{ icon: ClipboardListIcon, label: 'Field-linked records' },
{ icon: NotebookPenIcon, label: 'Follow-up observations' }];


export const droneFeatures = [
{ icon: ScanIcon, label: 'Aerial field coverage' },
{ icon: MapIcon, label: 'Survey imagery and field boundaries' },
{ icon: LayersIcon, label: 'Multispectral layers, when the survey equipment supports them' },
{ icon: WavesIcon, label: 'Stress-pattern visualization' },
{ icon: CrosshairIcon, label: 'Inspection-priority maps' }];


export const workflowStages = [
{
  icon: SmartphoneIcon,
  title: 'Mobile observation',
  text: 'A farmer captures a rice-leaf photo and saves a screening result.',
  exampleLabel: 'Mobile observation',
  example: 'Possible Brown Spot'
},
{
  icon: Share2Icon,
  title: 'Shared field record',
  text: 'Selected observations become available to a participating organization with the farmer’s permission.',
  exampleLabel: 'Field',
  example: 'Riverside Plot'
},
{
  icon: LayersIcon,
  title: 'Drone survey review',
  text: 'The organization reviews available aerial imagery alongside field observations.',
  exampleLabel: 'Drone layer',
  example: 'Sample crop-stress pattern'
},
{
  icon: FileTextIcon,
  title: 'Action report',
  text: 'Personnel prepare inspection priorities and follow-up actions.',
  exampleLabel: 'Next action',
  example: 'Inspect the marked area'
}];


export const institutionalBenefits = [
{ icon: GridIcon, title: 'Review multiple fields', text: 'See shared farmer records and survey layers for many fields in one place.' },
{ icon: CrosshairIcon, title: 'Locate areas needing inspection', text: 'Aerial patterns and ground observations point teams to where to look first.' },
{ icon: FileTextIcon, title: 'Prepare coordinated follow-up reports', text: 'Turn inspection priorities into clear next steps for field personnel.' }];