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
  date: string;
  description: string;
  rounds?: number;
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
            date: '2026-03-01', // Date non fixée, mars 2026
            description: 'Premier tour des élections municipales françaises. Élection des conseillers municipaux et communautaires.',
            rounds: 2,
            previousElection: '15 et 22 mars 2020 (reporté partiellement en raison du COVID-19)',
            dateFixation: 'La date précise sera fixée par décret de convocation des électeurs environ 3 mois avant le scrutin.'
          },
          {
            id: '2',
            type: 'Municipales',
            name: 'Élections Municipales (Second Tour)',
            date: '2026-03-01', // Date non fixée, mars 2026
            description: 'Second tour des élections municipales françaises.',
            rounds: 2,
            previousElection: '15 et 22 mars 2020 (reporté partiellement en raison du COVID-19)',
            dateFixation: 'La date précise sera fixée par décret de convocation des électeurs environ 3 mois avant le scrutin.'
          },
          {
            id: '3',
            type: 'Départementales',
            name: 'Élections Départementales',
            date: '2027-03-01', // Date non fixée, mars 2027
            description: 'Premier tour des élections départementales. Élection des conseillers départementaux.',
            rounds: 2,
            previousElection: '20 et 27 juin 2021 (reporté en raison du COVID-19)',
            dateFixation: 'La date précise sera fixée par décret de convocation des électeurs environ 3 mois avant le scrutin.'
          },
          {
            id: '4',
            type: 'Départementales',
            name: 'Élections Départementales (Second Tour)',
            date: '2027-03-01', // Date non fixée, mars 2027
            description: 'Second tour des élections départementales.',
            rounds: 2,
            previousElection: '20 et 27 juin 2021 (reporté en raison du COVID-19)',
            dateFixation: 'La date précise sera fixée par décret de convocation des électeurs environ 3 mois avant le scrutin.'
          },
          {
            id: '5',
            type: 'Présidentielle',
            name: 'Élection Présidentielle',
            date: '2027-04-01', // Date non fixée, avril 2027
            description: 'Premier tour de l\'élection présidentielle française. Élection du Président de la République.',
            rounds: 2,
            previousElection: '10 et 24 avril 2022',
            dateFixation: 'La date précise est fixée par décret au moins 10 semaines avant le scrutin.'
          },
          {
            id: '6',
            type: 'Présidentielle',
            name: 'Élection Présidentielle (Second Tour)',
            date: '2027-04-01', // Date non fixée, avril 2027
            description: 'Second tour de l\'élection présidentielle française.',
            rounds: 2,
            previousElection: '10 et 24 avril 2022',
            dateFixation: 'La date précise est fixée par décret au moins 10 semaines avant le scrutin.'
          },
          {
            id: '7',
            type: 'Législatives',
            name: 'Élections Législatives',
            date: '2027-06-01', // Date non fixée, juin 2027
            description: 'Premier tour des élections législatives. Élection des députés à l\'Assemblée nationale.',
            rounds: 2,
            previousElection: '12 et 19 juin 2022',
            dateFixation: 'La date précise est fixée par décret de convocation des électeurs.'
          },
          {
            id: '8',
            type: 'Législatives',
            name: 'Élections Législatives (Second Tour)',
            date: '2027-06-01', // Date non fixée, juin 2027
            description: 'Second tour des élections législatives.',
            rounds: 2,
            previousElection: '12 et 19 juin 2022',
            dateFixation: 'La date précise est fixée par décret de convocation des électeurs.'
          },
          {
            id: '9',
            type: 'Régionales',
            name: 'Élections Régionales',
            date: '2028-03-01', // Date non fixée, mars 2028
            description: 'Premier tour des élections régionales. Élection des conseillers régionaux.',
            rounds: 2,
            previousElection: '20 et 27 juin 2021 (reporté en raison du COVID-19)',
            dateFixation: 'La date précise sera fixée par décret de convocation des électeurs environ 3 mois avant le scrutin.'
          },
          {
            id: '10',
            type: 'Régionales',
            name: 'Élections Régionales (Second Tour)',
            date: '2028-03-01', // Date non fixée, mars 2028
            description: 'Second tour des élections régionales.',
            rounds: 2,
            previousElection: '20 et 27 juin 2021 (reporté en raison du COVID-19)',
            dateFixation: 'La date précise sera fixée par décret de convocation des électeurs environ 3 mois avant le scrutin.'
          },
          {
            id: '11',
            type: 'Européennes',
            name: 'Élections Européennes',
            date: '2029-05-01', // Date non fixée, mai 2029
            description: 'Élection des députés européens français au Parlement européen. Scrutin à un seul tour.',
            rounds: 1,
            previousElection: '9 juin 2024',
            dateFixation: 'La date est fixée au niveau européen pour l\'ensemble des États membres, généralement fixée par le Conseil de l\'Union européenne.'
          },
          {
            id: '12',
            type: 'Sénatoriales',
            name: 'Élections Sénatoriales',
            date: '2026-09-01', // Date non fixée, septembre 2026
            description: 'Renouvellement partiel du Sénat (série 2). Élection au suffrage universel indirect.',
            rounds: 1,
            previousElection: '24 septembre 2023 (série 1) et 27 septembre 2020 (série 2)',
            dateFixation: 'La date est fixée par décret, traditionnellement en septembre de l\'année concernée.'
          },
          {
            id: '13',
            type: 'Sénatoriales',
            name: 'Élections Sénatoriales',
            date: '2029-09-01', // Date non fixée, septembre 2029
            description: 'Renouvellement partiel du Sénat (série 1). Élection au suffrage universel indirect.',
            rounds: 1,
            previousElection: '24 septembre 2023 (série 1) et 27 septembre 2020 (série 2)',
            dateFixation: 'La date est fixée par décret, traditionnellement en septembre de l\'année concernée.'
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
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
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
  const getDaysRemaining = (electionDate: string) => {
    const today = new Date();
    const election = new Date(electionDate);
    const diffTime = election.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format the date based on whether it's fixed or not
  const formatElectionDate = (date: string) => {
    const electionDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    
    // If the day is 1, it means the exact date is not fixed yet
    if (electionDate.getDate() === 1) {
      return new Date(date).toLocaleDateString('fr-FR', options);
    }
    
    // Otherwise, show the full date
    return new Date(date).toLocaleDateString('fr-FR', {
      ...options,
      day: 'numeric'
    });
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
          <div style={{ flex: 1 }}>
            <Container size="md" py="xl">
         
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
                    {sortedElections.map((election) => {
                      const daysRemaining = getDaysRemaining(election.date);
                      return (
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
                          
                          <Group justify="space-between" mt="md" wrap="wrap" gap="md">
                            <Group gap="xs">
                              <Text fw={500}>
                                Date : {formatElectionDate(election.date)}
                              </Text>
                              {new Date(election.date).getDate() === 1 && (
                                <Badge color="gray" variant="light">Date à définir</Badge>
                              )}
                            </Group>
                            
                            {daysRemaining > 0 ? (
                              <Badge color={daysRemaining < 30 ? "red" : daysRemaining < 90 ? "yellow" : "green"}>
                                {daysRemaining > 1 ? `${daysRemaining} jours restants` : `${daysRemaining} jour restant`}
                              </Badge>
                            ) : (
                              <Badge color="gray">Terminée</Badge>
                            )}
                          </Group>
                          
                          {election.rounds && (
                            <Text size="sm" mt="xs">
                              Format de l'élection : {election.rounds} tour{election.rounds > 1 ? 's' : ''}
                            </Text>
                          )}
                          
                          {election.previousElection && (
                            <Text size="sm" mt="xs" fw={500}>
                              Précédent vote : <Text span c="dimmed" fw="normal">{election.previousElection}</Text>
                            </Text>
                          )}
                          
                          {election.dateFixation && (
                            <Text size="sm" mt="xs" fw={500}>
                              Fixation de la date précise : <Text span c="dimmed" fw="normal">{election.dateFixation}</Text>
                            </Text>
                          )}
                        </Card>
                      );
                    })}
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
