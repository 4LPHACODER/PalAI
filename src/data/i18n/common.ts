import { dict } from './dict';

/** Shared chrome: navigation, common actions, statuses, sync, notifications, reminders, accessibility. */
export const commonStrings = dict({
  // Navigation
  'nav.home': ['Home', 'Panimalay'],
  'nav.fields': ['My Fields', 'Akong mga Humayan'],
  'nav.scan': ['Scan', 'Susiha'],
  'nav.records': ['Records', 'Mga Rekord'],
  'nav.profile': ['Profile', 'Akong Impormasyon'],
  'nav.main': ['Main', 'Panguna nga nabigasyon'],

  // Common actions
  'common.next': ['Next', 'Sunod'],
  'common.back': ['Back', 'Balik'],
  'common.skip': ['Skip introduction', 'Laktawi ang pasiuna'],
  'common.getStarted': ['Get Started', 'Magsugod'],
  'common.tryDemo': ['Try Demo', 'Sulayi ang Demo'],
  'common.save': ['Save', 'Tipigi'],
  'common.saveContinue': ['Save and Continue', 'Tipigi ug Padayon'],
  'common.saveChanges': ['Save Changes', 'Tipigi ang mga Kausaban'],
  'common.saving': ['Saving…', 'Gitipigan…'],
  'common.cancel': ['Cancel', 'Kanselahon'],
  'common.close': ['Close', 'Isira'],
  'common.edit': ['Edit', 'I-edit'],
  'common.viewAll': ['View All', 'Tan-awa Tanan'],
  'common.change': ['Change', 'Usba'],
  'common.choose': ['Choose', 'Pilia'],
  'common.remove': ['Remove', 'Tangtanga'],
  'common.keepEditing': ['Keep Editing', 'Padayon sa Pag-edit'],
  'common.discard': ['Discard', 'Isalikway'],
  'common.retry': ['Retry', 'Sulayi Pag-usab'],
  'common.tryAgain': ['Try Again', 'Sulayi Pag-usab'],
  'common.notRecorded': ['Not recorded', 'Wala marekord'],
  'common.optional': ['Optional', 'Opsyonal'],
  'common.done': ['Done', 'Nahuman'],
  'common.signOut': ['Sign Out', 'Mogawas'],
  'common.viewField': ['View Field', 'Tan-awa ang Humayan'],
  'common.viewRecord': ['View Record', 'Tan-awa ang Rekord'],
  'common.addObservation': ['Add Observation', 'Pagdugang og Obserbasyon'],
  'common.scanLeaf': ['Scan Rice Leaf', 'Susiha ang Dahon sa Humay'],
  'common.savePreferences': ['Save Preferences', 'Tipigi ang mga Gusto'],
  'common.stopSharing': ['Stop Sharing', 'Hunonga ang Pagpaambit'],
  'common.language': ['Language', 'Pinulongan'],
  'common.demoData': ['Demo Data', 'Pananglitan nga Datos'],
  'common.demo': ['Demo', 'Demo'],
  'common.demoOnly': ['Demo only', 'Pananglitan lamang'],
  'common.simulated': ['Simulated Result', 'Pananglitan nga Resulta'],
  'common.noField': ['No field linked', 'Walay nalambigit nga humayan'],
  'common.loading': ['Loading…', 'Gikarga…'],
  'common.all': ['All', 'Tanan'],
  'common.sample': ['Sample', 'Pananglitan'],
  'common.on': ['On', 'Naka-on'],
  'common.off': ['Off', 'Naka-off'],
  'common.or': ['or', 'o'],
  'common.goBack': ['Go back', 'Balik'],
  'common.brgy': ['Brgy.', 'Brgy.'],

  // Brand
  'brand.tagline': ['Your rice health companion', 'Imong kauban sa kahimsog sa humay'],

  // Units & dates
  'unit.hectare': ['{n} hectare', '{n} ka ektarya'],
  'unit.hectares': ['{n} hectares', '{n} ka ektarya'],
  'due.overdue': ['Overdue', 'Lapas na'],
  'due.today': ['Today', 'Karong adlawa'],
  'due.tomorrow': ['Tomorrow', 'Ugma'],
  'time.todayAt': ['Today, {time}', 'Karong adlawa, {time}'],

  // Scan statuses
  'status.followup': ['Follow-up', 'Susihon Pag-usab'],
  'status.saved': ['Saved', 'Natipigan'],
  'status.retake': ['Retake Photo', 'Kuhaa Pag-usab ang Litrato'],
  'status.pending': ['Pending Analysis', 'Nagpaabot sa Pagtuki'],

  // Field statuses
  'fstatus.followup': ['Follow-up recommended', 'Girekomendar nga susihon pag-usab'],
  'fstatus.ok': ['No follow-up needed', 'Walay kinahanglang susihon pag-usab'],
  'fstatus.none': ['No records yet', 'Wala pay mga rekord'],
  'fstatus.noteOne': ['One recent scan needs another observation.', 'Usa ka bag-ong pagsusi ang kinahanglang tan-awon pag-usab.'],
  'fstatus.noteMany': ['{n} recent scans need another observation.', '{n} ka bag-ong pagsusi ang kinahanglang tan-awon pag-usab.'],
  'fstatus.noteOk': ['No follow-up from recent records.', 'Walay kinahanglang susihon gikan sa bag-ong mga rekord.'],
  'fstatus.noteNone': ['No scans or observations yet.', 'Wala pay pagsusi o obserbasyon.'],

  // Crop stages
  'stage.Not specified': ['Not specified', 'Wala gitino'],
  'stage.Land preparation': ['Land preparation', 'Pag-andam sa yuta'],
  'stage.Seedling': ['Seedling', 'Semilya'],
  'stage.Tillering': ['Tillering', 'Pagsaha'],
  'stage.Reproductive': ['Reproductive', 'Pagpanguhay'],
  'stage.Ripening': ['Ripening', 'Paghinog'],
  'stage.Harvested': ['Harvested', 'Naani na'],

  // Location sources
  'loc.device': ['Device location', 'Lokasyon sa device'],
  'loc.map': ['Map selection', 'Gipili sa mapa'],
  'loc.manual': ['Manual address', 'Gisulat nga adres'],

  // Sync / connection
  'sync.synced.label': ['Online · All records synced', 'Online · Na-sync ang tanang rekord'],
  'sync.synced.title': ['Online, all records synced', 'Online, na-sync ang tanang rekord'],
  'sync.synced.text': ['Your scans and field notes are saved and up to date on this phone.', 'Natipigan ug bag-o ang imong mga pagsusi ug nota sa humayan niini nga telepono.'],
  'sync.offline.label': ['Offline · Saved records available', 'Offline · Maablihan ang natipigang mga rekord'],
  'sync.offline.title': ['Offline', 'Offline'],
  'sync.offline.text': ['There is no signal right now. You can still open saved records, fill in forms, and take new photos.', 'Walay signal karon. Maablihan gihapon nimo ang natipigang mga rekord, makasulat sa mga porma, ug makakuha og bag-ong litrato.'],
  'sync.pending.label': ['2 records waiting to sync', '2 ka rekord ang naghulat nga ma-sync'],
  'sync.pending.title': ['2 records waiting to sync', '2 ka rekord ang naghulat nga ma-sync'],
  'sync.pending.text': ['Two records are saved on this phone and are waiting for a stable connection.', 'Duha ka rekord ang natipigan niini nga telepono ug naghulat og lig-on nga koneksiyon.'],
  'sync.failed.label': ['Sync failed', 'Napakyas ang pag-sync'],
  'sync.failed.title': ['Sync failed', 'Napakyas ang pag-sync'],
  'sync.failed.text': ['Your records could not be sent, but they are still saved on this phone. Tap Retry to try again.', 'Wala maipadala ang imong mga rekord, apan natipigan gihapon kini niini nga telepono. Tuploka ang Sulayi Pag-usab.'],
  'conn.retrying': ['Retrying…', 'Gisulayan pag-usab…'],
  'conn.about': ['About connection status', 'Bahin sa kahimtang sa koneksiyon'],
  'conn.title': ['Connection status', 'Kahimtang sa koneksiyon'],
  'conn.savedNote': [
  'Your changes are saved on this device. Cloud sync is not connected in this prototype, so no records are uploaded.',
  'Natipigan ang imong mga kausaban niini nga device. Wala pa konektado ang cloud sync niini nga prototype, busa walay rekord nga ma-upload.'],

  'conn.preview': ['Preview a status', 'Tan-awa ang usa ka kahimtang'],
  'storage.error': [
  'Couldn’t save on this device. Your latest changes may be lost if you close the app.',
  'Dili matipig niini nga device. Basin mawala ang imong bag-ong mga kausaban kon isira nimo ang app.'],


  // Header & notifications
  'header.notifs': ['Notifications', 'Mga Pahibalo'],
  'header.notifsUnread': ['Notifications, {n} unread', 'Mga Pahibalo, {n} wala pa mabasa'],
  'notif.title': ['Notifications', 'Mga Pahibalo'],
  'notif.unread': ['{n} unread', '{n} wala pa mabasa'],
  'notif.caught': ['All caught up', 'Nabasa na tanan'],
  'notif.sample': ['Sample notifications', 'Pananglitan nga mga pahibalo'],
  'notif.new': ['New', 'Bag-o'],
  'notif.reminder.title': ['Recheck {field} tomorrow', 'Susiha pag-usab ang {field} ugma'],
  'notif.reminder.body': [
  'A follow-up photo is due for the plants you scanned on October 6.',
  'Kinahanglan na usab og litrato sa mga tanum nga imong gisusi niadtong Oktubre 6.'],

  'notif.record.title': ['Screening saved: Possible Sheath Blight', 'Natipigan ang pagsusi: Posibleng Sheath Blight'],
  'notif.record.body': ['{field} · Review the suggested next steps for this record.', '{field} · Basaha ang gisugyot nga mga sunod nga lakang alang niini nga rekord.'],
  'notif.welcome.title': ['Welcome to PalAI', 'Maayong pag-abot sa PalAI'],
  'notif.welcome.demoBody': ['Your rice health companion. This preview uses sample data.', 'Imong kauban sa kahimsog sa humay. Pananglitan nga datos ang gigamit niini nga preview.'],
  'notif.welcome.accountBody': [
  'Your rice health companion. Start by scanning a leaf or adding a field.',
  'Imong kauban sa kahimsog sa humay. Sugdi pinaagi sa pagsusi og dahon o pagdugang og humayan.'],


  // Reminders
  'rem.title': ['Reminder', 'Pahinumdom'],
  'rem.due': ['Due: {when}', 'Takdang adlaw: {when}'],
  'rem.dueLong': ['Due {when} · {date}', 'Takdang adlaw {when} · {date}'],
  'rem.view': ['View Reminder', 'Tan-awa ang Pahinumdom'],
  'rem.whatToDo': ['What to do', 'Unsay buhaton'],
  'rem.related': ['Related record', 'May kalabotan nga rekord'],
  'rem.goScan': ['Go to Scan', 'Adto sa Susiha'],
  'rem.recheck.title': ['Recheck {field}', 'Susiha pag-usab ang {field}'],
  'rem.recheck.desc': ['Photograph the lower stem and sheath again.', 'Kuhaa pag-usab og litrato ang upak ug ubos nga bahin sa punoan.'],
  'rem.recheck.s1': ['Go back to the plants you checked on October 6.', 'Balika ang mga tanum nga imong gisusi niadtong Oktubre 6.'],
  'rem.recheck.s2': ['Photograph the sheath and lower stem in morning light.', 'Kuhaa og litrato ang upak ug ubos nga bahin sa punoan sa sayong buntag.'],
  'rem.recheck.s3': ['Compare: has the affected area grown, or is it about the same?', 'Itandi: midako ba ang apektadong bahin, o parehas ra?'],

  // Field picker
  'picker.title': ['Choose a field', 'Pagpili og humayan'],
  'picker.none': ['Don’t link to a field', 'Ayaw ilambigit sa humayan'],
  'picker.empty': ['You have no active fields yet.', 'Wala ka pay aktibo nga humayan.'],
  'picker.aria': ['Fields', 'Mga humayan'],

  // Photo tips
  'tip.light.title': ['Use good daylight', 'Gamita ang hayag nga adlaw'],
  'tip.light.text': ['Avoid shadows and strong backlight.', 'Likayi ang landong ug kusog nga suga sa likod.'],
  'tip.one.title': ['One leaf or stem at a time', 'Usa ka dahon o punoan matag higayon'],
  'tip.one.text': ['Hold it flat and let it fill the frame.', 'Kupti kini nga patag ug papunoa sa litrato.'],
  'tip.focus.title': ['Keep it in focus', 'Siguroha nga dili hanap'],
  'tip.focus.text': ['Tap the screen to focus, then hold still.', 'Tuploka ang screen aron mo-focus, unya ayaw lihok.'],
  'tip.spots.title': ['Show the marks', 'Ipakita ang mga marka'],
  'tip.spots.text': ['Make sure any spots or color changes are visible.', 'Siguroha nga makita ang mga marka o kausaban sa kolor.'],

  // Dialogs
  'unsaved.title': ['Discard your changes?', 'Isalikway ang imong mga kausaban?'],
  'unsaved.text': ['You have changes that are not saved yet. If you leave now, they will be lost.', 'Aduna kay mga kausaban nga wala pa matipig. Kon mobiya ka karon, mawala kini.']
});