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
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['amiodarone'], revised: '2026-02-05', read: '2026-10-25', status: 'read',
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
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['digoxin'], revised: '2021-04-26', read: '2026-10-25', status: 'read',
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
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['amoxicillin'], status: 'not-read',
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
    publisher: 'Therapeutic Guidelines Ltd', kind: 'reference', tier: 2, meds: ['amoxicillin', 'piperacillin-tazobactam'], status: 'paywalled'
  },

  // ---------------------------------------------------------------- baclofen (added 27 Oct 2026)
  'S-lioresal-tab-pi-2025-06': {
    title: 'Lioresal Tablets Product Information', label: 'Lioresal Tablets PI (Novartis, Jun 2025)', short: 'Lioresal PI',
    publisher: 'Novartis', kind: 'PI', tier: 1, meds: ['baclofen'], revised: '2025-06-06', read: '2026-10-27', status: 'read',
    url: 'https://www.medsinfo.com.au/api/documents/Lioresal_Tablets_PI?format=pdf'
  },
  'S-clofen-pi-2024-11': {
    title: 'Clofen Product Information', label: 'Clofen PI (Viatris, Nov 2024)', short: 'Clofen PI',
    publisher: 'Alphapharm (Viatris)', kind: 'PI', tier: 1, meds: ['baclofen'], revised: '2024-11-04', read: '2026-10-27', status: 'read',
    url: 'https://apps.medicines.org.au/files/afpclofe.pdf'
  },
  'S-lioresal-it-pi-2024-02': {
    title: 'Lioresal Intrathecal Product Information', label: 'Lioresal Intrathecal PI (Novartis, Feb 2024)', short: 'Lioresal Intrathecal PI',
    publisher: 'Novartis', kind: 'PI', tier: 1, meds: ['baclofen'], revised: '2024-02-22', read: '2026-10-27', status: 'read',
    url: 'https://medsinfo.com.au/api/documents/Lioresal_Intrathecal_PI?format=pdf'
  },
  'S-pbs-baclofen': {
    title: 'PBS item 2729P and related: baclofen tablets and intrathecal injections', label: 'PBS Schedule item 2729P and related', short: 'PBS 2729P and related',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['baclofen'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/11126N-11128Q-11194E-11195F-13359D-13522Q-2729P-2730Q-5617P-6284R'
  },
  'S-lactmed-baclofen': {
    title: 'LactMed: Baclofen', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['baclofen'], status: 'not-read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501201/', note: 'Not opened: NCBI showed a browser check (CAPTCHA) to automated reading.'
  },
  'S-pch-baclofen': {
    title: 'Perth Children’s Hospital monograph: Baclofen', label: 'Perth Children’s Hospital monograph: Baclofen', short: 'PCH',
    publisher: 'Perth Children’s Hospital', kind: 'monograph', tier: 3, meds: ['baclofen'], status: 'not-read',
    url: 'https://www.pch.health.wa.gov.au/~/media/Files/Hospitals/PCH/General-documents/Health-professionals/MedicationMonographs/Baclofen.pdf', note: 'Not opened: the site blocks automated reading. Expected to give child oral doses.'
  },

  // ---------------------------------------------------------------- pantoprazole (added 27 Oct 2026)
  'S-somac-pi-2026-07': {
    title: 'Somac Product Information (tablets and granules)', label: 'Somac PI (Takeda, Jul 2026)', short: 'Somac PI',
    publisher: 'Takeda', kind: 'PI', tier: 1, meds: ['pantoprazole'], revised: '2026-07-07', read: '2026-10-27', status: 'read',
    url: 'https://medsinfo.com.au/api/documents/Somac_PI?format=pdf'
  },
  'S-somac-iv-pi-2026-07': {
    title: 'Somac IV Product Information', label: 'Somac IV PI (Takeda, Jul 2026)', short: 'Somac IV PI',
    publisher: 'Takeda', kind: 'PI', tier: 1, meds: ['pantoprazole'], revised: '2026-07-07', read: '2026-10-27', status: 'read',
    url: 'https://medsinfo.com.au/api/documents/Somac_Injection_PI?format=pdf'
  },
  'S-pbs-8008L': {
    title: 'PBS item 8008L: pantoprazole 40 mg enteric tablets', label: 'PBS Schedule item 8008L', short: 'PBS 8008L',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['pantoprazole'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/8008L'
  },
  'S-lactmed-pantoprazole-2026-06': {
    title: 'LactMed: Pantoprazole', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['pantoprazole'], revised: '2026-06-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501280/'
  },
  'S-rch-pantoprazole': {
    title: 'RCH Paediatric Injectable Guidelines: Pantoprazole', label: 'RCH Paediatric Injectable Guidelines: Pantoprazole', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['pantoprazole'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/pantoprazole', note: 'Web page; revision date not shown.'
  },
  'S-anmf-pantoprazole-2021-03': {
    title: 'ANMF Pantoprazole, newborn use only (v2.0)', label: 'ANMF Pantoprazole, newborn use only (v2.0, Mar 2021)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['pantoprazole'], revised: '2021-03-25', read: '2026-10-27', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/neomed21pantoprazole.pdf', note: 'Review was due 25 Mar 2026; no newer version found.'
  },

  // ---------------------------------------------------------------- tacrolimus (added 27 Oct 2026)
  'S-prograf-pi-2026-09': {
    title: 'Prograf and Advagraf XL Product Information', label: 'Prograf and Advagraf XL PI (Astellas, Sep 2026)', short: 'Prograf PI',
    publisher: 'Astellas', kind: 'PI', tier: 1, meds: ['tacrolimus'], revised: '2026-09-30', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2019-PI-01808-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Also on medsinfo.'
  },
  'S-pbs-5299X': {
    title: 'PBS item 5299X: tacrolimus 500 microgram modified release capsule', label: 'PBS Schedule item 5299X', short: 'PBS 5299X',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['tacrolimus'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/5299X'
  },
  'S-lactmed-tacrolimus-2026-03': {
    title: 'LactMed: Tacrolimus', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['tacrolimus'], revised: '2026-03-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501104/'
  },
  'S-rch-tacrolimus': {
    title: 'RCH Paediatric Injectable Guidelines: Tacrolimus', label: 'RCH Paediatric Injectable Guidelines: Tacrolimus', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['tacrolimus'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/tacrolimus', note: 'Web page; revision date not shown.'
  },

  // ---------------------------------------------------------------- piperacillin-tazobactam (added 27 Oct 2026)
  'S-tazocin-ef-pi-2024-06': {
    title: 'Tazocin EF Product Information', label: 'Tazocin EF PI (Pfizer, Jun 2024)', short: 'Tazocin EF PI',
    publisher: 'Pfizer', kind: 'PI', tier: 1, meds: ['piperacillin-tazobactam'], revised: '2024-06-03', read: '2026-10-27', status: 'read',
    url: 'https://medsinfo.com.au/api/searchapi/Tazocin_EF_PI?format=pdf'
  },
  'S-piptaz-kabi-pi-2026-10': {
    title: 'Piperacillin/Tazobactam Kabi Product Information', label: 'Piperacillin/Tazobactam Kabi PI (Fresenius Kabi, Oct 2026)', short: 'Kabi PI',
    publisher: 'Fresenius Kabi', kind: 'PI', tier: 1, meds: ['piperacillin-tazobactam'], revised: '2026-10-13', read: '2026-10-27', status: 'partly-read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2020-PI-01024-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Read sections 2–4.2, 7 and 10.'
  },
  'S-rch-piptaz': {
    title: 'RCH Paediatric Injectable Guidelines: Piperacillin + tazobactam', label: 'RCH Paediatric Injectable Guidelines: Piperacillin + tazobactam', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['piperacillin-tazobactam'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/piperacillin-tazobactam', note: 'Web page; revision date not shown.'
  },
  'S-qld-piptaz-2026-03': {
    title: 'Queensland Clinical Guidelines neonatal monograph: Piperacillin and tazobactam (NMedQ26.122-V1-R31)', label: 'Queensland neonatal monograph: Piperacillin and tazobactam (Mar 2026)', short: 'Qld neonatal',
    publisher: 'Queensland Clinical Guidelines', kind: 'monograph', tier: 3, meds: ['piperacillin-tazobactam'], revised: '2026-03-25', read: '2026-10-27', status: 'read',
    url: 'https://www.health.qld.gov.au/__data/assets/pdf_file/0028/1490545/nmq-pip-taz.pdf'
  },
  'S-anmf-piptaz-2020-11': {
    title: 'ANMF Piperacillin-tazobactam, newborn use only (v2.0)', label: 'ANMF Piperacillin-tazobactam, newborn use only (v2.0, Nov 2020)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['piperacillin-tazobactam'], revised: '2020-11-16', read: '2026-10-27', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/neomed20peperacillintazobactamfull.pdf', note: 'Review was due 16 Nov 2025; no newer version found.'
  },
  'S-lactmed-piptaz-2021-02': {
    title: 'LactMed: Piperacillin and Tazobactam', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['piperacillin-tazobactam'], revised: '2021-02-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501068/'
  },

  // ---------------------------------------------------------------- lidocaine (added 27 Oct 2026)
  'S-xylocaine-pi-2025-06': {
    title: 'Xylocaine and Xylocaine with Adrenaline Product Information', label: 'Xylocaine PI (Aspen, Jun 2025)', short: 'Xylocaine PI',
    publisher: 'Aspen', kind: 'PI', tier: 1, meds: ['lidocaine'], revised: '2025-06-10', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2017-PI-01946-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-xylocard-pi-2024-08': {
    title: 'Xylocard Product Information', label: 'Xylocard PI (Aspen, Aug 2024)', short: 'Xylocard PI',
    publisher: 'Aspen', kind: 'PI', tier: 1, meds: ['lidocaine'], revised: '2024-08-26', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2017-PI-02257-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-xylocaine-viscous-pi-2024-07': {
    title: 'Xylocaine Viscous Product Information', label: 'Xylocaine Viscous PI (Aspen, Jul 2024)', short: 'Xylocaine Viscous PI',
    publisher: 'Aspen', kind: 'PI', tier: 1, meds: ['lidocaine'], revised: '2024-07-24', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2024-PI-02299-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-xylocaine-jelly-pi-2024-07': {
    title: 'Xylocaine 2% Jelly Product Information', label: 'Xylocaine 2% Jelly PI (Aspen, Jul 2024)', short: 'Xylocaine Jelly PI',
    publisher: 'Aspen', kind: 'PI', tier: 1, meds: ['lidocaine'], revised: '2024-07-24', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2024-PI-01616-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-lidocaine': {
    title: 'RCH Paediatric Injectable Guidelines: Lidocaine (lignocaine)', label: 'RCH Paediatric Injectable Guidelines: Lidocaine (lignocaine)', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['lidocaine'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/lidocaine', note: 'Web page; revision date not shown.'
  },
  'S-anmf-lidocaine-2023-02': {
    title: 'ANMF Lidocaine (lignocaine) for local anaesthesia, newborn use only (v1.0)', label: 'ANMF Lidocaine, local anaesthesia, newborn use only (v1.0, Feb 2023)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['lidocaine'], revised: '2023-02-09', read: '2026-10-27', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/Lidocaine20230209.pdf'
  },
  'S-lactmed-lidocaine-2024-12': {
    title: 'LactMed: Lidocaine', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['lidocaine'], revised: '2024-12-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501230/'
  },
  'S-pbs-4308R': {
    title: 'PBS item 4308R: lidocaine 2% oral liquid (Xylocaine Viscous)', label: 'PBS Schedule item 4308R', short: 'PBS 4308R',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['lidocaine'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/4308R'
  },

  // ---------------------------------------------------------------- empagliflozin (added 27 Oct 2026)
  'S-jardiance-pi-2026-02': {
    title: 'Jardiance Product Information', label: 'Jardiance PI (Boehringer Ingelheim, Feb 2026)', short: 'Jardiance PI',
    publisher: 'Boehringer Ingelheim', kind: 'PI', tier: 1, meds: ['empagliflozin'], revised: '2026-02-19', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2014-PI-01783-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Same text as the medsinfo copy (PI0145-23).'
  },
  'S-pbs-14018T': {
    title: 'PBS item 14018T: empagliflozin 10 mg tablet', label: 'PBS Schedule item 14018T', short: 'PBS 14018T',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['empagliflozin'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/14018T'
  },
  'S-lactmed-empagliflozin-2026-05': {
    title: 'LactMed: Empagliflozin', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['empagliflozin'], revised: '2026-05-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK500972/'
  },
  'S-ads-sglt2-2022-01': {
    title: 'ADS Alert update January 2022: SGLT2 inhibitor use and periprocedural ketoacidosis', label: 'Australian Diabetes Society alert (Jan 2022)', short: 'ADS alert',
    publisher: 'Australian Diabetes Society', kind: 'guideline', tier: 2, meds: ['empagliflozin'], revised: '2022-01', read: '2026-10-27', status: 'read',
    url: 'https://www.diabetessociety.com.au/downloads/202202092021ADS_DKA_SGLT2i_Alert_highlightedchanges_Jan22.pdf'
  },

  // ---------------------------------------------------------------- ketamine (added 27 Oct 2026)
  'S-ketalar-pi-2021-09': {
    title: 'Ketalar Product Information', label: 'Ketalar PI (Pfizer, Sep 2021)', short: 'Ketalar PI',
    publisher: 'Pfizer', kind: 'PI', tier: 1, meds: ['ketamine'], revised: '2021-09-30', read: '2026-10-27', status: 'read',
    url: 'https://medsinfo.com.au/api/documents/Ketalar_PI?format=pdf'
  },
  'S-ketamine-baxter-pi-2026-02': {
    title: 'Ketamine-Baxter Product Information', label: 'Ketamine-Baxter PI (Feb 2026)', short: 'Ketamine-Baxter PI',
    publisher: 'Baxter', kind: 'PI', tier: 1, meds: ['ketamine'], revised: '2026-02-24', read: '2026-10-27', status: 'partly-read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2018-PI-02521-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Read 4.2 (start), 6.5 and 10.'
  },
  'S-ketamine-interpharma-pi-2022-08': {
    title: 'Ketamine Interpharma Product Information', label: 'Ketamine Interpharma PI (Aug 2022)', short: 'Ketamine Interpharma PI',
    publisher: 'InterPharma', kind: 'PI', tier: 1, meds: ['ketamine'], revised: '2022-08-03', read: '2026-10-27', status: 'partly-read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2019-PI-02404-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Read sections 2–4.2 (start), 7 and 10.'
  },
  'S-biomed-ketamine-pi-2025-10': {
    title: 'Biomed Ketamine Product Information', label: 'Biomed Ketamine PI (Oct 2025)', short: 'Biomed Ketamine PI',
    publisher: 'Biomed', kind: 'PI', tier: 1, meds: ['ketamine'], revised: '2025-10-21', read: '2026-10-27', status: 'partly-read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2020-PI-01836-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Read sections 2–4.2 (start), 6.5 and 10. Infusion rates not yet read.'
  },
  'S-rch-ketamine': {
    title: 'RCH Paediatric Injectable Guidelines: Ketamine', label: 'RCH Paediatric Injectable Guidelines: Ketamine', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['ketamine'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/ketamine', note: 'Web page; revision date not shown.'
  },
  'S-lactmed-ketamine-2026-02': {
    title: 'LactMed: Ketamine', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['ketamine'], revised: '2026-02-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK500566/'
  },

  // ---------------------------------------------------------------- ipratropium (added 27 Oct 2026)
  'S-atrovent-mdi-pi-2022-08': {
    title: 'Atrovent Metered Dose Inhaler Product Information', label: 'Atrovent inhaler PI (Boehringer Ingelheim, Aug 2022)', short: 'Atrovent PI',
    publisher: 'Boehringer Ingelheim', kind: 'PI', tier: 1, meds: ['ipratropium'], revised: '2022-08-17', read: '2026-10-27', status: 'read',
    url: 'https://apps.medicines.org.au/files/bypatrcf.pdf'
  },
  'S-atrovent-neb-pi-2019-11': {
    title: 'Atrovent Nebulising Solutions Product Information', label: 'Atrovent nebulising solutions PI (Boehringer Ingelheim, Nov 2019)', short: 'Atrovent UDV PI',
    publisher: 'Boehringer Ingelheim', kind: 'PI', tier: 1, meds: ['ipratropium'], revised: '2019-11-28', read: '2026-10-27', status: 'read',
    url: 'https://medsinfo.com.au/api/searchapi/Atrovent_Nebulising_Solutions_PI?format=pdf'
  },
  'S-pbs-8671J': {
    title: 'PBS item 8671J: ipratropium 21 microgram/actuation inhaler', label: 'PBS Schedule item 8671J', short: 'PBS 8671J',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['ipratropium'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/8671J'
  },
  'S-lactmed-ipratropium': {
    title: 'LactMed: Ipratropium', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['ipratropium'], read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501483/', note: 'Revision date not shown on the page.'
  },
  'S-aah-acute-adult': {
    title: 'Australian Asthma Handbook: immediate treatment of acute asthma in adults and adolescents in the ED', label: 'Australian Asthma Handbook: acute asthma, adults (ED)', short: 'Asthma Handbook',
    publisher: 'National Asthma Council Australia', kind: 'guideline', tier: 2, meds: ['ipratropium', 'salbutamol'], read: '2026-10-27', status: 'read',
    url: 'https://www.asthmahandbook.org.au/pdf/6063', note: 'No version date shown.'
  },
  'S-aah-acute-child-6-11': {
    title: 'Australian Asthma Handbook: managing acute asthma in children 6–11 years in the ED', label: 'Australian Asthma Handbook: acute asthma, children 6–11 (ED)', short: 'Asthma Handbook',
    publisher: 'National Asthma Council Australia', kind: 'guideline', tier: 2, meds: ['ipratropium', 'salbutamol'], read: '2026-10-27', status: 'read',
    url: 'https://www.asthmahandbook.org.au/acute-asthma/children-6-11-years/managing-acute-asthma-in-children-6-11-years-in-ed', note: 'No version date shown.'
  },
  'S-aah-acute-child-1-5': {
    title: 'Australian Asthma Handbook: managing acute asthma in children 1–5 years', label: 'Australian Asthma Handbook: acute asthma, children 1–5', short: 'Asthma Handbook',
    publisher: 'National Asthma Council Australia', kind: 'guideline', tier: 2, meds: ['ipratropium'], status: 'not-read',
    url: 'https://www.asthmahandbook.org.au/acute-asthma', note: 'Page did not load for automated reading.'
  },

  // ---------------------------------------------------------------- metformin (added 27 Oct 2026)
  'S-diabex-pi-2026-08': {
    title: 'Diabex Product Information', label: 'Diabex PI (Aug 2026)', short: 'Diabex PI',
    publisher: 'Viatris', kind: 'PI', tier: 1, meds: ['metformin'], revised: '2026-08-21', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-04544-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-diabex-xr-pi-2026-08': {
    title: 'Diabex XR 500 and 1000 Product Information', label: 'Diabex XR PI (Aug 2026)', short: 'Diabex XR PI',
    publisher: 'Viatris', kind: 'PI', tier: 1, meds: ['metformin'], revised: '2026-08-21', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2019-PI-01840-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-diaformin-pi-2026-10': {
    title: 'Diaformin Viatris Product Information', label: 'Diaformin Viatris PI (Oct 2026)', short: 'Diaformin PI',
    publisher: 'Viatris', kind: 'PI', tier: 1, meds: ['metformin'], revised: '2026-10-07', read: '2026-10-27', status: 'partly-read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2024-PI-02415-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Read sections 3, 4.3, 4.4 (renal), 4.6 and 10.'
  },
  'S-pbs-metformin': {
    title: 'PBS item 2430X and 8607B: metformin 500 mg and 1 g tablets', label: 'PBS Schedule item 2430X and 8607B', short: 'PBS 2430X and 8607B',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['metformin'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/2430X-8607B'
  },
  'S-lactmed-metformin': {
    title: 'LactMed: Metformin', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['metformin'], status: 'not-read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501020/', note: 'Not opened: NCBI showed a browser check (CAPTCHA) to automated reading.'
  },
  'S-mja-metformin-ckd-2019': {
    title: 'Tanner C et al. Metformin: time to review its role and safety in chronic kidney disease. Med J Aust 2019;211(1):37–42', label: 'MJA review: metformin in chronic kidney disease (2019)', short: 'MJA 2019',
    publisher: 'Medical Journal of Australia', kind: 'reference', tier: 2, meds: ['metformin'], revised: '2019-07', read: '2026-10-27', status: 'read',
    url: 'https://mja.com.au/journal/2019/211/1/metformin-time-review-its-role-and-safety-chronic-kidney-disease', note: 'Summarises AMH dose limits by creatinine clearance.'
  },

  // ---------------------------------------------------------------- paracetamol (added 27 Oct 2026)
  'S-panadol-pi-2025-07': {
    title: 'Panadol Tablets and Mini Caps Product Information', label: 'Panadol PI (Haleon, Jul 2025)', short: 'Panadol PI',
    publisher: 'Haleon', kind: 'PI', tier: 1, meds: ['paracetamol'], revised: '2025-07-10', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2025-PI-01066-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-panadol-osteo-pi-2025-07': {
    title: 'Panadol Osteo Product Information', label: 'Panadol Osteo PI (Haleon, Jul 2025)', short: 'Panadol Osteo PI',
    publisher: 'Haleon', kind: 'PI', tier: 1, meds: ['paracetamol'], revised: '2025-07-10', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2024-PI-02448-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-paracetamol-kabi-pi-2025-07': {
    title: 'Paracetamol Kabi solution for infusion Product Information', label: 'Paracetamol Kabi IV PI (Fresenius Kabi, Jul 2025)', short: 'Paracetamol Kabi PI',
    publisher: 'Fresenius Kabi', kind: 'PI', tier: 1, meds: ['paracetamol'], revised: '2025-07-21', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2014-PI-02174-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-paracetamol': {
    title: 'RCH Paediatric Injectable Guidelines: Paracetamol', label: 'RCH Paediatric Injectable Guidelines: Paracetamol', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['paracetamol'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/paracetamol', note: 'Web page; revision date not shown.'
  },
  'S-anmf-paracetamol-2022-02': {
    title: 'ANMF Paracetamol, newborn use only', label: 'ANMF Paracetamol, newborn use only (v4.0, Feb 2022)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['paracetamol'], revised: '2022-02-03', read: '2026-10-27', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Paracetamol_%20ANMFv4.0_20220203.pdf'
  },
  'S-lactmed-paracetamol-2026-04': {
    title: 'LactMed: Acetaminophen (paracetamol)', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['paracetamol'], revised: '2026-04-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501194/'
  },
  'S-pbs-paracetamol-665': {
    title: 'PBS item 8814X and related: paracetamol 665 mg modified release tablets', label: 'PBS Schedule item 8814X and related', short: 'PBS 8814X and related',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['paracetamol'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/10598T-5343F-8814X'
  },
  'S-nps-child-fever': {
    title: 'Treating my child’s pain or fever: paracetamol or ibuprofen?', label: 'NPS MedicineWise: child pain or fever, paracetamol or ibuprofen', short: 'NPS MedicineWise',
    publisher: 'NPS MedicineWise', kind: 'guideline', tier: 3, meds: ['paracetamol', 'ibuprofen'], read: '2026-10-27', status: 'read',
    url: 'https://www.nps.org.au/consumers/treating-my-child-s-pain-or-fever-paracetamol-or-ibuprofen', note: 'Consumer page; no review date shown.'
  },

  // ---------------------------------------------------------------- glyceryl-trinitrate (added 27 Oct 2026)
  'S-nitrostat-pi-2025-06': {
    title: 'Nitrostat sublingual tablets Product Information', label: 'Nitrostat PI (Jun 2025)', short: 'Nitrostat PI',
    kind: 'PI', tier: 1, meds: ['glyceryl-trinitrate'], revised: '2025-06', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2025-PI-01744-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Section 10 says new PI; date from the document footer.'
  },
  'S-nitrolingual-pi-2026-02': {
    title: 'Nitrolingual Pumpspray Product Information', label: 'Nitrolingual Pumpspray PI (Feb 2026)', short: 'Nitrolingual PI',
    kind: 'PI', tier: 1, meds: ['glyceryl-trinitrate'], revised: '2026-02-24', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2021-PI-02143-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-transiderm-nitro-pi-2026-10': {
    title: 'Transiderm-Nitro Product Information', label: 'Transiderm-Nitro PI (Oct 2026)', short: 'Transiderm-Nitro PI',
    kind: 'PI', tier: 1, meds: ['glyceryl-trinitrate'], revised: '2026-10-09', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2023-PI-01915-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-dbl-gtn-pi-2022-01': {
    title: 'DBL Glyceryl Trinitrate Concentrate Injection Product Information', label: 'DBL Glyceryl Trinitrate PI (Pfizer, Jan 2022)', short: 'DBL GTN PI',
    publisher: 'Pfizer', kind: 'PI', tier: 1, meds: ['glyceryl-trinitrate'], revised: '2022-01-25', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2018-PI-01848-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-gtn': {
    title: 'RCH Paediatric Injectable Guidelines: Glyceryl trinitrate', label: 'RCH Paediatric Injectable Guidelines: Glyceryl trinitrate', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['glyceryl-trinitrate'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/glyceryl-trinitrate', note: 'Web page; revision date not shown.'
  },
  'S-lactmed-gtn-2024-10': {
    title: 'LactMed: Nitroglycerin (glyceryl trinitrate)', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['glyceryl-trinitrate'], revised: '2024-10-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501516/'
  },
  'S-pbs-gtn': {
    title: 'PBS item 8171C and related: glyceryl trinitrate spray and patches', label: 'PBS Schedule item 8171C and related', short: 'PBS 8171C and related',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['glyceryl-trinitrate'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/1515R-1516T-3475X-8027L-8028M-8119H-8171C'
  },

  // ---------------------------------------------------------------- salbutamol (added 27 Oct 2026)
  'S-ventolin-mdi-pi-2026-04': {
    title: 'Ventolin CFC-Free Inhaler Product Information', label: 'Ventolin Inhaler PI (GSK, Apr 2026)', short: 'Ventolin Inhaler PI',
    publisher: 'GSK', kind: 'PI', tier: 1, meds: ['salbutamol'], revised: '2026-04-01', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2021-PI-01994-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-ventolin-nebules-pi-2025-06': {
    title: 'Ventolin Respirator Solution and Nebules Product Information', label: 'Ventolin Nebules PI (GSK, Jun 2025)', short: 'Ventolin Nebules PI',
    publisher: 'GSK', kind: 'PI', tier: 1, meds: ['salbutamol'], revised: '2025-06-30', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-05107-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-ventolin-inj-pi-2024-02': {
    title: 'Ventolin Sugar Free Syrup and Injection Product Information', label: 'Ventolin Syrup and Injection PI (GSK, Feb 2024)', short: 'Ventolin Injection PI',
    publisher: 'GSK', kind: 'PI', tier: 1, meds: ['salbutamol'], revised: '2024-02-05', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-04949-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-salbutamol': {
    title: 'RCH Paediatric Injectable Guidelines: Salbutamol', label: 'RCH Paediatric Injectable Guidelines: Salbutamol', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['salbutamol'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/salbutamol', note: 'Web page; revision date not shown.'
  },
  'S-anmf-salbutamol-2026-01': {
    title: 'ANMF Salbutamol, newborn use only', label: 'ANMF Salbutamol, newborn use only (v3.0 errata, Jan 2026)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['salbutamol'], revised: '2026-01-22', read: '2026-10-27', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/Salbutamol_ANMFv3.0_20260122.pdf'
  },
  'S-lactmed-salbutamol': {
    title: 'LactMed: Albuterol (salbutamol)', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['salbutamol'], status: 'not-read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501486/', note: 'Not opened: NCBI showed a browser check (CAPTCHA) to automated reading.'
  },
  'S-pbs-salbutamol': {
    title: 'PBS item 12109H and related: salbutamol inhaler, nebules and oral liquid', label: 'PBS Schedule item 12109H and related', short: 'PBS 12109H and related',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['salbutamol'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/1103C-11095Y-11130T-12109H-13821K-2000G-2001H-8354Q'
  },

  // ---------------------------------------------------------------- atorvastatin (added 27 Oct 2026)
  'S-lipitor-pi-2026-02': {
    title: 'Lipitor Product Information', label: 'Lipitor PI (Feb 2026)', short: 'Lipitor PI',
    kind: 'PI', tier: 1, meds: ['atorvastatin', 'colchicine'], revised: '2026-02-27', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2021-PI-01263-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-pbs-8215J': {
    title: 'PBS item 8215J: atorvastatin 40 mg tablets', label: 'PBS Schedule item 8215J', short: 'PBS 8215J',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['atorvastatin'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/8215J'
  },
  'S-lactmed-atorvastatin-2026-07': {
    title: 'LactMed: Atorvastatin', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['atorvastatin'], revised: '2026-07-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501361/'
  },

  // ---------------------------------------------------------------- ibuprofen (added 27 Oct 2026)
  'S-brufen-pi-2026-04': {
    title: 'Brufen Product Information', label: 'Brufen PI (Viatris, Apr 2026)', short: 'Brufen PI',
    publisher: 'Viatris', kind: 'PI', tier: 1, meds: ['ibuprofen'], revised: '2026-04-08', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2009-PI-00035-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-caldolor-pi-2026-02': {
    title: 'Caldolor Product Information', label: 'Caldolor PI (Feb 2026)', short: 'Caldolor PI',
    kind: 'PI', tier: 1, meds: ['ibuprofen'], revised: '2026-02-05', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2023-PI-01569-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-pedea-pi-2026-04': {
    title: 'Pedea Product Information', label: 'Pedea PI (Apr 2026)', short: 'Pedea PI',
    kind: 'PI', tier: 1, meds: ['ibuprofen'], revised: '2026-04-16', read: '2026-10-27', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2019-PI-01642-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-ibuprofen': {
    title: 'RCH Paediatric Injectable Guidelines: Ibuprofen', label: 'RCH Paediatric Injectable Guidelines: Ibuprofen', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['ibuprofen'], read: '2026-10-27', status: 'read',
    url: 'https://pig.rch.org.au/pages/ibuprofen', note: 'Web page; revision date not shown.'
  },
  'S-anmf-ibuprofen-2025-11': {
    title: 'ANMF Ibuprofen, newborn use only', label: 'ANMF Ibuprofen, newborn use only (v3.0 errata, Nov 2025)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['ibuprofen'], revised: '2025-11-27', read: '2026-10-27', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/Ibuprofen_ANMFv3.0_20251127.pdf', note: 'Review due 23 Sep 2026.'
  },
  'S-lactmed-ibuprofen-2025-08': {
    title: 'LactMed: Ibuprofen', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['ibuprofen'], revised: '2025-08-15', read: '2026-10-27', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK500986/'
  },
  'S-pbs-3192B': {
    title: 'PBS item 3192B: ibuprofen 400 mg tablet', label: 'PBS Schedule item 3192B', short: 'PBS 3192B',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['ibuprofen'], read: '2026-10-27', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/3192B'
  },

  // ---------------------------------------------------------------- aciclovir (added 28 Oct 2026)
  'S-aciclovir-sandoz-pi-2026-04': {
    title: 'Aciclovir Sandoz Tablets Product Information', label: 'Aciclovir Sandoz PI (Apr 2026)', short: 'Aciclovir Sandoz PI',
    publisher: 'Sandoz', kind: 'PI', tier: 1, meds: ['aciclovir'], revised: '2026-04-21', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2015-PI-01135-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-dbl-aciclovir-pi-2023-07': {
    title: 'DBL Aciclovir Intravenous Infusion Product Information', label: 'DBL Aciclovir IV PI (Pfizer, Jul 2023)', short: 'DBL Aciclovir PI',
    publisher: 'Pfizer', kind: 'PI', tier: 1, meds: ['aciclovir'], revised: '2023-07-10', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2011-PI-03549-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-aciclovir': {
    title: 'RCH Paediatric Injectable Guidelines: Aciclovir', label: 'RCH Paediatric Injectable Guidelines: Aciclovir', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['aciclovir'], read: '2026-10-28', status: 'read',
    url: 'https://pig.rch.org.au/pages/aciclovir', note: 'Web page; revision date not shown.'
  },
  'S-anmf-aciclovir-2025-02': {
    title: 'ANMF Aciclovir, newborn use only', label: 'ANMF Aciclovir, newborn use only (v4.0, Feb 2025)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['aciclovir'], revised: '2025-02-13', read: '2026-10-28', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/Aciclovir_ANMFv4.0_20250213.pdf', note: 'Review due 16 Dec 2029.'
  },
  'S-lactmed-aciclovir-2026-02': {
    title: 'LactMed: Acyclovir (aciclovir)', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['aciclovir'], revised: '2026-02-15', read: '2026-10-28', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501195/'
  },
  'S-pbs-aciclovir': {
    title: 'PBS item 1003T and related: aciclovir 200 mg and 800 mg tablets', label: 'PBS Schedule item 1003T and related', short: 'PBS 1003T and related',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['aciclovir'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/1002R-1003T-1007B-1052J-1555W-5501M'
  },

  // ---------------------------------------------------------------- esomeprazole (added 28 Oct 2026)
  'S-nexium-pi-2025-06': {
    title: 'Nexium Product Information', label: 'Nexium PI (AstraZeneca, Jun 2025)', short: 'Nexium PI',
    publisher: 'AstraZeneca', kind: 'PI', tier: 1, meds: ['esomeprazole'], revised: '2025-06-18', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-05173-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-nexium-iv-pi-2025-06': {
    title: 'Nexium IV Product Information', label: 'Nexium IV PI (AstraZeneca, Jun 2025)', short: 'Nexium IV PI',
    publisher: 'AstraZeneca', kind: 'PI', tier: 1, meds: ['esomeprazole'], revised: '2025-06-17', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-05523-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-esomeprazole': {
    title: 'RCH Paediatric Injectable Guidelines: Esomeprazole', label: 'RCH Paediatric Injectable Guidelines: Esomeprazole', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['esomeprazole'], read: '2026-10-28', status: 'read',
    url: 'https://pig.rch.org.au/pages/esomeprazole', note: 'Web page; revision date not shown.'
  },
  'S-lactmed-esomeprazole': {
    title: 'LactMed: Esomeprazole', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['esomeprazole'], status: 'not-read',
    note: 'Not opened: NCBI showed a browser check (CAPTCHA) to automated reading, so the record id is not confirmed.'
  },
  'S-pbs-8886Q': {
    title: 'PBS item 8886Q: esomeprazole 20 mg enteric tablet', label: 'PBS Schedule item 8886Q', short: 'PBS 8886Q',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['esomeprazole'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/8886Q'
  },
  'S-pbs-14512T': {
    title: 'PBS item 14512T: esomeprazole 40 mg enteric tablet', label: 'PBS Schedule item 14512T', short: 'PBS 14512T',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['esomeprazole'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/14512T'
  },

  // ---------------------------------------------------------------- heparin (added 28 Oct 2026)
  'S-pfizer-heparin-pi-2025-07': {
    title: 'Heparin Injection Product Information', label: 'Heparin Injection PI (Pfizer, Jul 2025)', short: 'Heparin Injection PI',
    publisher: 'Pfizer', kind: 'PI', tier: 1, meds: ['heparin'], revised: '2025-07-17', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-06999-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-dbl-heparin-pi-2025-07': {
    title: 'DBL Heparin Sodium Injection BP Product Information', label: 'DBL Heparin Sodium PI (Pfizer, Jul 2025)', short: 'DBL Heparin PI',
    publisher: 'Pfizer', kind: 'PI', tier: 1, meds: ['heparin'], revised: '2025-07-14', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2018-PI-01871-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-heparin': {
    title: 'RCH Paediatric Injectable Guidelines: Heparin sodium', label: 'RCH Paediatric Injectable Guidelines: Heparin sodium', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['heparin'], read: '2026-10-28', status: 'read',
    url: 'https://pig.rch.org.au/pages/heparin-sodium', note: 'Web page; revision date not shown.'
  },
  'S-anmf-heparin-2026-06': {
    title: 'ANMF Heparin, newborn use only', label: 'ANMF Heparin, newborn use only (v5.1, Jun 2026)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['heparin'], revised: '2026-06-18', read: '2026-10-28', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/Heparin_ANMFv5.1_20260618.pdf', note: 'Review due 2 Jun 2027.'
  },
  'S-lactmed-heparin-2024-06': {
    title: 'LactMed: Heparin', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['heparin'], revised: '2024-06-15', read: '2026-10-28', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK500921/'
  },
  'S-pbs-1466E': {
    title: 'PBS item 1466E: heparin sodium 5000 units/0.2 mL injection', label: 'PBS Schedule item 1466E', short: 'PBS 1466E',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['heparin'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/1466E'
  },

  // ---------------------------------------------------------------- rivaroxaban (added 28 Oct 2026)
  'S-xarelto-pi-2026-10': {
    title: 'Xarelto Product Information', label: 'Xarelto PI (Bayer, Oct 2026)', short: 'Xarelto PI',
    publisher: 'Bayer', kind: 'PI', tier: 1, meds: ['rivaroxaban'], revised: '2026-10-01', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2009-PI-01020-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-lactmed-rivaroxaban-2026-05': {
    title: 'LactMed: Rivaroxaban', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['rivaroxaban'], revised: '2026-05-15', read: '2026-10-28', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK500742/'
  },
  'S-pbs-2268J': {
    title: 'PBS item 2268J: rivaroxaban 20 mg tablet', label: 'PBS Schedule item 2268J', short: 'PBS 2268J',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['rivaroxaban'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/2268J'
  },
  'S-pbs-2160Q': {
    title: 'PBS item 2160Q: rivaroxaban 15 mg tablet', label: 'PBS Schedule item 2160Q', short: 'PBS 2160Q',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['rivaroxaban'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/2160Q'
  },

  // ---------------------------------------------------------------- colchicine (added 28 Oct 2026)
  'S-colgout-pi-2026-06': {
    title: 'Colgout Product Information', label: 'Colgout PI (Aspen, Jun 2026)', short: 'Colgout PI',
    publisher: 'Aspen', kind: 'PI', tier: 1, meds: ['colchicine'], revised: '2026-06-04', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2016-PI-01142-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-lengout-pi-2026-06': {
    title: 'Lengout Product Information', label: 'Lengout PI (Jun 2026)', short: 'Lengout PI',
    kind: 'PI', tier: 1, meds: ['colchicine'], revised: '2026-06-04', read: '2026-10-28', status: 'partly-read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-06481-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Read sections 2, 3 and 10; they match the Colgout PI.'
  },
  'S-lactmed-colchicine-2026-05': {
    title: 'LactMed: Colchicine', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['colchicine'], revised: '2026-05-15', read: '2026-10-28', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501213/'
  },
  'S-pbs-3410L': {
    title: 'PBS item 3410L: colchicine 500 microgram tablet', label: 'PBS Schedule item 3410L', short: 'PBS 3410L',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['colchicine'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/3410L'
  },

  // ---------------------------------------------------------------- hydromorphone (added 28 Oct 2026)
  'S-dilaudid-tab-pi-2025-09': {
    title: 'Dilaudid Tablets Product Information', label: 'Dilaudid Tablets PI (Mundipharma, Sep 2025)', short: 'Dilaudid Tablets PI',
    publisher: 'Mundipharma', kind: 'PI', tier: 1, meds: ['hydromorphone'], revised: '2025-09-19', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2017-PI-01353-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-dilaudid-inj-pi-2025-09': {
    title: 'Dilaudid and Dilaudid-HP Injection Product Information', label: 'Dilaudid Injection PI (Mundipharma, Sep 2025)', short: 'Dilaudid Injection PI',
    publisher: 'Mundipharma', kind: 'PI', tier: 1, meds: ['hydromorphone'], revised: '2025-09-19', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2016-PI-02537-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-hydromorphone': {
    title: 'RCH Paediatric Injectable Guidelines: Hydromorphone', label: 'RCH Paediatric Injectable Guidelines: Hydromorphone', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['hydromorphone'], read: '2026-10-28', status: 'read',
    url: 'https://pig.rch.org.au/pages/hydromorphone', note: 'Web page; revision date not shown.'
  },
  'S-lactmed-hydromorphone': {
    title: 'LactMed: Hydromorphone', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['hydromorphone'], status: 'not-read',
    note: 'Not opened: NCBI showed a browser check (CAPTCHA) to automated reading, so the record id is not confirmed.'
  },
  'S-pbs-8420E': {
    title: 'PBS item 8420E: hydromorphone 2 mg/mL injection', label: 'PBS Schedule item 8420E', short: 'PBS 8420E',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['hydromorphone'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/8420E'
  },
  'S-pbs-12484C': {
    title: 'PBS item 12484C: hydromorphone 4 mg tablet (palliative care)', label: 'PBS Schedule item 12484C', short: 'PBS 12484C',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['hydromorphone'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/12484C'
  },
  'S-pbs-hydromorphone-liquid': {
    title: 'PBS item 12582F and related: hydromorphone 1 mg/mL oral liquid', label: 'PBS Schedule item 12582F and related', short: 'PBS 12582F and related',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['hydromorphone'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/12559B-12565H-12582F-13796D-13799G-13806P'
  },

  // ---------------------------------------------------------------- fentanyl (added 28 Oct 2026)
  'S-sublimaze-pi-2025-09': {
    title: 'Sublimaze Product Information', label: 'Sublimaze PI (Piramal, Sep 2025)', short: 'Sublimaze PI',
    publisher: 'Piramal Critical Care', kind: 'PI', tier: 1, meds: ['fentanyl'], revised: '2025-09-30', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2020-PI-01364-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-durogesic-pi-2026-03': {
    title: 'Durogesic Product Information', label: 'Durogesic PI (Janssen, Mar 2026)', short: 'Durogesic PI',
    publisher: 'Janssen-Cilag', kind: 'PI', tier: 1, meds: ['fentanyl'], revised: '2026-03-30', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-01511-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-fentanyl': {
    title: 'RCH Paediatric Injectable Guidelines: Fentanyl', label: 'RCH Paediatric Injectable Guidelines: Fentanyl', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['fentanyl'], read: '2026-10-28', status: 'read',
    url: 'https://pig.rch.org.au/pages/fentanyl', note: 'Web page; revision date not shown.'
  },
  'S-anmf-fentanyl-iv-2023-10': {
    title: 'ANMF Fentanyl (intravenous), newborn use only', label: 'ANMF Fentanyl (intravenous), newborn use only (v4.0 errata, Oct 2023)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['fentanyl'], revised: '2023-10-12', read: '2026-10-28', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/Fentanyl-Intravenous_ANMFv4.0_20231012.pdf', note: 'Review due 12 Oct 2028.'
  },
  'S-lactmed-fentanyl': {
    title: 'LactMed: Fentanyl', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['fentanyl'], status: 'not-read',
    note: 'Not opened: NCBI showed a browser check (CAPTCHA) to automated reading, so the record id is not confirmed.'
  },
  'S-pbs-12509J': {
    title: 'PBS item 12509J: fentanyl 100 microgram/hour patch (palliative care)', label: 'PBS Schedule item 12509J', short: 'PBS 12509J',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['fentanyl'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/12509J'
  },

  // ---------------------------------------------------------------- ropivacaine (added 28 Oct 2026)
  'S-naropin-pi-2024-02': {
    title: 'Naropin Product Information', label: 'Naropin PI (Aspen, Feb 2024)', short: 'Naropin PI',
    publisher: 'Aspen', kind: 'PI', tier: 1, meds: ['ropivacaine'], revised: '2024-02-26', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2017-PI-01874-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-lactmed-ropivacaine-2026-06': {
    title: 'LactMed: Ropivacaine', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['ropivacaine'], revised: '2026-06-15', read: '2026-10-28', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501506/'
  },

  // ---------------------------------------------------------------- cyclophosphamide (added 28 Oct 2026)
  'S-endoxan-pi-2023-11': {
    title: 'Endoxan Powder for Injection Product Information', label: 'Endoxan PI (Baxter, Nov 2023)', short: 'Endoxan PI',
    publisher: 'Baxter', kind: 'PI', tier: 1, meds: ['cyclophosphamide'], revised: '2023-11-15', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2010-PI-03529-3', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-cyclonex-pi-2022-03': {
    title: 'Cyclonex Tablets Product Information', label: 'Cyclonex PI (Amdipharm Mercury, Mar 2022)', short: 'Cyclonex PI',
    publisher: 'Amdipharm Mercury', kind: 'PI', tier: 1, meds: ['cyclophosphamide'], revised: '2022-03-16', read: '2026-10-28', status: 'partly-read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2022-PI-01306-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser. Read sections 2, 3, 4.2, parts of 4.4, 4.6 and 6.'
  },
  'S-rch-cyclophosphamide': {
    title: 'RCH Paediatric Injectable Guidelines: Cyclophosphamide', label: 'RCH Paediatric Injectable Guidelines: Cyclophosphamide', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['cyclophosphamide'], read: '2026-10-28', status: 'read',
    url: 'https://pig.rch.org.au/pages/cyclophosphamide', note: 'Web page; revision date not shown.'
  },
  'S-lactmed-cyclophosphamide-2023-07': {
    title: 'LactMed: Cyclophosphamide', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['cyclophosphamide'], revised: '2023-07-15', read: '2026-10-28', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK501672/'
  },
  'S-pbs-1266P': {
    title: 'PBS item 1266P: cyclophosphamide 50 mg tablet', label: 'PBS Schedule item 1266P', short: 'PBS 1266P',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['cyclophosphamide'], read: '2026-10-28', status: 'read',
    url: 'https://www.pbs.gov.au/medicine/item/1266P'
  },

  // ---------------------------------------------------------------- sodium-nitroprusside (added 28 Oct 2026)
  'S-dbl-nitroprusside-pi-2019-09': {
    title: 'DBL Sodium Nitroprusside Concentrated Injection Product Information', label: 'DBL Sodium Nitroprusside PI (Pfizer, Sep 2019)', short: 'DBL Nitroprusside PI',
    publisher: 'Pfizer', kind: 'PI', tier: 1, meds: ['sodium-nitroprusside'], revised: '2019-09-06', read: '2026-10-28', status: 'read',
    url: 'https://www.ebs.tga.gov.au/ebs/picmi/picmirepository.nsf/pdf?OpenAgent&id=CP-2020-PI-02353-1', note: 'TGA eBS PDF: accept the licence page first. Read in the built-in browser.'
  },
  'S-rch-nitroprusside': {
    title: 'RCH Paediatric Injectable Guidelines: Sodium nitroprusside', label: 'RCH Paediatric Injectable Guidelines: Sodium nitroprusside', short: 'RCH',
    publisher: 'Royal Children’s Hospital Melbourne', kind: 'guideline', tier: 3, meds: ['sodium-nitroprusside'], read: '2026-10-28', status: 'read',
    url: 'https://pig.rch.org.au/pages/sodium-nitroprusside', note: 'Web page; revision date not shown.'
  },
  'S-anmf-nitroprusside-2026-04': {
    title: 'ANMF Sodium nitroprusside, newborn use only', label: 'ANMF Sodium nitroprusside, newborn use only (v1.1, Apr 2026)', short: 'ANMF',
    publisher: 'Australasian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['sodium-nitroprusside'], revised: '2026-04-23', read: '2026-10-28', status: 'read',
    url: 'https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Neonatal/Neomed/Sodium%20nitroprusside_ANMFv1.1_20260423.pdf', note: 'Review due 23 Dec 2026.'
  },
  'S-lactmed-nitroprusside-2024-11': {
    title: 'LactMed: Nitroprusside', label: 'LactMed (US National Library of Medicine)', short: 'LactMed',
    publisher: 'US National Library of Medicine', kind: 'database', tier: 4, meds: ['sodium-nitroprusside'], revised: '2024-11-15', read: '2026-10-28', status: 'read',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK500662/'
  },

  // ---------------------------------------------------------------- shared references and gaps
  'S-who-atc': {
    title: 'WHO ATC/DDD Index', label: 'WHO ATC/DDD Index', short: 'ATC index',
    publisher: 'WHO Collaborating Centre for Drug Statistics Methodology', kind: 'reference', tier: 2, meds: ['baclofen', 'pantoprazole', 'tacrolimus', 'piperacillin-tazobactam', 'lidocaine', 'empagliflozin', 'ketamine', 'ipratropium', 'metformin', 'paracetamol', 'glyceryl-trinitrate', 'salbutamol', 'atorvastatin', 'ibuprofen', 'aciclovir', 'esomeprazole', 'heparin', 'rivaroxaban', 'colchicine', 'hydromorphone', 'fentanyl', 'ropivacaine', 'cyclophosphamide', 'sodium-nitroprusside'], status: 'not-read',
    url: 'https://atcddd.fhi.no/atc_ddd_index/'
  },
  'S-pbs-schedule': {
    title: 'PBS Schedule search', label: 'PBS Schedule', short: 'PBS',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['piperacillin-tazobactam', 'ketamine', 'ropivacaine', 'sodium-nitroprusside'], status: 'not-read',
    url: 'https://www.pbs.gov.au/pbs/home', note: 'No item found yet for this medicine.'
  },
  'S-amh': {
    title: 'Australian Medicines Handbook', label: 'Australian Medicines Handbook (AMH)', short: 'AMH',
    publisher: 'AMH', kind: 'reference', tier: 2, meds: ['lidocaine', 'ketamine', 'esomeprazole'], status: 'paywalled'
  },
  'S-amhcdc': {
    title: 'AMH Children’s Dosing Companion', label: 'AMH Children’s Dosing Companion', short: 'AMH CDC',
    publisher: 'AMH', kind: 'reference', tier: 2, meds: ['baclofen', 'pantoprazole', 'lidocaine', 'paracetamol', 'glyceryl-trinitrate', 'salbutamol', 'atorvastatin', 'ibuprofen', 'aciclovir', 'fentanyl', 'colchicine', 'cyclophosphamide'], status: 'paywalled'
  },
  'S-tga-pregnancy-db': {
    title: 'TGA Prescribing medicines in pregnancy database', label: 'TGA pregnancy database', short: 'TGA pregnancy database',
    publisher: 'TGA', kind: 'database', tier: 1, meds: ['amiodarone', 'digoxin', 'amoxicillin'], status: 'not-read',
    url: 'https://www.tga.gov.au/prescribing-medicines-pregnancy-database'
  },
  'S-drtc': {
    title: 'Don’t Rush to Crush', label: 'Don’t Rush to Crush (SHPA)', short: 'Don’t Rush to Crush',
    publisher: 'SHPA', kind: 'reference', tier: 2, meds: ['amiodarone', 'digoxin', 'amoxicillin', 'baclofen', 'tacrolimus', 'empagliflozin', 'metformin', 'paracetamol', 'atorvastatin', 'aciclovir', 'colchicine', 'hydromorphone', 'cyclophosphamide'], status: 'paywalled',
    note: 'Crushing, dispersing and enteral tube use.'
  },
  'S-aidh': {
    title: 'Australian Injectable Drugs Handbook', label: 'Australian Injectable Drugs Handbook (SHPA)', short: 'AIDH',
    publisher: 'SHPA', kind: 'reference', tier: 2, meds: ['digoxin', 'amoxicillin', 'piperacillin-tazobactam', 'ketamine'], status: 'paywalled'
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
