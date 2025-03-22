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
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Election, mockElections } from './data/elections';

function App() {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        setLoading(true);
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
    
    if (!nextDate) return null;
    
    return formatDistanceToNow(nextDate, { addSuffix: true, locale: fr });
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
          <Container h="100%">
            <Group h="100%" wrap="nowrap" style={{ width: '100%', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="header-logo">
                  <div className="french-flag-colors">
                    <div className="flag-blue"></div>
                    <div className="flag-white"></div>
                    <div className="flag-red"></div>
                  </div>
                  <Title order={1} size="h3" className="site-title">Prochaines Élections Françaises</Title>
                  <div className="french-flag-colors">
                    <div className="flag-blue"></div>
                    <div className="flag-white"></div>
                    <div className="flag-red"></div>
                  </div>
                </div>
              </div>
              
              <Button
                component="a"
                href="https://www.service-public.fr/particuliers/vosdroits/N47"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                color="blue"
                leftSection="🗳️"
                style={{ marginLeft: 'auto' }}
                fw={500}
              >
                Comment voter
              </Button>
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

                  <Group>
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
                  </Group>
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
                              <Group key={index} justify="space-between" wrap="nowrap">
                                <Group gap="xs" wrap="nowrap">
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
                                {index === 0 && getDaysRemaining(election.dates) && (
                                  <Badge color={election.dates[0].date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() ? "green" : 
                                           election.dates[0].date > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() ? "yellow" : "red"}>
                                    {getDaysRemaining(election.dates)}
                                  </Badge>
                                )}
                              </Group>
                            ))}
                          </Stack>

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
