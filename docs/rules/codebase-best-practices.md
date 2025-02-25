# Codebase Best Practices

This document consolidates principles from [@tech-stack.md](../project-info/tech-stack.md) and the Cursor Rules regarding our **AI-first** approach, AWS integrations, and general coding guidelines. It aims to ensure a **modular**, **scalable**, and **easy-to-navigate** codebase.

---

## 1. General Principles

1. **AI-First Mindset**  
   - Design modules so they can easily integrate with AI functionality (AWS Bedrock).  
   - Keep code well documented and structured to facilitate future ML or AI expansions.

2. **Modularity & Scalability**  
   - Isolate features into focused directories (e.g., `frontend`, `backend`, `utils`).  
   - Avoid large, monolithic files—one file must not exceed **250 lines** to maintain readability and AI tooling support.

3. **High Navigability**  
   - Define a **clear folder structure** that mirrors our main domains (frontend, serverless functions, AI services).  
   - Write **descriptive** file and folder names, using consistent conventions (see §2 below).

4. **Comments & Documentation**  
   - Start each file with a **concise explanation** of its purpose and references to any relevant modules.  
   - Use JSDoc/TSDoc comments for **every function**, documenting purpose, parameters, and return types. This especially helps with AI-driven code completion and debugging.

---

## 2. Naming Conventions

1. **Folders**  
   - Use either `kebab-case` or `snake_case` for folder names (pick one convention and remain consistent).  
   - Group related features into a shared folder (e.g., `auth`, `content-strategy`, `ui-components`).

2. **Files**  
   - **React Components:** Use `PascalCase` (e.g., `ContentStrategyCalendar.tsx`).  
   - **Utility or Hook Files:** Use `camelCase` or `kebab-case` (e.g., `useFetchData.ts`, `parse-text.ts`).  
   - **AWS Lambda Functions:** Make them self-descriptive (e.g., `generateAIRecommendations.ts`).

3. **Exports**  
   - Prefer **named exports** for clarity.  
   - Default exports only when it makes logical sense (like a single main component per file).

---

## 3. File Structure

Below is our current file structure for the Contently project, organized as a monorepo with separate packages for frontend and backend:

```
root/
├─ packages/
│ ├─ frontend/
│ │ ├─ src/
│ │ │ ├─ components/          // Reusable UI components
│ │ │ ├─ contexts/            // React context providers
│ │ │ ├─ hooks/               // Custom React hooks
│ │ │ ├─ pages/               // Page-level components
│ │ │ ├─ routes/              // React Router configuration
│ │ │ ├─ services/            // API and service integrations
│ │ │ ├─ styles/              // CSS and styling files
│ │ │ ├─ types/               // TypeScript type definitions
│ │ │ ├─ App.tsx              // Main application component
│ │ │ ├─ App.test.tsx         // Tests for App component
│ │ │ ├─ index.tsx            // Application entry point
│ │ │ ├─ setupTests.ts        // Test configuration
│ │ │ └─ vite-env.d.ts        // Vite environment types
│ │ ├─ public/                // Static assets
│ │ ├─ .env                   // Environment variables (not committed)
│ │ ├─ .env.example           // Example environment variables
│ │ ├─ .eslintrc.js           // ESLint configuration
│ │ ├─ .gitignore             // Git ignore rules
│ │ ├─ index.html             // HTML entry point
│ │ ├─ package.json           // Frontend dependencies
│ │ ├─ tsconfig.json          // TypeScript configuration
│ │ ├─ vite.config.ts         // Vite configuration
│ │ └─ vitest.config.ts       // Vitest configuration
│ │
│ └─ backend/
│   ├─ amplify/               // AWS Amplify configuration
│   │ ├─ auth/                // Authentication resources
│   │ │ └─ resource.ts        // Auth resource definition
│   │ ├─ data/                // Data models and storage
│   │ │ └─ resource.ts        // Data resource definition
│   │ ├─ backend.ts           // Main backend definition
│   │ ├─ package.json         // Amplify dependencies
│   │ └─ tsconfig.json        // TypeScript configuration
│   ├─ .gitignore             // Git ignore rules
│   └─ package.json           // Backend dependencies
│
├─ docs/
│ ├─ project-info/            // Project documentation
│ ├─ rules/                   // Coding standards and guidelines
│ ├─ workflow-templates/      // Templates for workflows
│ ├─ prompts/                 // AI prompt templates
│ ├─ active-workflows/        // Active project workflows
│ ├─ auth0-amplify-deployment.md // Deployment guide
│ └─ new-project-setup.md     // Project setup instructions
│
├─ checklists/                // Project phase checklists
│
├─ amplify.yml                // Amplify build configuration
├─ DEPLOYMENT.md              // Deployment instructions
├─ .gitignore                 // Git ignore rules
├─ package.json               // Root dependencies
├─ package-lock.json          // Dependency lock file
└─ README.md                  // Project overview
```

### Folder Breakdown

1. **packages/frontend/**  
   - Houses all React + TypeScript code.  
   - Uses **React Router DOM** for navigation.
   - **React-Bootstrap** for UI components.
   - Organized into components, contexts, hooks, pages, and services.

2. **packages/backend/**  
   - Contains AWS Amplify configuration for backend resources.
   - Defines authentication (Auth0) and data (DynamoDB) resources.
   - Uses TypeScript for infrastructure as code.

3. **docs/**  
   - Centralizes documentation files, including project information and rule sets.
   - Contains workflow templates and active workflows.
   - Includes deployment guides and setup instructions.

4. **checklists/**  
   - Contains project phase checklists to track progress.

---

## 4. Implementation Guidelines

1. **File Size Limit**  
   - **≤ 250 lines** per file. If you approach this limit, break the logic into smaller hooks or modules.

2. **Commentation**  
   - Begin every file with a one-liner or short paragraph describing its contents.  
   - Use TSDoc-style for each function:
     ```ts
     /**
      * Uses AWS Bedrock to generate recommendations for content topics.
      * @param contentData - The data about existing content to analyze
      * @returns An array of recommended topics or strategies
      */
     export function generateAIRecommendations(contentData: ContentItem[]): Recommendation[] {
       // ...
     }
     ```

3. **Styling with React-Bootstrap**  
   - Use **React-Bootstrap** components for UI elements.
   - Customize Bootstrap using CSS overrides in the `styles/bootstrap-custom.css` file.
   - Example usage:
     ```tsx
     import { Button, Card } from 'react-bootstrap';
     
     function ContentCard({ title, description }) {
       return (
         <Card className="content-card">
           <Card.Header>{title}</Card.Header>
           <Card.Body>{description}</Card.Body>
           <Card.Footer>
             <Button variant="primary">View Details</Button>
           </Card.Footer>
         </Card>
       );
     }
     ```

4. **AWS & AI Integration**  
   - Adhere to [@tech-stack.md](../project-info/tech-stack.md) for best practices in calling AWS Lambda, DynamoDB, Auth0, and Bedrock.
   - Keep environment variables in `.env` or Amplify configs, **never** commit secrets.
   - Use the `/ai` directory for all AI-related configurations and utilities.

5. **Testing AI Components**  
   - **Unit Tests:** Test AI utility functions in isolation.
   - **Integration Tests:** Mock AWS Bedrock responses to test AI integration.
   - **E2E Tests:** Test complete user flows including AI-powered features.
   - Example AI component test:
     ```tsx
     // __tests__/ContentAnalysisComponent.test.tsx
     import { render, screen, waitFor } from '@testing-library/react';
     import ContentAnalysisComponent from '../ContentAnalysisComponent';
     import * as aiService from '../../../services/ai-service';
     
     // Mock the AI service
     jest.mock('../../../services/ai-service');
     
     test('displays AI analysis results when loaded', async () => {
       // Mock the AI service response
       (aiService.analyzeContent as jest.Mock).mockResolvedValue({
         topics: ['SEO', 'Content Marketing'],
         recommendations: ['Add more keywords', 'Update meta description']
       });
       
       render(<ContentAnalysisComponent url="https://example.com" />);
       
       // Check loading state
       expect(screen.getByText('Analyzing content...')).toBeInTheDocument();
       
       // Wait for results
       await waitFor(() => {
         expect(screen.getByText('SEO')).toBeInTheDocument();
         expect(screen.getByText('Add more keywords')).toBeInTheDocument();
       });
     });
     ```

6. **Continuous Review**  
   - Regularly review structure to avoid bloat.  
   - Maintain test coverage in **parallel** with new features.

---

## 5. Summary

By aligning with these **updated best practices**—limiting file sizes, ensuring thorough documentation, and structuring the code for clarity—we foster a **scalable** and **reachable** (AI-friendly) application. Our **AI-first** codebase, powered by AWS, will remain easy to maintain, collaborate on, and extend for future enhancements.

The addition of a dedicated `/ai` directory and clear guidelines for React Router DOM and React-Bootstrap usage ensures that all team members have a consistent understanding of our architecture and implementation approach.