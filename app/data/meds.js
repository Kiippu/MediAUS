/* Medicine skeletons: structure and order only. Every clinical word lives in a fact (see facts/).
   Labels here are the app's own words (form names, dose set names, table headings). */
MEDIAUS.med({
  id: 'amiodarone',
  identity: {
    name: 'IDN-0001',
    cls: 'IDN-0002',
    chips: 'IDN-0003',
    brands: 'IDN-0004',
    atc: 'IDN-0005',
    schedule: 'IDN-0006',
    pbs: 'IDN-0007'
  },
  pregnancy: 'PRG-0001',
  breastfeeding: {
    main: 'BRF-0001',
    positions: ['POS-0001', 'POS-0002']
  },
  forms: [
    {
      id: 'tab',
      label: 'Tablet',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0001',
      appearance: ['APP-0001', 'APP-0002', 'APP-0003', 'APP-0004'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0001',
          pops: {
            adult: 'ROU-0001',
            child: 'ROU-0002',
            newborn: 'ROU-0003'
          },
          items: ['ADM-0001', 'ADM-0002', 'ADM-0003']
        },
        {
          id: 'disperse',
          cat: 'Oral',
          head: 'RTE-0002',
          pops: {
            adult: 'ROU-0004',
            child: 'ROU-0005',
            newborn: 'ROU-0006'
          },
          items: ['ADM-0004', 'ADM-0005']
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0003',
          pops: {
            adult: 'ROU-0007',
            child: 'ROU-0008',
            newborn: 'ROU-0009'
          }
        },
        {
          id: 'susp',
          cat: 'Oral',
          head: 'RTE-0004',
          pops: {
            adult: 'ROU-0010',
            child: 'ROU-0011',
            newborn: 'ROU-0012'
          },
          items: ['ADM-0006', 'ADM-0007']
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0001', 'DOS-0002', 'DOS-0003', null],
            ['DOS-0004', 'DOS-0005', 'DOS-0006', null],
            ['DOS-0007', 'DOS-0008', 'DOS-0009', 'DOS-0010']
          ],
          notes: ['DOS-0011', 'DOS-0012', 'DOS-0013']
        }
      ]
    },
    {
      id: 'inj',
      label: 'Injection solution',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0002',
      appearance: ['APP-0005'],
      routes: [
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0005',
          pops: {
            adult: 'ROU-0013',
            child: 'ROU-0014',
            newborn: 'ROU-0015'
          },
          prep: {
            reconstitute: ['PRP-0001'],
            dilute: ['PRP-0002', 'PRP-0003', 'PRP-0004', 'PRP-0005', 'PRP-0006', 'PRP-0007'],
            give: ['PRP-0008', 'PRP-0009', 'PRP-0010', 'PRP-0011', 'PRP-0012', 'PRP-0013']
          },
          items: ['ADM-0008', 'ADM-0009', 'ADM-0010', 'ADM-0011', 'ADM-0012', 'ADM-0013', 'ADM-0014', 'ADM-0015']
        },
        {
          id: 'ivperiph',
          cat: 'IV',
          head: 'RTE-0006',
          pops: {
            adult: 'ROU-0016',
            child: 'ROU-0017',
            newborn: 'ROU-0018'
          },
          prep: {
            reconstitute: ['PRP-0014'],
            dilute: ['PRP-0015', 'PRP-0016', 'PRP-0017', 'PRP-0018'],
            give: ['PRP-0019', 'PRP-0020', 'PRP-0021']
          },
          items: ['ADM-0016', 'ADM-0017']
        },
        {
          id: 'ivinj',
          cat: 'IV',
          head: 'RTE-0007',
          pops: {
            adult: 'ROU-0019',
            child: 'ROU-0020',
            newborn: 'ROU-0021'
          },
          prep: {
            reconstitute: ['PRP-0022'],
            dilute: ['PRP-0023'],
            give: ['PRP-0024']
          },
          items: ['ADM-0018']
        },
        {
          id: 'arrest',
          cat: 'IV',
          head: 'RTE-0008',
          pops: {
            adult: 'ROU-0022',
            child: 'ROU-0023',
            newborn: 'ROU-0024'
          },
          prep: {
            reconstitute: ['PRP-0025'],
            dilute: ['PRP-0026', 'PRP-0027', 'PRP-0028', 'PRP-0029'],
            give: ['PRP-0030', 'PRP-0031', 'PRP-0032']
          },
          positions: ['POS-0003', 'POS-0004'],
          items: ['ADM-0019', 'ADM-0020', 'ADM-0021']
        },
        {
          id: 'oral',
          cat: 'Oral',
          head: 'RTE-0009',
          pops: {
            adult: 'ROU-0025',
            child: 'ROU-0026',
            newborn: 'ROU-0027'
          }
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0010',
          pops: {
            adult: 'ROU-0028',
            child: 'ROU-0029',
            newborn: 'ROU-0030'
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0011',
          pops: {
            adult: 'ROU-0031',
            child: 'ROU-0032',
            newborn: 'ROU-0033'
          }
        }
      ],
      dosing: [
        {
          id: 'ivinf',
          label: 'IV infusion',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0014', 'DOS-0015', 'DOS-0016', 'DOS-0017'],
            ['DOS-0018', 'DOS-0019', 'DOS-0020', 'DOS-0021']
          ],
          notes: ['DOS-0022', 'DOS-0023']
        },
        {
          id: 'ivinj',
          label: 'IV injection (emergency)',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0024', 'DOS-0025', 'DOS-0026', 'DOS-0027']
          ],
          notes: ['DOS-0028']
        },
        {
          id: 'arrest',
          label: 'Cardiac arrest',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0029', 'DOS-0030', 'DOS-0031', 'DOS-0032'],
            ['DOS-0033', 'DOS-0034', 'DOS-0035', null],
            ['DOS-0036', 'DOS-0037', null, null]
          ],
          notes: ['DOS-0038', 'DOS-0039']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0001', 'INT-0002', 'INT-0003', 'INT-0004', 'INT-0005'],
    other: ['INT-0006', 'INT-0007', 'INT-0008', 'INT-0009']
  },
  safety: {
    contraindications: ['SAF-0001', 'SAF-0002', 'SAF-0003', 'SAF-0004', 'SAF-0005', 'SAF-0006'],
    caution: ['SAF-0007', 'SAF-0008', 'SAF-0009', 'SAF-0010'],
    warnings: ['SAF-0011', 'SAF-0012', 'SAF-0013', 'SAF-0014', 'SAF-0015'],
    monitoring: ['SAF-0016', 'SAF-0017', 'SAF-0018', 'SAF-0019', 'SAF-0020', 'SAF-0021']
  }
});

MEDIAUS.med({
  id: 'digoxin',
  identity: {
    name: 'IDN-0008',
    cls: 'IDN-0009',
    chips: 'IDN-0010',
    brands: 'IDN-0011',
    atc: 'IDN-0012',
    schedule: 'IDN-0013',
    pbs: 'IDN-0014'
  },
  pregnancy: 'PRG-0002',
  breastfeeding: {
    main: 'BRF-0002'
  },
  forms: [
    {
      id: 'tab',
      label: 'Tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0003',
      appearance: ['APP-0006', 'APP-0007', 'APP-0008', 'APP-0009'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0012',
          pops: {
            adult: 'ROU-0034',
            child: 'ROU-0035'
          },
          items: ['ADM-0022', 'ADM-0023', 'ADM-0024']
        },
        {
          id: 'disperse',
          cat: 'Oral',
          head: 'RTE-0013',
          pops: {
            adult: 'ROU-0036',
            child: 'ROU-0037'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0014',
          pops: {
            adult: 'ROU-0038',
            child: 'ROU-0039'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0040', 'DOS-0041', 'DOS-0042'],
            ['DOS-0043', 'DOS-0044', 'DOS-0045'],
            ['DOS-0046', 'DOS-0047', 'DOS-0048']
          ],
          notes: ['DOS-0049', 'DOS-0050', 'DOS-0051']
        }
      ]
    },
    {
      id: 'liquid',
      label: 'Oral liquid',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0004',
      appearance: ['APP-0010'],
      routes: [
        {
          id: 'mouth',
          cat: 'Oral',
          head: 'RTE-0015',
          pops: {
            adult: 'ROU-0040',
            child: 'ROU-0041',
            newborn: 'ROU-0042'
          },
          items: ['ADM-0025', 'ADM-0026', 'ADM-0027', 'ADM-0028']
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0016',
          pops: {
            adult: 'ROU-0043',
            child: 'ROU-0044',
            newborn: 'ROU-0045'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0052', 'DOS-0053', 'DOS-0054', 'DOS-0055'],
            ['DOS-0056', 'DOS-0057', 'DOS-0058', 'DOS-0059']
          ],
          notes: ['DOS-0060', 'DOS-0061', 'DOS-0062']
        }
      ]
    },
    {
      id: 'inj',
      label: 'Injection solution',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0005',
      appearance: ['APP-0011', 'APP-0012'],
      routes: [
        {
          id: 'iv',
          cat: 'IV',
          head: 'RTE-0017',
          pops: {
            adult: 'ROU-0046',
            child: 'ROU-0047',
            newborn: 'ROU-0048'
          },
          prep: {
            reconstitute: ['PRP-0033'],
            dilute: ['PRP-0034', 'PRP-0035', 'PRP-0036', 'PRP-0037', 'PRP-0038', 'PRP-0039'],
            give: ['PRP-0040', 'PRP-0041', 'PRP-0042']
          },
          items: ['ADM-0029', 'ADM-0030', 'ADM-0031', 'ADM-0032', 'ADM-0033', 'ADM-0034']
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0018',
          pops: {
            adult: 'ROU-0049',
            child: 'ROU-0050',
            newborn: 'ROU-0051'
          },
          prep: {
            reconstitute: ['PRP-0043'],
            dilute: ['PRP-0044'],
            give: ['PRP-0045']
          },
          positions: ['POS-0005', 'POS-0006', 'POS-0007']
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0019',
          pops: {
            adult: 'ROU-0052',
            child: 'ROU-0053',
            newborn: 'ROU-0054'
          }
        },
        {
          id: 'oral',
          cat: 'Oral',
          head: 'RTE-0020',
          pops: {
            adult: 'ROU-0055',
            child: 'ROU-0056',
            newborn: 'ROU-0057'
          }
        }
      ],
      dosing: [
        {
          id: 'iv',
          label: 'IV',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0063', 'DOS-0064', 'DOS-0065', 'DOS-0066'],
            ['DOS-0067', 'DOS-0068', 'DOS-0069', 'DOS-0070'],
            ['DOS-0071', 'DOS-0072', 'DOS-0073', 'DOS-0074']
          ],
          notes: ['DOS-0075', 'DOS-0076']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0010', 'INT-0011', 'INT-0012', 'INT-0013'],
    other: ['INT-0014', 'INT-0015', 'INT-0016']
  },
  safety: {
    contraindications: ['SAF-0022', 'SAF-0023', 'SAF-0024', 'SAF-0025'],
    caution: ['SAF-0026', 'SAF-0027', 'SAF-0028'],
    warnings: ['SAF-0029', 'SAF-0030', 'SAF-0031', 'SAF-0032', 'SAF-0033'],
    monitoring: ['SAF-0034', 'SAF-0035', 'SAF-0036', 'SAF-0037']
  }
});

MEDIAUS.med({
  id: 'amoxicillin',
  identity: {
    name: 'IDN-0015',
    cls: 'IDN-0016',
    chips: 'IDN-0017',
    brands: 'IDN-0018',
    atc: 'IDN-0019',
    schedule: 'IDN-0020',
    pbs: 'IDN-0021'
  },
  pregnancy: 'PRG-0003',
  breastfeeding: {
    main: 'BRF-0003'
  },
  forms: [
    {
      id: 'cap',
      label: 'Capsule',
      pops: ['adult', 'child'],
      info: 'FRM-0006',
      appearance: ['APP-0013', 'APP-0014'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0021',
          pops: {
            adult: 'ROU-0058',
            child: 'ROU-0059'
          },
          items: ['ADM-0035', 'ADM-0036', 'ADM-0037']
        },
        {
          id: 'open',
          cat: 'Oral',
          head: 'RTE-0022',
          pops: {
            adult: 'ROU-0060',
            child: 'ROU-0061'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0023',
          pops: {
            adult: 'ROU-0062',
            child: 'ROU-0063'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0077', 'DOS-0078', 'DOS-0079'],
            ['DOS-0080', 'DOS-0081', 'DOS-0082'],
            ['DOS-0083', 'DOS-0084', 'DOS-0085'],
            ['DOS-0086', 'DOS-0087', null],
            ['DOS-0088', null, 'DOS-0089']
          ],
          notes: ['DOS-0090', 'DOS-0091', 'DOS-0092']
        }
      ]
    },
    {
      id: 'liquid',
      label: 'Oral liquid',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0007',
      appearance: ['APP-0015'],
      routes: [
        {
          id: 'mouth',
          cat: 'Oral',
          head: 'RTE-0024',
          pops: {
            adult: 'ROU-0064',
            child: 'ROU-0065',
            newborn: 'ROU-0066'
          },
          items: ['ADM-0038', 'ADM-0039']
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0025',
          pops: {
            adult: 'ROU-0067',
            child: 'ROU-0068',
            newborn: 'ROU-0069'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0093', 'DOS-0094', 'DOS-0095', 'DOS-0096'],
            ['DOS-0097', 'DOS-0098', 'DOS-0099', null],
            ['DOS-0100', null, 'DOS-0101', null]
          ],
          notes: ['DOS-0102']
        }
      ]
    },
    {
      id: 'inj',
      label: 'Powder for injection',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0008',
      appearance: ['APP-0016', 'APP-0017'],
      routes: [
        {
          id: 'ivinj',
          cat: 'IV',
          head: 'RTE-0026',
          pops: {
            adult: 'ROU-0070',
            child: 'ROU-0071',
            newborn: 'ROU-0072'
          },
          brands: ['BRD-0001', 'BRD-0002'],
          prep: {
            reconstitute: ['PRP-0046', 'PRP-0047'],
            dilute: ['PRP-0048', 'PRP-0049', 'PRP-0050'],
            give: ['PRP-0051', 'PRP-0052', 'PRP-0053']
          },
          items: ['ADM-0040', 'ADM-0041']
        },
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0027',
          pops: {
            adult: 'ROU-0073',
            child: 'ROU-0074',
            newborn: 'ROU-0075'
          },
          brands: ['BRD-0003', 'BRD-0004'],
          prep: {
            reconstitute: ['PRP-0054', 'PRP-0055'],
            dilute: ['PRP-0056', 'PRP-0057', 'PRP-0058', 'PRP-0059', 'PRP-0060'],
            give: ['PRP-0061', 'PRP-0062', 'PRP-0063', 'PRP-0064']
          },
          items: ['ADM-0042', 'ADM-0043', 'ADM-0044']
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0028',
          pops: {
            adult: 'ROU-0076',
            child: 'ROU-0077',
            newborn: 'ROU-0078'
          },
          brands: ['BRD-0005', 'BRD-0006'],
          prep: {
            reconstitute: ['PRP-0065', 'PRP-0066'],
            dilute: ['PRP-0067'],
            give: ['PRP-0068']
          },
          items: ['ADM-0045']
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0029',
          pops: {
            adult: 'ROU-0079',
            child: 'ROU-0080',
            newborn: 'ROU-0081'
          }
        },
        {
          id: 'oral',
          cat: 'Oral',
          head: 'RTE-0030',
          pops: {
            adult: 'ROU-0082',
            child: 'ROU-0083',
            newborn: 'ROU-0084'
          }
        }
      ],
      dosing: [
        {
          id: 'inj',
          label: 'IV or IM',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0103', 'DOS-0104', 'DOS-0105', 'DOS-0106'],
            ['DOS-0107', 'DOS-0108', 'DOS-0109', null],
            ['DOS-0110', 'DOS-0111', 'DOS-0112', null],
            ['DOS-0113', null, 'DOS-0114', null]
          ],
          notes: ['DOS-0115', 'DOS-0116']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0017', 'INT-0018', 'INT-0019'],
    other: [
      'INT-0020',
      'INT-0021',
      'INT-0022',
      {
        id: 'INT-0023',
        positions: ['POS-0008', 'POS-0009']
      }
    ]
  },
  safety: {
    contraindications: ['SAF-0038'],
    caution: ['SAF-0039', 'SAF-0040'],
    warnings: ['SAF-0041', 'SAF-0042', 'SAF-0043'],
    monitoring: ['SAF-0044', 'SAF-0045']
  }
});

// Lists outside a medicine. All demo data.
MEDIAUS.set('OTHERS', ['OTH-0001', 'OTH-0002', 'OTH-0003', 'OTH-0004', 'OTH-0005', 'OTH-0006']);
MEDIAUS.set('EXTRA_PILLS', ['APP-0018', 'APP-0019', 'APP-0020', 'APP-0021']);
MEDIAUS.set('BARCODES', ['BAR-0001', 'BAR-0002', 'BAR-0003', 'BAR-0004', 'BAR-0005', 'BAR-0006', 'BAR-0007', 'BAR-0008']);
MEDIAUS.set('CHECK_MEDS', ['CKM-0001', 'CKM-0002', 'CKM-0003', 'CKM-0004', 'CKM-0005', 'CKM-0006', 'CKM-0007', 'CKM-0008', 'CKM-0009', 'CKM-0010']);
MEDIAUS.set('CHECK_PAIRS', ['CHK-0001', 'CHK-0002', 'CHK-0003', 'CHK-0004', 'CHK-0005', 'CHK-0006', 'CHK-0007', 'CHK-0008', 'CHK-0009', 'CHK-0010']);
