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

MEDIAUS.med({
  id: 'baclofen',
  identity: {
    name: 'IDN-0022',
    cls: 'IDN-0023',
    chips: 'IDN-0024',
    brands: 'IDN-0025',
    atc: 'IDN-0026',
    schedule: 'IDN-0027',
    pbs: 'IDN-0028'
  },
  pregnancy: 'PRG-0004',
  breastfeeding: {
    main: 'BRF-0004'
  },
  forms: [
    {
      id: 'tab',
      label: 'Tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0009',
      appearance: ['APP-0022', 'APP-0023', 'APP-0024', 'APP-0025'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0031',
          pops: {
            adult: 'ROU-0085',
            child: 'ROU-0086'
          },
          items: ['ADM-0047', 'ADM-0048', 'ADM-0046']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0032',
          pops: {
            adult: 'ROU-0087',
            child: 'ROU-0088'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0033',
          pops: {
            adult: 'ROU-0089',
            child: 'ROU-0090'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0117', 'DOS-0118', 'DOS-0119'],
            ['DOS-0120', 'DOS-0121', null],
            ['DOS-0122', 'DOS-0123', null],
            ['DOS-0124', 'DOS-0125', null]
          ],
          notes: ['DOS-0126', 'DOS-0127', 'DOS-0128', 'DOS-0129']
        }
      ]
    },
    {
      id: 'it',
      label: 'Intrathecal injection',
      pops: ['adult', 'child'],
      info: 'FRM-0010',
      appearance: ['APP-0026'],
      routes: [
        {
          id: 'test',
          cat: 'Intrathecal',
          head: 'RTE-0034',
          pops: {
            adult: 'ROU-0091',
            child: 'ROU-0092'
          },
          prep: {
            reconstitute: ['PRP-0069'],
            dilute: ['PRP-0070'],
            give: ['PRP-0071']
          }
        },
        {
          id: 'pump',
          cat: 'Intrathecal',
          head: 'RTE-0035',
          pops: {
            adult: 'ROU-0093',
            child: 'ROU-0094'
          },
          prep: {
            reconstitute: ['PRP-0069'],
            dilute: ['PRP-0070'],
            give: ['PRP-0072']
          },
          items: ['ADM-0049', 'ADM-0050']
        },
        {
          id: 'iv',
          cat: 'IV',
          head: 'RTE-0036',
          pops: {
            adult: 'ROU-0095',
            child: 'ROU-0096'
          }
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0037',
          pops: {
            adult: 'ROU-0097',
            child: 'ROU-0098'
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0038',
          pops: {
            adult: 'ROU-0099',
            child: 'ROU-0100'
          }
        },
        {
          id: 'epidural',
          cat: 'Epidural',
          head: 'RTE-0039',
          pops: {
            adult: 'ROU-0101',
            child: 'ROU-0102'
          }
        }
      ],
      dosing: [
        {
          id: 'it',
          label: 'Intrathecal',
          head: ['Use', 'Adult', 'Child'],
          rows: [
            ['DOS-0130', 'DOS-0131', 'DOS-0132'],
            ['DOS-0133', 'DOS-0134', null],
            ['DOS-0135', 'DOS-0136', null],
            ['DOS-0137', 'DOS-0138', 'DOS-0139']
          ],
          notes: ['DOS-0140', 'DOS-0141', 'DOS-0142']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0024', 'INT-0025', 'INT-0026', 'INT-0027'],
    other: ['INT-0028', 'INT-0029', 'INT-0030', 'INT-0031', 'INT-0032']
  },
  safety: {
    contraindications: ['SAF-0046', 'SAF-0047', 'SAF-0048'],
    caution: ['SAF-0049', 'SAF-0050', 'SAF-0051', 'SAF-0052', 'SAF-0053', 'SAF-0054', 'SAF-0055'],
    warnings: ['SAF-0056', 'SAF-0057', 'SAF-0058', 'SAF-0059'],
    monitoring: ['SAF-0060', 'SAF-0061', 'SAF-0062', 'SAF-0063']
  }
});

MEDIAUS.med({
  id: 'pantoprazole',
  identity: {
    name: 'IDN-0029',
    cls: 'IDN-0030',
    chips: 'IDN-0031',
    brands: 'IDN-0032',
    atc: 'IDN-0033',
    schedule: 'IDN-0034',
    pbs: 'IDN-0035'
  },
  pregnancy: 'PRG-0005',
  breastfeeding: {
    main: 'BRF-0005'
  },
  forms: [
    {
      id: 'tab',
      label: 'Enteric-coated tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0011',
      appearance: ['APP-0027', 'APP-0028'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0040',
          pops: {
            adult: 'ROU-0103',
            child: 'ROU-0104'
          },
          items: ['ADM-0051', 'ADM-0052', 'ADM-0053']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0041',
          pops: {
            adult: 'ROU-0105',
            child: 'ROU-0106'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0042',
          pops: {
            adult: 'ROU-0107',
            child: 'ROU-0108'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0143', 'DOS-0144', 'DOS-0145'],
            ['DOS-0146', 'DOS-0147', 'DOS-0148'],
            ['DOS-0149', 'DOS-0150', null],
            ['DOS-0151', 'DOS-0152', null],
            ['DOS-0153', 'DOS-0154', null],
            ['DOS-0155', 'DOS-0156', null],
            ['DOS-0157', 'DOS-0158', null],
            ['DOS-0159', 'DOS-0160', null]
          ],
          notes: ['DOS-0161', 'DOS-0162', 'DOS-0163', 'DOS-0164']
        }
      ]
    },
    {
      id: 'gran',
      label: 'Enteric-coated granules',
      pops: ['adult', 'child'],
      info: 'FRM-0012',
      appearance: ['APP-0029'],
      routes: [
        {
          id: 'mouth',
          cat: 'Oral',
          head: 'RTE-0043',
          pops: {
            adult: 'ROU-0109',
            child: 'ROU-0110'
          },
          items: ['ADM-0054', 'ADM-0055', 'ADM-0056', 'ADM-0057']
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0044',
          pops: {
            adult: 'ROU-0111',
            child: 'ROU-0112'
          },
          items: ['ADM-0058']
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0165', 'DOS-0166', 'DOS-0167']
          ],
          notes: ['DOS-0168']
        }
      ]
    },
    {
      id: 'inj',
      label: 'Powder for injection',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0013',
      appearance: ['APP-0030'],
      routes: [
        {
          id: 'ivinj',
          cat: 'IV',
          head: 'RTE-0045',
          pops: {
            adult: 'ROU-0115',
            child: 'ROU-0113',
            newborn: 'ROU-0114'
          },
          prep: {
            reconstitute: ['PRP-0073'],
            dilute: ['PRP-0074'],
            give: ['PRP-0075', 'PRP-0076', 'PRP-0077']
          }
        },
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0046',
          pops: {
            adult: 'ROU-0116',
            child: 'ROU-0113',
            newborn: 'ROU-0114'
          },
          prep: {
            reconstitute: ['PRP-0073'],
            dilute: ['PRP-0078', 'PRP-0079', 'PRP-0080'],
            give: ['PRP-0081', 'PRP-0082', 'PRP-0083']
          },
          items: ['ADM-0059', 'ADM-0060']
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0047',
          pops: {
            adult: 'ROU-0117',
            child: 'ROU-0118',
            newborn: 'ROU-0119'
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0048',
          pops: {
            adult: 'ROU-0120',
            child: 'ROU-0121',
            newborn: 'ROU-0122'
          }
        }
      ],
      dosing: [
        {
          id: 'iv',
          label: 'IV',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0169', 'DOS-0170', 'DOS-0171', 'DOS-0172'],
            ['DOS-0173', 'DOS-0174', null, null]
          ],
          notes: ['DOS-0175', 'DOS-0176']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0033', 'INT-0034', 'INT-0035', 'INT-0036'],
    other: ['INT-0037', 'INT-0038', 'INT-0039', 'INT-0040']
  },
  safety: {
    contraindications: ['SAF-0064', 'SAF-0065', 'SAF-0066'],
    caution: ['SAF-0067', 'SAF-0068', 'SAF-0069'],
    warnings: ['SAF-0070', 'SAF-0071', 'SAF-0072', 'SAF-0073', 'SAF-0074', 'SAF-0075'],
    monitoring: ['SAF-0076', 'SAF-0077', 'SAF-0078']
  }
});

MEDIAUS.med({
  id: 'tacrolimus',
  identity: {
    name: 'IDN-0036',
    cls: 'IDN-0037',
    chips: 'IDN-0038',
    brands: 'IDN-0039',
    atc: 'IDN-0040',
    schedule: 'IDN-0041',
    pbs: 'IDN-0042'
  },
  pregnancy: 'PRG-0006',
  breastfeeding: {
    main: 'BRF-0006',
    positions: ['POS-0010', 'POS-0011']
  },
  forms: [
    {
      id: 'cap',
      label: 'Capsule (twice daily)',
      pops: ['adult', 'child'],
      info: 'FRM-0014',
      appearance: ['APP-0031', 'APP-0032', 'APP-0033'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0049',
          pops: {
            adult: 'ROU-0123',
            child: 'ROU-0124'
          },
          items: ['ADM-0061', 'ADM-0062', 'ADM-0063', 'ADM-0064']
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0050',
          pops: {
            adult: 'ROU-0125',
            child: 'ROU-0126'
          },
          items: ['ADM-0065', 'ADM-0066']
        },
        {
          id: 'open',
          cat: 'Oral',
          head: 'RTE-0051',
          pops: {
            adult: 'ROU-0127',
            child: 'ROU-0128'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral (Prograf, twice daily)',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0177', 'DOS-0178', null],
            ['DOS-0179', 'DOS-0180', null],
            ['DOS-0181', 'DOS-0182', null],
            ['DOS-0183', 'DOS-0184', null],
            ['DOS-0185', null, 'DOS-0186']
          ],
          notes: ['DOS-0187', 'DOS-0188', 'DOS-0189', 'DOS-0190']
        }
      ]
    },
    {
      id: 'prcap',
      label: 'Prolonged-release capsule (once daily)',
      pops: ['adult', 'child'],
      info: 'FRM-0015',
      appearance: ['APP-0034', 'APP-0035', 'APP-0036', 'APP-0037'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0052',
          pops: {
            adult: 'ROU-0129',
            child: 'ROU-0130'
          },
          items: ['ADM-0067', 'ADM-0061', 'ADM-0062', 'ADM-0063', 'ADM-0064']
        },
        {
          id: 'open',
          cat: 'Oral',
          head: 'RTE-0053',
          pops: {
            adult: 'ROU-0131',
            child: 'ROU-0132'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0054',
          pops: {
            adult: 'ROU-0133',
            child: 'ROU-0134'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral (Advagraf XL, once daily)',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0191', 'DOS-0192', null],
            ['DOS-0193', 'DOS-0194', null],
            ['DOS-0195', 'DOS-0196', null],
            ['DOS-0197', 'DOS-0198', null],
            ['DOS-0199', null, 'DOS-0200']
          ],
          notes: ['DOS-0201', 'DOS-0188', 'DOS-0189']
        }
      ]
    },
    {
      id: 'inj',
      label: 'Concentrated injection',
      pops: ['adult', 'child'],
      info: 'FRM-0016',
      appearance: ['APP-0038'],
      routes: [
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0055',
          pops: {
            adult: 'ROU-0135',
            child: 'ROU-0136'
          },
          prep: {
            reconstitute: ['PRP-0084'],
            dilute: ['PRP-0085', 'PRP-0086'],
            give: ['PRP-0087', 'PRP-0088']
          },
          items: ['ADM-0068', 'ADM-0069', 'ADM-0070']
        },
        {
          id: 'ivinj',
          cat: 'IV',
          head: 'RTE-0056',
          pops: {
            adult: 'ROU-0137',
            child: 'ROU-0138'
          }
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0057',
          pops: {
            adult: 'ROU-0139',
            child: 'ROU-0140'
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0058',
          pops: {
            adult: 'ROU-0141',
            child: 'ROU-0142'
          }
        }
      ],
      dosing: [
        {
          id: 'iv',
          label: 'IV infusion',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0202', 'DOS-0203', null],
            ['DOS-0204', 'DOS-0205', null],
            ['DOS-0206', 'DOS-0207', null],
            ['DOS-0208', 'DOS-0209', null],
            ['DOS-0210', null, 'DOS-0211']
          ],
          notes: ['DOS-0212']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0041', 'INT-0042', 'INT-0043', 'INT-0044', 'INT-0045'],
    other: ['INT-0046', 'INT-0047', 'INT-0048', 'INT-0049', 'INT-0050']
  },
  safety: {
    contraindications: ['SAF-0079', 'SAF-0080'],
    caution: ['SAF-0081', 'SAF-0082', 'SAF-0083'],
    warnings: ['SAF-0084', 'SAF-0085', 'SAF-0086', 'SAF-0087', 'SAF-0088'],
    monitoring: ['SAF-0089', 'SAF-0090', 'SAF-0091', 'SAF-0092']
  }
});

MEDIAUS.med({
  id: 'piperacillin-tazobactam',
  identity: {
    name: 'IDN-0043',
    cls: 'IDN-0044',
    chips: 'IDN-0045',
    brands: 'IDN-0046',
    atc: 'IDN-0047',
    schedule: 'IDN-0048',
    pbs: 'IDN-0049'
  },
  pregnancy: 'PRG-0007',
  breastfeeding: {
    main: 'BRF-0007'
  },
  forms: [
    {
      id: 'inj',
      label: 'Powder for injection',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0017',
      appearance: ['APP-0039', 'APP-0040'],
      routes: [
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0059',
          pops: {
            adult: 'ROU-0143',
            child: 'ROU-0144',
            newborn: 'ROU-0145'
          },
          prep: {
            reconstitute: ['PRP-0089', 'PRP-0090'],
            dilute: ['PRP-0091', 'PRP-0092', 'PRP-0093', 'PRP-0094'],
            give: ['PRP-0095', 'PRP-0096', 'PRP-0097']
          },
          items: ['ADM-0071', 'ADM-0072', 'ADM-0073', 'ADM-0074']
        },
        {
          id: 'extinf',
          cat: 'IV',
          head: 'RTE-0060',
          pops: {
            adult: 'ROU-0146',
            child: 'ROU-0147',
            newborn: 'ROU-0148'
          }
        },
        {
          id: 'ivinj',
          cat: 'IV',
          head: 'RTE-0061',
          pops: {
            adult: 'ROU-0149',
            child: 'ROU-0150',
            newborn: 'ROU-0151'
          }
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0062',
          pops: {
            adult: 'ROU-0152',
            child: 'ROU-0153',
            newborn: 'ROU-0154'
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0063',
          pops: {
            adult: 'ROU-0155',
            child: 'ROU-0156',
            newborn: 'ROU-0157'
          }
        }
      ],
      dosing: [
        {
          id: 'iv',
          label: 'IV',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0213', 'DOS-0214', 'DOS-0215', null],
            ['DOS-0216', 'DOS-0217', null, null],
            ['DOS-0218', null, 'DOS-0219', null],
            ['DOS-0220', null, null, 'DOS-0221'],
            ['DOS-0222', null, null, 'DOS-0223'],
            ['DOS-0224', 'DOS-0225', 'DOS-0226', null],
            ['DOS-0227', 'DOS-0228', null, null],
            ['DOS-0229', 'DOS-0230', null, null]
          ],
          notes: ['DOS-0231', 'DOS-0232', 'DOS-0233', 'DOS-0234']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0051', 'INT-0052', 'INT-0053'],
    other: ['INT-0054', 'INT-0055', 'INT-0056']
  },
  safety: {
    contraindications: ['SAF-0093'],
    caution: ['SAF-0094', 'SAF-0095', 'SAF-0096', 'SAF-0097', 'SAF-0098'],
    warnings: ['SAF-0099', 'SAF-0100', 'SAF-0101', 'SAF-0102', 'SAF-0103'],
    monitoring: ['SAF-0104', 'SAF-0105', 'SAF-0106', 'SAF-0107']
  }
});

MEDIAUS.med({
  id: 'lidocaine',
  identity: {
    name: 'IDN-0050',
    cls: 'IDN-0051',
    chips: 'IDN-0052',
    brands: 'IDN-0053',
    atc: 'IDN-0054',
    schedule: 'IDN-0055',
    pbs: 'IDN-0056'
  },
  pregnancy: 'PRG-0008',
  breastfeeding: {
    main: 'BRF-0008'
  },
  forms: [
    {
      id: 'inj',
      label: 'Injection solution',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0018',
      appearance: ['APP-0041'],
      routes: [
        {
          id: 'infil',
          cat: 'Local',
          head: 'RTE-0064',
          pops: {
            adult: 'ROU-0158',
            child: 'ROU-0159',
            newborn: 'ROU-0160'
          },
          items: ['ADM-0075', 'ADM-0076', 'ADM-0077', 'ADM-0078', 'ADM-0079']
        },
        {
          id: 'block',
          cat: 'Local',
          head: 'RTE-0065',
          pops: {
            adult: 'ROU-0161',
            child: 'ROU-0162',
            newborn: 'ROU-0163'
          }
        },
        {
          id: 'epidural',
          cat: 'Epidural',
          head: 'RTE-0066',
          pops: {
            adult: 'ROU-0164',
            child: 'ROU-0165',
            newborn: 'ROU-0166'
          }
        },
        {
          id: 'spinal',
          cat: 'Intrathecal',
          head: 'RTE-0067',
          pops: {
            adult: 'ROU-0167',
            child: 'ROU-0168',
            newborn: 'ROU-0169'
          }
        },
        {
          id: 'bier',
          cat: 'IV',
          head: 'RTE-0068',
          pops: {
            adult: 'ROU-0170',
            child: 'ROU-0171',
            newborn: 'ROU-0172'
          }
        },
        {
          id: 'ivarr',
          cat: 'IV',
          head: 'RTE-0069',
          pops: {
            adult: 'ROU-0173',
            child: 'ROU-0174',
            newborn: 'ROU-0175'
          },
          brands: ['BRD-0007', 'BRD-0008'],
          prep: {
            reconstitute: ['PRP-0098'],
            dilute: ['PRP-0099', 'PRP-0100', 'PRP-0101'],
            give: ['PRP-0102', 'PRP-0103', 'PRP-0104']
          },
          positions: ['POS-0012', 'POS-0013'],
          items: ['ADM-0080', 'ADM-0081', 'ADM-0082', 'ADM-0083']
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0070',
          pops: {
            adult: 'ROU-0176',
            child: 'ROU-0177',
            newborn: 'ROU-0178'
          }
        },
        {
          id: 'imdiluent',
          cat: 'IM',
          head: 'RTE-0071',
          pops: {
            adult: 'ROU-0179',
            child: 'ROU-0180',
            newborn: 'ROU-0181'
          }
        }
      ],
      dosing: [
        {
          id: 'local',
          label: 'Local anaesthesia',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0235', 'DOS-0236', 'DOS-0237', 'DOS-0238'],
            ['DOS-0239', 'DOS-0240', null, null],
            ['DOS-0241', 'DOS-0242', null, null],
            ['DOS-0243', 'DOS-0244', null, null],
            ['DOS-0245', 'DOS-0246', null, null],
            ['DOS-0247', 'DOS-0248', null, null]
          ],
          notes: ['DOS-0249', 'DOS-0250', 'DOS-0251', 'DOS-0252']
        },
        {
          id: 'iv',
          label: 'IV (arrhythmias)',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0253', 'DOS-0254', 'DOS-0255'],
            ['DOS-0256', 'DOS-0257', null],
            ['DOS-0258', 'DOS-0259', null]
          ],
          notes: ['DOS-0260', 'DOS-0261', 'DOS-0262']
        }
      ]
    },
    {
      id: 'visc',
      label: 'Viscous oral solution',
      pops: ['adult', 'child'],
      info: 'FRM-0019',
      appearance: ['APP-0042'],
      routes: [
        {
          id: 'mouth',
          cat: 'Oral',
          head: 'RTE-0072',
          pops: {
            adult: 'ROU-0182',
            child: 'ROU-0183'
          },
          items: ['ADM-0084', 'ADM-0085', 'ADM-0086', 'ADM-0087']
        },
        {
          id: 'gargle',
          cat: 'Oral',
          head: 'RTE-0073',
          pops: {
            adult: 'ROU-0184',
            child: 'ROU-0185'
          },
          items: ['ADM-0084', 'ADM-0085', 'ADM-0086', 'ADM-0087']
        },
        {
          id: 'swab',
          cat: 'Oral',
          head: 'RTE-0074',
          pops: {
            adult: 'ROU-0186',
            child: 'ROU-0187'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Mouth and throat',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0263', 'DOS-0264', 'DOS-0265'],
            ['DOS-0266', 'DOS-0267', 'DOS-0268']
          ],
          notes: ['DOS-0269', 'DOS-0270']
        }
      ]
    },
    {
      id: 'jelly',
      label: 'Gel (jelly)',
      pops: ['adult', 'child'],
      info: 'FRM-0020',
      appearance: ['APP-0043'],
      routes: [
        {
          id: 'urethral',
          cat: 'Topical',
          head: 'RTE-0075',
          pops: {
            adult: 'ROU-0188',
            child: 'ROU-0189'
          }
        },
        {
          id: 'endo',
          cat: 'Topical',
          head: 'RTE-0076',
          pops: {
            adult: 'ROU-0190',
            child: 'ROU-0191'
          },
          items: ['ADM-0088']
        },
        {
          id: 'ett',
          cat: 'Topical',
          head: 'RTE-0077',
          pops: {
            adult: 'ROU-0192',
            child: 'ROU-0193'
          },
          items: ['ADM-0089']
        }
      ],
      dosing: [
        {
          id: 'topical',
          label: 'Topical',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0271', 'DOS-0272', 'DOS-0273'],
            ['DOS-0274', 'DOS-0275', null],
            ['DOS-0276', 'DOS-0277', null],
            ['DOS-0278', 'DOS-0279', null]
          ],
          notes: ['DOS-0280']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0057', 'INT-0058', 'INT-0059', 'INT-0060'],
    other: ['INT-0061', 'INT-0062', 'INT-0063', 'INT-0064']
  },
  safety: {
    contraindications: ['SAF-0108', 'SAF-0109', 'SAF-0110', 'SAF-0111', 'SAF-0112'],
    caution: ['SAF-0113', 'SAF-0114', 'SAF-0115', 'SAF-0116', 'SAF-0117', 'SAF-0118'],
    warnings: ['SAF-0119', 'SAF-0120', 'SAF-0121', 'SAF-0122', 'SAF-0123', 'SAF-0124'],
    monitoring: ['SAF-0125', 'SAF-0126', 'SAF-0127', 'SAF-0128']
  }
});

MEDIAUS.med({
  id: 'empagliflozin',
  identity: {
    name: 'IDN-0057',
    cls: 'IDN-0058',
    chips: 'IDN-0059',
    brands: 'IDN-0060',
    atc: 'IDN-0061',
    schedule: 'IDN-0062',
    pbs: 'IDN-0063'
  },
  pregnancy: 'PRG-0009',
  breastfeeding: {
    main: 'BRF-0009'
  },
  forms: [
    {
      id: 'tab',
      label: 'Tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0021',
      appearance: ['APP-0044', 'APP-0045'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0078',
          pops: {
            adult: 'ROU-0194',
            child: 'ROU-0195'
          },
          items: ['ADM-0090', 'ADM-0091', 'ADM-0092']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0079',
          pops: {
            adult: 'ROU-0196',
            child: 'ROU-0197'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0080',
          pops: {
            adult: 'ROU-0198',
            child: 'ROU-0199'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (10 years and over)'],
          rows: [
            ['DOS-0281', 'DOS-0282', 'DOS-0283'],
            ['DOS-0284', 'DOS-0285', 'DOS-0286'],
            ['DOS-0287', 'DOS-0288', 'DOS-0289']
          ],
          notes: ['DOS-0290', 'DOS-0291', 'DOS-0292', 'DOS-0293', 'DOS-0294']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0065', 'INT-0066', 'INT-0067'],
    other: []
  },
  safety: {
    contraindications: ['SAF-0129', 'SAF-0130'],
    caution: ['SAF-0131', 'SAF-0132', 'SAF-0133'],
    warnings: ['SAF-0134', 'SAF-0135', 'SAF-0136', 'SAF-0137', 'SAF-0138'],
    monitoring: ['SAF-0139', 'SAF-0140', 'SAF-0141', 'SAF-0142']
  }
});

MEDIAUS.med({
  id: 'ketamine',
  identity: {
    name: 'IDN-0064',
    cls: 'IDN-0065',
    chips: 'IDN-0066',
    brands: 'IDN-0067',
    atc: 'IDN-0068',
    schedule: 'IDN-0069',
    pbs: 'IDN-0070'
  },
  pregnancy: 'PRG-0010',
  breastfeeding: {
    main: 'BRF-0010',
    positions: ['POS-0014', 'POS-0015']
  },
  forms: [
    {
      id: 'inj',
      label: 'Injection solution',
      pops: ['adult', 'child'],
      info: 'FRM-0022',
      appearance: ['APP-0046', 'APP-0047'],
      routes: [
        {
          id: 'ivinj',
          cat: 'IV',
          head: 'RTE-0081',
          pops: {
            adult: 'ROU-0200',
            child: 'ROU-0201'
          },
          brands: ['BRD-0009', 'BRD-0010', 'BRD-0011', 'BRD-0012'],
          prep: {
            reconstitute: ['PRP-0105'],
            dilute: ['PRP-0106', 'PRP-0107'],
            give: ['PRP-0108', 'PRP-0109']
          },
          items: ['ADM-0093', 'ADM-0094', 'ADM-0095', 'ADM-0096']
        },
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0082',
          pops: {
            adult: 'ROU-0202',
            child: 'ROU-0203'
          },
          brands: ['BRD-0013', 'BRD-0014'],
          prep: {
            reconstitute: ['PRP-0105'],
            dilute: ['PRP-0110', 'PRP-0111'],
            give: ['PRP-0112', 'PRP-0113']
          }
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0083',
          pops: {
            adult: 'ROU-0204',
            child: 'ROU-0205'
          },
          brands: ['BRD-0015', 'BRD-0016', 'BRD-0017'],
          prep: {
            reconstitute: ['PRP-0105'],
            dilute: ['PRP-0114'],
            give: ['PRP-0115']
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0084',
          pops: {
            adult: 'ROU-0206',
            child: 'ROU-0207'
          }
        },
        {
          id: 'nasal',
          cat: 'Intranasal',
          head: 'RTE-0085',
          pops: {
            adult: 'ROU-0208',
            child: 'ROU-0209'
          }
        },
        {
          id: 'oral',
          cat: 'Oral',
          head: 'RTE-0086',
          pops: {
            adult: 'ROU-0210',
            child: 'ROU-0211'
          }
        }
      ],
      dosing: [
        {
          id: 'anaes',
          label: 'Anaesthesia',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0295', 'DOS-0296', 'DOS-0297'],
            ['DOS-0298', 'DOS-0299', 'DOS-0300'],
            ['DOS-0301', 'DOS-0302', null]
          ],
          notes: ['DOS-0303', 'DOS-0304', 'DOS-0305', 'DOS-0306']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0068', 'INT-0069', 'INT-0070'],
    other: ['INT-0071', 'INT-0072', 'INT-0073']
  },
  safety: {
    contraindications: ['SAF-0143', 'SAF-0144'],
    caution: ['SAF-0145', 'SAF-0146', 'SAF-0147', 'SAF-0148', 'SAF-0149', 'SAF-0150'],
    warnings: ['SAF-0151', 'SAF-0152', 'SAF-0153', 'SAF-0154'],
    monitoring: ['SAF-0155', 'SAF-0156']
  }
});

MEDIAUS.med({
  id: 'ipratropium',
  identity: {
    name: 'IDN-0071',
    cls: 'IDN-0072',
    chips: 'IDN-0073',
    brands: 'IDN-0074',
    atc: 'IDN-0075',
    schedule: 'IDN-0076',
    pbs: 'IDN-0077'
  },
  pregnancy: 'PRG-0011',
  breastfeeding: {
    main: 'BRF-0011'
  },
  forms: [
    {
      id: 'mdi',
      label: 'Pressurised inhaler',
      pops: ['adult', 'child'],
      info: 'FRM-0023',
      appearance: ['APP-0048'],
      routes: [
        {
          id: 'inhaled',
          cat: 'Inhaled',
          head: 'RTE-0087',
          pops: {
            adult: 'ROU-0212',
            child: 'ROU-0213'
          },
          items: ['ADM-0098', 'ADM-0097', 'ADM-0099']
        }
      ],
      dosing: [
        {
          id: 'inh',
          label: 'Inhaled',
          head: ['Use', 'Adult', 'Child (by age)'],
          rows: [
            ['DOS-0307', 'DOS-0308', 'DOS-0309'],
            ['DOS-0310', 'DOS-0311', 'DOS-0312']
          ],
          notes: ['DOS-0313', 'DOS-0314']
        }
      ]
    },
    {
      id: 'neb',
      label: 'Nebuliser solution',
      pops: ['adult', 'child'],
      info: 'FRM-0024',
      appearance: ['APP-0049', 'APP-0050'],
      routes: [
        {
          id: 'neb',
          cat: 'Inhaled',
          head: 'RTE-0088',
          pops: {
            adult: 'ROU-0214',
            child: 'ROU-0215'
          },
          items: ['ADM-0100', 'ADM-0101', 'ADM-0102', 'ADM-0097']
        }
      ],
      dosing: [
        {
          id: 'neb',
          label: 'Nebulised',
          head: ['Use', 'Adult', 'Child (by age)'],
          rows: [
            ['DOS-0315', 'DOS-0316', 'DOS-0317'],
            ['DOS-0318', 'DOS-0319', 'DOS-0320'],
            ['DOS-0321', 'DOS-0322', 'DOS-0323']
          ],
          notes: ['DOS-0324', 'DOS-0325']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0074'],
    other: ['INT-0075', 'INT-0076']
  },
  safety: {
    contraindications: ['SAF-0157'],
    caution: ['SAF-0158', 'SAF-0159'],
    warnings: ['SAF-0160', 'SAF-0161', 'SAF-0162', 'SAF-0163'],
    monitoring: ['SAF-0164', 'SAF-0165']
  }
});

MEDIAUS.med({
  id: 'metformin',
  identity: {
    name: 'IDN-0078',
    cls: 'IDN-0079',
    chips: 'IDN-0080',
    brands: 'IDN-0081',
    atc: 'IDN-0082',
    schedule: 'IDN-0083',
    pbs: 'IDN-0084'
  },
  pregnancy: 'PRG-0012',
  breastfeeding: {
    main: 'BRF-0012',
    positions: ['POS-0016', 'POS-0017']
  },
  forms: [
    {
      id: 'tab',
      label: 'Tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0025',
      appearance: ['APP-0051', 'APP-0052', 'APP-0053', 'APP-0054'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0089',
          pops: {
            adult: 'ROU-0216',
            child: 'ROU-0217'
          },
          positions: ['POS-0018', 'POS-0019'],
          items: ['ADM-0104', 'ADM-0105', 'ADM-0106', 'ADM-0103']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0090',
          pops: {
            adult: 'ROU-0218',
            child: 'ROU-0219'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0091',
          pops: {
            adult: 'ROU-0220',
            child: 'ROU-0221'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (10 years and over)'],
          rows: [
            ['DOS-0326', 'DOS-0327', 'DOS-0328'],
            ['DOS-0329', 'DOS-0330', 'DOS-0331'],
            ['DOS-0332', 'DOS-0333', 'DOS-0334']
          ],
          notes: ['DOS-0335', 'DOS-0336', 'DOS-0337']
        }
      ]
    },
    {
      id: 'xr',
      label: 'Extended-release tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0026',
      appearance: ['APP-0055', 'APP-0056'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0092',
          pops: {
            adult: 'ROU-0222',
            child: 'ROU-0223'
          },
          items: ['ADM-0107', 'ADM-0108', 'ADM-0109', 'ADM-0103']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0093',
          pops: {
            adult: 'ROU-0224',
            child: 'ROU-0225'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0094',
          pops: {
            adult: 'ROU-0226',
            child: 'ROU-0227'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral (extended release)',
          head: ['Use', 'Adult', 'Child'],
          rows: [
            ['DOS-0338', 'DOS-0339', 'DOS-0340'],
            ['DOS-0341', 'DOS-0342', null],
            ['DOS-0343', 'DOS-0344', null],
            ['DOS-0345', 'DOS-0346', null]
          ],
          notes: ['DOS-0347']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0077', 'INT-0078', 'INT-0079', 'INT-0080'],
    other: ['INT-0081', 'INT-0082', 'INT-0083', 'INT-0084', 'INT-0085']
  },
  safety: {
    contraindications: ['SAF-0166', 'SAF-0167', 'SAF-0168', 'SAF-0169', 'SAF-0170', 'SAF-0171'],
    caution: ['SAF-0172', 'SAF-0173', 'SAF-0174', 'SAF-0175'],
    warnings: ['SAF-0176', 'SAF-0177'],
    monitoring: ['SAF-0178', 'SAF-0179', 'SAF-0180']
  }
});

MEDIAUS.med({
  id: 'paracetamol',
  identity: {
    name: 'IDN-0085',
    cls: 'IDN-0086',
    chips: 'IDN-0087',
    brands: 'IDN-0088',
    atc: 'IDN-0089',
    schedule: 'IDN-0090',
    pbs: 'IDN-0091'
  },
  pregnancy: 'PRG-0013',
  breastfeeding: {
    main: 'BRF-0013'
  },
  forms: [
    {
      id: 'tab',
      label: 'Tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0027',
      appearance: ['APP-0057', 'APP-0058'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0095',
          pops: {
            adult: 'ROU-0228',
            child: 'ROU-0229'
          },
          items: ['ADM-0110', 'ADM-0111', 'ADM-0112']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0096',
          pops: {
            adult: 'ROU-0230',
            child: 'ROU-0231'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0097',
          pops: {
            adult: 'ROU-0232',
            child: 'ROU-0233'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by age)'],
          rows: [
            ['DOS-0348', 'DOS-0349', 'DOS-0350'],
            ['DOS-0351', 'DOS-0352', 'DOS-0353']
          ],
          notes: ['DOS-0354', 'DOS-0355']
        }
      ]
    },
    {
      id: 'mr',
      label: 'Modified-release tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0028',
      appearance: ['APP-0059'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0098',
          pops: {
            adult: 'ROU-0234',
            child: 'ROU-0235'
          },
          items: ['ADM-0113', 'ADM-0114', 'ADM-0110']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0099',
          pops: {
            adult: 'ROU-0236',
            child: 'ROU-0237'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0100',
          pops: {
            adult: 'ROU-0238',
            child: 'ROU-0239'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral (modified release)',
          head: ['Use', 'Adult', 'Child (by age)'],
          rows: [
            ['DOS-0356', 'DOS-0357', 'DOS-0358']
          ],
          notes: ['DOS-0359']
        }
      ]
    },
    {
      id: 'liquid',
      label: 'Oral liquid',
      pops: ['child', 'newborn'],
      info: 'FRM-0029',
      appearance: [],
      routes: [
        {
          id: 'mouth',
          cat: 'Oral',
          head: 'RTE-0101',
          pops: {
            child: 'ROU-0240',
            newborn: 'ROU-0241'
          },
          items: ['ADM-0115', 'ADM-0116']
        },
        {
          id: 'rectal',
          cat: 'Rectal',
          head: 'RTE-0102',
          pops: {
            child: 'ROU-0242',
            newborn: 'ROU-0243'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0103',
          pops: {
            child: 'ROU-0244',
            newborn: 'ROU-0245'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0360', 'DOS-0361', 'DOS-0362'],
            ['DOS-0363', null, 'DOS-0364']
          ],
          notes: ['DOS-0365', 'DOS-0366']
        }
      ]
    },
    {
      id: 'inj',
      label: 'Solution for infusion',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0030',
      appearance: ['APP-0060'],
      routes: [
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0104',
          pops: {
            adult: 'ROU-0246',
            child: 'ROU-0247',
            newborn: 'ROU-0248'
          },
          prep: {
            reconstitute: ['PRP-0116'],
            dilute: ['PRP-0117', 'PRP-0118', 'PRP-0119'],
            give: ['PRP-0120', 'PRP-0121', 'PRP-0122']
          },
          positions: ['POS-0020', 'POS-0021'],
          items: ['ADM-0117', 'ADM-0118', 'ADM-0119']
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0105',
          pops: {
            adult: 'ROU-0249',
            child: 'ROU-0250',
            newborn: 'ROU-0251'
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0106',
          pops: {
            adult: 'ROU-0252',
            child: 'ROU-0253',
            newborn: 'ROU-0254'
          }
        }
      ],
      dosing: [
        {
          id: 'iv',
          label: 'IV',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0367', 'DOS-0368', null, null],
            ['DOS-0369', 'DOS-0370', 'DOS-0371', null],
            ['DOS-0372', null, 'DOS-0373', null],
            ['DOS-0374', null, 'DOS-0375', 'DOS-0376']
          ],
          notes: ['DOS-0377', 'DOS-0378']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0086', 'INT-0087', 'INT-0088'],
    other: ['INT-0089', 'INT-0090', 'INT-0091', 'INT-0092']
  },
  safety: {
    contraindications: ['SAF-0181', 'SAF-0182'],
    caution: ['SAF-0183', 'SAF-0184', 'SAF-0185'],
    warnings: ['SAF-0186', 'SAF-0187', 'SAF-0188'],
    monitoring: ['SAF-0189', 'SAF-0190']
  }
});

MEDIAUS.med({
  id: 'glyceryl-trinitrate',
  identity: {
    name: 'IDN-0092',
    cls: 'IDN-0093',
    chips: 'IDN-0094',
    brands: 'IDN-0095',
    atc: 'IDN-0096',
    schedule: 'IDN-0097',
    pbs: 'IDN-0098'
  },
  pregnancy: 'PRG-0014',
  breastfeeding: {
    main: 'BRF-0014'
  },
  forms: [
    {
      id: 'sltab',
      label: 'Sublingual tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0031',
      appearance: ['APP-0061', 'APP-0062'],
      routes: [
        {
          id: 'sl',
          cat: 'Sublingual',
          head: 'RTE-0107',
          pops: {
            adult: 'ROU-0255',
            child: 'ROU-0256'
          },
          items: ['ADM-0120', 'ADM-0121', 'ADM-0122', 'ADM-0123', 'ADM-0124']
        },
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0108',
          pops: {
            adult: 'ROU-0257',
            child: 'ROU-0258'
          }
        }
      ],
      dosing: [
        {
          id: 'sl',
          label: 'Sublingual',
          head: ['Use', 'Adult'],
          rows: [
            ['DOS-0379', 'DOS-0380'],
            ['DOS-0381', 'DOS-0382']
          ],
          notes: []
        }
      ]
    },
    {
      id: 'spray',
      label: 'Sublingual spray',
      pops: ['adult', 'child'],
      info: 'FRM-0032',
      appearance: ['APP-0063'],
      routes: [
        {
          id: 'spray',
          cat: 'Sublingual',
          head: 'RTE-0109',
          pops: {
            adult: 'ROU-0259',
            child: 'ROU-0260'
          },
          items: ['ADM-0125', 'ADM-0126', 'ADM-0127']
        }
      ],
      dosing: [
        {
          id: 'sl',
          label: 'Sublingual',
          head: ['Use', 'Adult'],
          rows: [
            ['DOS-0383', 'DOS-0384'],
            ['DOS-0385', 'DOS-0386']
          ],
          notes: ['DOS-0387']
        }
      ]
    },
    {
      id: 'patch',
      label: 'Transdermal patch',
      pops: ['adult', 'child'],
      info: 'FRM-0033',
      appearance: ['APP-0064', 'APP-0065'],
      routes: [
        {
          id: 'patch',
          cat: 'Topical',
          head: 'RTE-0110',
          pops: {
            adult: 'ROU-0261',
            child: 'ROU-0262'
          },
          items: ['ADM-0128', 'ADM-0129', 'ADM-0130', 'ADM-0131', 'ADM-0132']
        }
      ],
      dosing: [
        {
          id: 'patch',
          label: 'Transdermal',
          head: ['Use', 'Adult'],
          rows: [
            ['DOS-0388', 'DOS-0389'],
            ['DOS-0390', 'DOS-0391'],
            ['DOS-0392', 'DOS-0393']
          ],
          notes: []
        }
      ]
    },
    {
      id: 'inj',
      label: 'Concentrated injection',
      pops: ['adult', 'child'],
      info: 'FRM-0034',
      appearance: ['APP-0066'],
      routes: [
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0111',
          pops: {
            adult: 'ROU-0263',
            child: 'ROU-0264'
          },
          prep: {
            reconstitute: ['PRP-0123'],
            dilute: ['PRP-0124', 'PRP-0125'],
            give: ['PRP-0126', 'PRP-0127']
          },
          positions: ['POS-0022', 'POS-0023'],
          items: ['ADM-0133', 'ADM-0134', 'ADM-0135', 'ADM-0136']
        },
        {
          id: 'ivinj',
          cat: 'IV',
          head: 'RTE-0112',
          pops: {
            adult: 'ROU-0265',
            child: 'ROU-0266'
          }
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0113',
          pops: {
            adult: 'ROU-0267',
            child: 'ROU-0268'
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0114',
          pops: {
            adult: 'ROU-0269',
            child: 'ROU-0270'
          }
        }
      ],
      dosing: [
        {
          id: 'iv',
          label: 'IV infusion',
          head: ['Use', 'Adult', 'Child'],
          rows: [
            ['DOS-0394', 'DOS-0395', 'DOS-0396'],
            ['DOS-0397', 'DOS-0398', null]
          ],
          notes: ['DOS-0399', 'DOS-0400']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0093', 'INT-0094', 'INT-0095', 'INT-0096'],
    other: ['INT-0097', 'INT-0098']
  },
  safety: {
    contraindications: ['SAF-0191', 'SAF-0192', 'SAF-0193', 'SAF-0194', 'SAF-0195', 'SAF-0196'],
    caution: ['SAF-0197', 'SAF-0198', 'SAF-0199'],
    warnings: ['SAF-0200', 'SAF-0201', 'SAF-0202', 'SAF-0203', 'SAF-0204'],
    monitoring: ['SAF-0205', 'SAF-0206']
  }
});

MEDIAUS.med({
  id: 'salbutamol',
  identity: {
    name: 'IDN-0099',
    cls: 'IDN-0100',
    chips: 'IDN-0101',
    brands: 'IDN-0102',
    atc: 'IDN-0103',
    schedule: 'IDN-0104',
    pbs: 'IDN-0105'
  },
  pregnancy: 'PRG-0015',
  breastfeeding: {
    main: 'BRF-0015'
  },
  forms: [
    {
      id: 'mdi',
      label: 'Pressurised inhaler',
      pops: ['adult', 'child'],
      info: 'FRM-0035',
      appearance: ['APP-0067'],
      routes: [
        {
          id: 'inhaled',
          cat: 'Inhaled',
          head: 'RTE-0115',
          pops: {
            adult: 'ROU-0271',
            child: 'ROU-0272'
          },
          items: ['ADM-0137', 'ADM-0138', 'ADM-0139']
        }
      ],
      dosing: [
        {
          id: 'inh',
          label: 'Inhaled',
          head: ['Use', 'Adult', 'Child (6–11 years)'],
          rows: [
            ['DOS-0401', 'DOS-0402', 'DOS-0403'],
            ['DOS-0404', 'DOS-0405', 'DOS-0406'],
            ['DOS-0407', 'DOS-0408', 'DOS-0409']
          ],
          notes: ['DOS-0410', 'DOS-0411']
        }
      ]
    },
    {
      id: 'neb',
      label: 'Nebules',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0036',
      appearance: ['APP-0068'],
      routes: [
        {
          id: 'neb',
          cat: 'Inhaled',
          head: 'RTE-0116',
          pops: {
            adult: 'ROU-0273',
            child: 'ROU-0274',
            newborn: 'ROU-0275'
          },
          items: ['ADM-0140', 'ADM-0141', 'ADM-0142']
        }
      ],
      dosing: [
        {
          id: 'neb',
          label: 'Nebulised',
          head: ['Use', 'Adult', 'Child (by age)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0412', 'DOS-0413', 'DOS-0414', 'DOS-0415'],
            ['DOS-0416', 'DOS-0417', 'DOS-0418', null],
            ['DOS-0419', 'DOS-0420', 'DOS-0421', null],
            ['DOS-0422', null, null, 'DOS-0423']
          ],
          notes: []
        }
      ]
    },
    {
      id: 'liquid',
      label: 'Oral liquid',
      pops: ['adult', 'child'],
      info: 'FRM-0037',
      appearance: ['APP-0069'],
      routes: [
        {
          id: 'mouth',
          cat: 'Oral',
          head: 'RTE-0117',
          pops: {
            adult: 'ROU-0276',
            child: 'ROU-0277'
          },
          items: ['ADM-0143']
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (by weight)'],
          rows: [
            ['DOS-0424', 'DOS-0425', 'DOS-0426']
          ],
          notes: ['DOS-0427']
        }
      ]
    },
    {
      id: 'inj',
      label: 'Injection',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0038',
      appearance: ['APP-0070'],
      routes: [
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0118',
          pops: {
            adult: 'ROU-0278',
            child: 'ROU-0279',
            newborn: 'ROU-0280'
          },
          prep: {
            reconstitute: ['PRP-0128'],
            dilute: ['PRP-0130'],
            give: ['PRP-0131']
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0119',
          pops: {
            adult: 'ROU-0281',
            child: 'ROU-0282',
            newborn: 'ROU-0283'
          },
          prep: {
            reconstitute: ['PRP-0128'],
            dilute: ['PRP-0132'],
            give: ['PRP-0133', 'PRP-0134']
          }
        },
        {
          id: 'ivinj',
          cat: 'IV',
          head: 'RTE-0120',
          pops: {
            adult: 'ROU-0284',
            child: 'ROU-0285',
            newborn: 'ROU-0286'
          },
          prep: {
            reconstitute: ['PRP-0128'],
            dilute: ['PRP-0129', 'PRP-0135', 'PRP-0136'],
            give: ['PRP-0137', 'PRP-0138', 'PRP-0139', 'PRP-0140']
          }
        },
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0121',
          pops: {
            adult: 'ROU-0287',
            child: 'ROU-0288',
            newborn: 'ROU-0289'
          },
          prep: {
            reconstitute: ['PRP-0128'],
            dilute: ['PRP-0129', 'PRP-0141'],
            give: ['PRP-0142', 'PRP-0143']
          },
          items: ['ADM-0144', 'ADM-0145', 'ADM-0146']
        }
      ],
      dosing: [
        {
          id: 'inj',
          label: 'Injection',
          head: ['Use', 'Adult', 'Child (2–12 years)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0428', 'DOS-0429', 'DOS-0430', null],
            ['DOS-0431', 'DOS-0432', 'DOS-0433', 'DOS-0434'],
            ['DOS-0435', 'DOS-0436', 'DOS-0437', null]
          ],
          notes: []
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0099', 'INT-0100'],
    other: ['INT-0101', 'INT-0102']
  },
  safety: {
    contraindications: ['SAF-0207', 'SAF-0208', 'SAF-0209'],
    caution: ['SAF-0210', 'SAF-0211'],
    warnings: ['SAF-0212', 'SAF-0213', 'SAF-0214'],
    monitoring: ['SAF-0215', 'SAF-0216', 'SAF-0217']
  }
});

MEDIAUS.med({
  id: 'atorvastatin',
  identity: {
    name: 'IDN-0106',
    cls: 'IDN-0107',
    chips: 'IDN-0108',
    brands: 'IDN-0109',
    atc: 'IDN-0110',
    schedule: 'IDN-0111',
    pbs: 'IDN-0112'
  },
  pregnancy: 'PRG-0016',
  breastfeeding: {
    main: 'BRF-0016'
  },
  forms: [
    {
      id: 'tab',
      label: 'Tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0039',
      appearance: ['APP-0071', 'APP-0072', 'APP-0073', 'APP-0074'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0122',
          pops: {
            adult: 'ROU-0290',
            child: 'ROU-0291'
          },
          items: ['ADM-0147', 'ADM-0148']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0123',
          pops: {
            adult: 'ROU-0292',
            child: 'ROU-0293'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0124',
          pops: {
            adult: 'ROU-0294',
            child: 'ROU-0295'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child'],
          rows: [
            ['DOS-0438', 'DOS-0439', 'DOS-0440'],
            ['DOS-0441', 'DOS-0442', null],
            ['DOS-0443', 'DOS-0444', null],
            ['DOS-0445', 'DOS-0446', null]
          ],
          notes: ['DOS-0447', 'DOS-0448', 'DOS-0449']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0103', 'INT-0104', 'INT-0105', 'INT-0106'],
    other: ['INT-0107', 'INT-0108', 'INT-0109', 'INT-0110', 'INT-0111']
  },
  safety: {
    contraindications: ['SAF-0218', 'SAF-0219', 'SAF-0220', 'SAF-0221'],
    caution: ['SAF-0222'],
    warnings: ['SAF-0223', 'SAF-0224'],
    monitoring: ['SAF-0225', 'SAF-0226', 'SAF-0227']
  }
});

MEDIAUS.med({
  id: 'ibuprofen',
  identity: {
    name: 'IDN-0113',
    cls: 'IDN-0114',
    chips: 'IDN-0115',
    brands: 'IDN-0116',
    atc: 'IDN-0117',
    schedule: 'IDN-0118',
    pbs: 'IDN-0119'
  },
  pregnancy: 'PRG-0017',
  breastfeeding: {
    main: 'BRF-0017',
    positions: ['POS-0024', 'POS-0025']
  },
  forms: [
    {
      id: 'tab',
      label: 'Tablet',
      pops: ['adult', 'child'],
      info: 'FRM-0040',
      appearance: ['APP-0075'],
      routes: [
        {
          id: 'swallow',
          cat: 'Oral',
          head: 'RTE-0125',
          pops: {
            adult: 'ROU-0296',
            child: 'ROU-0297'
          },
          items: ['ADM-0149', 'ADM-0150', 'ADM-0151']
        },
        {
          id: 'crush',
          cat: 'Oral',
          head: 'RTE-0126',
          pops: {
            adult: 'ROU-0298',
            child: 'ROU-0299'
          }
        },
        {
          id: 'tube',
          cat: 'Enteral tube',
          head: 'RTE-0127',
          pops: {
            adult: 'ROU-0300',
            child: 'ROU-0301'
          }
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Adult', 'Child (12 years and over)'],
          rows: [
            ['DOS-0450', 'DOS-0451', 'DOS-0452'],
            ['DOS-0453', 'DOS-0454', null],
            ['DOS-0455', 'DOS-0456', null]
          ],
          notes: ['DOS-0457', 'DOS-0458']
        }
      ]
    },
    {
      id: 'liquid',
      label: 'Oral liquid',
      pops: ['child', 'newborn'],
      info: 'FRM-0041',
      appearance: [],
      routes: [
        {
          id: 'mouth',
          cat: 'Oral',
          head: 'RTE-0128',
          pops: {
            child: 'ROU-0302',
            newborn: 'ROU-0303'
          },
          items: ['ADM-0152', 'ADM-0153']
        }
      ],
      dosing: [
        {
          id: 'oral',
          label: 'Oral',
          head: ['Use', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0459', 'DOS-0460', null],
            ['DOS-0461', null, 'DOS-0462']
          ],
          notes: []
        }
      ]
    },
    {
      id: 'inj',
      label: 'Injection',
      pops: ['adult', 'child', 'newborn'],
      info: 'FRM-0042',
      appearance: ['APP-0076', 'APP-0077'],
      routes: [
        {
          id: 'ivinf',
          cat: 'IV',
          head: 'RTE-0129',
          pops: {
            adult: 'ROU-0304',
            child: 'ROU-0305',
            newborn: 'ROU-0306'
          },
          brands: ['BRD-0018', 'BRD-0019'],
          prep: {
            reconstitute: ['PRP-0144'],
            dilute: ['PRP-0145', 'PRP-0146', 'PRP-0147', 'PRP-0148'],
            give: ['PRP-0149', 'PRP-0150', 'PRP-0151']
          },
          items: ['ADM-0154', 'ADM-0155', 'ADM-0156']
        },
        {
          id: 'im',
          cat: 'IM',
          head: 'RTE-0130',
          pops: {
            adult: 'ROU-0307',
            child: 'ROU-0308',
            newborn: 'ROU-0309'
          }
        },
        {
          id: 'sc',
          cat: 'SC',
          head: 'RTE-0131',
          pops: {
            adult: 'ROU-0310',
            child: 'ROU-0311',
            newborn: 'ROU-0312'
          }
        }
      ],
      dosing: [
        {
          id: 'iv',
          label: 'IV',
          head: ['Use', 'Adult', 'Child (by weight)', 'Newborn (by weight)'],
          rows: [
            ['DOS-0463', 'DOS-0464', 'DOS-0465', null],
            ['DOS-0466', 'DOS-0467', null, null],
            ['DOS-0468', 'DOS-0469', null, null],
            ['DOS-0470', null, null, 'DOS-0471'],
            ['DOS-0472', null, null, 'DOS-0473']
          ],
          notes: ['DOS-0474']
        }
      ]
    }
  ],
  interactions: {
    important: ['INT-0112', 'INT-0113', 'INT-0114', 'INT-0115'],
    other: ['INT-0116', 'INT-0117', 'INT-0118', 'INT-0119']
  },
  safety: {
    contraindications: ['SAF-0228', 'SAF-0229', 'SAF-0230', 'SAF-0231', 'SAF-0232', 'SAF-0233', 'SAF-0234'],
    caution: ['SAF-0235', 'SAF-0236', 'SAF-0237'],
    warnings: ['SAF-0238', 'SAF-0239', 'SAF-0240', 'SAF-0241'],
    monitoring: ['SAF-0242', 'SAF-0243', 'SAF-0244']
  }
});

// Lists outside a medicine. All demo data.
MEDIAUS.set('OTHERS', []); // all six built out 27 Oct 2026 (OTH-0001 to 0006 retired)
MEDIAUS.set('EXTRA_PILLS', []); // replaced by sourced appearances (APP-0018 to 0021 retired)
MEDIAUS.set('BARCODES', ['BAR-0001', 'BAR-0002', 'BAR-0003', 'BAR-0004', 'BAR-0005', 'BAR-0006', 'BAR-0007', 'BAR-0008']);
MEDIAUS.set('CHECK_MEDS', ['CKM-0001', 'CKM-0002', 'CKM-0003', 'CKM-0004', 'CKM-0005', 'CKM-0006', 'CKM-0007', 'CKM-0008', 'CKM-0009', 'CKM-0010']);
MEDIAUS.set('CHECK_PAIRS', ['CHK-0001', 'CHK-0002', 'CHK-0003', 'CHK-0004', 'CHK-0005', 'CHK-0006', 'CHK-0007', 'CHK-0008', 'CHK-0009', 'CHK-0010']);
