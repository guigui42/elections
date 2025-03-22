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
  Chip,
  Tooltip
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
          <Container h="100%" size="100%">
            <Group h="100%" wrap="nowrap" style={{ width: '100%', position: 'relative' }}>
              <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
              </Box>
              
              <Button
                component="a"
                href="https://www.service-public.fr/particuliers/vosdroits/N47"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                color="blue"
                leftSection="🗳️"
                style={{ position: 'absolute', right: 0 }}
                size="sm"
                className="header-button"
                fw={500}
              >
                Comment voter
              </Button>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main pt={80} className="main-content">
          <Container size="md" py="xl">
            <nav className="filter-container">
              <Stack gap="md">
                <Box>
                  <Group gap="xs" justify="center" className="filter-group">
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
                        size="sm"
                        className="filter-chip"
                      >
                        {type}
                      </Chip>
                    ))}
                  </Group>
                </Box>

                <Group justify="center">
                  {selectedTypes.length > 0 && (
                    <Button 
                      variant="subtle" 
                      onClick={() => setSelectedTypes([])}
                      leftSection="🔄"
                      size="sm"
                      className="reset-button"
                    >
                      Réinitialiser les filtres
                    </Button>
                  )}
                </Group>
              </Stack>
            </nav>
            
            {loading ? (
              <Center h={200}>
                <Loader size="lg" />
              </Center>
            ) : error ? (
              <Alert color="red" title="Erreur">
                {error}
              </Alert>
            ) : sortedElections.length === 0 ? (
              <Text ta="center" mt="xl">Aucune élection à venir ne correspond aux critères sélectionnés.</Text>
            ) : (
              <section className="election-list-container">
                <Stack gap="md" w="100%">
                  {sortedElections.map((election) => (
                    <Card 
                      key={election.id} 
                      shadow="sm" 
                      padding="lg"
                      radius="md" 
                      withBorder 
                      className="election-card"
                    >
                      <Group justify="space-between" mb="xs" gap="sm">
                        <Title order={3} size="h4" className="election-card-title">
                          {election.name}
                        </Title>
                        <Badge 
                          color={getTypeColor(election.type)} 
                          size="lg"
                          className="election-type-badge"
                        >
                          {election.type}
                        </Badge>
                      </Group>
                      
                      <Text size="sm" c="dimmed" mb="md" className="election-description">
                        {election.description}
                      </Text>
                      
                      <Stack gap="xs" className="dates-stack">
                        {election.dates.map((date, index) => (
                          <Group key={index} justify="space-between" wrap="wrap" gap="xs" className="date-group">
                            <Group gap="xs" wrap="nowrap">
                              {election.rounds > 1 && (
                                <Badge 
                                  variant="light" 
                                  size="sm"
                                  color={getTypeColor(election.type)}
                                  className="round-badge"
                                >
                                  {date.round === 1 ? '1er tour' : '2nd tour'}
                                </Badge>
                              )}
                              <Text size="sm" fw={500} className="date-text">
                                {formatElectionDate(date.date, date.isDateFixed)}
                                {!date.isDateFixed && (
                                  <Badge ml="xs" color="gray" variant="light" size="sm" className="date-status">
                                    Date à définir
                                  </Badge>
                                )}
                              </Text>
                            </Group>
                            {index === 0 && getDaysRemaining(election.dates) && (
                              <Badge 
                                color={election.dates[0].date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() ? "green" : 
                                       election.dates[0].date > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() ? "yellow" : "red"}
                                size="sm"
                                className="days-remaining"
                              >
                                {getDaysRemaining(election.dates)}
                              </Badge>
                            )}
                          </Group>
                        ))}
                      </Stack>

                      <Box mt="md">
                        <Tooltip
                          label={election.detailsScrutin}
                          position="bottom"
                          withArrow
                          multiline
                          w={300}
                          transitionProps={{ transition: 'fade', duration: 200 }}
                        >
                          <Text size="sm" fw={500} mb="xs" style={{ cursor: 'help' }}>
                            {election.modeScrutin}
                          </Text>
                        </Tooltip>
                        
                        {election.previousElection && (
                          <Text size="sm" c="dimmed" className="previous-election">
                            Précédent scrutin : {election.previousElection}
                          </Text>
                        )}
                        
                        {election.dateFixation && (
                          <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }} mt="xs" className="date-fixation">
                            {election.dateFixation}
                          </Text>
                        )}
                      </Box>
                    </Card>
                  ))}
                </Stack>
              </section>
            )}
          </Container>
          <footer className="app-footer">
            <Text size="sm">
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

        {/* Add JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Calendrier des Prochaines Élections Françaises",
            "description": "Consultez le calendrier des prochaines élections en France : présidentielle, législatives, municipales, européennes, régionales et départementales. Dates, informations et modalités de vote.",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": sortedElections.map((election, index) => ({
                "@type": "Event",
                "position": index + 1,
                "name": election.name,
                "description": election.description,
                "startDate": election.dates[0].date,
                "location": {
                  "@type": "Country",
                  "name": "France"
                }
              }))
            }
          })}
        </script>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
