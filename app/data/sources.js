/* SOURCES: one record per document (and per revision, for documents that are revised).
   Facts cite these ids. Details come from the MediAUS source pack.
   label   shown in source lines        short  shown beside a fact (with a section, e.g. "PI 4.2")
   kind    PI | CMI | ARTG | PBS | monograph | guideline | database | reference | demo
   tier    1-5 per "MediAUS finding and rating sources"
   revised the document's own date (YYYY, YYYY-MM or YYYY-MM-DD)
   read    when we last checked it. 22 Oct 2026 = first source pack batch (date from the data header; confirm)
   status  read | partly-read | not-read | paywalled | not-recorded | demo */
MEDIAUS.sources({

  // ---------------------------------------------------------------- amiodarone
  'S-cordarone-pi-2026-05': {
    title: 'Cordarone X Product Information', label: 'Cordarone X PI (Sanofi, May 2026)', short: 'Cordarone X PI',
    publisher: 'Sanofi', kind: 'PI', tier: 1, meds: ['amiodarone'], revised: '2026-05-12', read: '2026-10-25', status: 'read',
    url: 'https://www.medsinfo.com.au/api/documents/Cordarone_X_PI?format=pdf'
  },
  'S-aratac-pi-2022-01': {
    title: 'Aratac Product Information', label: 'Aratac PI (Viatris, Jan 2022)', short: 'Aratac PI',
    publisher: 'Viatris', kind: 'PI', tier: 1, meds: ['amiodarone'], revised: '2022-01-21', read: '2026-10-22', status: 'read',
    url: 'https://medsinfo.com.au/api/documents/Aratac_PI?format=pdf'
  },
  'S-artg-15359': {
    title: 'ARTG entry 15359: Cordarone X 100', label: 'ARTG 15359 (TGA)', short: 'ARTG',
    publisher: 'TGA', kind: 'ARTG', tier: 1, meds: ['amiodarone'], read: '2026-10-22', status: 'read',
    url: 'https://www.tga.gov.au/resources/artg/15359'
  },
  'S-pbs-2344J': {
    title: 'PBS item 2344J: amiodarone tablets', label: 'PBS Schedule item 2344J', short: 'PBS 2344J',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['amiodarone'], read: '2026-10-22', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/2344J'
  },
  'S-lactmed-amiodarone-2025-09': {
    title: 'LactMed: Amiodarone', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['amiodarone'], revised: '2025-09-15', read: '2026-10-22', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK500560/'
  },
  'S-anmf-amiodarone-2026-02': {
    title: 'ANMF Amiodarone, newborn use only (v1.0 errata)', label: 'ANMF Amiodarone, newborn use only (v1.0 errata, Feb 2026)', short: 'ANMF',
    publisher: 'Australian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['amiodarone'], revised: '2026-02-05', read: '2026-10-25', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/Amiodarone_ANMFv1.0_20260205.pdf'
  },
  'S-pch-amiodarone-2025': {
    title: 'Perth Children’s Hospital monograph: Amiodarone', label: 'Perth Children’s Hospital monograph: Amiodarone (2025)', short: 'PCH',
    publisher: 'Perth Children’s Hospital', kind: 'monograph', tier: 3, meds: ['amiodarone'], revised: '2025', read: '2026-10-25', status: 'read',
    url: 'https://www.pch.health.wa.gov.au/~/media/Files/Hospitals/PCH/General-documents/Health-professionals/MedicationMonographs/Amiodarone.pdf'
  },
  'S-rch-amiodarone': {
    title: 'RCH Paediatric Injectable Guidelines: Amiodarone', label: 'RCH Paediatric Injectable Guidelines: Amiodarone', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['amiodarone'], read: '2026-10-25', status: 'read',
    url: 'https://pig.rch.org.au/pages/amiodarone', note: 'Web page; revision date not recorded.'
  },
  'S-seslhd-amiodarone-iv-2025': {
    title: 'SESLHD Amiodarone Intravenous Medicine Guideline (v2)', label: 'SESLHD Amiodarone Intravenous guideline (v2, 2025)', short: 'SESLHD',
    publisher: 'South Eastern Sydney Local Health District', kind: 'guideline', tier: 3, meds: ['amiodarone'], revised: '2025-03', read: '2026-10-25', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/documents/SESLHDMG%20108%20-%20Amiodarone%20Intravenous%20Medicine%20Guideline_0.pdf'
  },
  'S-anzcor-11-5-2025-04': {
    title: 'ANZCOR Guideline 11.5: Medications in Adult Cardiac Arrest', label: 'ANZCOR Guideline 11.5 (Apr 2025)', short: 'ANZCOR 11.5',
    publisher: 'ANZCOR', kind: 'guideline', tier: 2, meds: ['amiodarone'], revised: '2025-04', read: '2026-10-23', status: 'read',
    url: 'https://www.anzcor.org/home/adult-advanced-life-support/guideline-11-5-medications-in-adult-cardiac-arrest/'
  },
  'S-anzcor-12-2-2026-04': {
    title: 'ANZCOR Guideline 12.2: Paediatric Advanced Life Support', label: 'ANZCOR Guideline 12.2, paediatric (Apr 2026)', short: 'ANZCOR 12.2',
    publisher: 'ANZCOR', kind: 'guideline', tier: 2, meds: ['amiodarone'], revised: '2026-04', read: '2026-10-25', status: 'read',
    url: 'https://www.anzcor.org/home/paediatric-advanced-life-support/guideline-12-2-paediatric-advanced-life-support-pals'
  },

  // ---------------------------------------------------------------- digoxin
  'S-lanoxin-pi': {
    title: 'Lanoxin Product Information (tablets, PG tablets, paediatric elixir, injection)', label: 'Lanoxin PI (Aspen)', short: 'Lanoxin PI',
    publisher: 'Aspen', kind: 'PI', tier: 1, meds: ['digoxin'], status: 'not-read',
    url: 'https://www.ebs.tga.gov.au/', note: 'Not found online. Search "Lanoxin" in TGA eBusiness Services.'
  },
  'S-sigmaxin-pi': {
    title: 'Sigmaxin Product Information', label: 'Sigmaxin PI', short: 'Sigmaxin PI',
    kind: 'PI', tier: 1, meds: ['digoxin'], status: 'not-read',
    url: 'https://www.ebs.tga.gov.au/', note: 'Not opened (TGA eBusiness Services blocks automated reading).'
  },
  'S-lanoxin-elixir-cmi': {
    title: 'Lanoxin Paediatric Elixir CMI', label: 'Lanoxin Paediatric Elixir CMI', short: 'Lanoxin Paediatric Elixir CMI',
    kind: 'CMI', tier: 1, meds: ['digoxin'], status: 'not-read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2025-CMI-01130-1'
  },
  'S-hd-sigmaxin': {
    title: 'healthdirect: Sigmaxin (ARTG data)', label: 'healthdirect: Sigmaxin (ARTG data)', short: 'healthdirect',
    publisher: 'healthdirect Australia', kind: 'ARTG', tier: 1, meds: ['digoxin'], read: '2026-10-22', status: 'read',
    url: 'https://www.healthdirect.gov.au/medicines/brand/snomed/54781000168102/sigmaxin', note: 'Consumer page that shows ARTG and AMT data.'
  },
  'S-hd-sigmaxin-pg': {
    title: 'healthdirect: Sigmaxin PG (ARTG data)', label: 'healthdirect: Sigmaxin PG (ARTG data)', short: 'healthdirect',
    publisher: 'healthdirect Australia', kind: 'ARTG', tier: 1, meds: ['digoxin'], read: '2026-10-23', status: 'read',
    url: 'https://www.healthdirect.gov.au/medicines/brand/snomed/41871000168109/sigmaxin-pg'
  },
  'S-hd-lanoxin-elixir': {
    title: 'healthdirect: Lanoxin Paediatric Elixir (ARTG data)', label: 'healthdirect: Lanoxin Paediatric Elixir (ARTG data)', short: 'healthdirect',
    publisher: 'healthdirect Australia', kind: 'ARTG', tier: 1, meds: ['digoxin'], read: '2026-10-22', status: 'read',
    url: 'https://www.healthdirect.gov.au/medicines/brand/amt,735001000168108/lanoxin-paediatric-elixir'
  },
  'S-hd-lanoxin-adult': {
    title: 'healthdirect: Lanoxin Adult injection (ARTG data)', label: 'healthdirect: Lanoxin Adult (ARTG data)', short: 'healthdirect',
    publisher: 'healthdirect Australia', kind: 'ARTG', tier: 1, meds: ['digoxin'], read: '2026-10-23', status: 'read',
    url: 'https://www.healthdirect.gov.au/medicines/brand/amt,735041000168105/lanoxin-adult'
  },
  'S-hd-lanoxin-infants': {
    title: 'healthdirect: Lanoxin Infants injection (ARTG data)', label: 'healthdirect: Lanoxin Infants (ARTG data)', short: 'healthdirect',
    publisher: 'healthdirect Australia', kind: 'ARTG', tier: 1, meds: ['digoxin'], read: '2026-10-23', status: 'read',
    url: 'https://www.healthdirect.gov.au/medicines/brand/amt,735081000168100/lanoxin-infants'
  },
  'S-artg-40661': {
    title: 'ARTG entry 40661: Lanoxin PG blister', label: 'ARTG 40661 (TGA)', short: 'ARTG',
    publisher: 'TGA', kind: 'ARTG', tier: 1, meds: ['digoxin'], read: '2026-10-22', status: 'partly-read',
    url: 'https://www.tga.gov.au/resources/artg/40661'
  },
  'S-artg-11108': {
    title: 'ARTG entry 11108: Lanoxin PG bottle', label: 'ARTG 11108 (TGA)', short: 'ARTG',
    publisher: 'TGA', kind: 'ARTG', tier: 1, meds: ['digoxin'], read: '2026-10-22', status: 'partly-read',
    url: 'https://www.tga.gov.au/resources/artg/11108'
  },
  'S-artg-lanoxin-250': {
    title: 'ARTG entry: Lanoxin 250 bottle', label: 'ARTG: Lanoxin 250 bottle (TGA)', short: 'ARTG',
    publisher: 'TGA', kind: 'ARTG', tier: 1, meds: ['digoxin'], read: '2026-10-22', status: 'partly-read',
    url: 'https://www.tga.gov.au/node/530004', note: 'ARTG number not recorded in the source pack.'
  },
  'S-pbs-1322N': {
    title: 'PBS item 1322N: digoxin 250 microgram tablets', label: 'PBS Schedule item 1322N', short: 'PBS 1322N',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['digoxin'], read: '2026-10-22', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/1322N'
  },
  'S-pbs-2605D': {
    title: 'PBS item 2605D: digoxin 62.5 microgram tablets', label: 'PBS Schedule item 2605D', short: 'PBS 2605D',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['digoxin'], status: 'not-read',
    url: 'https://www.pbs.gov.au/medicine/item/2605D', note: 'Listed in the source pack; only 1322N was read.'
  },
  'S-pbs-3164M': {
    title: 'PBS item 3164M: Lanoxin Paediatric Elixir', label: 'PBS Schedule item 3164M', short: 'PBS 3164M',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['digoxin'], status: 'not-read',
    note: 'Item number seen on the healthdirect elixir page; the PBS page itself was not opened.'
  },
  'S-lactmed-digoxin': {
    title: 'LactMed: Digoxin', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['digoxin'], read: '2026-10-22', status: 'read',
    url: 'https://ncbi.nlm.nih.gov/books/n/lactmed/LM93', note: 'Revision date not recorded.'
  },
  'S-anmf-digoxin-2021-04': {
    title: 'ANMF Digoxin, newborn use only (v2.0)', label: 'ANMF Digoxin, newborn use only (v2.0, 2021)', short: 'ANMF',
    publisher: 'Australian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['digoxin'], revised: '2021-04-26', read: '2026-10-25', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/neomed21digoxin.pdf',
    note: 'Was due for review on 26 Apr 2026; no newer version found on 25 Oct 2026.'
  },
  'S-pch-digoxin-2025': {
    title: 'Perth Children’s Hospital monograph: Digoxin', label: 'Perth Children’s Hospital monograph: Digoxin (2025)', short: 'PCH',
    publisher: 'Perth Children’s Hospital', kind: 'monograph', tier: 3, meds: ['digoxin'], revised: '2025', read: '2026-10-25', status: 'read',
    url: 'https://www.pch.health.wa.gov.au/~/media/Files/Hospitals/PCH/General-documents/Health-professionals/MedicationMonographs/Digoxin.pdf'
  },
  'S-rch-digoxin': {
    title: 'RCH Paediatric Injectable Guidelines: Digoxin', label: 'RCH Paediatric Injectable Guidelines: Digoxin', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['digoxin'], read: '2026-10-25', status: 'read',
    url: 'https://pig.rch.org.au/pages/digoxin', note: 'Web page; revision date not recorded.'
  },

  // ---------------------------------------------------------------- amoxicillin
  'S-alphamox-pi-2026-09': {
    title: 'Alphamox Product Information', label: 'Alphamox PI (Viatris, Sep 2026)', short: 'Alphamox PI',
    publisher: 'Viatris', kind: 'PI', tier: 1, meds: ['amoxicillin'], revised: '2026-09-29', read: '2026-10-22', status: 'read',
    url: 'https://medsinfo.com.au/api/documents/Alphamox_PI?format=pdf', note: 'Covers Alphamox 250 mg and 500 mg capsules only.'
  },
  'S-alphamox-cmi-2026-09': {
    title: 'Alphamox Consumer Medicine Information', label: 'Alphamox CMI (Sep 2026)', short: 'Alphamox CMI',
    publisher: 'Viatris', kind: 'CMI', tier: 1, meds: ['amoxicillin'], revised: '2026-09', read: '2026-10-23', status: 'partly-read',
    url: 'https://medsinfo.com.au/api/documents/Alphamox_CMI?format=pdf'
  },
  'S-fisamox-pi-2022-07': {
    title: 'Fisamox Product Information', label: 'Fisamox PI (Viatris, Jul 2022)', short: 'Fisamox PI',
    publisher: 'Viatris', kind: 'PI', tier: 1, meds: ['amoxicillin'], revised: '2022-07', read: '2026-10-25', status: 'read',
    url: 'https://medsinfo.com.au/api/documents/Fisamox_PI?format=pdf'
  },
  'S-ibiamox-cmi-2015': {
    title: 'Ibiamox Consumer Medicine Information', label: 'Ibiamox CMI (Juno, 2015)', short: 'Ibiamox CMI',
    publisher: 'Juno', kind: 'CMI', tier: 1, meds: ['amoxicillin'], revised: '2015', read: '2026-10-25', status: 'read',
    url: 'https://www.nps.org.au/assets/medicines/d4472c2e-d631-44f1-af55-a53300fec751.pdf'
  },
  'S-hd-ibiamox': {
    title: 'healthdirect: Ibiamox (ARTG data)', label: 'healthdirect: Ibiamox (ARTG data)', short: 'healthdirect',
    publisher: 'healthdirect Australia', kind: 'ARTG', tier: 1, meds: ['amoxicillin'], read: '2026-10-23', status: 'read',
    url: 'https://www.healthdirect.gov.au/medicines/brand/snomed/39666011000036102/ibiamox'
  },
  'S-hd-cilamox': {
    title: 'healthdirect: Cilamox (ARTG data)', label: 'healthdirect: Cilamox (ARTG data)', short: 'healthdirect',
    publisher: 'healthdirect Australia', kind: 'ARTG', tier: 1, meds: ['amoxicillin'], read: '2026-10-22', status: 'read',
    url: 'https://www.healthdirect.gov.au/medicines/brand/snomed/4046011000036102/cilamox'
  },
  'S-cilamox-pi': {
    title: 'Cilamox Product Information', label: 'Cilamox PI', short: 'Cilamox PI',
    kind: 'PI', tier: 1, meds: ['amoxicillin'], status: 'not-read',
    url: 'https://www.ebs.tga.gov.au/', note: 'Not opened (TGA eBusiness Services blocks automated reading).'
  },
  'S-artg-amoxicillin': {
    title: 'ARTG entries for amoxicillin products', label: 'ARTG (TGA)', short: 'ARTG',
    publisher: 'TGA', kind: 'ARTG', tier: 1, meds: ['amoxicillin'], status: 'not-recorded',
    note: 'The source pack does not record which ARTG entries were read for amoxicillin. Record them.'
  },
  'S-pbs-amoxicillin': {
    title: 'PBS: amoxicillin items', label: 'PBS Schedule', short: 'PBS',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['amoxicillin'], read: '2026-10-22', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/11947T-11998L-12002Q-1884E-1886G-1887H-1888J-1889K-3300Q-3301R-3302T-3310F-3393N-5225B-8581P-8705E-9714G'
  },
  'S-lactmed-amoxicillin-2026-06': {
    title: 'LactMed: Amoxicillin', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['amoxicillin'], revised: '2026-06-15', read: '2026-10-22', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK500887/'
  },
  'S-rch-amoxicillin': {
    title: 'RCH Paediatric Injectable Guidelines: Amoxicillin', label: 'RCH Paediatric Injectable Guidelines: Amoxicillin', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['amoxicillin'], read: '2026-10-25', status: 'read',
    url: 'https://pig.rch.org.au/pages/amoxicillin', note: 'Web page; revision date not recorded.'
  },
  'S-anmf-amoxicillin': {
    title: 'ANMF Amoxicillin, newborn use only', label: 'ANMF Amoxicillin', short: 'ANMF',
    publisher: 'Australian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['amoxicillin'], status: 'not-read',
    note: 'Named as where to look for newborn doses and rates; not opened yet.'
  },
  'S-fsrh-2022-05': {
    title: 'FSRH Clinical Guideline: Drug Interactions with Hormonal Contraception', label: 'UK FSRH guidance', short: 'FSRH',
    publisher: 'Faculty of Sexual and Reproductive Healthcare (UK)', kind: 'guideline', tier: 4, meds: ['amoxicillin'], revised: '2022-05', status: 'not-read',
    url: 'https://apps.nhslothian.scot/files/sites/2/drug-interactions-with-hormonal-contraception-5may2022.pdf',
    note: 'Not read directly. Its summary was seen in GPnotebook (https://gpnotebook.com/en-AU/pages/gynaecology/oral-contraceptives-and-antibiotics), which is a lead, not a source.'
  },
  'S-etg': {
    title: 'Therapeutic Guidelines (eTG): Antibiotic', label: 'Therapeutic Guidelines (eTG)', short: 'eTG',
    publisher: 'Therapeutic Guidelines Ltd', kind: 'reference', tier: 2, meds: ['amoxicillin'], status: 'paywalled'
  },

  // ---------------------------------------------------------------- shared references and gaps
  'S-tga-pregnancy-db': {
    title: 'TGA Prescribing medicines in pregnancy database', label: 'TGA pregnancy database', short: 'TGA pregnancy database',
    publisher: 'TGA', kind: 'database', tier: 1, meds: ['amiodarone', 'digoxin', 'amoxicillin'], status: 'not-read',
    url: 'https://www.tga.gov.au/prescribing-medicines-pregnancy-database'
  },
  'S-drtc': {
    title: 'Don’t Rush to Crush', label: 'Don’t Rush to Crush (SHPA)', short: 'Don’t Rush to Crush',
    publisher: 'SHPA', kind: 'reference', tier: 2, meds: ['amiodarone', 'digoxin', 'amoxicillin'], status: 'paywalled',
    note: 'Crushing, dispersing and enteral tube use.'
  },
  'S-aidh': {
    title: 'Australian Injectable Drugs Handbook', label: 'Australian Injectable Drugs Handbook (SHPA)', short: 'AIDH',
    publisher: 'SHPA', kind: 'reference', tier: 2, meds: ['digoxin', 'amoxicillin'], status: 'paywalled'
  },
  'S-local-resus': {
    title: 'Local resuscitation protocol', label: 'Local resuscitation protocol', short: 'local protocol',
    kind: 'guideline', status: 'not-recorded', note: 'Varies by health service.'
  },

  // ---------------------------------------------------------------- demo
  'S-demo': {
    title: 'Demo data, invented for testing the app', label: 'Demo data (not a source)', short: 'Demo',
    kind: 'demo', status: 'demo', note: 'Search-only medicines, checker pairs, sample pills and barcodes. Replace before any release.'
  }
});
