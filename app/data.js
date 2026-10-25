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
    anmfAmio: 'ANMF Amiodarone, newborn use only (v1.0 errata, Feb 2026)',
    anmfDig: 'ANMF Digoxin, newborn use only (v2.0, 2021)',
    pchAmio: 'Perth Children’s Hospital monograph: Amiodarone (2025)',
    pchDig: 'Perth Children’s Hospital monograph: Digoxin (2025)',
    rchAmio: 'RCH Paediatric Injectable Guidelines: Amiodarone',
    rchDig: 'RCH Paediatric Injectable Guidelines: Digoxin',
    rchAmox: 'RCH Paediatric Injectable Guidelines: Amoxicillin',
    seslhd: 'SESLHD Amiodarone Intravenous guideline (v2, 2025)',
    anzcor: 'ANZCOR Guideline 11.5 (Apr 2025)',
    anzcorPaed: 'ANZCOR Guideline 12.2, paediatric (Apr 2026)',
    ibiamoxCmi: 'Ibiamox CMI (Juno, 2015)',
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
          id: 'tab', label: 'Tablet', unit: '200 mg tablet', strengths: '100 mg, 200 mg', pops: ['adult', 'child', 'newborn'],
          appearance: [
            { label: 'Cordarone X 200 mg', shape: 'round', colors: ['white'], imprint: '200', scored: true, src: SRC.cordarone, desc: 'White to off-white, biconvex. “200” and an “action potential” emblem on one side; scored on the other.' },
            { label: 'Cordarone X 100 mg', shape: 'round', colors: ['white'], imprint: '100', scored: true, src: SRC.cordarone, desc: 'White to off-white, biconvex. “100” and an “action potential” emblem on one side; scored on the other.' },
            { label: 'Aratac 200 mg', shape: 'round', colors: ['white'], imprint: 'AM 200', scored: true, src: SRC.aratac, desc: 'White. “AM”, a breakline and “200” on one side; “G” on the other.' },
            { label: 'Aratac 100 mg', shape: 'round', colors: ['white'], imprint: 'AM 100', scored: true, src: SRC.aratac, desc: 'White. “AM”, a breakline and “100” on one side; “G” on the other.' }
          ],
          routes: [
            {
              id: 'swallow', cat: 'Oral', label: 'Swallowed', status: 'licensed', src: SRC.cordarone + ' 4.2, 4.4, 4.5 · ' + SRC.pchAmio,
              summary: 'The licensed route for adults. The PI gives the oral doses but does not say whether to take with water or food.',
              pops: {
                adult: { status: 'licensed', note: 'PI 4.2' },
                child: { status: 'differ', note: 'PI: not recommended in children (safety not established). PCH: used from 4 weeks of age.' },
                newborn: { status: 'na', note: 'Use the pharmacy-made suspension (ANMF).' }
              },
              items: [
                { pop: 'all', label: 'Grapefruit', status: 'no', text: 'Avoid grapefruit and grapefruit juice during treatment (PI 4.5, PCH).' },
                { pop: 'adult', label: 'Scored tablet', status: 'info', text: 'The scored 100 mg tablet is used to find the lowest effective maintenance dose (PI 4.2).' },
                { pop: 'child', label: 'Food', status: 'info', text: 'Give consistently with or without food (PCH).' }
              ]
            },
            {
              id: 'disperse', cat: 'Oral', label: 'Crushed and dispersed in water, by mouth', status: 'accepted', src: SRC.pchAmio + ' · ' + SRC.cordarone + ' 4.4',
              summary: 'Described for children by Perth Children’s Hospital.',
              pops: {
                adult: { status: 'unverified', note: 'Not found. Check Don’t Rush to Crush.' },
                child: { status: 'differ', note: 'PI: not recommended in children. PCH: tablets may be crushed and dispersed in water.' },
                newborn: { status: 'na', note: 'Use the pharmacy-made suspension (ANMF).' }
              },
              items: [
                { pop: 'child', label: 'Crush', status: 'yes', text: 'Tablets may be crushed and dispersed in water (PCH).' },
                { pop: 'child', label: 'Food', status: 'info', text: 'Give consistently with or without food. Avoid grapefruit (PCH).' }
              ]
            },
            {
              id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush',
              summary: 'Not covered by the PI, PCH, ANMF or SESLHD documents.',
              pops: {
                adult: { status: 'unverified', note: 'Check Don’t Rush to Crush.' },
                child: { status: 'unverified', note: 'Check Don’t Rush to Crush.' },
                newborn: { status: 'unverified', note: 'Not covered by ANMF.' }
              }
            },
            {
              id: 'susp', cat: 'Oral', label: 'Pharmacy-made oral suspension (5 mg/mL)', status: 'accepted', src: SRC.pchAmio + ' · ' + SRC.anmfAmio + ' · ' + SRC.cordarone + ' 4.4',
              summary: 'Compounded by pharmacy only when tablets are unsuitable or contraindicated.',
              pops: {
                adult: { status: 'unverified', note: 'No adult source found.' },
                child: { status: 'differ', note: 'PI: not recommended in children. PCH: pharmacy supplies a 5 mg/mL suspension.' },
                newborn: { status: 'differ', note: 'PI: not recommended in children. ANMF: 5 mg/mL suspension on cardiology advice.' }
              },
              items: [
                { pop: ['child', 'newborn'], label: 'Storage', status: 'info', text: 'Store at 2–8°C. Do not freeze (PCH, ANMF).' },
                { pop: 'newborn', label: 'Feeds', status: 'info', text: 'May be given with or without feeds (ANMF).' }
              ]
            }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: SRC.cordarone + ' (adult) · ' + SRC.anmfAmio + ' (newborn)',
              head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
              rows: [
                ['Loading, week 1', '200 mg three times daily', 'Specialist only. Check PCH.', '—'],
                ['Loading, week 2', '200 mg twice daily', 'Specialist only. Check PCH.', '—'],
                ['Maintenance', '200 mg daily or less. Use the scored 100 mg tablet to find the lowest effective dose.', 'Specialist only. Check PCH.', 'SVT or JET: 5–10 mg/kg once daily, as a pharmacy-made 5 mg/mL suspension. Max 15 mg/kg/day.']
              ],
              notes: ['Higher adult maintenance doses are rarely needed.', 'The PI does not recommend amiodarone in children; child doses come from hospital guidelines.', 'Newborns: cardiology-directed use only (ANMF).']
            }
          ]
        },
        {
          id: 'inj', label: 'Injection solution', unit: '150 mg/3 mL ampoule', strengths: '150 mg/3 mL (50 mg/mL)', pops: ['adult', 'child', 'newborn'],
          appearance: [
            { label: 'Cordarone X Intravenous 150 mg/3 mL', shape: 'ampoule', colors: ['paleyellow'], src: SRC.cordarone, desc: 'Clear, pale yellow solution in a 3 mL ampoule. Discard if cloudy or if a precipitate is present. Contains benzyl alcohol and polysorbate 80.' }
          ],
          routes: [
            {
              id: 'ivinf', cat: 'IV', label: 'IV infusion', status: 'licensed', src: SRC.cordarone + ' 4.2, 4.3, 4.4, 6.2 · ' + SRC.seslhd + ' · ' + SRC.pchAmio + ' · ' + SRC.rchAmio + ' · ' + SRC.anmfAmio,
              summary: 'The preferred IV method. Glucose 5% only. Central line recommended for repeated or continuous infusion, to avoid thrombophlebitis.',
              pops: {
                adult: { status: 'licensed', note: 'PI 4.2. Critical care areas (SESLHD).' },
                child: { status: 'differ', note: 'PI: not recommended in children. PCH (4 weeks to 18 years) and RCH: used in critical care.' },
                newborn: { status: 'differ', note: 'PI: injection contraindicated in neonates (benzyl alcohol). ANMF: used on cardiology advice. RCH: caution (benzyl alcohol).' }
              },
              prep: {
                reconstitute: [{ pop: 'all', none: 'Not needed: already a solution (150 mg/3 mL ampoule).' }],
                dilute: [
                  { pop: 'all', text: 'Glucose 5% only. Incompatible with sodium chloride 0.9%.', src: 'PI 4.2, RCH, ANMF' },
                  { pop: 'adult', text: 'Loading dose in 250 mL glucose 5%.', src: 'PI 4.2' },
                  { pop: 'adult', text: 'Loading 300 mg: central, in 50 mL (6 mg/mL); peripheral, remove 100 mL from a 250 mL bag and add 300 mg (max 2 mg/mL). Maintenance 450 mg: in 250 mL peripheral, or in 50 mL central.', src: 'SESLHD' },
                  { pop: 'child', text: 'Dilute to 1–6 mg/mL. Standard central: 150 mg/50 mL (under 10 kg), 300 mg/50 mL (10 to under 40 kg), 600 mg/100 mL (40 kg+). Standard peripheral: 100 mg/50 mL (under 40 kg), 200 mg/100 mL (40 kg+).', src: 'RCH' },
                  { pop: 'child', text: 'Use non-PVC bags or syringes.', src: 'PCH' },
                  { pop: 'newborn', text: 'Under 2 kg: 1 mL (50 mg) + 49 mL glucose 5% = 1 mg/mL. 2 kg or more: 2 mL (100 mg) + 48 mL = 2 mg/mL. Prepare loading and maintenance doses in separate syringes.', src: 'ANMF' }
                ],
                give: [
                  { pop: 'adult', text: '5 mg/kg over 20 minutes to 2 hours. Repeat: up to 1200 mg in up to 500 mL per 24 hours, rate adjusted to response.', src: 'PI 4.2' },
                  { pop: 'adult', pump: { ml: 250, min: [20, 120] }, src: 'PI 4.2' },
                  { pop: 'adult', text: 'Loading 300 mg: over 30 minutes central, or 1 hour peripheral. Maintenance 900 mg over 24 hours: 450 mg in 250 mL at 21 mL/h peripheral, or 450 mg in 50 mL at 4.2 mL/h central. Max 1200 mg in 24 hours.', src: 'SESLHD' },
                  { pop: 'child', text: 'Loading 5 mg/kg (max 300 mg) by syringe driver over 20–120 minutes. Continuous infusion only if needed, up to 15 microgram/kg/minute (max 1200 mg/day).', src: 'PCH' },
                  { pop: 'child', text: 'Pump or syringe driver. Complete within 12 hours of preparation.', src: 'RCH' },
                  { pop: 'newborn', text: 'VF/VT: 5 mg/kg over 1 hour, then 5–25 microgram/kg/minute. SVT/JET: 6 mg/kg over 4 hours, then 5–15 microgram/kg/minute. Rate (mL/h) = dose (microgram/kg/min) × weight (kg) × 0.06 at 1 mg/mL, or × 0.03 at 2 mg/mL.', src: 'ANMF' }
                ]
              },
              items: [
                { pop: 'all', label: 'Mixing', status: 'no', text: 'Nothing else in the same syringe, bag or line. Heparin and aminophylline are physically incompatible (PI 6.2).' },
                { pop: 'all', label: 'Containers', status: 'caution', text: 'Prepare immediately before use in glass or plasticiser-free rigid containers. Use within 12 hours (PI 4.2, RCH).' },
                { pop: 'all', label: 'Giving set', status: 'caution', text: 'Non-DEHP sets. Drop size can shrink, so use a volumetric pump (PI 4.2, ANMF).' },
                { pop: 'adult', label: 'Line', status: 'caution', text: 'Central line for repeated or continuous infusion (PI 4.2). Dedicated line (SESLHD).' },
                { pop: 'adult', label: 'Filter', status: 'yes', text: 'Infusions over 2 hours: 0.22 micron in-line filter (SESLHD).' },
                { pop: 'child', label: 'Filter', status: 'yes', text: '0.2 micron low protein binding in-line filter (RCH).' },
                { pop: 'child', label: 'Setting', status: 'caution', text: 'Critical care only: NICU, PCC, theatre, ED (PCH).' },
                { pop: 'newborn', label: 'Prescriber', status: 'caution', text: 'On the advice of the cardiology team; dose prescribed by a paediatric cardiologist (ANMF).' }
              ]
            },
            {
              id: 'ivperiph', cat: 'IV', label: 'IV infusion via a peripheral line', status: 'accepted', src: SRC.seslhd + ' · ' + SRC.rchAmio + ' · ' + SRC.pchAmio + ' · ' + SRC.anmfAmio,
              summary: 'Used when there is no central access. High risk of thrombophlebitis. Maximum 2 mg/mL in all groups.',
              pops: {
                adult: { status: 'accepted', note: 'SESLHD: loading and maintenance at 2 mg/mL or less.' },
                child: { status: 'accepted', note: 'RCH: over 2 mg/mL central line only.' },
                newborn: { status: 'accepted', note: 'ANMF: only if central access is unavailable.' }
              },
              prep: {
                reconstitute: [{ pop: 'all', none: 'Not needed: already a solution.' }],
                dilute: [
                  { pop: 'all', text: 'Glucose 5% only. Maximum 2 mg/mL peripherally.', src: 'SESLHD, RCH, ANMF' },
                  { pop: 'adult', text: 'Loading: 300 mg in 150 mL (remove 100 mL from a 250 mL bag). Maintenance: 450 mg in 250 mL.', src: 'SESLHD' },
                  { pop: 'child', text: '100 mg/50 mL (under 40 kg) or 200 mg/100 mL (40 kg+), both 2 mg/mL.', src: 'RCH' },
                  { pop: 'newborn', text: '0.6–2 mg/mL.', src: 'ANMF' }
                ],
                give: [
                  { pop: 'adult', text: 'Loading over 1 hour. Maintenance at 21 mL/h.', src: 'SESLHD' },
                  { pop: 'child', text: 'At the prescribed rate by syringe driver. Repeated doses via a central line are recommended.', src: 'PCH' },
                  { pop: 'newborn', text: 'As for IV infusion.', src: 'ANMF' }
                ]
              },
              items: [
                { pop: 'adult', label: 'Filter', status: 'yes', text: 'Infusions over 2 hours: 0.22 micron in-line filter (SESLHD).' },
                { pop: 'child', label: 'Filter', status: 'yes', text: '0.22 micron filter recommended to reduce phlebitis (PCH).' }
              ]
            },
            {
              id: 'ivinj', cat: 'IV', label: 'Slow IV injection (emergency)', status: 'restricted', src: SRC.cordarone + ' 4.2, 4.3, 4.4',
              summary: 'Generally not advised because of severe hypotension and circulatory collapse. Only in extreme emergency, when other therapies have failed.',
              pops: {
                adult: { status: 'restricted', note: 'PI: intensive care only.' },
                child: { status: 'unverified', note: 'Not covered outside cardiac arrest. PI: not recommended in children.' },
                newborn: { status: 'no', note: 'PI: contraindicated in neonates (benzyl alcohol).' }
              },
              prep: {
                reconstitute: [{ pop: 'all', none: 'Not needed: already a solution.' }],
                dilute: [{ pop: 'adult', text: '150–300 mg in 10–20 mL glucose 5%.', src: 'PI 4.2' }],
                give: [{ pop: 'adult', text: 'Over 1–2 minutes. Do not repeat within 15 minutes of the first injection.', src: 'PI 4.2, 4.4' }]
              },
              items: [
                { pop: 'adult', label: 'Setting', status: 'caution', text: 'Intensive care only, with continuous ECG and blood pressure monitoring (PI 4.2).' }
              ]
            },
            {
              id: 'arrest', cat: 'IV', label: 'IV or intraosseous in cardiac arrest', status: 'accepted', src: SRC.anzcor + ' · ' + SRC.anzcorPaed + ' · ' + SRC.pchAmio + ' · ' + SRC.rchAmio + ' · ' + SRC.anmfAmio,
              summary: 'Shock-refractory VF or pulseless VT, during CPR. National resuscitation guidelines.',
              pops: {
                adult: { status: 'accepted', note: 'ANZCOR 11.5' },
                child: { status: 'accepted', note: 'ANZCOR 12.2, PCH, RCH. Sources differ on how to give it.' },
                newborn: { status: 'accepted', note: 'ANMF' }
              },
              prep: {
                reconstitute: [{ pop: 'all', none: 'Not needed: already a solution.' }],
                dilute: [
                  { pop: 'adult', missing: 'Not stated in ANZCOR 11.5. Check the local resuscitation protocol.' },
                  { pop: 'child', text: '30 kg or less: 150 mg in glucose 5% to 30 mL (5 mg/mL). Over 30 kg needing more than 150 mg: dose in 10–20 mL glucose 5%. Give only the dose needed.', src: 'PCH' },
                  { pop: 'child', text: 'May be given undiluted.', src: 'RCH' },
                  { pop: 'newborn', text: 'Undiluted.', src: 'ANMF' }
                ],
                give: [
                  { pop: 'adult', text: '300 mg IV or IO after the 3rd shock. A further 150 mg may be considered after the 5th shock. Flush with at least 20–30 mL.', src: 'ANZCOR 11.5' },
                  { pop: 'child', text: '5 mg/kg (max 300 mg) IV or IO bolus. Flush with sodium chloride 0.9% or glucose 5%. Further doses on specialist advice.', src: 'ANZCOR 12.2' },
                  { pop: 'newborn', text: '5 mg/kg rapid bolus during CPR.', src: 'ANMF' }
                ]
              },
              positionsTitle: 'Sources differ for children: how to give it',
              positions: [
                { pop: 'child', src: 'PCH (4 weeks to 18 years)', text: 'Rapid IV injection after the 3rd shock; repeat after the 5th if needed. Diluted as above.' },
                { pop: 'child', src: 'RCH', text: 'Undiluted over at least 3 minutes, then a glucose 5% flush.' }
              ],
              items: [
                { pop: 'all', label: 'Route', status: 'info', text: 'IV preferred. Intraosseous if no IV access, at the same dose (ANZCOR).' },
                { pop: 'adult', label: 'Torsades', status: 'no', text: 'Avoid in torsades de pointes (ANZCOR 11.5).' },
                { pop: 'child', label: 'Alternative', status: 'info', text: 'Lidocaine 1 mg/kg IV or IO if amiodarone is not available (ANZCOR 12.2).' }
              ]
            },
            {
              id: 'oral', cat: 'Oral', label: 'Given by mouth', status: 'no', src: SRC.pchAmio, summary: 'Do not give the injection solution by mouth: it is an irritant.',
              pops: { adult: { status: 'no', note: 'PCH advice (children). No adult source found; it applies to the solution itself.' }, child: { status: 'no', note: 'PCH' }, newborn: { status: 'no', note: 'PCH advice (children). Not covered by ANMF.' } }
            },
            {
              id: 'im', cat: 'IM', label: 'Intramuscular (IM)', status: 'no', src: SRC.rchAmio + ' · ' + SRC.cordarone, summary: 'The PI does not mention IM.',
              pops: { adult: { status: 'unverified', note: 'Not in the PI.' }, child: { status: 'no', note: 'RCH: not recommended.' }, newborn: { status: 'unverified', note: 'Not covered by ANMF.' } }
            },
            {
              id: 'sc', cat: 'SC', label: 'Subcutaneous (SC)', status: 'no', src: SRC.rchAmio + ' · ' + SRC.cordarone, summary: 'The PI does not mention SC.',
              pops: { adult: { status: 'unverified', note: 'Not in the PI.' }, child: { status: 'no', note: 'RCH: not recommended.' }, newborn: { status: 'unverified', note: 'Not covered by ANMF.' } }
            }
          ],
          dosing: [
            {
              id: 'ivinf', label: 'IV infusion', src: SRC.cordarone + ' · ' + SRC.seslhd + ' (adult) · ' + SRC.pchAmio + ' (child) · ' + SRC.anmfAmio + ' (newborn)',
              head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
              rows: [
                ['Loading', '5 mg/kg over 20 min–2 h in 250 mL glucose 5% (PI). SESLHD: 300 mg over 30–60 min.', '5 mg/kg (max 300 mg) over 20–120 min. May repeat 1–5 mg/kg. Max 15 mg/kg/day or 900 mg/day, whichever is less (PCH).', 'VF/VT: 5 mg/kg over 1 h. SVT/JET: 6 mg/kg over 4 h (ANMF).'],
                ['Maintenance', 'Up to 1200 mg (about 15 mg/kg) in up to 500 mL per 24 h (PI). SESLHD: 900 mg over 24 h.', 'Up to 15 microgram/kg/min. Max 1200 mg/day (PCH).', 'VF/VT: 5–25 microgram/kg/min. SVT/JET: 5–15 microgram/kg/min. Max 15 mg/kg/day (ANMF).']
              ],
              notes: ['Use within 12 hours of preparation.', 'The PI does not recommend amiodarone in children and contraindicates the injection in neonates (benzyl alcohol). Child and newborn doses come from hospital guidelines.']
            },
            {
              id: 'ivinj', label: 'IV injection (emergency)', src: SRC.cordarone,
              head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
              rows: [
                ['Extreme emergency', '150–300 mg in 10–20 mL glucose 5% over 1–2 min. Not within 15 min of a previous injection.', 'Not covered. For cardiac arrest see that dose set.', 'Contraindicated (PI).']
              ],
              notes: ['Intensive care only, with continuous ECG and blood pressure monitoring.']
            },
            {
              id: 'arrest', label: 'Cardiac arrest', src: SRC.anzcor + ' (adult) · ' + SRC.anzcorPaed + ' and ' + SRC.pchAmio + ' (child) · ' + SRC.anmfAmio + ' (newborn)',
              head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
              rows: [
                ['First dose', '300 mg IV or IO after the 3rd shock', '5 mg/kg (max 300 mg) IV or IO (ANZCOR 12.2). PCH: after the 3rd shock.', '5 mg/kg rapid bolus, undiluted'],
                ['Repeat', 'A further 150 mg may be considered after the 5th shock', 'PCH: repeat after the 5th shock if needed. ANZCOR 12.2: further doses on specialist advice.', '—'],
                ['Recurrent VF/pulseless VT', 'Infusion of 15 mg/kg over 24 h may be considered', '—', '—']
              ],
              notes: ['Adults: flush with 20–30 mL. Children: flush with sodium chloride 0.9% or glucose 5%.', 'Lidocaine 1 mg/kg is an alternative (ANZCOR).']
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
          id: 'tab', label: 'Tablet', unit: '250 microgram tablet', strengths: '62.5 microgram, 250 microgram', pops: ['adult', 'child'],
          appearance: [
            { label: 'Sigmaxin 250 microgram', shape: 'round', colors: ['white'], imprint: 'X3A', scored: true, src: SRC.hd, desc: 'White, round, biconvex, uncoated. Scored and marked “X3A” on the top face; plain underneath.' },
            { label: 'Sigmaxin PG 62.5 microgram', shape: 'round', colors: ['blue'], imprint: 'U3A', scored: false, src: SRC.hd, desc: 'Blue, round, biconvex, uncoated. Marked “U3A” on the top face; plain underneath.' },
            { label: 'Lanoxin PG 62.5 microgram', shape: 'round', colors: ['blue'], imprint: 'D6', scored: false, verify: true, src: 'To verify: Lanoxin PI section 3', desc: 'Sample appearance, not yet verified.' },
            { label: 'Lanoxin 250 microgram', shape: 'round', colors: ['white'], imprint: 'D25', scored: true, verify: true, src: 'To verify: Lanoxin PI section 3', desc: 'Sample appearance, not yet verified.' }
          ],
          routes: [
            {
              id: 'swallow', cat: 'Oral', label: 'Swallowed', status: 'licensed', src: SRC.hd + ' · ' + SRC.pchDig + ' · ' + SRC.anmfDig,
              summary: 'Oral route on the ARTG. Adult doses still need the Lanoxin or Sigmaxin PI.',
              pops: {
                adult: { status: 'licensed', note: 'ARTG. Adult details to verify (Lanoxin or Sigmaxin PI).' },
                child: { status: 'unverified', note: 'PCH lists only the elixir and injection. Tablet use in children not found.' }
              },
              items: [
                { pop: 'all', label: 'Food', status: 'info', verify: true, text: 'With or without food, at a consistent time relative to meals. Source covers newborns (ANMF); confirm for tablets.' },
                { pop: 'adult', label: 'Pulse check', status: 'caution', verify: true, text: 'Many services count the apical pulse before each dose and withhold if under 60/min.' },
                { pop: 'child', label: 'Pulse check', status: 'info', text: 'PCH and ANMF do not require routine pre-dose pulse checks in children.' }
              ]
            },
            {
              id: 'disperse', cat: 'Oral', label: 'Crushed and dispersed, by mouth', status: 'unverified', src: 'Needs Don’t Rush to Crush',
              summary: 'PCH lists only the elixir and injection; no tablet guidance found. Consider the elixir.',
              pops: { adult: { status: 'unverified', note: 'Check Don’t Rush to Crush.' }, child: { status: 'unverified', note: 'Use the elixir (PCH).' } }
            },
            {
              id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush',
              summary: 'Not covered by any document read.',
              pops: { adult: { status: 'unverified', note: 'Check Don’t Rush to Crush.' }, child: { status: 'unverified', note: 'Check Don’t Rush to Crush.' } }
            }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: 'Adult: to verify (Lanoxin PI) · Child: ' + SRC.pchDig,
              head: ['Use', 'Adult', 'Child (by weight)'],
              rows: [
                ['Rapid loading', '500 microgram, then 250 microgram every 6 h to a total of 1–1.5 mg (to verify)', '4 weeks to 10 years: 10–20 microgram/kg in total, max 750 microgram. Over 10 years: 10–20 microgram/kg, max 750–1500 microgram (PCH, enteral).'],
                ['Maintenance', '62.5–250 microgram once daily (to verify)', 'Initially 3–5 microgram/kg (max 125 microgram) twice daily. Up to 10 microgram/kg (max 250 microgram) twice daily (PCH, enteral).'],
                ['Kidney impairment', 'Reduce the dose; guided by levels (to verify)', 'Reduce the dose (to verify)']
              ],
              notes: ['PCH doses are for enteral use; PCH lists the elixir, not tablets.', 'Take levels at least 6 hours after a dose.', 'Newborn doses: see the oral liquid.']
            }
          ]
        },
        {
          id: 'liquid', label: 'Oral liquid', unit: '50 microgram/mL elixir', strengths: '50 microgram/mL', pops: ['adult', 'child', 'newborn'],
          appearance: [
            { label: 'Lanoxin Paediatric Elixir 50 microgram/mL', shape: 'bottle', colors: ['paleyellow'], verify: true, src: 'To verify: Lanoxin Paediatric Elixir CMI', desc: 'Oral liquid in 60 mL and 100 mL bottles. Contains ethanol (about 10.6%), propylene glycol and sucrose.' }
          ],
          routes: [
            {
              id: 'mouth', cat: 'Oral', label: 'By mouth', status: 'licensed', src: SRC.hd + ' · ' + SRC.pchDig + ' · ' + SRC.anmfDig,
              summary: 'Oral liquid on the ARTG (Lanoxin Paediatric Elixir).',
              pops: {
                adult: { status: 'licensed', note: 'ARTG. For adults who can’t swallow tablets; doses as for tablets (to verify).' },
                child: { status: 'accepted', note: 'PCH, from 4 weeks of age.' },
                newborn: { status: 'accepted', note: 'ANMF' }
              },
              items: [
                { pop: 'newborn', label: 'Feeds', status: 'info', text: 'With or without feeds, at a consistent time (ANMF).' },
                { pop: 'all', label: 'Measure', status: 'caution', verify: true, text: 'Use an oral syringe, never a spoon or cup. Tenfold dosing errors are a known risk.' },
                { pop: 'all', label: 'Contents', status: 'info', text: 'Contains ethanol and propylene glycol.' },
                { pop: 'all', label: 'Storage', status: 'info', text: 'Below 25°C, protected from light.' }
              ]
            },
            {
              id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush',
              summary: 'PCH covers enteral use but gives no tube instructions; ANMF does not mention tubes.',
              pops: {
                adult: { status: 'unverified', note: 'Check Don’t Rush to Crush.' },
                child: { status: 'unverified', note: 'PCH: enteral doses, no tube instructions.' },
                newborn: { status: 'unverified', note: 'Not in ANMF.' }
              }
            }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: 'Adult: to verify · Child: ' + SRC.pchDig + ' · Newborn: ' + SRC.anmfDig,
              head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
              rows: [
                ['Loading', 'As for tablets (to verify)', '4 weeks to 10 years: 10–20 microgram/kg in total, max 750 microgram (PCH).', '10 microgram/kg every 8 h for 3 doses, preterm and term (ANMF).'],
                ['Maintenance', 'As for tablets (to verify)', 'Initially 3–5 microgram/kg (max 125 microgram) twice daily, up to 10 microgram/kg (max 250 microgram) twice daily (PCH). 2–24 months: 8–10 microgram/kg/day (ANMF).', 'Preterm (to 36+6 weeks): 5–7.5 microgram/kg/day. Term: 8 microgram/kg/day. Up to 12 (ANMF).']
              ],
              notes: ['Maximum 250 microgram daily in children (ANMF).', 'Newborn maintenance starts 8 hours after the last loading dose.', 'Kidney impairment: reduce by at least half (ANMF).']
            }
          ]
        },
        {
          id: 'inj', label: 'Injection solution', unit: '500 microgram/2 mL ampoule', strengths: 'Adult 500 microgram/2 mL; Infants 50 microgram/2 mL', pops: ['adult', 'child', 'newborn'],
          appearance: [
            { label: 'Lanoxin Adult 500 microgram/2 mL', shape: 'ampoule', colors: ['clear'], src: SRC.hd, desc: 'Clear, colourless liquid in a 2 mL ampoule (250 microgram/mL).' },
            { label: 'Lanoxin Infants 50 microgram/2 mL', shape: 'ampoule', colors: ['clear'], src: SRC.hd, desc: 'Clear, colourless liquid in a 2 mL ampoule (25 microgram/mL). Ten times weaker than the adult injection.' }
          ],
          routes: [
            {
              id: 'iv', cat: 'IV', label: 'IV injection', status: 'licensed', src: SRC.hd + ' · ' + SRC.rchDig + ' · ' + SRC.pchDig + ' · ' + SRC.anmfDig,
              summary: 'Both products are listed as intravenous on the ARTG. The infant injection is ten times weaker than the adult injection.',
              pops: {
                adult: { status: 'licensed', note: 'ARTG. Preparation and rate not verified: needs the Lanoxin Adult PI.' },
                child: { status: 'accepted', note: 'RCH, PCH' },
                newborn: { status: 'accepted', note: 'ANMF (Lanoxin Infants only)' }
              },
              prep: {
                reconstitute: [{ pop: 'all', none: 'Not needed: already a solution.' }],
                dilute: [
                  { pop: 'adult', missing: 'Not found. Check the Lanoxin Adult PI or the Australian Injectable Drugs Handbook.' },
                  { pop: 'child', text: 'Lanoxin Infants: undiluted (preferred) or to 5 microgram/mL. Lanoxin Adult: dilute to 62.5 microgram/mL or weaker.', src: 'RCH' },
                  { pop: 'child', text: 'Fluids: glucose 5% or sodium chloride 0.9%. At 2.5 microgram/mL or weaker, also glucose 5% with sodium chloride 0.45%, or Hartmann’s.', src: 'RCH' },
                  { pop: 'child', text: 'Two-syringe technique: draw up in one syringe, add to a second syringe of diluent. Do not flush the dead space.', src: 'RCH, PCH' },
                  { pop: 'newborn', text: 'Lanoxin Infants only: add 2 mL (50 microgram) to 8 mL sodium chloride 0.9% or glucose 5% = 5 microgram/mL.', src: 'ANMF' },
                  { pop: 'newborn', text: 'Fluids: glucose 5%, Hartmann’s, sodium chloride 0.9% or 0.45%.', src: 'ANMF' }
                ],
                give: [
                  { pop: 'adult', missing: 'Not found. Check the Lanoxin Adult PI.' },
                  { pop: 'child', text: 'Over at least 5 minutes.', src: 'RCH, PCH' },
                  { pop: 'newborn', text: 'Over at least 10 minutes.', src: 'ANMF' }
                ]
              },
              items: [
                { pop: 'all', label: 'Check product', status: 'no', text: 'The adult injection is 10 times stronger than the infant injection. Check before drawing up (ANMF, RCH).' },
                { pop: 'all', label: 'Rate', status: 'caution', text: 'Rapid injection can cause hypertension and coronary vasoconstriction (RCH, PCH).' },
                { pop: 'all', label: 'Vesicant', status: 'caution', text: 'Avoid extravasation (PCH, RCH).' },
                { pop: 'child', label: 'Setting', status: 'caution', text: 'Only where cardiac monitoring and resuscitation are available (RCH). PCH: PCC, theatre and ED only.' },
                { pop: 'child', label: 'Levels', status: 'info', text: 'Take levels at least 6 hours after the dose (RCH).' },
                { pop: 'newborn', label: 'Monitoring', status: 'info', text: 'Continuous cardiac monitoring during IV infusion (ANMF).' }
              ]
            },
            {
              id: 'im', cat: 'IM', label: 'Intramuscular (IM)', status: 'differ', src: SRC.anmfDig + ' · ' + SRC.rchDig + ' · ' + SRC.pchDig + ' · ' + SRC.hd,
              summary: 'Sources differ by group. Both products are listed on the ARTG as IV only.',
              pops: {
                adult: { status: 'unverified', note: 'ARTG lists IV only. Lanoxin Adult PI not read.' },
                child: { status: 'no', note: 'RCH, PCH: not recommended. If unavoidable, Lanoxin Infants only, undiluted by deep IM.' },
                newborn: { status: 'no', note: 'ANMF: do not give IM.' }
              },
              prep: {
                reconstitute: [{ pop: 'all', none: 'Not needed: already a solution.' }],
                dilute: [{ pop: 'child', none: 'Not needed: given undiluted if unavoidable.', src: 'RCH, PCH' }],
                give: [{ pop: 'child', text: 'Lanoxin Infants only, deep IM, then massage the site.', src: 'RCH, PCH' }]
              },
              positions: [
                { pop: 'newborn', src: 'ANMF (newborns)', text: 'Do not give IM: unpredictable absorption and local irritation.' },
                { pop: 'child', src: 'RCH and PCH (children)', text: 'Not recommended (tissue damage, severe pain). Lanoxin Infants only may be given undiluted by deep IM if unavoidable, then massage the site.' },
                { pop: 'adult', src: 'ARTG', text: 'Route listed as intravenous only.' }
              ]
            },
            {
              id: 'sc', cat: 'SC', label: 'Subcutaneous (SC)', status: 'no', src: SRC.rchDig + ' · ' + SRC.pchDig, summary: 'Not recommended.',
              pops: { adult: { status: 'unverified', note: 'Not found.' }, child: { status: 'no', note: 'RCH, PCH' }, newborn: { status: 'unverified', note: 'Not in ANMF.' } }
            },
            {
              id: 'oral', cat: 'Oral', label: 'Given by mouth', status: 'unverified', src: '—', summary: 'Not mentioned in any document read. Use the elixir.',
              pops: { adult: { status: 'unverified', note: 'Not found.' }, child: { status: 'unverified', note: 'Not found.' }, newborn: { status: 'unverified', note: 'Not found.' } }
            }
          ],
          dosing: [
            {
              id: 'iv', label: 'IV', src: 'Adult: to verify (Lanoxin PI) · Child: ' + SRC.pchDig + ' · Newborn: ' + SRC.anmfDig,
              head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
              rows: [
                ['Loading', 'To verify: Lanoxin Adult PI', 'To verify: PCH IV loading dose', '7.5 microgram/kg every 8 h for 3 doses'],
                ['Maintenance', 'Usually switch to oral (to verify)', '2–24 months: 6–7.5 microgram/kg/day, up to 9 (ANMF)', 'Preterm 3.8–5.6; term 6 microgram/kg/day'],
                ['Switching', 'To verify', 'IV to enteral: may need 20–30% more (PCH)', 'IV dose is 75% of the oral dose (ANMF)']
              ],
              notes: ['Maximum 250 microgram daily in children.', 'ANMF Digoxin v2.0 was due for review in April 2026.']
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
          id: 'cap', label: 'Capsule', unit: '500 mg capsule', strengths: '250 mg, 500 mg', pops: ['adult', 'child'],
          appearance: [
            { label: 'Alphamox 500 mg', shape: 'capsule', colors: ['green', 'ivory'], src: SRC.alphamox, desc: 'Hard gelatin capsule (size 0el): opaque ivory body, opaque green cap, containing white granular powder.' },
            { label: 'Alphamox 250 mg', shape: 'capsule', colors: ['green', 'ivory'], src: SRC.alphamox, desc: 'Smaller hard gelatin capsule (size 2): ivory body, green cap, containing almost white granular powder.' }
          ],
          routes: [
            {
              id: 'swallow', cat: 'Oral', label: 'Swallowed', status: 'licensed', src: SRC.alphamoxCmi + ' · ' + SRC.alphamox,
              pops: { adult: { status: 'licensed', note: 'Alphamox PI' }, child: { status: 'licensed', note: 'Alphamox PI (doses under 20 kg)' } },
              items: [
                { label: 'Swallow whole', status: 'yes', text: 'Swallow whole with a glass of water.' },
                { label: 'Food', status: 'yes', text: 'With or without food.' },
                { label: 'Full course', status: 'info', text: 'Complete the course even if symptoms improve.' }
              ]
            },
            { id: 'open', cat: 'Oral', label: 'Opened, contents mixed with food or water', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'The CMI says to swallow whole. No document supports opening the capsule. Use the oral liquid if swallowing is a problem.',
              pops: { adult: { status: 'unverified', note: 'Check Don’t Rush to Crush.' }, child: { status: 'unverified', note: 'Use the oral liquid.' } } },
            { id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'Not covered by any document read. Consider the oral liquid.',
              pops: { adult: { status: 'unverified', note: 'Check Don’t Rush to Crush.' }, child: { status: 'unverified', note: 'Check Don’t Rush to Crush.' } } }
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
          id: 'liquid', label: 'Oral liquid', unit: '125 mg/5 mL oral liquid', strengths: '125 mg/5 mL (Cilamox, sugar free)', pops: ['adult', 'child', 'newborn'],
          appearance: [
            { label: 'Cilamox 125 mg/5 mL', shape: 'bottle', colors: ['white'], verify: true, src: 'To verify: Cilamox PI', desc: 'Sugar-free powder for oral liquid. Mixed with water before use.' }
          ],
          routes: [
            {
              id: 'mouth', cat: 'Oral', label: 'By mouth', status: 'licensed', src: SRC.hd + ' · reconstitution and storage to verify (Cilamox PI)',
              summary: 'Powder for oral liquid on the ARTG.',
              pops: {
                adult: { status: 'licensed', note: 'ARTG; Alphamox PI doses' },
                child: { status: 'licensed', note: 'ARTG; Alphamox PI doses under 20 kg' },
                newborn: { status: 'unverified', note: 'Alphamox PI: data too limited for a neonatal dose.' }
              },
              items: [
                { pop: 'all', label: 'Reconstitute', status: 'info', verify: true, text: 'Add water as shown on the bottle and shake well. Check the storage and discard date on the label.' },
                { label: 'Measure', status: 'caution', verify: true, text: 'Shake before each dose. Use an oral syringe, not a household spoon.' }
              ]
            },
            { id: 'tube', cat: 'Enteral tube', label: 'Via enteral tube (NG or PEG)', status: 'unverified', src: 'Needs Don’t Rush to Crush', summary: 'Not covered by any document read.',
              pops: { adult: { status: 'unverified', note: 'Check Don’t Rush to Crush.' }, child: { status: 'unverified', note: 'Check Don’t Rush to Crush.' }, newborn: { status: 'unverified', note: 'Not found.' } } }
          ],
          dosing: [
            {
              id: 'oral', label: 'Oral', src: SRC.alphamox + ' (same amoxicillin doses)',
              head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
              rows: [
                ['Upper respiratory, urinary or skin infection', '250 mg (10 mL of 125 mg/5 mL) every 8 h', 'Under 20 kg: 20 mg/kg/day in 3 divided doses', 'No dose in the PI (data too limited). Check ANMF.'],
                ['Severe or lower respiratory infection', '500 mg every 8 h', 'Under 20 kg: 40 mg/kg/day in 3 divided doses', '—'],
                ['Children over 20 kg', '—', 'Use adult doses', '—']
              ],
              notes: ['Round child volumes to what the oral syringe can measure.']
            }
          ]
        },
        {
          id: 'inj', label: 'Powder for injection', unit: '1 g vial', strengths: '1 g (Fisamox, Ibiamox)', pops: ['adult', 'child', 'newborn'],
          appearance: [
            { label: 'Fisamox 1 g', shape: 'vial', colors: ['white'], src: SRC.fisamox, desc: 'Fine white to off-white powder. May turn briefly pink or slightly opalescent when reconstituted.' },
            { label: 'Ibiamox 1 g', shape: 'vial', colors: ['white'], src: SRC.hd, desc: 'Clear glass vial containing a white or almost white powder.' }
          ],
          routes: [
            {
              id: 'ivinj', cat: 'IV', label: 'Slow IV injection', status: 'licensed', src: SRC.fisamox + ' 4.2, 6.4 · ' + SRC.rchAmox,
              summary: 'Powder: reconstitute, then give slowly. Rapid injection can cause seizures.',
              pops: {
                adult: { status: 'licensed', note: 'Fisamox PI 4.2' },
                child: { status: 'licensed', note: 'Fisamox PI 4.2 (doses under 20 kg); RCH' },
                newborn: { status: 'accepted', note: 'RCH gives a maximum strength. The PI has no neonatal data.' }
              },
              brands: [
                { brand: 'Fisamox', status: 'licensed', note: 'PI 4.2' },
                { brand: 'Ibiamox', status: 'licensed', note: 'ARTG route: intravenous' }
              ],
              prep: {
                reconstitute: [
                  { pop: ['adult', 'child'], text: 'Dissolve 1 g in 20 mL water for injections (about 50 mg/mL, worked out). Use immediately.', src: 'Fisamox PI 4.2' },
                  { pop: ['child', 'newborn'], text: 'Add 9.2 mL water for injections to 1 g = 100 mg/mL (the powder adds 0.8 mL). Shake well. Use immediately.', src: 'RCH' }
                ],
                dilute: [
                  { pop: 'adult', none: 'No further dilution stated: give the reconstituted solution.', src: 'Fisamox PI 4.2' },
                  { pop: 'child', text: 'Doses up to 30 mg/kg: dilute to 50 mg/mL.', src: 'RCH' },
                  { pop: 'newborn', text: 'Up to 100 mg/mL if necessary.', src: 'RCH' }
                ],
                give: [
                  { pop: ['adult', 'child'], text: 'Over at least 3–4 minutes, preferably 10–15 minutes.', src: 'Fisamox PI 4.2' },
                  { pop: 'child', text: 'Doses up to 30 mg/kg over 5–15 minutes.', src: 'RCH' },
                  { pop: 'newborn', missing: 'Rate not found. The PI has no neonatal data. Check ANMF Amoxicillin.' }
                ]
              },
              items: [
                { pop: 'all', label: 'Seizures', status: 'caution', text: 'Faster injection can cause seizures (PI 4.2, RCH).' },
                { pop: 'all', label: 'Appearance', status: 'info', text: 'May turn briefly pink or slightly opalescent when reconstituted (PI 4.2, RCH).' }
              ]
            },
            {
              id: 'ivinf', cat: 'IV', label: 'IV infusion', status: 'licensed', src: SRC.fisamox + ' 4.2, 6.2, 6.4 · ' + SRC.rchAmox,
              summary: 'Powder: reconstitute, dilute in an IV fluid, then infuse. Each fluid has a maximum strength and storage time.',
              pops: {
                adult: { status: 'licensed', note: 'Fisamox PI 4.2, 6.4' },
                child: { status: 'licensed', note: 'Fisamox PI 4.2 (doses under 20 kg); RCH' },
                newborn: { status: 'accepted', note: 'RCH gives a maximum strength. The PI has no neonatal data.' }
              },
              brands: [
                { brand: 'Fisamox', status: 'licensed', note: 'PI 4.2' },
                { brand: 'Ibiamox', status: 'licensed', note: 'ARTG route: intravenous' }
              ],
              prep: {
                reconstitute: [
                  { pop: ['adult', 'child'], text: 'Dissolve 1 g in 20 mL water for injections.', src: 'Fisamox PI 4.2' },
                  { pop: ['child', 'newborn'], text: 'Add 9.2 mL water for injections to 1 g = 100 mg/mL. Shake well.', src: 'RCH' }
                ],
                dilute: [
                  { pop: ['adult', 'child'], text: 'Most common IV fluids. Maximum strength and storage at 2–8°C: sodium chloride 0.9% up to 10 mg/mL for 72 h, or up to 30 mg/mL for 8 h; Lactated Ringer’s up to 20 mg/mL for 24 h; glucose 5% up to 20 mg/mL for 4 h; glucose 5% with sodium chloride 0.45% up to 30 mg/mL for 4 h.', src: 'Fisamox PI 6.4' },
                  { pop: ['adult', 'child'], text: 'Avoid glucose and other carbohydrate fluids where possible. If needed, inject into the drip tubing or use a small volume.', src: 'Fisamox PI 4.2' },
                  { pop: 'adult', missing: 'Bag volume not stated in the Fisamox PI. Check the Australian Injectable Drugs Handbook.' },
                  { pop: 'child', text: 'Over 30 mg/kg: to 50 mg/mL or weaker. Up to 30 mg/kg: to a convenient volume. Sodium chloride 0.9% at 50 mg/mL or weaker; glucose 5%, glucose 5% with sodium chloride 0.9%, or Hartmann’s at 30 mg/mL or weaker.', src: 'RCH' },
                  { pop: 'newborn', text: 'Up to 100 mg/mL if necessary.', src: 'RCH' }
                ],
                give: [
                  { pop: ['adult', 'child'], text: 'Over 30–60 minutes.', src: 'Fisamox PI 4.2, 6.4' },
                  { pop: 'adult', missing: 'Pump rate (mL/h) not shown: no source states the bag volume.' },
                  { pop: 'child', text: 'Doses over 30 mg/kg: over at least 30 minutes. Up to 30 mg/kg in a convenient volume: over 30 minutes.', src: 'RCH' },
                  { pop: 'newborn', missing: 'Rate not found. Check ANMF Amoxicillin.' }
                ]
              },
              items: [
                { pop: 'all', label: 'Incompatible', status: 'no', text: 'Blood products, protein hydrolysates and lipid emulsions (PI 6.2).' },
                { pop: 'all', label: 'Aminoglycosides', status: 'no', text: 'Do not mix with gentamicin or other aminoglycosides (PI, RCH).' },
                { pop: 'all', label: 'After warming', status: 'caution', text: 'Use refrigerated solutions straight away once at room temperature (PI 6.4).' }
              ]
            },
            {
              id: 'im', cat: 'IM', label: 'Intramuscular (IM)', status: 'licensed', statusNote: 'Fisamox', src: SRC.fisamox + ' 4.2 · ' + SRC.rchAmox + ' · ' + SRC.hd + ' · ' + SRC.ibiamoxCmi,
              summary: 'Licensed for Fisamox. Sources differ for Ibiamox. Painful.',
              pops: {
                adult: { status: 'licensed', note: 'Fisamox PI 4.2' },
                child: { status: 'licensed', note: 'Fisamox PI 4.2. RCH: suitable but painful.' },
                newborn: { status: 'unverified', note: 'Not found.' }
              },
              brands: [
                { brand: 'Fisamox', status: 'licensed', note: 'PI 4.2' },
                { brand: 'Ibiamox', status: 'differ', note: 'ARTG (healthdirect): IV only. Ibiamox CMI (2015): IM or IV.' }
              ],
              prep: {
                reconstitute: [
                  { pop: ['adult', 'child'], text: 'Add 5.2 mL water for injections to 1 g; shake vigorously. If painful, lignocaine 1% or procaine 0.5% may replace the water.', src: 'Fisamox PI 4.2' },
                  { pop: 'child', text: '5.2 mL water for injections = 167 mg/mL, or 3.2 mL lidocaine 1% = 250 mg/mL.', src: 'RCH' }
                ],
                dilute: [{ pop: ['adult', 'child'], none: 'Not needed: give undiluted.', src: 'RCH' }],
                give: [{ pop: ['adult', 'child'], text: 'Split doses over 500 mg between injection sites.', src: 'Fisamox PI 4.2' }]
              },
              items: [
                { pop: 'all', label: 'Pain', status: 'caution', text: 'IM injection is painful (PI 4.2, RCH).' }
              ]
            },
            {
              id: 'sc', cat: 'SC', label: 'Subcutaneous (SC)', status: 'no', src: SRC.rchAmox, summary: 'Not recommended. The Fisamox PI does not mention SC.',
              pops: { adult: { status: 'unverified', note: 'Not in the PI.' }, child: { status: 'no', note: 'RCH' }, newborn: { status: 'unverified', note: 'Not found.' } }
            },
            {
              id: 'oral', cat: 'Oral', label: 'Given by mouth', status: 'unverified', src: '—', summary: 'Not mentioned in any document read. Use the capsules or oral liquid.',
              pops: { adult: { status: 'unverified', note: 'Not found.' }, child: { status: 'unverified', note: 'Not found.' }, newborn: { status: 'unverified', note: 'Not found.' } }
            }
          ],
          dosing: [
            {
              id: 'inj', label: 'IV or IM', src: SRC.fisamox,
              head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
              rows: [
                ['Upper respiratory, urinary or skin infection', '250 mg every 6–8 h', 'Under 20 kg: 20 mg/kg/day, divided every 6–8 h', 'No dose in the PI (no neonatal data). Check ANMF.'],
                ['Severe or lower respiratory infection', '500 mg every 6–8 h', 'Under 20 kg: 40 mg/kg/day, divided every 6–8 h', '—'],
                ['Septicaemia (slow IV or infusion)', '1 g every 6 h', 'Under 20 kg: 20–40 mg/kg every 6 h', '—'],
                ['Children over 20 kg', '—', 'Use adult doses', '—']
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
