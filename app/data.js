/* MediAUS DRAFT DATA — from the source pack (22–23 Oct 2026), reviewed by the SME.
   Forms are physical forms. Each form lists the routes it can be given by, with a status:
     licensed | restricted | accepted | no | unverified | differ
   Items marked verify: true are not yet confirmed against a document. Not for clinical use. */
window.MEDIAUS_DATA = (function () {
  'use strict';

  var COLORS = {
    white: { hex: '#FFFFFF', label: 'White' },
    ivory: { hex: '#F3EBD3', label: 'Ivory' },
    yellow: { hex: '#F2C230', label: 'Yellow' },
    blue: { hex: '#8DB3E2', label: 'Blue' },
    pink: { hex: '#F2A7B8', label: 'Pink' },
    orange: { hex: '#F08A3C', label: 'Orange' },
    red: { hex: '#C23B3B', label: 'Red' },
    green: { hex: '#5FAE6A', label: 'Green' },
    maroon: { hex: '#7A1F2B', label: 'Maroon' },
    paleyellow: { hex: '#F6E7A6', label: 'Pale yellow' },
    clear: { hex: '#EAF3F5', label: 'Clear' }
  };

  var SRC = {
    cordarone: 'Cordarone X PI (Sanofi, May 2026)',
    aratac: 'Aratac PI (Viatris, Jan 2022)',
    alphamox: 'Alphamox PI (Viatris, Sep 2026)',
    alphamoxCmi: 'Alphamox CMI (Sep 2026)',
    fisamox: 'Fisamox PI (Viatris, Jul 2022)',
    anmfAmio: 'ANMF Amiodarone, newborn use only (v1.0, 2023)',
    anmfDig: 'ANMF Digoxin, newborn use only (v2.0, 2021)',
    pchAmio: 'Perth Children’s Hospital monograph: Amiodarone (2025)',
    pchDig: 'Perth Children’s Hospital monograph: Digoxin (2025)',
    rchAmio: 'RCH Paediatric Injectable Guidelines: Amiodarone',
    rchDig: 'RCH Paediatric Injectable Guidelines: Digoxin',
    rchAmox: 'RCH Paediatric Injectable Guidelines: Amoxicillin',
    seslhd: 'SESLHD Amiodarone Intravenous guideline (v2, 2025)',
    anzcor: 'ANZCOR Guideline 11.5 (Apr 2025)',
    lactmed: 'LactMed (US National Library of Medicine)',
    hd: 'healthdirect (ARTG data)',
    pbs: 'PBS Schedule',
    artg: 'ARTG (TGA)'
  };

  var MEDS = {
    // ===================================================== AMIODARONE
    amiodarone: {
      id: 'amiodarone',
      name: 'Amiodarone',
      cls: 'Antiarrhythmic (class III)',
      chips: ['Antiarrhythmic', 'Class III'],
      brands: 'Cordarone X®, Aratac®',
      atc: 'C01BD01',
      schedule: 'S4 (Prescription only)',
      pbs: 'Yes (tablets; restricted benefit)',
      src: {
        overview: SRC.artg + ' · ' + SRC.pbs + ' item 2344J',
        pregnancy: SRC.cordarone + ' · ' + SRC.lactmed,
        interactions: SRC.cordarone + ' · items marked “to verify” are unconfirmed',
        more: SRC.cordarone
      },
      pregnancy: { cat: 'C', label: 'Category C · contraindicated', tone: 'red', text: 'The PI lists amiodarone as contraindicated in pregnancy. Best avoided for 3 months before and throughout pregnancy.' },
      breastfeeding: {
        status: 'Sources differ', tone: 'purple', text: 'Amiodarone passes into breast milk.',
        positions: [
          { src: SRC.cordarone, text: 'Contraindicated. Use alternative infant feeding if amiodarone must be given.' },
          { src: SRC.lactmed, text: 'Some experts allow breastfeeding with periodic monitoring of the baby’s heart and thyroid, most reasonably after a single dose.' }
        ]
      },
      forms: [
        {
          id: 'tab', label: 'Tablet', unit: '200 mg tablet', strengths: '100 mg, 200 mg',
          appearance: [
            { label: 'Cordarone X 200 mg', shape: 'round', colors: ['white'], imprint: '200', scored: true, src: SRC.cordarone, desc: 'White to off-white, biconvex. “200” and an “action potential” emblem on one side; scored on the other.' },
            { label: 'Cordarone X 100 mg', shape: 'round', colors: ['white'], imprint: '100', scored: true, src: SRC.cordarone, desc: 'White to off-white, biconvex. “100” and an “action potential” emblem on one side; scored on the other.' },
            { label: 'Aratac 200 mg', shape: 'round', colors: ['white'], imprint: 'AM 200', scored: true, src: SRC.aratac, desc: 'White. “AM”, a breakline and “200” on one side; “G” on the other.' },
            { label: 'Aratac 100 mg', shape: 'round', colors: ['white'], imprint: 'AM 100', scored: true, src: SRC.aratac, desc: 'White. “AM”, a breakline and “100” on one side; “G” on the other.' }
          ],
          routes: [
            {
              id: 'swallow', cat: 'Oral', label: 'Swallowed', status: 'licensed', src: SRC.cordarone + ' 4.2, 4.5 · ' + SRC.pchAmio,
              summary: 'The licensed route. The PI gives the oral doses but does not say whether to take with water or food.',
              items: [
                { label: 'Grapefruit', status: 'no', text: 'Avoid grapefruit and grapefruit juice during treatment (PI 4.5).' },
                { label: 'Food', status: 'info', text: 'Take consistently with or without food (PCH).' },
                { label: 'Scored tablet', status: 'info', text: 'The scored 100 mg tablet is used to find the lowest effective maintenance dose (PI 4.2).' }
              ]
            },
            {
              id: 'disperse', cat: 'Oral', label: 'Crushed and dispersed in water, by mouth', status: 'accepted', src: SRC.pchAmio,
              summary: 'Described for children by Perth Children’s Hospital. Adult use to confirm.',
              items: [
                { label: 'Crush', status: 'yes', text: '100 mg tablets may be crushed and dispersed in water.' },
                { label: 'Food', status: 'info', text: 'Give consistently with or without food. Avoid grapefruit.' }
              ]
            },
            {
              id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush',
              summary: 'Not covered by the PI, PCH, ANMF or SESLHD documents.'
            },
            {
              id: 'susp', cat: 'Oral', label: 'Pharmacy-made oral suspension (5 mg/mL)', status: 'accepted', src: SRC.pchAmio + ' · ' + SRC.anmfAmio,
              summary: 'Compounded by pharmacy only when tablets are unsuitable or contraindicated.',
              items: [
                { label: 'Storage', status: 'info', text: 'Store at 2–8°C (PCH).' },
                { label: 'Food', status: 'info', text: 'May be given with or without feeds (ANMF).' }
              ]
            }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: SRC.cordarone + ' (adult) · ' + SRC.anmfAmio + ' (newborn)',
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['Loading, week 1', '200 mg three times daily', 'Specialist only'],
                ['Loading, week 2', '200 mg twice daily', 'Specialist only'],
                ['Maintenance', '200 mg daily or less. Use the scored 100 mg tablet to find the lowest effective dose.', 'Newborn: 5–10 mg/kg once daily, as a pharmacy-made 5 mg/mL suspension. Max 15 mg/kg/day.']
              ],
              notes: ['Higher maintenance doses are rarely needed.', 'Child doses beyond the newborn period: check a paediatric reference.']
            }
          ]
        },
        {
          id: 'inj', label: 'Injection solution', unit: '150 mg/3 mL ampoule', strengths: '150 mg/3 mL (50 mg/mL)',
          appearance: [
            { label: 'Cordarone X Intravenous 150 mg/3 mL', shape: 'ampoule', colors: ['paleyellow'], src: SRC.cordarone, desc: 'Clear, pale yellow solution in a 3 mL ampoule. Discard if cloudy or if a precipitate is present. Contains benzyl alcohol and polysorbate 80.' }
          ],
          routes: [
            {
              id: 'ivinf', cat: 'IV', label: 'IV infusion', status: 'licensed', src: SRC.cordarone + ' 4.2, 4.4, 6.2',
              summary: 'The preferred IV method. Central line recommended for repeated or continuous infusion, to avoid thrombophlebitis.',
              items: [
                { label: 'Dilute', status: 'yes', text: 'Glucose 5% only. Incompatible with sodium chloride 0.9%.' },
                { label: 'Rate', status: 'caution', text: '5 mg/kg over 20 minutes to 2 hours in 250 mL glucose 5%.' },
                { label: 'Mixing', status: 'no', text: 'Nothing else in the same syringe, bag or line. Heparin and aminophylline are physically incompatible.' },
                { label: 'Containers', status: 'caution', text: 'Prepare immediately before use in glass or plasticiser-free rigid containers. Use within 12 hours.' },
                { label: 'Giving set', status: 'caution', text: 'Non-DEHP sets preferred. Drop size can shrink, so use a volumetric pump.' },
                { label: 'Line', status: 'caution', text: 'Central line for repeated or continuous infusion.' }
              ]
            },
            {
              id: 'ivperiph', cat: 'IV', label: 'IV infusion via a peripheral line', status: 'accepted', src: SRC.seslhd + ' · ' + SRC.rchAmio + ' · ' + SRC.pchAmio,
              summary: 'Used when there is no central access. Very high risk of thrombophlebitis.',
              items: [
                { label: 'Concentration', status: 'caution', text: 'Maximum 2 mg/mL peripherally. Above 2 mg/mL, central line only.' },
                { label: 'Cannula', status: 'caution', text: 'If no central access: a loading dose only, via a large cannula in a large vein (SESLHD).' },
                { label: 'Filter', status: 'yes', text: 'Use a 0.2–0.22 micron in-line filter to reduce phlebitis.' }
              ]
            },
            {
              id: 'ivinj', cat: 'IV', label: 'Slow IV injection (emergency)', status: 'restricted', src: SRC.cordarone + ' 4.2, 4.4',
              summary: 'Generally not advised because of severe hypotension and circulatory collapse. Only in extreme emergency, when other therapies have failed.',
              items: [
                { label: 'Dose', status: 'info', text: '150–300 mg in 10–20 mL glucose 5% over 1–2 minutes.' },
                { label: 'Setting', status: 'caution', text: 'Intensive care only, with continuous ECG and blood pressure monitoring.' },
                { label: 'Repeat', status: 'no', text: 'Do not repeat within 15 minutes of the first injection.' }
              ]
            },
            {
              id: 'arrest', cat: 'IV', label: 'IV or intraosseous in cardiac arrest', status: 'accepted', src: SRC.anzcor + ' · ' + SRC.pchAmio + ' · ' + SRC.rchAmio,
              summary: 'Shock-refractory VF or pulseless VT, during CPR. National resuscitation guideline.',
              items: [
                { label: 'Adult dose', status: 'info', text: '300 mg after the 3rd shock. A further 150 mg can be considered after the 5th shock.' },
                { label: 'Route', status: 'info', text: 'IV preferred. Intraosseous if no IV access, at the same dose.' },
                { label: 'Flush', status: 'yes', text: 'Follow with a fluid flush of at least 20–30 mL.' },
                { label: 'Children', status: 'info', text: 'Undiluted over at least 3 minutes (RCH).' },
                { label: 'Torsades', status: 'no', text: 'Avoid in torsades de pointes.' }
              ]
            },
            { id: 'oral', cat: 'Oral', label: 'Given by mouth', status: 'no', src: SRC.pchAmio, summary: '“Do NOT give the solution for injection orally as it is an irritant.”' },
            { id: 'im', cat: 'IM', label: 'Intramuscular (IM)', status: 'no', src: SRC.rchAmio, summary: 'Not recommended. The PI does not mention IM.' },
            { id: 'sc', cat: 'SC', label: 'Subcutaneous (SC)', status: 'no', src: SRC.rchAmio, summary: 'Not recommended.' }
          ],
          dosing: [
            {
              id: 'ivinf', label: 'IV infusion', src: SRC.cordarone + ' (adult) · ' + SRC.anmfAmio + ' (newborn)',
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['Standard dose', '5 mg/kg over 20 min–2 h in 250 mL glucose 5%', 'Newborn VF/VT: 5 mg/kg over 1 h, then 5–25 microgram/kg/min'],
                ['24-hour maximum', '1200 mg (about 15 mg/kg) in up to 500 mL glucose 5%', 'Newborn SVT: 25 microgram/kg/min for 4 h, then 5–15 microgram/kg/min. Max 15 mg/kg/day']
              ],
              notes: ['Use within 12 hours of preparation.', 'The PI contraindicates the injection in neonates (benzyl alcohol). ANMF newborn doses are for cardiology-directed use only.']
            },
            {
              id: 'ivinj', label: 'IV injection (emergency)', src: SRC.cordarone + ' · ' + SRC.anmfAmio,
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['Extreme emergency', '150–300 mg in 10–20 mL glucose 5% over 1–2 min. Not within 15 min of a previous injection', 'Newborn pulseless VF/VT: 5 mg/kg rapid bolus']
              ],
              notes: ['Intensive care only, with continuous ECG and blood pressure monitoring.']
            },
            {
              id: 'arrest', label: 'Cardiac arrest', src: SRC.anzcor,
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['After the 3rd shock', '300 mg IV or IO', 'See ANZCOR paediatric guidelines'],
                ['After the 5th shock', 'A further 150 mg may be considered', '—'],
                ['Recurrent VF/pulseless VT', 'Infusion of 15 mg/kg over 24 h may be considered', '—']
              ],
              notes: ['Follow each dose with a 20–30 mL flush.', 'Lidocaine 1 mg/kg is an alternative in shock-refractory VF/pVT.']
            }
          ]
        }
      ],
      interactions: {
        important: [
          { sev: 'major', title: 'Raises digoxin levels', text: 'Digoxin levels rise by about 70%. Monitor ECG and digoxin levels, and adjust the digoxin dose.' },
          { sev: 'major', title: 'Increased risk of bleeding', text: 'Warfarin. Monitor INR more often, during treatment and after stopping amiodarone.' },
          { sev: 'major', title: 'Muscle toxicity', text: 'Simvastatin and other statins metabolised by CYP3A4. Use a statin that is not.' },
          { sev: 'major', title: 'Torsades de pointes', text: 'Contraindicated with medicines that can cause torsades de pointes.' },
          { sev: 'major', title: 'Serious slow heart rate', text: 'Sofosbuvir. Not recommended. If unavoidable, cardiac monitoring (48 hours continuous for high-risk patients).' }
        ],
        other: [
          { text: 'Grapefruit juice (higher amiodarone levels; avoid)', sev: 'moderate' },
          { text: 'Heparin, aminophylline (physically incompatible in the infusion set)', sev: 'moderate' },
          { text: 'Beta-blockers, verapamil, diltiazem (slow heart rate, heart block) — to verify', sev: 'moderate' },
          { text: 'Ciclosporin, tacrolimus (higher levels) — to verify', sev: 'moderate' }
        ]
      },
      contraindications: [
        'Hypersensitivity to iodine or amiodarone',
        'Pregnancy and breastfeeding',
        'Current or past thyroid dysfunction',
        'Sinus bradycardia, sino-atrial block or significant AV conduction disorders, unless a pacemaker is fitted',
        'Use with medicines that can cause torsades de pointes',
        'Injection only: hypotension, severe respiratory failure, cardiomyopathy or heart failure, circulatory collapse, bi- or tri-fascicular block without a pacemaker, neonates (benzyl alcohol)'
      ],
      caution: ['Liver disease', 'Lung disease', 'Low potassium (check before starting)', 'Older adults'],
      warnings: [
        'Lung toxicity: report new cough or breathlessness',
        'Thyroid over- or under-activity',
        'Liver injury: reduce the dose or stop if transaminases are over 3 times the upper limit of normal',
        'Corneal deposits occur in almost all patients; optic neuropathy or neuritis needs withdrawal',
        'Long half-life, usually 14–59 days: effects and interactions continue for weeks to months after stopping'
      ],
      monitoring: [
        'Thyroid (usTSH): before, during and for several months after treatment',
        'Liver function: at the start, then regularly',
        'Chest X-ray: regularly during long-term therapy, and if breathless',
        'Eyes: regular checks (slit lamp, visual acuity, ophthalmoscopy)',
        'ECG and potassium before starting; regular ECGs during long-term therapy',
        'IV use: continuous ECG and blood pressure; defibrillator available (SESLHD)'
      ]
    },

    // ===================================================== DIGOXIN
    digoxin: {
      id: 'digoxin',
      name: 'Digoxin',
      cls: 'Cardiac glycoside',
      chips: ['Cardiac glycoside', 'Rate control'],
      brands: 'Lanoxin®, Lanoxin PG®, Sigmaxin®, Sigmaxin PG®',
      atc: 'C01AA05',
      schedule: 'S4 (Prescription only)',
      pbs: 'Yes (restricted benefit)',
      src: {
        overview: SRC.artg + ' · ' + SRC.pbs + ' items 1322N, 2605D, 3164M',
        pregnancy: 'To verify: TGA pregnancy database · ' + SRC.lactmed,
        interactions: SRC.cordarone + ' (amiodarone) · others to verify against the Lanoxin PI',
        more: SRC.anmfDig + ' · ' + SRC.pchDig + ' · others to verify against the Lanoxin PI'
      },
      pregnancy: { cat: 'A', tone: 'green', text: 'Taken by many pregnant women with no proven increase in harm to the baby. (Category to verify in the TGA database.)' },
      breastfeeding: { status: 'Generally compatible', tone: 'blue', text: 'Small amounts pass into breast milk and are not expected to affect the baby. After an IV dose, waiting 2 hours before breastfeeding reduces the baby’s exposure.' },
      forms: [
        {
          id: 'tab', label: 'Tablet', unit: '250 microgram tablet', strengths: '62.5 microgram, 250 microgram',
          appearance: [
            { label: 'Sigmaxin 250 microgram', shape: 'round', colors: ['white'], imprint: 'X3A', scored: true, src: SRC.hd, desc: 'White, round, biconvex, uncoated. Scored and marked “X3A” on the top face; plain underneath.' },
            { label: 'Sigmaxin PG 62.5 microgram', shape: 'round', colors: ['blue'], imprint: 'U3A', scored: false, src: SRC.hd, desc: 'Blue, round, biconvex, uncoated. Marked “U3A” on the top face; plain underneath.' },
            { label: 'Lanoxin PG 62.5 microgram', shape: 'round', colors: ['blue'], imprint: 'D6', scored: false, verify: true, src: 'To verify: Lanoxin PI section 3', desc: 'Sample appearance, not yet verified.' },
            { label: 'Lanoxin 250 microgram', shape: 'round', colors: ['white'], imprint: 'D25', scored: true, verify: true, src: 'To verify: Lanoxin PI section 3', desc: 'Sample appearance, not yet verified.' }
          ],
          routes: [
            {
              id: 'swallow', cat: 'Oral', label: 'Swallowed', status: 'licensed', src: SRC.hd + ' · ' + SRC.anmfDig,
              summary: 'Oral route on the ARTG. Adult doses still need the Lanoxin or Sigmaxin PI.',
              items: [
                { label: 'Food', status: 'info', text: 'With or without food, but at a consistent time relative to meals (ANMF).' },
                { label: 'Pulse check', status: 'caution', verify: true, text: 'Adults: many services count the apical pulse before each dose and withhold if under 60/min. PCH and ANMF don’t require routine pre-dose pulse checks in children.' }
              ]
            },
            { id: 'disperse', cat: 'Oral', label: 'Crushed and dispersed, by mouth', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'PCH lists only the elixir and injection; no tablet guidance found. Consider the elixir.' },
            { id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'Not covered by any document read.' }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: 'Adult: to verify (Lanoxin PI) · Child: ' + SRC.anmfDig,
              head: ['Use', 'Adult', 'Child (by weight)', 'Max'],
              rows: [
                ['Rapid loading', '500 microgram, then 250 microgram every 6 h to a total of 1–1.5 mg (to verify)', 'Newborn and infant: 10 microgram/kg every 8 h for 3 doses', '1.5 mg loading (to verify)'],
                ['Maintenance', '62.5–250 microgram once daily (to verify)', 'Preterm 5–7.5; term 8; 2–24 months 8–10 microgram/kg/day (up to 12)', '250 microgram/day'],
                ['Kidney impairment', 'Reduce the dose; guided by levels (to verify)', 'Reduce by at least half', '—']
              ],
              notes: ['Target level for atrial arrhythmias 0.5–2 microgram/L; for heart failure in sinus rhythm consider 0.5–0.8 microgram/L (ANMF; confirm adult targets).', 'Take levels at least 6 hours after a dose.']
            }
          ]
        },
        {
          id: 'liquid', label: 'Oral liquid', unit: '50 microgram/mL elixir', strengths: '50 microgram/mL',
          appearance: [
            { label: 'Lanoxin Paediatric Elixir 50 microgram/mL', shape: 'bottle', colors: ['paleyellow'], verify: true, src: 'To verify: Lanoxin Paediatric Elixir CMI', desc: 'Oral liquid in 60 mL and 100 mL bottles. Contains ethanol (about 10.6%), propylene glycol and sucrose.' }
          ],
          routes: [
            {
              id: 'mouth', cat: 'Oral', label: 'By mouth', status: 'licensed', src: SRC.hd + ' · ' + SRC.anmfDig,
              summary: 'Oral liquid on the ARTG.',
              items: [
                { label: 'Food', status: 'info', text: 'With or without food, at a consistent time relative to meals.' },
                { label: 'Measure', status: 'caution', verify: true, text: 'Use an oral syringe, never a spoon or cup. Tenfold dosing errors are a known risk.' },
                { label: 'Contents', status: 'info', text: 'Contains ethanol and propylene glycol.' },
                { label: 'Storage', status: 'info', text: 'Below 25°C, protected from light.' }
              ]
            },
            { id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'PCH covers enteral use but gives no tube instructions; ANMF does not mention tubes.' }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: SRC.anmfDig,
              head: ['Age', 'Loading (oral)', 'Daily maintenance (oral)'],
              rows: [
                ['Preterm (up to 36+6 weeks)', '10 microgram/kg every 8 h for 3 doses', '5–7.5 microgram/kg (up to 12)'],
                ['Term (37 weeks or more)', '10 microgram/kg every 8 h for 3 doses', '8 microgram/kg (up to 12)'],
                ['2–24 months', 'See ANMF', '8–10 microgram/kg'],
                ['Adult who can’t swallow tablets', 'As for tablets', 'As for tablets']
              ],
              notes: ['Maximum 250 microgram daily.', 'Maintenance starts 8 hours after the last loading dose.', 'Kidney impairment: reduce by at least half.']
            }
          ]
        },
        {
          id: 'inj', label: 'Injection solution', unit: '500 microgram/2 mL ampoule', strengths: 'Adult 500 microgram/2 mL; Infants 50 microgram/2 mL',
          appearance: [
            { label: 'Lanoxin Adult 500 microgram/2 mL', shape: 'ampoule', colors: ['clear'], src: SRC.hd, desc: 'Clear, colourless liquid in a 2 mL ampoule (250 microgram/mL).' },
            { label: 'Lanoxin Infants 50 microgram/2 mL', shape: 'ampoule', colors: ['clear'], src: SRC.hd, desc: 'Clear, colourless liquid in a 2 mL ampoule (25 microgram/mL). Ten times weaker than the adult injection.' }
          ],
          routes: [
            {
              id: 'iv', cat: 'IV', label: 'IV injection', status: 'licensed', src: SRC.hd + ' · ' + SRC.rchDig + ' · ' + SRC.pchDig + ' · ' + SRC.anmfDig,
              summary: 'Both products are listed as intravenous on the ARTG. Adult-specific detail needs the Lanoxin injection PI.',
              positions: [
                { src: 'RCH and PCH (children)', text: 'Give over at least 5 minutes.' },
                { src: 'ANMF (newborns)', text: 'Give over at least 10 minutes.' },
                { src: 'Adults', text: 'Not verified (Lanoxin injection PI).' }
              ],
              items: [
                { label: 'Check product', status: 'no', text: 'The adult injection is 10 times stronger than the infant injection. Check before drawing up (ANMF).' },
                { label: 'Dilute', status: 'yes', text: 'Infants product: undiluted or to 5 microgram/mL. Adult product: dilute to 62.5 microgram/mL or weaker (RCH).' },
                { label: 'Technique', status: 'caution', text: 'Two-syringe technique: draw up in one syringe, add to a second syringe of diluent. Do not flush the dead space (RCH, PCH).' },
                { label: 'Fluids', status: 'yes', text: 'Glucose 5%, sodium chloride 0.9% or Hartmann’s (RCH, PCH).' },
                { label: 'Rate', status: 'caution', text: 'Rapid injection can cause hypertension and coronary vasoconstriction.' },
                { label: 'Vesicant', status: 'caution', text: 'Avoid extravasation (PCH).' },
                { label: 'Monitoring', status: 'info', text: 'Continuous cardiac monitoring during IV infusion (ANMF).' }
              ]
            },
            {
              id: 'im', cat: 'IM', label: 'Intramuscular (IM)', status: 'differ', src: SRC.anmfDig + ' · ' + SRC.rchDig + ' · ' + SRC.pchDig + ' · ' + SRC.hd,
              summary: 'Sources differ. Both products are listed on the ARTG as IV only.',
              positions: [
                { src: 'ANMF (newborns)', text: 'Do not give IM: unpredictable absorption and local irritation.' },
                { src: 'RCH and PCH (children)', text: 'Not recommended (tissue damage, severe pain). Lanoxin Infants only may be given undiluted by deep IM if unavoidable, then massage the site.' },
                { src: 'ARTG', text: 'Route listed as intravenous only.' }
              ]
            },
            { id: 'sc', cat: 'SC', label: 'Subcutaneous (SC)', status: 'no', src: SRC.rchDig + ' · ' + SRC.pchDig, summary: 'Not recommended.' },
            { id: 'oral', cat: 'Oral', label: 'Given by mouth', status: 'unverified', src: '—', summary: 'Not mentioned in any document read. Use the elixir.' }
          ],
          dosing: [
            {
              id: 'iv', label: 'IV', src: 'Adult: to verify (Lanoxin PI) · Child: ' + SRC.anmfDig,
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['Loading', 'To verify: Lanoxin injection PI', 'Newborn and infant: 7.5 microgram/kg every 8 h for 3 doses'],
                ['Maintenance', 'Usually switch to oral', 'Preterm 3.8–5.6; term 6; 2–24 months 6–7.5 microgram/kg/day (up to 9)']
              ],
              notes: ['The IV dose is 75% of the oral dose. When switching from oral to IV, reduce by 20–25%.', 'Maximum 250 microgram daily in children.']
            }
          ]
        }
      ],
      interactions: {
        important: [
          { sev: 'major', title: 'Raises digoxin levels', text: 'Amiodarone. Digoxin levels rise by about 70%. Monitor levels and ECG; adjust the dose.' },
          { sev: 'major', title: 'Higher levels and slower pulse', text: 'Verapamil. Reduce the digoxin dose and watch heart rate. (To verify)' },
          { sev: 'moderate', title: 'Toxicity from low potassium', text: 'Loop and thiazide diuretics such as furosemide. Monitor potassium. (To verify)' },
          { sev: 'moderate', title: 'Raises digoxin levels', text: 'Clarithromycin, erythromycin. (To verify)' }
        ],
        other: [
          { text: 'IV calcium (arrhythmia risk) — to verify', sev: 'major' },
          { text: 'Spironolactone (can raise levels and affect level testing) — to verify', sev: 'moderate' },
          { text: 'Antacids, cholestyramine (reduce absorption; separate doses) — to verify', sev: 'minor' }
        ]
      },
      contraindications: ['Second- or third-degree heart block without a pacemaker (to verify)', 'Ventricular fibrillation (to verify)', 'Wolff–Parkinson–White syndrome with AF (to verify)', 'Hypertrophic obstructive cardiomyopathy (to verify)'],
      caution: ['Kidney impairment (reduce the dose)', 'Electrolyte disturbance, hypoxia or hypothyroidism (toxicity at lower levels)', 'Older adults'],
      warnings: [
        'Narrow therapeutic range: toxicity is more common above 2 microgram/L, and can occur lower in older people or with electrolyte problems',
        'In children, arrhythmias including slow heart rate are the earliest sign of too much digoxin',
        'Injection contains propylene glycol and ethanol (RCH)',
        'Toxicity signs: nausea, vomiting, poor appetite, confusion, visual changes, slow or irregular pulse (to verify)',
        'Antidote for severe toxicity: digoxin immune Fab (to verify)'
      ],
      monitoring: ['Kidney function and electrolytes before starting', 'Digoxin level at least 6 hours after a dose', 'Resting heart rate, rhythm and signs of toxicity', 'Continuous cardiac monitoring during IV infusion']
    },

    // ===================================================== AMOXICILLIN
    amoxicillin: {
      id: 'amoxicillin',
      name: 'Amoxicillin',
      cls: 'Penicillin antibiotic',
      chips: ['Antibiotic', 'Penicillin'],
      brands: 'Alphamox®, Cilamox®, Fisamox®, Ibiamox®',
      atc: 'J01CA04',
      schedule: 'S4 (Prescription only)',
      pbs: 'Yes',
      src: {
        overview: SRC.artg + ' · ' + SRC.pbs,
        pregnancy: SRC.alphamox + ' · ' + SRC.lactmed,
        interactions: SRC.alphamox + ' · ' + SRC.fisamox + ' · FSRH guidance (contraceptives)',
        more: SRC.alphamox
      },
      pregnancy: { cat: 'A', tone: 'green', text: 'No teratogenic effects in animal studies. Use when the benefits outweigh the risks. Effects during labour and delivery are not fully known.' },
      breastfeeding: { status: 'Generally compatible', tone: 'blue', text: 'Acceptable in nursing mothers (LactMed). Small amounts pass into milk; occasional rash, diarrhoea or thrush in the baby. The PI advises caution.' },
      forms: [
        {
          id: 'cap', label: 'Capsule', unit: '500 mg capsule', strengths: '250 mg, 500 mg',
          appearance: [
            { label: 'Alphamox 500 mg', shape: 'capsule', colors: ['green', 'ivory'], src: SRC.alphamox, desc: 'Hard gelatin capsule (size 0el): opaque ivory body, opaque green cap, containing white granular powder.' },
            { label: 'Alphamox 250 mg', shape: 'capsule', colors: ['green', 'ivory'], src: SRC.alphamox, desc: 'Smaller hard gelatin capsule (size 2): ivory body, green cap, containing almost white granular powder.' }
          ],
          routes: [
            {
              id: 'swallow', cat: 'Oral', label: 'Swallowed', status: 'licensed', src: SRC.alphamoxCmi + ' · ' + SRC.alphamox,
              items: [
                { label: 'Swallow whole', status: 'yes', text: 'Swallow whole with a glass of water.' },
                { label: 'Food', status: 'yes', text: 'With or without food.' },
                { label: 'Full course', status: 'info', text: 'Complete the course even if symptoms improve.' }
              ]
            },
            { id: 'open', cat: 'Oral', label: 'Opened, contents mixed with food or water', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'The CMI says to swallow whole. No document supports opening the capsule. Use the oral liquid if swallowing is a problem.' },
            { id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'Not covered by any document read. Consider the oral liquid.' }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: SRC.alphamox + ' (Australian guidelines such as eTG may recommend higher doses)',
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['Upper respiratory, urinary or skin infection', '250 mg every 8 h', 'Under 20 kg: 20 mg/kg/day in 3 divided doses'],
                ['Severe infection', '500 mg every 8 h', 'Under 20 kg: 40 mg/kg/day in 3 divided doses'],
                ['Lower respiratory infection', '500 mg every 8 h', 'Under 20 kg: 40 mg/kg/day in 3 divided doses'],
                ['Uncomplicated lower UTI (non-pregnant women)', '3 g single dose', '—'],
                ['Children over 20 kg', '—', 'Use adult doses']
              ],
              notes: ['Kidney impairment: reduce the total daily dose depending on severity. Peritoneal dialysis: maximum 500 mg/day. Removed by haemodialysis.', 'Neonates: data too limited for a dose recommendation.']
            }
          ]
        },
        {
          id: 'liquid', label: 'Oral liquid', unit: '125 mg/5 mL oral liquid', strengths: '125 mg/5 mL (Cilamox, sugar free)',
          appearance: [
            { label: 'Cilamox 125 mg/5 mL', shape: 'bottle', colors: ['white'], verify: true, src: 'To verify: Cilamox PI', desc: 'Sugar-free powder for oral liquid. Mixed with water before use.' }
          ],
          routes: [
            {
              id: 'mouth', cat: 'Oral', label: 'By mouth', status: 'licensed', src: SRC.hd + ' · reconstitution and storage to verify (Cilamox PI)',
              summary: 'Powder for oral liquid on the ARTG.',
              items: [
                { label: 'Reconstitute', status: 'info', verify: true, text: 'Add water as shown on the bottle and shake well. Check the storage and discard date on the label.' },
                { label: 'Measure', status: 'caution', verify: true, text: 'Shake before each dose. Use an oral syringe, not a household spoon.' }
              ]
            },
            { id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'Not covered by any document read.' }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: SRC.alphamox + ' (same amoxicillin doses)',
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['Upper respiratory, urinary or skin infection', '250 mg (10 mL of 125 mg/5 mL) every 8 h', 'Under 20 kg: 20 mg/kg/day in 3 divided doses'],
                ['Severe or lower respiratory infection', '500 mg every 8 h', 'Under 20 kg: 40 mg/kg/day in 3 divided doses'],
                ['Children over 20 kg', '—', 'Use adult doses']
              ],
              notes: ['Round child volumes to what the oral syringe can measure.']
            }
          ]
        },
        {
          id: 'inj', label: 'Powder for injection', unit: '1 g vial', strengths: '1 g (Fisamox, Ibiamox)',
          appearance: [
            { label: 'Fisamox 1 g', shape: 'vial', colors: ['white'], src: SRC.fisamox, desc: 'Fine white to off-white powder. May turn briefly pink or slightly opalescent when reconstituted.' },
            { label: 'Ibiamox 1 g', shape: 'vial', colors: ['white'], src: SRC.hd, desc: 'Clear glass vial containing a white or almost white powder.' }
          ],
          routes: [
            {
              id: 'ivinj', cat: 'IV', label: 'Slow IV injection', status: 'licensed', src: SRC.fisamox + ' 4.2, 6.4 · ' + SRC.rchAmox,
              brands: [
                { brand: 'Fisamox', status: 'licensed', note: 'PI 4.2' },
                { brand: 'Ibiamox', status: 'licensed', note: 'ARTG route: intravenous' }
              ],
              items: [
                { label: 'Reconstitute', status: 'info', text: 'Dissolve 1 g in 20 mL water for injections (Fisamox PI). Use immediately.' },
                { label: 'Rate', status: 'caution', text: 'Over at least 3–4 minutes, preferably 10–15 minutes. Faster injection can cause seizures.' },
                { label: 'Children', status: 'info', text: 'Doses of 30 mg/kg or less over 5–15 minutes, diluted to 50 mg/mL (RCH).' }
              ]
            },
            {
              id: 'ivinf', cat: 'IV', label: 'IV infusion', status: 'licensed', src: SRC.fisamox + ' 4.2, 4.5, 6.2, 6.4',
              brands: [
                { brand: 'Fisamox', status: 'licensed', note: 'PI 4.2' },
                { brand: 'Ibiamox', status: 'licensed', note: 'ARTG route: intravenous' }
              ],
              items: [
                { label: 'Rate', status: 'caution', text: 'Over 30–60 minutes.' },
                { label: 'Fluids', status: 'yes', text: 'Sodium chloride 0.9%, Lactated Ringer’s, glucose 5% and others. Each has a storage time; stability is lower in glucose and other carbohydrate solutions.' },
                { label: 'Incompatible', status: 'no', text: 'Blood products, protein hydrolysates and lipid emulsions.' },
                { label: 'Gentamicin', status: 'no', text: 'Do not mix with gentamicin.' }
              ]
            },
            {
              id: 'im', cat: 'IM', label: 'Intramuscular (IM)', status: 'licensed', statusNote: 'Fisamox only', src: SRC.fisamox + ' 4.2 · ' + SRC.rchAmox + ' · ' + SRC.hd,
              summary: 'Licensed for Fisamox. Ibiamox is listed on the ARTG as IV only.',
              brands: [
                { brand: 'Fisamox', status: 'licensed', note: 'PI 4.2' },
                { brand: 'Ibiamox', status: 'no', note: 'ARTG lists IV only' }
              ],
              items: [
                { label: 'Reconstitute', status: 'info', text: '1 g in 5.2 mL water for injections; shake vigorously.' },
                { label: 'Pain', status: 'caution', text: 'Painful. Lignocaine 1% or procaine 0.5% may replace the water (Fisamox PI).' },
                { label: 'Large doses', status: 'caution', text: 'Split doses over 500 mg between injection sites.' }
              ]
            },
            { id: 'sc', cat: 'SC', label: 'Subcutaneous (SC)', status: 'no', src: SRC.rchAmox, summary: 'Not recommended. The Fisamox PI does not mention SC.' },
            { id: 'oral', cat: 'Oral', label: 'Given by mouth', status: 'unverified', src: '—', summary: 'Not mentioned in any document read. Use the capsules or oral liquid.' }
          ],
          dosing: [
            {
              id: 'inj', label: 'IV or IM', src: SRC.fisamox,
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['Upper respiratory, urinary or skin infection', '250 mg every 6–8 h', 'Under 20 kg: 20 mg/kg/day, divided every 6–8 h'],
                ['Severe or lower respiratory infection', '500 mg every 6–8 h', 'Under 20 kg: 40 mg/kg/day, divided every 6–8 h'],
                ['Septicaemia (slow IV or infusion)', '1 g every 6 h', 'Under 20 kg: 20–40 mg/kg every 6 h'],
                ['Children over 20 kg', '—', 'Use adult doses']
              ],
              notes: ['Kidney impairment (adults, IV): CrCl over 30 mL/min no change; 10–30 mL/min 1 g, then 500 mg–1 g every 12–24 h; under 10 mL/min 1 g, then 500 mg–1 g every 24 h.', 'Haemodialysis: 1 g at the end of dialysis, then 500 mg–1 g every 12–24 h.']
            }
          ]
        }
      ],
      interactions: {
        important: [
          { sev: 'major', title: 'May increase toxicity', text: 'Methotrexate. Penicillins may reduce its excretion.' },
          { sev: 'moderate', title: 'Raised amoxicillin levels', text: 'Probenecid. Use is not recommended: it raises and prolongs amoxicillin levels.' },
          { sev: 'moderate', title: 'INR changes', text: 'Warfarin. Rare INR rises. Monitor INR when starting or stopping amoxicillin.' }
        ],
        other: [
          { text: 'Gentamicin (do not mix in the same injection)', sev: 'moderate' },
          { text: 'Allopurinol (more rash expected)', sev: 'minor' },
          { text: 'Tetracyclines and other bacteriostatic antibiotics (may interfere with amoxicillin’s effect)', sev: 'minor' },
          { text: 'Combined oral contraceptive', sev: 'conflict', positions: [
            { src: SRC.alphamox, text: 'May reduce oestrogen reabsorption and contraceptive efficacy.' },
            { src: 'UK FSRH guidance', text: 'No extra precautions needed for non-enzyme-inducing antibiotics, unless vomiting or diarrhoea.' }
          ] }
        ]
      },
      contraindications: ['Any history of hypersensitivity to β-lactam antibiotics, including penicillins and cephalosporins'],
      caution: ['Kidney impairment (reduce the total daily dose)', 'Glandular fever (higher chance of rash) — to verify'],
      warnings: ['Rapid IV injection can cause seizures', 'Can cause diarrhoea; severe or bloody diarrhoea needs medical advice — to verify', 'Stop and seek help if a rash, swelling or breathing difficulty develops'],
      monitoring: ['Watch for allergic reaction after the first dose', 'Kidney function for long or high-dose courses — to verify']
    }
  };

  var OTHERS = [
    { name: 'Metformin', cls: 'Diabetes', schedule: 'S4', routes: ['Oral', 'Enteral tube'] },
    { name: 'Paracetamol', cls: 'Analgesic', schedule: 'S2', routes: ['Oral', 'Enteral tube', 'IV', 'Rectal'] },
    { name: 'Glyceryl trinitrate', cls: 'Antianginal', schedule: 'S3', routes: ['Sublingual', 'Topical'] },
    { name: 'Salbutamol', cls: 'Bronchodilator', schedule: 'S3', routes: ['Inhaled'] },
    { name: 'Atorvastatin', cls: 'Cholesterol', schedule: 'S4', routes: ['Oral'] },
    { name: 'Ibuprofen', cls: 'Analgesic', schedule: 'S2', routes: ['Oral'] }
  ];

  var EXTRA_PILLS = [
    { label: 'Paracetamol 500 mg', shape: 'oblong', colors: ['white'], imprint: 'P 500', scored: true, verify: true, src: 'Sample', desc: 'Sample appearance, not yet verified.' },
    { label: 'Metformin 500 mg', shape: 'round', colors: ['white'], imprint: 'MF 500', scored: false, verify: true, src: 'Sample', desc: 'Sample appearance, not yet verified.' },
    { label: 'Atorvastatin 20 mg', shape: 'oval', colors: ['white'], imprint: 'AT 20', scored: false, verify: true, src: 'Sample', desc: 'Sample appearance, not yet verified.' },
    { label: 'Ibuprofen 200 mg', shape: 'round', colors: ['pink'], imprint: 'IB', scored: false, verify: true, src: 'Sample', desc: 'Sample appearance, not yet verified.' }
  ];

  // SAMPLE barcodes (made-up EAN-13 codes with valid check digits). Real pack GTINs come from the sponsor or GS1.
  var BARCODES = {
    '9300001010017': { medId: 'amiodarone', formId: 'tab', product: 'Cordarone X 100 mg', pack: '30 tablets' },
    '9300001010024': { medId: 'amiodarone', formId: 'tab', product: 'Cordarone X 200 mg', pack: '30 tablets' },
    '9300001010031': { medId: 'amiodarone', formId: 'tab', product: 'Aratac 100 mg', pack: '30 tablets' },
    '9300001020016': { medId: 'digoxin', formId: 'tab', product: 'Sigmaxin 250 microgram', pack: '100 tablets' },
    '9300001020023': { medId: 'digoxin', formId: 'tab', product: 'Sigmaxin PG 62.5 microgram', pack: '200 tablets' },
    '9300001020030': { medId: 'digoxin', formId: 'liquid', product: 'Lanoxin Paediatric Elixir 50 microgram/mL', pack: '60 mL bottle' },
    '9300001030015': { medId: 'amoxicillin', formId: 'cap', product: 'Alphamox 500 mg', pack: '20 capsules' },
    '9300001030022': { medId: 'amoxicillin', formId: 'cap', product: 'Alphamox 250 mg', pack: '20 capsules' }
  };

  return { COLORS: COLORS, MEDS: MEDS, ORDER: ['amiodarone', 'digoxin', 'amoxicillin'], OTHERS: OTHERS, EXTRA_PILLS: EXTRA_PILLS, BARCODES: BARCODES };
})();
