import { dict } from './dict';

/**
 * Public landing page, drone previews and sample survey data.
 * Data files keep their English text; components show it through translateText, which finds these entries.
 */
export const landingStrings = dict({
  // Nav & hero
  'ld.nav.mobile': ['Mobile screening', 'Pagsusi sa mobile'],
  'ld.nav.drone': ['Drone insights', 'Mga nakita sa drone'],
  'ld.nav.teams': ['For teams', 'Alang sa mga grupo'],
  'ld.nav.aria': ['Overview sections', 'Mga seksiyon sa paglantaw'],
  'ld.nav.open': ['Open app', 'Ablihi ang app'],
  'ld.nav.signIn': ['Sign in', 'Mosulod'],
  'ld.hero.title': ['From a single leaf to the entire field.', 'Gikan sa usa ka dahon ngadto sa tibuok humayan.'],
  'ld.hero.text': [
  'PalAI brings together mobile rice-leaf screening and drone-assisted field insights to help farmers and agricultural organizations identify where closer attention is needed.',
  'Gihiusa sa PalAI ang pagsusi sa dahon sa humay pinaagi sa mobile ug ang mga nakita gikan sa drone aron matabangan ang mga mag-uuma ug mga organisasyon sa agrikultura nga mahibaw-an kon asa kinahanglan ang mas duol nga pagtan-aw.'],

  'ld.tryDemo': ['Try the Farmer Demo', 'Sulayi ang Demo sa Mag-uuma'],
  'ld.exploreDrone': ['Explore Drone Insights', 'Tan-awa ang mga Nakita sa Drone'],
  'ld.hero.free': ['Free basic farmer screening', 'Libre nga batakang pagsusi alang sa mag-uuma'],
  'ld.hero.inst': ['Institutional field monitoring', 'Pagbantay sa humayan alang sa institusyon'],
  'ld.hero.alt': ['Aerial view of green rice fields beside a river (illustrative)', 'Hulagway gikan sa itaas sa berdeng humayan tupad sa suba (ilustrasyon)'],
  'ld.hero.droneAlt': ['Agricultural surveying drone (illustrative)', 'Drone sa pagsurbey sa agrikultura (ilustrasyon)'],
  'ld.hero.badge': ['Illustrative imagery · Demo data', 'Ilustrasyon nga hulagway · Pananglitan nga Datos'],

  // Phone preview
  'ld.phone.aria': [
  'PalAI app preview showing a simulated Possible Sheath Blight screening result',
  'Preview sa PalAI app nga nagpakita og pananglitan nga resulta: Posibleng Sheath Blight'],

  'ld.phone.save': ['Save Result', 'Tipigi ang Resulta'],

  // Product pair
  'ld.pair.title': ['Two perspectives. One connected field record.', 'Duha ka panglantaw. Usa ka konektado nga rekord sa humayan.'],
  'ld.mobile.alt': ['Close-up of a rice plant with possible disease signs (illustrative)', 'Duol nga hulagway sa humay nga adunay posibleng timailhan sa sakit (ilustrasyon)'],
  'ld.mobile.badge': ['Close-up photo · Demo', 'Duol nga litrato · Demo'],
  'ld.mobile.eyebrow': ['Mobile leaf screening · Free', 'Pagsusi sa dahon pinaagi sa mobile · Libre'],
  'ld.mobile.title': ['Start with what you see.', 'Sugdi sa imong nakita.'],
  'ld.mobile.text': [
  'Capture a rice-leaf photo, review a preliminary screening result, and save observations to your field.',
  'Kuhaa og litrato ang dahon sa humay, tan-awa ang pasiunang resulta sa pagsusi, ug tipigi ang mga obserbasyon sa imong humayan.'],

  'ld.mobile.explore': ['Explore Mobile Screening', 'Tan-awa ang Pagsusi sa Mobile'],
  'ld.drone.badge': ['Illustrative survey · Demo data', 'Ilustrasyon nga surbey · Pananglitan nga Datos'],
  'ld.drone.eyebrow': ['Drone field analytics · For organizations', 'Pagtuki sa humayan pinaagi sa drone · Alang sa mga organisasyon'],
  'ld.drone.title': ['See beyond a single plant.', 'Tan-awa labaw pa sa usa ka tanum.'],
  'ld.drone.text': [
  'Review aerial survey imagery and field patterns to help prioritize areas for closer inspection.',
  'Tan-awa ang mga hulagway sa surbey gikan sa itaas ug ang mga sumbanan sa humayan aron mahibaw-an kon asa una susihon.'],

  'ld.drone.layerAria': ['Survey layer', 'Layer sa surbey'],
  'ld.layer.aerial': ['Aerial', 'Gikan sa itaas'],
  'ld.layer.ms': ['Multispectral', 'Multispectral'],
  'ld.layer.prio': ['Priorities', 'Prayoridad'],

  'ld.feat.capture': ['Camera capture and photo upload', 'Pagkuha og litrato ug pagpili og litrato'],
  'ld.feat.screen': ['Preliminary disease screening', 'Pasiunang pagsusi sa sakit'],
  'ld.feat.records': ['Field-linked records', 'Mga rekord nga nalambigit sa humayan'],
  'ld.feat.followup': ['Follow-up observations', 'Mga obserbasyon sa pagsusi pag-usab'],
  'ld.feat.coverage': ['Aerial field coverage', 'Pagsakop sa humayan gikan sa itaas'],
  'ld.feat.imagery': ['Survey imagery and field boundaries', 'Mga hulagway sa surbey ug utlanan sa humayan'],
  'ld.feat.ms': ['Multispectral layers, when the survey equipment supports them', 'Mga multispectral layer, kon kaya sa gamit sa surbey'],
  'ld.feat.stress': ['Stress-pattern visualization', 'Pagpakita sa mga sumbanan sa stress sa tanum'],
  'ld.feat.prio': ['Inspection-priority maps', 'Mga mapa sa prayoridad sa pagsusi'],

  // Showcase
  'ld.show.title': ['A closer look from above.', 'Mas duol nga pagtan-aw gikan sa itaas.'],
  'ld.show.text': ['Explore how different survey views can help organize field observations.', 'Tan-awa kon giunsa makatabang ang lain-laing paglantaw sa surbey sa paghapsay sa mga obserbasyon sa humayan.'],
  'ld.show.view': ['View {letter} · {site}', 'Paglantaw {letter} · {site}'],
  'ld.show.details': ['Survey Details', 'Mga Detalye sa Surbey'],
  'ld.show.open': ['Open the full Drone Insights preview', 'Ablihi ang tibuok preview sa mga Nakita sa Drone'],

  // Workflow
  'ld.wf.title': ['Connect ground observations with the wider field.', 'Ikonektar ang mga obserbasyon sa yuta ngadto sa mas lapad nga humayan.'],
  'ld.wf.text': [
  'Leaf observations and aerial patterns provide different evidence. Field inspection helps clarify what is happening.',
  'Lahi-lahi nga ebidensiya ang gihatag sa obserbasyon sa dahon ug sa mga sumbanan gikan sa itaas. Ang pagsusi sa humayan makatabang nga masabtan kon unsay nahitabo.'],

  'ld.wf.step': ['Step {n}', 'Lakang {n}'],
  'ld.wf.note': [
  'A mobile scan does not trigger a drone flight, and scans do not include a free survey. Drone surveys are arranged separately by participating organizations.',
  'Ang pagsusi sa mobile dili magpalupad og drone, ug walay libre nga surbey nga apil sa pagsusi. Ang mga surbey sa drone gihikay nga bulag sa mga organisasyon nga miapil.'],

  'ld.wf1.title': ['Mobile observation', 'Obserbasyon sa mobile'],
  'ld.wf1.text': ['A farmer captures a rice-leaf photo and saves a screening result.', 'Ang mag-uuma mokuha og litrato sa dahon sa humay ug motipig sa resulta sa pagsusi.'],
  'ld.wf1.ex': ['Possible Sheath Blight', 'Posibleng Sheath Blight'],
  'ld.wf2.title': ['Shared field record', 'Gipaambit nga rekord sa humayan'],
  'ld.wf2.text': [
  'Selected observations become available to a participating organization with the farmer’s permission.',
  'Ang gipili nga mga obserbasyon maablihan sa organisasyon nga miapil, uban sa pagtugot sa mag-uuma.'],

  'ld.wf2.label': ['Field', 'Humayan'],
  'ld.wf3.title': ['Drone survey review', 'Pagrepaso sa surbey sa drone'],
  'ld.wf3.text': ['The organization reviews available aerial imagery alongside field observations.', 'Repasohon sa organisasyon ang mga hulagway gikan sa itaas uban sa mga obserbasyon sa humayan.'],
  'ld.wf3.label': ['Drone layer', 'Layer sa drone'],
  'ld.wf4.title': ['Action report', 'Taho sa buhaton'],
  'ld.wf4.text': ['Personnel prepare inspection priorities and follow-up actions.', 'Andamon sa mga kawani ang prayoridad sa pagsusi ug mga sunod nga buhaton.'],
  'ld.wf4.label': ['Next action', 'Sunod nga buhaton'],

  // Institutional
  'ld.inst.title': ['Field-wide insights for agricultural teams.', 'Mga nakita sa tibuok humayan alang sa mga grupo sa agrikultura.'],
  'ld.inst.text': [
  'Bring shared farmer observations, drone surveys, and inspection priorities into one workspace.',
  'Hiusaha sa usa ka workspace ang gipaambit nga obserbasyon sa mag-uuma, surbey sa drone, ug prayoridad sa pagsusi.'],

  'ld.inst.b1.title': ['Review multiple fields', 'Repasoha ang daghang humayan'],
  'ld.inst.b1.text': ['See shared farmer records and survey layers for many fields in one place.', 'Tan-awa sa usa ka dapit ang gipaambit nga rekord sa mag-uuma ug mga layer sa surbey sa daghang humayan.'],
  'ld.inst.b2.title': ['Locate areas needing inspection', 'Pangitaa ang mga lugar nga kinahanglang susihon'],
  'ld.inst.b2.text': [
  'Aerial patterns and ground observations point teams to where to look first.',
  'Ang mga sumbanan gikan sa itaas ug obserbasyon sa yuta magtudlo sa mga grupo kon asa una motan-aw.'],

  'ld.inst.b3.title': ['Prepare coordinated follow-up reports', 'Andama ang hiniusang taho sa sunod nga buhaton'],
  'ld.inst.b3.text': ['Turn inspection priorities into clear next steps for field personnel.', 'Himoa ang prayoridad sa pagsusi nga klarong sunod nga lakang alang sa mga kawani sa humayan.'],
  'ld.inst.note': [
  'Basic farmer screening is free. Drone surveying and institutional analytics are separate services.',
  'Libre ang batakang pagsusi alang sa mag-uuma. Bulag nga serbisyo ang pagsurbey sa drone ug pagtuki alang sa institusyon.'],

  'ld.inst.demo': ['View Institutional Demo', 'Tan-awa ang Demo sa Institusyon'],
  'ld.inst.report': ['Sample Action Report', 'Pananglitan nga Taho sa Buhaton'],
  'ld.inst.prepared': ['Prepared {date} (sample)', 'Giandam {date} (pananglitan)'],

  // Footer
  'ld.foot.title': ['Start with the free farmer demo.', 'Sugdi sa libre nga demo sa mag-uuma.'],
  'ld.foot.text': [
  'Explore Juan Dela Cruz’s sample farm: scan screens, field records, and follow-up reminders.',
  'Tan-awa ang pananglitan nga uma ni Juan Dela Cruz: mga screen sa pagsusi, rekord sa humayan, ug mga pahinumdom.'],

  'ld.foot.create': ['Create a free account', 'Paghimo og libre nga account'],
  'ld.foot.note': [
  'Prototype. Imagery is illustrative and all survey, field, and farmer data are fictional. PalAI screening is a guide, not a diagnosis.',
  'Prototype. Ilustrasyon ang mga hulagway ug pananglitan lamang ang tanang datos sa surbey, humayan, ug mag-uuma. Ang pagsusi sa PalAI usa ka giya, dili diyagnosis.'],


  // Drone insights page
  'di.title': ['Drone Field Insights', 'Mga Nakita sa Humayan gikan sa Drone'],
  'di.intro': ['A recorded-survey preview with sample data. It is not a live drone connection.', 'Preview sa narekord nga surbey nga adunay pananglitan nga datos. Dili kini live nga koneksiyon sa drone.'],
  'di.backWorkspace': ['Back to workspace', 'Balik sa workspace'],
  'di.backOverview': ['Back to overview', 'Balik sa paglantaw'],
  'di.surveyAria': ['Sample survey', 'Pananglitan nga surbey'],
  'di.boundaries': ['Field boundaries', 'Mga utlanan sa humayan'],
  'di.markers': ['Farmer observation markers', 'Mga timaan sa obserbasyon sa mag-uuma'],
  'di.noRecordsSite': ['No farmer records shared for this site.', 'Walay rekord sa mag-uuma nga gipaambit alang niini nga lugar.'],
  'di.captured': ['Captured {date}', 'Nakuha {date}'],
  'di.areas': ['Marked areas', 'Mga gimarkahang lugar'],
  'di.areasText': ['Tap an area to read its sample inspection note.', 'Tuploka ang usa ka lugar aron mabasa ang pananglitan nga nota sa pagsusi.'],
  'di.records': ['Field observations', 'Mga obserbasyon sa humayan'],
  'di.recordsText': ['Shared by farmers with their permission (sample).', 'Gipaambit sa mga mag-uuma uban sa ilang pagtugot (pananglitan).'],
  'di.noRecords': [
  'No farmer observations have been shared for this fictional site. Ground inspection is needed to understand each pattern.',
  'Walay obserbasyon sa mag-uuma nga gipaambit alang niini nga pananglitan nga lugar. Kinahanglan ang pagsusi sa yuta aron masabtan ang matag sumbanan.'],

  'di.aiSimulated': ['AI screening (simulated)', 'Pagsusi sa AI (pananglitan)'],
  'di.ai': ['AI screening', 'Pagsusi sa AI'],
  'di.farmerObs': ['Farmer observation', 'Obserbasyon sa mag-uuma'],
  'di.previewReport': ['Preview Action Report', 'Tan-awa ang Taho sa Buhaton'],
  'di.surveyImgAlt': ['Illustrative top-down survey image of {site}', 'Ilustrasyon nga hulagway sa surbey sa {site} gikan sa itaas'],
  'di.areaLabel': ['Area {x}', 'Lugar {x}'],
  'di.recordMarker': ['Shared farmer record: {title}, {date}', 'Gipaambit nga rekord sa mag-uuma: {title}, {date}'],
  'di.legend': ['Legend · {view}', 'Giya sa kolor · {view}'],
  'di.legendAria': ['Layer legend', 'Giya sa layer'],
  'di.lowHigh': ['Lower → higher', 'Ubos → taas'],
  'di.viewAria': ['Survey view', 'Paglantaw sa surbey'],
  'di.detailsNote': [
  'Recorded-survey preview with sample values. Paths, footprints, and layers are illustrative and are not measurements.',
  'Preview sa narekord nga surbey nga adunay pananglitan nga mga numero. Ilustrasyon lamang ang mga agianan, footprint, ug layer ug dili kini sukod.'],

  'di.area': ['Area', 'Lugar'],
  'di.why': ['Why this area', 'Nganong kini nga lugar'],
  'di.sampleNote': ['Sample inspection note', 'Pananglitan nga nota sa pagsusi'],
  'di.nextAction': ['Next action: {action}', 'Sunod nga buhaton: {action}'],
  'di.linked': ['Linked farmer records', 'Nalambigit nga mga rekord sa mag-uuma'],
  'di.noLinked': ['No farmer records have been shared for this area.', 'Walay rekord sa mag-uuma nga gipaambit alang niini nga lugar.'],
  'di.patternNote': [
  'Aerial patterns do not confirm a disease. Field inspection helps clarify what is happening.',
  'Ang mga sumbanan gikan sa itaas dili makapamatuod og sakit. Ang pagsusi sa humayan makatabang nga masabtan kon unsay nahitabo.'],

  'di.sharedScan': ['Shared scan record', 'Gipaambit nga rekord sa pagsusi'],
  'di.sharedObs': ['Shared farmer observation', 'Gipaambit nga obserbasyon sa mag-uuma'],
  'di.photoAlt': ['Photo from the farmer', 'Litrato gikan sa mag-uuma'],
  'di.simulated': ['Simulated screening', 'Pananglitan nga pagsusi'],
  'di.byAuthor': ['By {name} · {site}', 'Ni {name} · {site}'],
  'di.sharedNote': [
  'Shared with the farmer’s permission (sample). Farmers choose which field records are shared.',
  'Gipaambit uban sa pagtugot sa mag-uuma (pananglitan). Ang mga mag-uuma ang mopili kon unsang rekord sa humayan ang ipaambit.'],

  'di.report.badge': ['Sample report · Demo data', 'Pananglitan nga taho · Pananglitan nga Datos'],
  'di.report.survey': ['Survey', 'Surbey'],
  'di.report.captured': ['Captured', 'Nakuha'],
  'di.report.prepared': ['Report prepared', 'Giandam ang taho'],
  'di.report.sample': ['{date} (sample)', '{date} (pananglitan)'],
  'di.report.summary': ['Summary', 'Mubo nga sulod'],
  'di.report.priorities': ['Inspection priorities', 'Prayoridad sa pagsusi'],
  'di.report.why': ['Why:', 'Ngano:'],
  'di.report.action': ['Action:', 'Buhaton:'],
  'di.report.linked': ['Linked farmer records: {list}', 'Nalambigit nga mga rekord sa mag-uuma: {list}'],
  'di.report.next': ['Next steps for field personnel', 'Sunod nga mga lakang alang sa mga kawani sa humayan'],
  'di.report.note': [
  'Sample report for demonstration. Aerial patterns and leaf screening do not confirm a disease. Field inspection by qualified personnel is needed.',
  'Pananglitan nga taho alang sa demo. Ang mga sumbanan gikan sa itaas ug pagsusi sa dahon dili makapamatuod og sakit. Kinahanglan ang pagsusi sa humayan sa kwalipikado nga kawani.'],


  // Priorities
  'prio.inspect': ['Inspect first', 'Susiha una'],
  'prio.check': ['Check soon', 'Susiha dayon'],

  // Survey views (data/surveyViews.ts)
  'sv.aerial': ['Aerial capture', 'Hulagway gikan sa itaas'],
  'sv.aerial.text': [
  'A top-down image from a recorded survey, with the field boundary and one image footprint marked beneath the drone.',
  'Hulagway gikan sa itaas gikan sa narekord nga surbey, uban ang utlanan sa humayan ug usa ka footprint sa hulagway ubos sa drone.'],

  'sv.aerial.badge': ['Recorded survey image', 'Narekord nga hulagway sa surbey'],
  'sv.boundary': ['Field boundary', 'Utlanan sa humayan'],
  'sv.footprint': ['Image footprint', 'Footprint sa hulagway'],
  'sv.droneAt': ['Drone position at capture', 'Posisyon sa drone sa pagkuha'],
  'sv.coverage': ['Survey coverage', 'Gisakop sa surbey'],
  'sv.coverage.text': [
  'Overlapping image footprints along a flight path. Overlap lets many photos be combined into one view of the field.',
  'Nagsapaw nga mga footprint sa hulagway subay sa agianan sa paglupad. Tungod sa pagsapaw, mahiusa ang daghang litrato ngadto sa usa ka hulagway sa humayan.'],

  'sv.path': ['Illustrative survey path', 'Ilustrasyon nga agianan sa surbey'],
  'sv.direction': ['Survey direction', 'Direksiyon sa surbey'],
  'sv.overlap': ['Coverage overlap', 'Pagsapaw sa gisakop'],
  'sv.ms': ['Multispectral preview', 'Preview sa multispectral'],
  'sv.ms.text': [
  'A sample false-color layer, as produced by a compatible multispectral sensor. Ordinary RGB photos can’t provide these measurements, and color alone doesn’t identify a disease.',
  'Pananglitan nga layer sa false-color, sama sa gihimo sa angay nga multispectral sensor. Dili kini mahatag sa ordinaryong RGB nga litrato, ug ang kolor lamang dili makaila og sakit.'],

  'sv.ms.badge': ['Sample false-color layer', 'Pananglitan nga layer sa false-color'],
  'sv.index': ['Relative vegetation index (sample)', 'Relatibo nga vegetation index (pananglitan)'],
  'sv.stress': ['Sample crop-stress pattern', 'Pananglitan nga sumbanan sa stress sa tanum'],
  'sv.prio': ['Inspection priorities', 'Prayoridad sa pagsusi'],
  'sv.prio.text': [
  'Areas selected for a field visit, based on aerial patterns and shared farmer observations. Inspection on the ground confirms what is happening.',
  'Mga lugar nga gipili alang sa pagbisita sa humayan, base sa mga sumbanan gikan sa itaas ug gipaambit nga obserbasyon sa mag-uuma. Ang pagsusi sa yuta ang mopamatuod kon unsay nahitabo.'],

  'sv.prio.badge': ['Sample inspection priorities', 'Pananglitan nga prayoridad sa pagsusi'],
  'sv.marker': ['Shared farmer record', 'Gipaambit nga rekord sa mag-uuma'],

  // View details (utils/survey.ts)
  'vd.field': ['Selected field', 'Gipili nga humayan'],
  'vd.captureDate': ['Capture date', 'Petsa sa pagkuha'],
  'vd.survey': ['Survey', 'Surbey'],
  'vd.lines': ['Flight lines', 'Mga linya sa paglupad'],
  'vd.linesValue': ['{n} (illustrative)', '{n} (ilustrasyon)'],
  'vd.footprints': ['Image footprints shown', 'Gipakitang mga footprint'],
  'vd.direction': ['Direction', 'Direksiyon'],
  'vd.directionValue': ['Parallel north–south lines', 'Managsama nga linya amihanan–habagatan'],
  'vd.layer': ['Layer', 'Layer'],
  'vd.layerValue': ['Sample vegetation index', 'Pananglitan nga vegetation index'],
  'vd.sensor': ['Sensor', 'Sensor'],
  'vd.sensorValue': ['Compatible multispectral camera (sample)', 'Angay nga multispectral camera (pananglitan)'],
  'vd.patterns': ['Sample stress patterns', 'Pananglitan nga mga sumbanan sa stress'],
  'vd.records': ['Shared farmer records', 'Gipaambit nga mga rekord sa mag-uuma'],

  // Survey data (data/droneSurveys.ts)
  'ds.siteNote1': ['Same field as the farmer demo · 1.2 hectares', 'Parehas nga humayan sa demo sa mag-uuma · 1.2 ka ektarya'],
  'ds.siteNote2': ['Separate fictional demonstration site · 8.4 hectares', 'Bulag nga pananglitan nga lugar · 8.4 ka ektarya'],
  'ds.site2': ['Demonstration Site A', 'Pananglitan nga Lugar A'],
  'ds.a1.reason': [
  'The sample crop-stress pattern overlaps where a farmer scan noted Possible Sheath Blight (Oct 6) and a farmer observation mentioned spots near the canal (Oct 5).',
  'Ang pananglitan nga sumbanan sa stress nagsapaw sa dapit diin ang pagsusi sa mag-uuma nakamatikod og Posibleng Sheath Blight (Okt 6) ug ang obserbasyon sa mag-uuma naghisgot og mga marka duol sa kanal (Okt 5).'],

  'ds.a1.note': [
  'Walk the canal-side rows. Check the lower stems and sheaths of several plants and photograph them for a follow-up scan.',
  'Lakawa ang mga laray tupad sa kanal. Susiha ang ubos nga punoan ug upak sa pipila ka tanum ug litratuhi kini alang sa sunod nga pagsusi.'],

  'ds.inspectMarked': ['Inspect the marked area', 'Susiha ang gimarkahang lugar'],
  'ds.a2.reason': [
  'Uneven color in the sample vegetation layer near the field edge. No ground observation yet, so the cause is unknown.',
  'Dili parehas nga kolor sa pananglitan nga vegetation layer duol sa kilid sa humayan. Wala pay obserbasyon sa yuta, busa wala pa mahibaw-i ang hinungdan.'],

  'ds.a2.note': [
  'Check water level and plant color during the next visit. It may relate to water or nutrients — inspection will tell.',
  'Susiha ang lebel sa tubig ug kolor sa tanum sa sunod nga pagbisita. Basin may kalabotan sa tubig o sustansiya — ang pagsusi ang mopakita.'],

  'ds.nextVisit': ['Check during the next visit', 'Susiha sa sunod nga pagbisita'],
  'ds.rec1.title': ['Possible Sheath Blight in one submitted photo', 'Posibleng Sheath Blight sa usa ka gisumite nga litrato'],
  'ds.rec1.text': [
  'Sample result for one photographed lower stem. Simulated screening — not a diagnosis.',
  'Pananglitan nga resulta alang sa usa ka gilitratohan nga ubos nga punoan. Pananglitan nga pagsusi — dili diyagnosis.'],

  'ds.b1.reason': ['The largest sample stress pattern, spanning two plots near the irrigation inlet.', 'Ang labing dako nga pananglitan nga sumbanan sa stress, naglangkob sa duha ka plot duol sa sulod sa irigasyon.'],
  'ds.b1.note': [
  'Walk both plots from the inlet side. Note plant color, water depth, and any visible leaf symptoms.',
  'Lakawa ang duha ka plot gikan sa sulod sa tubig. Isulat ang kolor sa tanum, giladmon sa tubig, ug bisan unsang makitang timailhan sa dahon.'],

  'ds.b2.reason': ['A patchy pattern along a bund. It may relate to how water flows across the plot.', 'Tagpi-tagpi nga sumbanan subay sa pilapil. Basin may kalabotan sa pag-agos sa tubig sa plot.'],
  'ds.b2.note': ['Check the bund and water flow during the next visit.', 'Susiha ang pilapil ug pag-agos sa tubig sa sunod nga pagbisita.'],
  'ds.b3.reason': ['A small sample pattern. Lower priority until it is checked on the ground.', 'Gamay nga pananglitan nga sumbanan. Ubos nga prayoridad hangtod masusi sa yuta.'],
  'ds.b3.note': ['Look at a few plants here if time allows.', 'Tan-awa ang pipila ka tanum dinhi kon adunay panahon.'],
  'ds.ifTime': ['Check if time allows', 'Susiha kon adunay panahon'],
  'ds.d.site': ['Site', 'Lugar'],
  'ds.d.pattern': ['Flight pattern', 'Sumbanan sa paglupad'],
  'ds.d.patternValue': ['Parallel north–south lines (illustrative)', 'Managsama nga linya amihanan–habagatan (ilustrasyon)'],
  'ds.d.footprints': ['Image footprints', 'Mga footprint sa hulagway'],
  'ds.d.fp30': ['30 shown (illustrative)', '30 ang gipakita (ilustrasyon)'],
  'ds.d.fp35': ['35 shown (illustrative)', '35 ang gipakita (ilustrasyon)'],
  'ds.d.overlap': ['Overlap', 'Pagsapaw'],
  'ds.d.overlapValue': ['About 75% forward, 65% side (sample settings; drawing simplified)', 'Mga 75% sa atubangan, 65% sa kilid (pananglitan; gipasayon ang drowing)'],
  'ds.d.sensorValue': ['RGB + multispectral camera (sample configuration)', 'RGB + multispectral camera (pananglitan nga setting)'],
  'ds.d.height': ['Height above ground', 'Gitas-on gikan sa yuta'],
  'ds.d.h60': ['60 m (sample)', '60 m (pananglitan)'],
  'ds.d.h80': ['80 m (sample)', '80 m (pananglitan)'],
  'ds.d.site2Value': ['Demonstration Site A (fictional, 8.4 ha)', 'Pananglitan nga Lugar A (dili tinuod, 8.4 ha)'],
  'ds.r1.summary': [
  'One area of Riverside Plot is recommended for inspection first. A farmer scan, a farmer observation, and a sample crop-stress pattern point to the same canal-side location. A second area shows uneven color with no ground observation yet.',
  'Usa ka lugar sa Riverside Plot ang girekomendar nga susihon una. Ang pagsusi sa mag-uuma, obserbasyon sa mag-uuma, ug pananglitan nga sumbanan sa stress nagtudlo sa samang dapit tupad sa kanal. Ang ikaduhang lugar adunay dili parehas nga kolor apan wala pay obserbasyon sa yuta.'],

  'ds.r1.s1': ['Visit Area A with the farmer and check several plants along the canal side.', 'Bisitaha ang Lugar A uban sa mag-uuma ug susiha ang pipila ka tanum tupad sa kanal.'],
  'ds.r1.s2': ['Photograph the lower stems and sheaths for a follow-up scan.', 'Litratuhi ang ubos nga punoan ug upak alang sa sunod nga pagsusi.'],
  'ds.r1.s3': ['Check water level and plant color in Area B during the same visit.', 'Susiha ang lebel sa tubig ug kolor sa tanum sa Lugar B sa samang pagbisita.'],
  'ds.r1.s4': ['Record what was found as a field observation.', 'Irekord ang nakit-an isip obserbasyon sa humayan.'],
  'ds.r2.summary': [
  'Three areas of this fictional demonstration site show sample patterns worth checking. No farmer observations have been shared for this site, so ground inspection is needed to understand each pattern.',
  'Tulo ka lugar niini nga pananglitan nga site ang adunay sumbanan nga angayang susihon. Walay obserbasyon sa mag-uuma nga gipaambit alang niini nga lugar, busa kinahanglan ang pagsusi sa yuta aron masabtan ang matag sumbanan.'],

  'ds.r2.s1': ['Inspect Area A first, starting from the irrigation inlet.', 'Susiha una ang Lugar A, sugod sa sulod sa irigasyon.'],
  'ds.r2.s2': ['Check the bund and water flow at Area B.', 'Susiha ang pilapil ug pag-agos sa tubig sa Lugar B.'],
  'ds.r2.s3': ['Look at Area C if time allows.', 'Tan-awa ang Lugar C kon adunay panahon.'],
  'ds.r2.s4': ['Invite participating farmers to share scans from these plots.', 'Dapita ang mga mag-uuma nga miapil nga ipaambit ang mga pagsusi gikan niini nga mga plot.'],

  // Workspace (data/workflow.ts)
  'wk.s1.title': ['Mobile Capture', 'Pagkuha pinaagi sa Mobile'],
  'wk.s1.text': ['Farmers photograph rice leaves and save field notes with the free PalAI app.', 'Ang mga mag-uuma mokuha og litrato sa dahon sa humay ug motipig og nota sa humayan gamit ang libre nga PalAI app.'],
  'wk.s2.title': ['Cloud Synchronization', 'Pag-sync sa Cloud'],
  'wk.s2.text': [
  'Saved records are shared with the farmer’s cooperative or LGU when a connection is available.',
  'Ipaambit ang natipigang mga rekord sa kooperatiba o LGU sa mag-uuma kon adunay koneksiyon.'],

  'wk.s3.title': ['Drone-Assisted Field Review', 'Pagrepaso sa Humayan uban sa Drone'],
  'wk.s3.text': [
  'Technicians review drone surveys and field maps to see where follow-up is needed.',
  'Repasohon sa mga teknisyan ang surbey sa drone ug mapa sa humayan aron makita kon asa kinahanglan ang pagsusi pag-usab.'],

  'wk.s4.title': ['Action Report', 'Taho sa Buhaton'],
  'wk.s4.text': [
  'Priority intervention reports help teams plan visits and support for farmers.',
  'Ang mga taho sa prayoridad nga tabang makatabang sa mga grupo sa pagplano sa pagbisita ug suporta sa mga mag-uuma.'],

  'wk.t1': ['Cooperatives', 'Mga kooperatiba'],
  'wk.t2': ['Local government units (LGUs)', 'Mga lokal nga panggamhanan (LGU)'],
  'wk.t3': ['Irrigators’ associations', 'Mga asosasyon sa irigasyon'],
  'wk.t4': ['Commercial farms', 'Mga komersiyal nga uma']
});