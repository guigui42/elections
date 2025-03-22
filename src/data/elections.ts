export interface Election {
  id: string;
  type: string;
  name: string;
  dates: {
    round: number;
    date: string;
    isDateFixed: boolean;
  }[];
  description: string;
  rounds: number;
  previousElection?: string;
  dateFixation?: string;
}

export const mockElections: Election[] = [
  {
    id: '1',
    type: 'Municipales',
    name: 'Élections Municipales',
    dates: [
      { round: 1, date: '2026-03-01', isDateFixed: false },
      { round: 2, date: '2026-03-01', isDateFixed: false }
    ],
    description: 'Élection des conseillers municipaux et communautaires.',
    rounds: 2,
    previousElection: '15 et 22 mars 2020',
    dateFixation: 'La date précise sera fixée par décret environ 3 mois avant le scrutin'
  },
  {
    id: '2',
    type: 'Départementales',
    name: 'Élections Départementales',
    dates: [
      { round: 1, date: '2027-03-01', isDateFixed: false },
      { round: 2, date: '2027-03-01', isDateFixed: false }
    ],
    description: 'Élection des conseillers départementaux.',
    rounds: 2,
    previousElection: '20 et 27 juin 2021',
    dateFixation: 'La date précise sera fixée par décret environ 3 mois avant le scrutin'
  },
  {
    id: '3',
    type: 'Présidentielle',
    name: 'Élection Présidentielle',
    dates: [
      { round: 1, date: '2027-04-01', isDateFixed: false },
      { round: 2, date: '2027-04-01', isDateFixed: false }
    ],
    description: 'Élection du Président de la République.',
    rounds: 2,
    previousElection: '10 et 24 avril 2022',
    dateFixation: 'La date précise est fixée par décret au moins 10 semaines avant le scrutin'
  },
  {
    id: '4',
    type: 'Législatives',
    name: 'Élections Législatives',
    dates: [
      { round: 1, date: '2027-06-01', isDateFixed: false },
      { round: 2, date: '2027-06-01', isDateFixed: false }
    ],
    description: 'Élection des députés à l\'Assemblée nationale.',
    rounds: 2,
    previousElection: '12 et 19 juin 2022',
    dateFixation: 'La date précise est fixée par décret'
  },
  {
    id: '5',
    type: 'Régionales',
    name: 'Élections Régionales',
    dates: [
      { round: 1, date: '2028-03-01', isDateFixed: false },
      { round: 2, date: '2028-03-01', isDateFixed: false }
    ],
    description: 'Élection des conseillers régionaux.',
    rounds: 2,
    previousElection: '20 et 27 juin 2021',
    dateFixation: 'La date précise sera fixée par décret environ 3 mois avant le scrutin'
  },
  {
    id: '6',
    type: 'Européennes',
    name: 'Élections Européennes',
    dates: [
      { round: 1, date: '2029-05-09', isDateFixed: false }
    ],
    description: 'Élection des députés européens français au Parlement européen.',
    rounds: 1,
    previousElection: '9 juin 2024',
    dateFixation: 'La date est fixée au niveau européen'
  },
  {
    id: '7',
    type: 'Sénatoriales',
    name: 'Élections Sénatoriales (Série 2)',
    dates: [
      { round: 1, date: '2026-09-01', isDateFixed: false }
    ],
    description: 'Renouvellement partiel du Sénat (série 2).',
    rounds: 1,
    previousElection: '27 septembre 2020 (série 2)',
    dateFixation: 'La date est fixée par décret'
  },
  {
    id: '8',
    type: 'Sénatoriales',
    name: 'Élections Sénatoriales (Série 1)',
    dates: [
      { round: 1, date: '2029-09-01', isDateFixed: false }
    ],
    description: 'Renouvellement partiel du Sénat (série 1).',
    rounds: 1,
    previousElection: '24 septembre 2023 (série 1)',
    dateFixation: 'La date est fixée par décret'
  }
];