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
    publisher: 'Australian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['pantoprazole'], revised: '2021-03-25', read: '2026-10-27', status: 'read',
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
    publisher: 'Australian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['piperacillin-tazobactam'], revised: '2020-11-16', read: '2026-10-27', status: 'read',
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
    publisher: 'Australian Neonatal Medicines Formulary', kind: 'monograph', tier: 2, meds: ['lidocaine'], revised: '2023-02-09', read: '2026-10-27', status: 'read',
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
    publisher: 'National Asthma Council Australia', kind: 'guideline', tier: 2, meds: ['ipratropium'], read: '2026-10-27', status: 'read',
    url: 'https://www.asthmahandbook.org.au/pdf/6063', note: 'No version date shown.'
  },
  'S-aah-acute-child-6-11': {
    title: 'Australian Asthma Handbook: managing acute asthma in children 6–11 years in the ED', label: 'Australian Asthma Handbook: acute asthma, children 6–11 (ED)', short: 'Asthma Handbook',
    publisher: 'National Asthma Council Australia', kind: 'guideline', tier: 2, meds: ['ipratropium'], read: '2026-10-27', status: 'read',
    url: 'https://www.asthmahandbook.org.au/acute-asthma/children-6-11-years/managing-acute-asthma-in-children-6-11-years-in-ed', note: 'No version date shown.'
  },
  'S-aah-acute-child-1-5': {
    title: 'Australian Asthma Handbook: managing acute asthma in children 1–5 years', label: 'Australian Asthma Handbook: acute asthma, children 1–5', short: 'Asthma Handbook',
    publisher: 'National Asthma Council Australia', kind: 'guideline', tier: 2, meds: ['ipratropium'], status: 'not-read',
    url: 'https://www.asthmahandbook.org.au/acute-asthma', note: 'Page did not load for automated reading.'
  },

  // ---------------------------------------------------------------- shared references and gaps
  'S-who-atc': {
    title: 'WHO ATC/DDD Index', label: 'WHO ATC/DDD Index', short: 'ATC index',
    publisher: 'WHO Collaborating Centre for Drug Statistics Methodology', kind: 'reference', tier: 2, meds: ['baclofen', 'pantoprazole', 'tacrolimus', 'piperacillin-tazobactam', 'lidocaine', 'empagliflozin', 'ketamine', 'ipratropium'], status: 'not-read',
    url: 'https://atcddd.fhi.no/atc_ddd_index/'
  },
  'S-pbs-schedule': {
    title: 'PBS Schedule search', label: 'PBS Schedule', short: 'PBS',
    publisher: 'Australian Government', kind: 'PBS', tier: 1, meds: ['piperacillin-tazobactam', 'ketamine'], status: 'not-read',
    url: 'https://www.pbs.gov.au/pbs/home', note: 'No item found yet for this medicine.'
  },
  'S-amh': {
    title: 'Australian Medicines Handbook', label: 'Australian Medicines Handbook (AMH)', short: 'AMH',
    publisher: 'AMH', kind: 'reference', tier: 2, meds: ['lidocaine', 'ketamine'], status: 'paywalled'
  },
  'S-amhcdc': {
    title: 'AMH Children’s Dosing Companion', label: 'AMH Children’s Dosing Companion', short: 'AMH CDC',
    publisher: 'AMH', kind: 'reference', tier: 2, meds: ['baclofen', 'pantoprazole', 'lidocaine'], status: 'paywalled'
  },
  'S-tga-pregnancy-db': {
    title: 'TGA Prescribing medicines in pregnancy database', label: 'TGA pregnancy database', short: 'TGA pregnancy database',
    publisher: 'TGA', kind: 'database', tier: 1, meds: ['amiodarone', 'digoxin', 'amoxicillin'], status: 'not-read',
    url: 'https://www.tga.gov.au/prescribing-medicines-pregnancy-database'
  },
  'S-drtc': {
    title: 'Don’t Rush to Crush', label: 'Don’t Rush to Crush (SHPA)', short: 'Don’t Rush to Crush',
    publisher: 'SHPA', kind: 'reference', tier: 2, meds: ['amiodarone', 'digoxin', 'amoxicillin', 'baclofen', 'tacrolimus', 'empagliflozin'], status: 'paywalled',
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
