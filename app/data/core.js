/* MediAUS data registry. Loads first; every data file registers into it.
   Model: SOURCES (documents) <- facts (one record per displayed line) <- medicine skeletons (ids only).
   Rules and field lists: CLAUDE.md and the "MediAUS data provenance plan" doc. */
window.MEDIAUS = (function () {
  'use strict';

  // ID prefix -> fact table. The prefix alone tells you where a record lives.
  var TABLES = {
    IDN: 'IDENTITY',      // name, class, chips, brands, ATC, schedule, PBS
    FRM: 'FORM',          // a physical form's unit and strengths
    APP: 'APPEARANCE',    // one product's look
    RTE: 'ROUTE',         // a route's headline: label, status, summary
    ROU: 'ROUTE_STATUS',  // a route's status for one patient group
    BRD: 'BRAND_ROUTE',   // a route's status for one brand
    PRP: 'PREP',          // one reconstitute, dilute or give step
    ADM: 'ADMIN',         // one administration line under a route
    POS: 'POSITION',      // one source's position where sources differ
    DOS: 'DOSE',          // a dose table row label, cell or note
    INT: 'INTERACTION',   // one interaction line
    SAF: 'SAFETY',        // one contraindication, caution, warning or monitoring line
    PRG: 'PREGNANCY',
    BRF: 'BREASTFEEDING',
    AGT: 'AGENT',         // something an interaction can be with, that has no full entry
    GRP: 'GROUP',         // a named set of agents (by ATC code or by list)
    MEM: 'MEMBER',        // one member of a list group
    OTH: 'OTHER_MED',     // search-only medicine (demo)
    CKM: 'CHECKER_MED',   // checker medicine name (demo, retired: now AGT)
    CHK: 'CHECKER_PAIR',  // checker pair (demo, retired: now INT links)
    BAR: 'BARCODE'        // pack barcode (demo)
  };
  // Provenance status of a fact (not the clinical status of a route).
  var STATUS = ['draft', 'verify', 'signed', 'gap', 'demo', 'retired'];

  var db = { SOURCES: {}, REVIEWS: {}, FACTS: {}, MEDS: {}, ORDER: [], SETS: {}, errors: [] };
  Object.keys(TABLES).forEach(function (p) { db.FACTS[TABLES[p]] = {}; });

  function err(msg) { db.errors.push(msg); }
  function tableOf(id) { var t = TABLES[String(id).split('-')[0]]; return t ? db.FACTS[t] : null; }

  return {
    TABLES: TABLES,
    STATUS: STATUS,
    db: db,
    tableOf: tableOf,
    sources: function (o) {
      Object.keys(o).forEach(function (id) {
        if (db.SOURCES[id]) err('duplicate source ' + id);
        db.SOURCES[id] = o[id];
      });
    },
    reviews: function (o) {
      Object.keys(o).forEach(function (id) {
        if (db.REVIEWS[id]) err('duplicate review ' + id);
        db.REVIEWS[id] = o[id];
      });
    },
    facts: function (o) {
      Object.keys(o).forEach(function (id) {
        var t = tableOf(id);
        if (!t) return err('unknown fact prefix ' + id);
        if (t[id]) err('duplicate fact ' + id);
        t[id] = o[id];
      });
    },
    // Ordered lists of fact ids outside a medicine (search-only list, checker, barcodes, extra pills).
    set: function (name, ids) {
      if (db.SETS[name]) err('duplicate set ' + name);
      db.SETS[name] = ids;
    },
    med: function (skel) {
      if (db.MEDS[skel.id]) err('duplicate medicine ' + skel.id);
      db.MEDS[skel.id] = skel;
      db.ORDER.push(skel.id);
    },
    fact: function (id) { var t = tableOf(id); return t ? t[id] : undefined; }
  };
})();
