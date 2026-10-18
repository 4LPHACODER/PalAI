import { dict } from './dict';

/**
 * Disease guidance adapted from the supplied DA documents.
 * Cebuano follows the approved concise wording; English is a faithful paraphrase.
 */
export const guidanceStrings = dict({
  // Disease names stay as recognized identifiers; the short explanation is translated.
  'disease.sheath_blight.title': ['Possible Sheath Blight', 'Posibleng Sheath Blight'],
  'disease.sheath_blight.label': ['Disease of the sheath that wraps the rice stem.', 'Sakit sa upak nga nagputos sa punoan sa humay.'],
  'disease.tungro.title': ['Possible Tungro', 'Posibleng Tungro'],
  'disease.tungro.label': ['Disease linked to yellowing and stunting of rice.', 'Sakit nga may kalabotan sa pagdalag ug pagkabansot sa humay.'],
  'disease.blast.title': ['Possible Blast', 'Posibleng Blast'],
  'disease.blast.label': ['Disease that can show as spots on the leaf.', 'Sakit nga mahimong magpakita og mata-mata sa dahon.'],
  'disease.bacterial_blight.title': ['Possible Bacterial Blight', 'Posibleng Bacterial Blight'],
  'disease.bacterial_blight.label': ['Disease linked to yellowing and wilting of leaves.', 'Sakit nga may kalabotan sa pagdalag ug pagkalaya sa dahon.'],
  'disease.uncertain.title': ['Result not clear yet', 'Dili pa matino ang resulta'],
  'disease.uncertain.label': ['The photo could not be assessed.', 'Dili masusi ang litrato.'],

  // Timing (kept in saved data; not repeated in the compact list)
  'when.now': ['Do now', 'Buhaton karon'],
  'when.beforeRefertilize': ['Before fertilizing again', 'Sa dili pa mag-abono pag-usab'],
  'when.beforeFertilize': ['Before fertilizing', 'Sa dili pa mag-abono'],
  'when.nextPlanting': ['For the next planting', 'Alang sa sunod nga pagtanum'],
  'when.afterSigns': ['After you see possible signs', 'Human makita ang posibleng mga timailhan'],
  'when.beforeInsecticide': ['Before using any insecticide', 'Sa dili pa mogamit og insektisidyo'],
  'when.afterHarvest': ['After harvest and for the next planting', 'Human sa pag-ani ug sa sunod nga pagtanum'],
  'when.earlyMorning': ['Early in the morning', 'Sa sayong buntag'],
  'when.beforeIrrigate': ['Before irrigating or moving tools', 'Sa dili pa magpatubig o magbalhin og gamit'],
  'when.afterFieldCheck': ['After checking the field condition', 'Human sa pagsusi sa kahimtang sa humayan'],

  // Basis notes (kept in saved data)
  'basis.captureAdapted': ['Adapted from the guide’s examination method', 'Gipahiangay gikan sa pamaagi sa pagsusi sa giya'],
  'basis.blastCapture': ['Informed by the guide’s examination method', 'Gibase sa pamaagi sa pagsusi sa giya'],
  'basis.generalNutrient': ['General nutrient-management guidance, not a specific cure', 'Kinatibuk-ang giya sa pagdumala sa sustansiya, dili espesipikong tambal'],
  'basis.generalPrevention': ['General prevention and nutrient management', 'Kinatibuk-ang paglikay ug pagdumala sa sustansiya'],
  'basis.hybrid': ['From a guide on hybrid-rice cultivation', 'Gikan sa giya alang sa pagtanum og hybrid nga humay'],

  // Source sections
  'sec.fieldExam': ['Examining plants in the field', 'Pagsusi sa tanum sa humayan'],
  'sec.nutrient': ['Nutrient management', 'Pagdumala sa sustansiya'],
  'sec.varietySync': ['General prevention', 'Kinatibuk-ang paglikay'],
  'sec.variety': ['Choosing a suitable variety', 'Pagpili sa haum nga barayti'],
  'sec.diseases': ['Common rice diseases', 'Kasagarang sakit sa humay'],
  'sec.tungro': ['Tungro', 'Tungro'],
  'sec.bacterialBlight': ['Bacterial Blight', 'Bacterial Blight'],

  // Source scope notes
  'doc.pagdumala.scope': ['Field inspection and crop management', 'Pagsusi sa humayan ug pagdumala sa tanum'],
  'doc.palaycheck.scope': ['Inspection, nutrient management and general crop management', 'Pagsusi, pagdumala sa sustansiya, ug kinatibuk-ang pagdumala sa tanum'],
  'doc.hybrid.scope': ['Recommendations for hybrid-rice cultivation', 'Mga rekomendasyon alang sa pagtanum og hybrid nga humay'],
  'doc.climate.scope': ['Environmental context and variety suitability — not disease treatment', 'Konteksto sa palibot ug kahaum sa barayti — dili tambal sa sakit'],
  'doc.caraga.scope': ['Historical program context — not treatment guidance', 'Kasaysayan sa programa — dili giya sa pagtambal'],

  // A. Sheath Blight
  'guide.sb.signs': ['Marks on the lower stem sheath; similar signs on nearby hills.', 'Mga marka sa upak sa ubos nga punoan; susamang timailhan sa kasikbit nga punuan.'],
  'guide.sb.sign1': ['Marks or lesions on the sheath of the lower stem.', 'Mga marka o samad sa upak sa ubos nga punoan.'],
  'guide.sb.sign2': ['Similar signs on neighboring hills.', 'Susamang timailhan sa kasikbit nga mga punuan.'],
  'guide.sb.s1': ['Avoid too much fertilizer; have the right nutrient needs assessed.', 'Likayi ang sobra nga abono; ipasusi ang hustong panginahanglan sa sustansiya.'],
  'guide.sb.s2': ['Check the hills regularly to watch for spread.', 'Kanunay susiha ang mga punuan aron mabantayan ang pagkaylap.'],
  'guide.sb.s3': ['Talk to a technician about proper disease management.', 'Pakigsulti sa teknisyan alang sa angay nga pagdumala sa sakit.'],
  'guide.sb.s4': ['For the next planting, choose a variety suited to your area and resistant to disease.', 'Sa sunod nga tanum, pilia ang barayting haum sa lugar ug lig-on batok sa sakit.'],
  'guide.sb.note': ['The guides give no specific Sheath Blight cure.', 'Walay espesipikong tambal sa Sheath Blight ang mga giya.'],

  // B. Tungro
  'guide.tu.signs': ['Yellow to orange leaves; short plants with few tillers.', 'Dahon nga nagdalag o kolor kahel; mugbo nga tanum ug gamay nga saha.'],
  'guide.tu.sign1': ['Leaves turning yellow or orange.', 'Dahon nga nagdalag o nahimong kolor kahel.'],
  'guide.tu.sign2': ['Short plants with few tillers.', 'Mugbo nga tanum ug gamay nga mga saha.'],
  'guide.tu.s1': ['Infected plants can’t be cured; have them checked right away to stop the spread.', 'Walay tambal sa nataptang tanum; ipasusi dayon aron mapugngan ang pagkaylap.'],
  'guide.tu.s2': ['Watch for green leafhoppers; don’t spray when it isn’t needed.', 'Bantayi ang berdeng lukso-lukso; ayaw pag-isprey nga walay panginahanglan.'],
  'guide.tu.s3': ['After harvest, plow under the stubble and leave the soil fallow for at least a month.', 'Human sa ani, daroha ang nahibiling tuod ug ipabakante ang yuta labing menos usa ka bulan.'],
  'guide.tu.s4': ['Coordinate with neighbors on synchronous planting.', 'Pakigsabot sa mga silingan alang sa dungan-dungan nga pagtanum.'],
  'guide.tu.note': ['Discuss any plant removal with a technician first.', 'Hisguti una sa teknisyan ang bisan unsang pagtangtang sa tanum.'],

  // C. Blast
  'guide.bl.signs': ['Marks or lesions on the leaf; damage on the panicle neck or panicle.', 'Mga marka o samad sa dahon; kadaot sa liog sa uhay o uhay.'],
  'guide.bl.sign1': ['Marks or lesions on the leaf.', 'Mga marka o samad sa dahon.'],
  'guide.bl.sign2': ['Signs of damage on the panicle neck or panicle.', 'Timailhan sa kadaot sa liog sa uhay o uhay.'],
  'guide.bl.s1': ['Avoid too much fertilizer and have the right nutrients assessed.', 'Likayi ang sobra nga abono ug ipasusi ang hustong sustansiya.'],
  'guide.bl.s2': ['Watch for signs spreading on leaves and panicles.', 'Bantayi ang pagkaylap sa timailhan sa dahon ug uhay.'],
  'guide.bl.s3': ['Show the affected plant to a technician for proper management.', 'Ipakita ang apektadong tanum sa teknisyan alang sa angay nga pagdumala.'],
  'guide.bl.s4': ['For the next planting, use a variety suited to your area and resistant to disease.', 'Sa sunod nga tanum, gamita ang barayting haum sa lugar ug lig-on batok sa sakit.'],
  'guide.bl.note': ['The guides give no specific Blast treatment schedule.', 'Walay espesipikong iskedyul sa tambal sa Blast ang mga giya.'],

  // D. Bacterial Blight
  'guide.bb.signs': ['Water-soaked, drying marks; yellowish droplets on lesions early in the morning.', 'Marka nga murag nabasa ug nagkauga; madalag nga tinulo sa samad sa sayong buntag.'],
  'guide.bb.sign1': ['Marks that look water-soaked and are drying.', 'Mga marka nga murag nabasa ug nagkauga.'],
  'guide.bb.sign2': ['Yellowish droplets on lesions early in the morning.', 'Madalag nga tinulo sa samad sa sayong buntag.'],
  'guide.bb.s1': ['Avoid too much nitrogen and flooding the paddy.', 'Likayi ang sobra nga nitroheno ug pagbaha sa basakan.'],
  'guide.bb.s2': ['Clean tools before moving them to another field.', 'Hinloi ang mga gamit sa dili pa ibalhin sa laing humayan.'],
  'guide.bb.s3': ['Coordinate with the irrigation caretaker so water from the affected paddy doesn’t flow in.', 'Pakigsabot sa tig-atiman sa irigasyon aron malikayan ang tubig gikan sa apektadong basakan.'],
  'guide.bb.s4': [
  'Have a technician check it; per the guide, chemical control is not effective or economical.',
  'Ipasusi sa teknisyan; sumala sa giya, dili epektibo ug dili ekonomikanhon ang kemikal nga pagkontrol niini.'],

  'guide.bb.s5': ['For the next planting, use seed from healthy plants.', 'Sa sunod nga tanum, gamita ang binhi gikan sa himsog nga tanum.'],
  'guide.hybridNote': ['Some steps come from a hybrid-rice guide.', 'Ang pipila ka lakang gikan sa giya sa hybrid nga humay.'],

  // Disease facts shown in "Analisismo sa AI"
  'info.cause': ['Cause', 'Hinungdan'],
  'info.part': ['Affected part', 'Apektadong bahin'],
  'info.when': ['When it spreads', 'Kanus-a mokaylap'],
  'info.risk': ['Risk level', 'Lebel sa peligro'],
  'info.sheath_blight.cause': ['Fungus (Rhizoctonia solani)', 'Fungus (Rhizoctonia solani)'],
  'info.sheath_blight.part': ['Sheath and lower stem', 'Upak ug ubos nga punoan'],
  'info.sheath_blight.when': ['Dense planting, high humidity, too much nitrogen', 'Dasok nga pagtanum, taas nga umog, sobra nga nitroheno'],
  'info.sheath_blight.risk': ['Medium — can climb up to the leaves', 'Tunga-tunga — mahimong mosaka sa mga dahon'],
  'info.tungro.cause': ['Virus carried by the green leafhopper', 'Virus nga gidala sa berdeng lukso-lukso'],
  'info.tungro.part': ['Whole plant', 'Tibuok tanum'],
  'info.tungro.when': ['Many leafhoppers; staggered planting nearby', 'Daghang lukso-lukso; dili dungan nga pagtanum sa silingan'],
  'info.tungro.risk': ['High — infected plants can’t be cured', 'Taas — dili na maayo ang nataptang tanum'],
  'info.blast.cause': ['Fungus (Pyricularia oryzae)', 'Fungus (Pyricularia oryzae)'],
  'info.blast.part': ['Leaf, panicle neck and panicle', 'Dahon, liog sa uhay, ug uhay'],
  'info.blast.when': ['Long leaf wetness, cool humid nights, too much nitrogen', 'Dugay nga basa sa dahon, bugnaw ug umog nga gabii, sobra nga nitroheno'],
  'info.blast.risk': ['High — can spread to the panicle', 'Taas — mahimong mokaylap ngadto sa uhay'],
  'info.bacterial_blight.cause': ['Bacterium (Xanthomonas oryzae)', 'Bakterya (Xanthomonas oryzae)'],
  'info.bacterial_blight.part': ['Leaf edges and tips', 'Kilid ug tumoy sa dahon'],
  'info.bacterial_blight.when': ['Flooding, wind and rain, wounded leaves', 'Pagbaha, hangin ug ulan, samaran nga dahon'],
  'info.bacterial_blight.risk': ['Medium to high — spreads through water', 'Tunga-tunga ngadto sa taas — mokaylap pinaagi sa tubig'],
  'info.uncertain.cause': ['Not known', 'Wala mahibaw-i'],
  'info.uncertain.part': ['Not known', 'Wala mahibaw-i'],
  'info.uncertain.when': ['Not known', 'Wala mahibaw-i'],
  'info.uncertain.risk': ['Not known', 'Wala mahibaw-i']
});