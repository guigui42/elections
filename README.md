# Calendrier des Prochaines Élections Françaises

A modern, accessible web application that provides a comprehensive calendar of upcoming French elections, built with React, TypeScript, and Vite.

## Features

- 📅 Complete calendar of French elections from 2024 to 2029
- 🗳️ Covers all major elections: Presidential, Legislative, Municipal, European, Regional, and Departmental
- 🔍 Interactive filtering system by election type
- ⏳ Dynamic countdown to upcoming elections
- 📱 Fully responsive design for all devices
- ♿ WCAG-compliant accessibility features
- 🎨 Clean, modern UI using Mantine components
- 🇫🇷 French localization

## Technical Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Mantine Core v7
- **Date Handling**: date-fns with French locale
- **Styling**: CSS Modules with Mantine theme integration
- **Type Checking**: TypeScript with strict mode
- **Linting**: ESLint with TypeScript and React rules
- **Analytics**: Matomo for privacy-friendly tracking

## Project Structure

```
src/
  ├── assets/      # Static assets (SVG icons, images)
  ├── data/        # Election data and types
  ├── App.tsx      # Main application component
  ├── main.tsx     # Application entry point
  └── *.css        # Component-specific styles
```

## Features Under the Hood

### Election Data Model

The application uses a strongly-typed data model for elections:
- Comprehensive election information including dates, rounds, and voting systems
- Support for both fixed and tentative dates
- Historical context with previous election information
- Detailed voting system descriptions

### Accessibility Features

- ARIA labels and roles throughout the application
- Keyboard navigation support
- Skip to main content link
- High contrast color schemes
- Screen reader optimized content structure

### SEO Optimization

- Semantic HTML structure
- JSON-LD structured data
- Comprehensive meta tags
- Open Graph and Twitter card support

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Deployment

The site is configured for deployment using Cloudflare Pages:

```bash
npm run deploy
```

## Browser Support

Supports all modern browsers (last 2 versions):
- Chrome
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is MIT licensed. Feel free to use it as you like.

## Data Sources

Election data is sourced from [Service-Public.fr](https://www.service-public.fr/particuliers/vosdroits/F1939) and is regularly updated to reflect any changes in election schedules or voting systems.
