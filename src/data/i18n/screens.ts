import { dict } from './dict';

/** Field directory, field detail, field and observation forms, location, photos and validation messages. */
export const screenStrings = dict({
  'common.undo': ['Undo', 'Bawia'],
  'form.offline': [
  'You’re offline. You can keep filling in this form — it is saved on this device.',
  'Offline ka. Mahimo kang magpadayon sa pagsulat niini nga porma — natipigan kini niini nga device.'],

  'auth.showPw': ['Show password', 'Ipakita ang password'],
  'auth.hidePw': ['Hide password', 'Itago ang password'],

  // My Fields
  'fields.noneTitle': ['No fields yet', 'Wala pay humayan'],
  'fields.noneText': ['Add your first field to organize your observations.', 'Idugang ang imong unang humayan aron mahapsay ang imong mga obserbasyon.'],
  'fields.noMatch': ['No fields match your search.', 'Walay humayan nga mohaum sa imong gipangita.'],
  'fields.noMatchText': ['Check the spelling, or search by barangay or city.', 'Susiha ang spelling, o pangitaa pinaagi sa barangay o siyudad.'],
  'fields.clearSearch': ['Clear search', 'Hawani ang pagpangita'],
  'fields.noArchived': ['No archived fields', 'Walay na-archive nga humayan'],
  'fields.noArchivedText': ['Archived fields will appear here.', 'Makita dinhi ang mga na-archive nga humayan.'],
  'fields.noActive': ['No active fields', 'Walay aktibo nga humayan'],
  'fields.noActiveText': ['Add a field or restore one from Archived.', 'Pagdugang og humayan o ibalik ang usa gikan sa Na-archive.'],
  'fields.filterAria': ['Filter fields', 'Sala ang mga humayan'],

  // Field detail
  'fd.notFound': ['Field not found', 'Wala makit-i ang humayan'],
  'fd.notFoundText': ['This field may have been removed.', 'Basin natangtang na kini nga humayan.'],
  'fd.backToFields': ['Back to My Fields', 'Balik sa Akong mga Humayan'],
  'fd.archivedToast': ['Field archived', 'Na-archive ang humayan'],
  'fd.archivedToastDesc': ['Its records remain available.', 'Magpabilin nga maablihan ang mga rekord niini.'],
  'fd.restoredToast': ['Field restored', 'Naibalik ang humayan'],
  'fd.restoredToastDesc': ['{name} is active again.', 'Aktibo na usab ang {name}.'],
  'fd.moreOptions': ['More options', 'Dugang mga kapilian'],
  'fd.closeMenu': ['Close menu', 'Isira ang menu'],
  'fd.archivedBanner': ['Archived. Records stay available for viewing.', 'Na-archive. Maablihan gihapon ang mga rekord.'],
  'fd.address': ['Address', 'Adres'],
  'fd.locSource': ['Location source', 'Gigikanan sa lokasyon'],
  'fd.restoreToScan': ['Restore this field to link new scans to it.', 'Ibalik kini nga humayan aron malambigit ang bag-ong mga pagsusi.'],
  'fd.recentScans': ['Recent scans', 'Bag-ong mga pagsusi'],
  'fd.noScans': ['No scans for this field yet', 'Wala pay pagsusi alang niini nga humayan'],
  'fd.noScansText': ['Scan a leaf to start this field’s screening history.', 'Susiha ang usa ka dahon aron masugdan ang kasaysayan sa pagsusi niini nga humayan.'],
  'fd.observations': ['Field observations', 'Mga obserbasyon sa humayan'],
  'fd.noObs': ['No observations yet', 'Wala pay obserbasyon'],
  'fd.noObsText': ['Write down what you notice, like spots, pests, or water level.', 'Isulat ang imong namatikdan, sama sa mga marka, peste, o lebel sa tubig.'],
  'fd.tasks': ['Follow-up tasks', 'Mga buluhaton sa pagsusi pag-usab'],
  'fd.noTasks': ['No follow-up tasks for this field.', 'Walay buluhaton sa pagsusi pag-usab alang niini nga humayan.'],
  'fd.archiveTitle': ['Archive this field?', 'I-archive kini nga humayan?'],
  'fd.archiveText': [
  'This field will move to Archived. Its records will remain available.',
  'Mabalhin kini nga humayan sa Na-archive. Magpabilin nga maablihan ang mga rekord niini.'],

  'fd.mapAlt': ['Map preview of {name}', 'Mapa sa {name}'],
  'fd.photoAlt': ['{name} rice field', 'Humayan sa {name}'],
  'fd.noPhoto': ['No field photo', 'Walay litrato sa humayan'],

  // Observations
  'obs.attachmentAlt': ['Observation attachment', 'Litrato sa obserbasyon'],
  'obs.photoOnly': ['Photo only', 'Litrato lamang'],
  'obs.by': ['By {name}', 'Ni {name}'],
  'obs.edited': ['Edited', 'Na-edit'],
  'obsf.notFound': ['Observation not found', 'Wala makit-i ang obserbasyon'],
  'obsf.notFoundText': ['It may have been removed, or the field no longer exists.', 'Basin natangtang na kini, o wala na ang humayan.'],
  'obsf.edit': ['Edit Observation', 'I-edit ang Obserbasyon'],
  'obsf.intro': [
  'Your own note about the field. It is kept separate from AI screening, and a photo here stays an attachment — it is not screened.',
  'Imong kaugalingong nota bahin sa humayan. Bulag kini sa pagsusi sa AI, ug ang litrato dinhi magpabilin nga attachment — dili kini susihon.'],

  'obsf.notesPh': [
  'What did you notice? e.g. spots near the canal, water level, pests.',
  'Unsay imong namatikdan? pananglitan: mga marka duol sa kanal, lebel sa tubig, peste.'],

  'obsf.photo': ['Photo attachment', 'Litrato nga attachment'],
  'obsf.photoHint': ['Kept with this note on this device. To screen a leaf, use Scan instead.', 'Itipig uban niini nga nota niini nga device. Aron masusi ang dahon, gamita ang Susiha.'],
  'obsf.save': ['Save Observation', 'Tipigi ang Obserbasyon'],
  'obsf.savedToast': ['Observation saved', 'Natipigan ang obserbasyon'],
  'obsf.savedToastDesc': ['Added to {field}’s timeline.', 'Gidugang sa timeline sa {field}.'],

  // Field form
  'ff.progress': ['Form progress', 'Pag-uswag sa porma'],
  'ff.detailsTitle': ['Field details', 'Mga detalye sa humayan'],
  'ff.detailsText': ['Only the name is required. Skip anything you’re unsure about.', 'Ang ngalan lamang ang kinahanglan. Laktawi ang dili nimo sigurado.'],
  'ff.namePh': ['e.g. Riverside Plot', 'pananglitan: Riverside Plot'],
  'ff.areaPh': ['e.g. 1.2', 'pananglitan: 1.2'],
  'ff.areaHint': ['Leave blank if you don’t know the exact size.', 'Biyai nga blangko kon dili nimo sigurado ang gidak-on.'],
  'ff.varietyPh': ['Search, e.g. NSIC Rc 222', 'Pangitaa, pananglitan: NSIC Rc 222'],
  'ff.varietyHint': [
  'Pick from the list, choose “Not sure”, or choose “Other” to type it.',
  'Pilia gikan sa lista, pilia ang “Not sure”, o pilia ang “Other” aron isulat kini.'],

  'ff.varietyName': ['Variety name', 'Ngalan sa barayti'],
  'ff.plantingHint': ['The day the rice was actually planted.', 'Ang adlaw nga gitanum gyud ang humay.'],
  'ff.stageHint': [
  'Choose what you see in the field now. PalAI won’t guess it from the planting date.',
  'Pilia ang imong makita sa humayan karon. Dili kini tagnaon sa PalAI gikan sa petsa sa pagtanum.'],

  'ff.notesPh': ['e.g. Water comes from the river pump.', 'pananglitan: Ang tubig gikan sa bomba sa suba.'],
  'ff.reviewTitle': ['Review and save', 'Repasoha ug tipigi'],
  'ff.reviewText': ['Check everything before saving. You can edit it later.', 'Susiha ang tanan sa dili pa itipig. Mahimo nimo kining usbon unya.'],
  'ff.cropInfo': ['Crop information', 'Impormasyon sa tanum'],
  'ff.description': ['Description', 'Paghulagway'],
  'ff.pin': ['Pin', 'Pin'],
  'ff.noPin': ['No pin', 'Walay pin'],
  'ff.notesPhoto': ['Notes and photo', 'Mga nota ug litrato'],
  'ff.noPhoto': ['No photo', 'Walay litrato'],
  'ff.fieldAlt': ['Field photo', 'Litrato sa humayan'],
  'ff.editSection': ['Edit {section}', 'I-edit ang {section}'],
  'ff.updatedToast': ['Field updated', 'Na-update ang humayan'],
  'ff.savedDevice': ['Saved on this device.', 'Natipigan niini nga device.'],
  'ff.addedToast': ['Field added', 'Nadugang ang humayan'],
  'ff.addedToastDesc': ['It’s now in My Fields and the Home field selector.', 'Anaa na kini sa Akong mga Humayan ug sa pagpili og humayan sa Panimalay.'],

  // Location stage
  'loc.title': ['Field location', 'Lokasyon sa humayan'],
  'loc.warn': [
  'Your current location may be different from your field. Check the pin before saving.',
  'Basin lahi ang imong karon nga lokasyon sa imong humayan. Susiha ang pin sa dili pa itipig.'],

  'loc.methodAria': ['How to set the location', 'Unsaon pagbutang sa lokasyon'],
  'loc.useMine': ['Use My Location', 'Gamita ang Akong Lokasyon'],
  'loc.useMineText': ['Ask your phone where you are now', 'Pangutan-a ang imong telepono kon asa ka karon'],
  'loc.chooseMap': ['Choose on Map', 'Pilia sa Mapa'],
  'loc.chooseMapText': ['Place a pin on the demo map', 'Butangi og pin ang pananglitan nga mapa'],
  'loc.enterManual': ['Enter Location Manually', 'Isulat ang Lokasyon'],
  'loc.enterManualText': ['Type the province, city, and barangay', 'Isulat ang probinsya, siyudad, ug barangay'],
  'loc.confirm': ['Confirm Field Location', 'Kumpirmaha ang Lokasyon sa Humayan'],
  'loc.pinConfirmed': ['Pin confirmed', 'Nakumpirma ang pin'],
  'loc.offlineTitle': ['No internet connection', 'Walay koneksiyon sa internet'],
  'loc.offlineMap': [
  'The map can’t load offline. Enter the address below — you can add a pin later.',
  'Dili makarga ang mapa kon offline. Isulat ang adres sa ubos — mahimo kang modugang og pin unya.'],

  'loc.addrTitle': ['Field address', 'Adres sa humayan'],
  'loc.addrText': [
  'Needed to identify the field. Suggestions are a partial list — type any name.',
  'Gikinahanglan aron mailhan ang humayan. Dili kompleto ang mga sugyot — mahimo kang mosulat og bisan unsang ngalan.'],

  'loc.detailPh': ['e.g. Purok 3, near the irrigation canal', 'pananglitan: Purok 3, duol sa kanal sa irigasyon'],
  'loc.pinDetails': ['Pin details', 'Mga detalye sa pin'],
  'loc.coords': ['Coordinates:', 'Mga coordinate:'],
  'loc.source': ['Source:', 'Gigikanan:'],
  'loc.pinNote': [
  'A pin marks a reference point, not the field boundary. Area is not calculated from it.',
  'Ang pin nagtimaan og usa ka punto, dili utlanan sa humayan. Dili kini gigamit sa pagkuwenta sa gilapdon.'],

  'loc.removePin': ['Remove pin', 'Tangtanga ang pin'],
  'loc.noPin': ['No pin set. That’s fine — the address is enough to save this field.', 'Walay pin. Okay ra — igo na ang adres aron matipig kini nga humayan.'],
  'map.aria': ['Demo map. Tap to place the field pin, or use the arrow keys to move it.', 'Pananglitan nga mapa. Tuploka aron ibutang ang pin, o gamita ang mga arrow key aron ibalhin kini.'],
  'map.label': ['Demo map', 'Pananglitan nga mapa'],
  'map.outside': [
  'This location is outside the demo map area. The coordinates are still recorded.',
  'Gawas kini nga lokasyon sa pananglitan nga mapa. Narekord gihapon ang mga coordinate.'],

  'map.tapHint': ['Tap to place the pin', 'Tuploka aron ibutang ang pin'],

  // Device location
  'dev.finding': ['Finding your location…', 'Gipangita ang imong lokasyon…'],
  'dev.found': ['Location found', 'Nakit-an ang lokasyon'],
  'dev.accuracy': [
  'Accuracy about {m} m. Is this your field, or just where you are?',
  'Kasaktuhan mga {m} m. Kini ba ang imong humayan, o diin ka lang karon?'],

  'dev.adjust': ['Check or move the pin on the map', 'Susiha o ibalhin ang pin sa mapa'],
  'dev.denied.title': ['Location permission denied', 'Wala gitugot ang lokasyon'],
  'dev.denied.text': [
  'PalAI can’t use your location. Choose on the map or enter the address below.',
  'Dili magamit sa PalAI ang imong lokasyon. Pilia sa mapa o isulat ang adres sa ubos.'],

  'dev.unavailable.title': ['Location unavailable', 'Dili makuha ang lokasyon'],
  'dev.unavailable.text': [
  'Your phone couldn’t find its location. Try again outdoors, or enter the address below.',
  'Wala makit-i sa imong telepono ang lokasyon. Sulayi pag-usab sa gawas, o isulat ang adres sa ubos.'],

  'dev.offline.title': ['No internet connection', 'Walay koneksiyon sa internet'],
  'dev.offline.text': [
  'Location and maps may not work offline. Enter the address below — you can add a pin later.',
  'Basin dili molihok ang lokasyon ug mapa kon offline. Isulat ang adres sa ubos — mahimo kang modugang og pin unya.'],

  'dev.manual': ['Enter manually', 'Isulat'],
  'dev.preview': ['Preview location problems', 'Tan-awa ang mga problema sa lokasyon'],

  // Photo field
  'photo.replace': ['Replace photo', 'Ilisan ang litrato'],
  'photo.add': ['Add photo', 'Pagdugang og litrato'],
  'photo.preparing': ['Preparing photo…', 'Giandam ang litrato…'],
  'photo.local': ['Saved on this device only.', 'Natipigan niini nga device lamang.'],
  'photo.selectedAlt': ['Selected photo', 'Gipili nga litrato'],
  'photo.notImage': ['That file isn’t a photo. Choose a JPG or PNG image.', 'Dili litrato kana nga file. Pagpili og JPG o PNG nga hulagway.'],
  'photo.readFail': ['We couldn’t read that photo. Try another one.', 'Dili mabasa ang litrato. Sulayi ang lain.'],

  // Validation messages (looked up by their English text so validators stay simple)
  'val.email': ['Enter your email address.', 'Isulat ang imong email address.'],
  'val.emailFormat': ['Enter a valid email address, like name@example.com.', 'Isulat ang saktong email address, sama sa name@example.com.'],
  'val.pwCreate': ['Create a password.', 'Paghimo og password.'],
  'val.pwLength': ['Use at least 8 characters.', 'Gamita ang labing menos 8 ka karakter.'],
  'val.pwAgain': ['Type your password again.', 'Isulat pag-usab ang imong password.'],
  'val.pwMatch': ['Passwords do not match.', 'Dili parehas ang mga password.'],
  'val.pwEnter': ['Enter your password.', 'Isulat ang imong password.'],
  'val.areaNumber': ['Enter a number, like 1.2.', 'Isulat ang numero, sama sa 1.2.'],
  'val.areaPositive': ['Area must be greater than 0.', 'Kinahanglan mas dako sa 0 ang gilapdon.'],
  'val.areaLarge': ['Check the area. It looks too large for one field.', 'Susiha ang gilapdon. Murag dako kaayo alang sa usa ka humayan.'],
  'val.mobile': ['Enter an 11-digit mobile number, like 0917 123 4567.', 'Isulat ang 11 ka numero sa mobile, sama sa 0917 123 4567.'],
  'val.obsFuture': ['The observation date can’t be in the future.', 'Dili mahimong sa umaabot ang petsa sa obserbasyon.'],
  'val.obsDate': ['Enter the date you made this observation.', 'Isulat ang petsa sa imong obserbasyon.'],
  'val.obsContent': ['Add a note or a photo.', 'Pagdugang og nota o litrato.'],
  'val.fieldName': ['Give this field a name, like “Riverside Plot”.', 'Hatagi og ngalan kini nga humayan, sama sa “Riverside Plot”.'],
  'val.variety': ['Type the variety name, or choose “Not sure”.', 'Isulat ang ngalan sa barayti, o pilia ang “Not sure”.'],
  'val.plantFuture': [
  'Planting date can’t be in the future. Enter the day the rice was actually planted, or leave it blank.',
  'Dili mahimong sa umaabot ang petsa sa pagtanum. Isulat ang adlaw nga gitanum gyud ang humay, o biyai nga blangko.'],

  'val.fProvince': ['Enter the province.', 'Isulat ang probinsya.'],
  'val.fCity': ['Enter the city or municipality.', 'Isulat ang siyudad o lungsod.'],
  'val.fBarangay': ['Enter the barangay so the field can be identified.', 'Isulat ang barangay aron mailhan ang humayan.'],
  'val.pName': ['Enter the name PalAI should call you.', 'Isulat ang ngalan nga itawag kanimo sa PalAI.'],
  'val.pProvince': ['Enter your province.', 'Isulat ang imong probinsya.'],
  'val.pCity': ['Enter your city or municipality.', 'Isulat ang imong siyudad o lungsod.'],
  'val.pBarangay': ['Enter your barangay.', 'Isulat ang imong barangay.'],
  'val.fullName': ['Enter your full name.', 'Isulat ang imong tibuok ngalan.'],
  'val.noAccount': [
  'No account with this email was created on this device. Create an account, or try the demo.',
  'Walay account niini nga email nga gihimo niini nga device. Paghimo og account, o sulayi ang demo.'],

  'val.accountExists': [
  'An account with this email already exists on this device. Sign in instead.',
  'Aduna nay account niini nga email niini nga device. Mosulod na lang.'],

  'val.org': ['Choose an organization.', 'Pagpili og organisasyon.'],
  'val.shareFields': ['Choose at least one field to share.', 'Pagpili og labing menos usa ka humayan nga ipaambit.']
});