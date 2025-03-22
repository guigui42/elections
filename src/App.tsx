import { useState, useEffect } from 'react';
import { 
  MantineProvider, 
  Button, 
  Card, 
  Text, 
  Title, 
  Container, 
  Group, 
  Badge, 
  Stack, 
  AppShell, 
  Loader,
  Center,
  Alert,
  Box,
  Chip
} from '@mantine/core';
import '@mantine/core/styles.css';
import './ElectionsApp.css';

// Définition du type Élection
interface Election {
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

function App() {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Dans une application réelle, vous récupéreriez ces données depuis une API
  useEffect(() => {
    // Simulation d'un appel API avec des données fictives
    const fetchElections = async () => {
      try {
        setLoading(true);
        // Dans une vraie application, remplacez ceci par un appel API réel
        // const response = await axios.get('https://api.example.com/french-elections');
        
        // Données réelles pour les élections françaises
        const mockElections: Election[] = [
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
        
        // Simuler un délai réseau
        setTimeout(() => {
          setElections(mockElections);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Échec de la récupération des données électorales. Veuillez réessayer plus tard.');
        setLoading(false);
        console.error('Erreur lors de la récupération des élections:', err);
      }
    };

    fetchElections();
  }, []);

  // Obtenir la liste unique des types d'élections
  const electionTypes = Array.from(new Set(elections.map(election => election.type))).sort();

  // Filtrer les élections en fonction du type sélectionné
  const filteredElections = elections.filter(election => {
    const typeMatch = selectedTypes.length > 0 ? selectedTypes.includes(election.type) : true;
    return typeMatch;
  });

  // Trier les élections par date
  const sortedElections = [...filteredElections].sort(
    (a, b) => new Date(a.dates[0].date).getTime() - new Date(b.dates[0].date).getTime()
  );

  // Obtenir la couleur du badge en fonction du type d'élection
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'présidentielle':
        return 'blue';
      case 'législatives':
        return 'teal';
      case 'européennes':
        return 'yellow';
      case 'régionales':
        return 'grape';
      case 'départementales':
        return 'orange';
      case 'municipales':
        return 'cyan';
      default:
        return 'gray';
    }
  };

  // Calculer les jours restants jusqu'à l'élection
  const getDaysRemaining = (dates: { round: number; date: string }[]) => {
    const today = new Date();
    const nextDate = dates
      .map(d => new Date(d.date))
      .find(date => date > today);
    
    if (!nextDate) return -1;
    
    const diffTime = nextDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Update the format election date function to handle fixed/unfixed dates
  const formatElectionDate = (date: string, isDateFixed: boolean) => {
    const options: Intl.DateTimeFormatOptions = isDateFixed 
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'long' };
    
    return new Date(date).toLocaleDateString('fr-FR', options);
  };

  return (
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header className="app-header">
          <Container size="lg" h="100%">
            
            <Group justify="center" h="100%">

              <div className="header-logo">
              <div className="french-flag-colors">
                <div className="flag-blue"></div>
                <div className="flag-white"></div>
                <div className="flag-red"></div>
              </div>
                <Title order={1} size="h3" className="site-title">Prochaines Élections Françaises</Title>
              
              </div>
              <div className="french-flag-colors">
                <div className="flag-blue"></div>
                <div className="flag-white"></div>
                <div className="flag-red"></div>
              </div>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main pt={80} className="main-content">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Container size="md" py="xl" style={{ width: '100%' }}>
         
              <Box className="filter-container">
                <Stack gap="md">
                  <Box>
                    
                    <Group gap="xs">
                      {electionTypes.map((type) => (
                        <Chip
                          key={type}
                          value={type}
                          checked={selectedTypes.includes(type)}
                          onChange={(checked) => {
                            setSelectedTypes(prev =>
                              checked 
                                ? [...prev, type]
                                : prev.filter(t => t !== type)
                            );
                          }}
                          color={getTypeColor(type)}
                        >
                          {type}
                        </Chip>
                      ))}
                    </Group>
                  </Box>

                  {selectedTypes.length > 0 && (
                    <Button 
                      variant="subtle" 
                      onClick={() => {
                        setSelectedTypes([]);
                      }}
                      leftSection="🔄"
                    >
                      Réinitialiser les filtres
                    </Button>
                  )}
                </Stack>
              </Box>
              
              {loading ? (
                <Center h={200}>
                  <Loader size="lg" />
                </Center>
              ) : error ? (
                <Alert color="red" title="Erreur">
                  {error}
                </Alert>
              ) : sortedElections.length === 0 ? (
                <Text ta="center">Aucune élection à venir ne correspond aux critères sélectionnés.</Text>
              ) : (
                <div className="election-list-container">
                  <Stack gap="md" w="100%">
                    {sortedElections.map((election) => (
                        <Card key={election.id} shadow="sm" padding="lg" radius="md" withBorder className="election-card">
                          <Group justify="space-between" mb="xs" wrap="wrap" gap="sm">
                            <Title order={3} size="h4" className="election-card-title">{election.name}</Title>
                            <Badge color={getTypeColor(election.type)} size="lg">
                              {election.type}
                            </Badge>
                          </Group>
                          
                          <Text size="sm" c="dimmed" mb="md">
                            {election.description}
                          </Text>
                          
                          <Stack gap="xs">
                            {election.dates.map((date, index) => (
                              <Group key={index} gap="xs">
                                {election.rounds > 1 && (
                                  <Badge variant="light" size="sm" color={getTypeColor(election.type)}>
                                    {date.round === 1 ? '1er tour' : '2nd tour'}
                                  </Badge>
                                )}
                                <Text fw={500}>
                                  {formatElectionDate(date.date, date.isDateFixed)}
                                  {!date.isDateFixed && (
                                    <Badge ml="xs" color="gray" variant="light">Date à définir</Badge>
                                  )}
                                </Text>
                              </Group>
                            ))}
                          </Stack>

                          <Group justify="flex-end" mt="md">
                            {getDaysRemaining(election.dates) > 0 ? (
                              <Badge color={getDaysRemaining(election.dates) < 30 ? "red" : getDaysRemaining(election.dates) < 90 ? "yellow" : "green"}>
                                {getDaysRemaining(election.dates) > 1 ? `${getDaysRemaining(election.dates)} jours` : `${getDaysRemaining(election.dates)} jour`}
                              </Badge>
                            ) : (
                              <Badge color="gray">Terminée</Badge>
                            )}
                          </Group>
                          
                          <Box mt="md">
                            {election.previousElection && (
                              <Text size="sm" c="dimmed">
                                Précédent scrutin : {election.previousElection}
                              </Text>
                            )}
                            
                            {election.dateFixation && (
                              <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }} mt="xs">
                                {election.dateFixation}
                              </Text>
                            )}
                          </Box>
                        </Card>
                      ))}
                  </Stack>
                </div>
              )}
            </Container>
          </div>
          <footer className="app-footer">
            <Text>
              Source des données : {' '}
              <a 
                href="https://www.service-public.fr/particuliers/vosdroits/F1939" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Service-Public.fr
              </a>
            </Text>
          </footer>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
