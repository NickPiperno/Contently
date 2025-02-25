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

Below is a recommended file tree illustrating how we can organize our **React with TypeScript** frontend (using **React Router DOM**), **AWS Lambda** serverless backend, and **AI** integrations. Adapt as needed over time, but keep the structure **modular** and **easy to navigate**.

```
root/
├─ frontend/
│ ├─ src/
│ │ ├─ components/
│ │ │ ├─ ContentStrategyCalendar/
│ │ │ │ ├─ index.tsx                    // Main component file
│ │ │ │ ├─ CalendarItem.tsx             // Sub-component
│ │ │ │ └─ __tests__/                   // Component-specific tests
│ │ │ │   └─ ContentStrategyCalendar.test.tsx
│ │ │ ├─ ContentInsightsPanel/
│ │ │ │ ├─ index.tsx
│ │ │ │ └─ __tests__/
│ │ │ └─ ... (other UI components)
│ │ ├─ pages/
│ │ │ ├─ HomePage.tsx                   // Main dashboard/landing
│ │ │ ├─ AuthPage.tsx                   // Sign in/up logic (AWS Cognito)
│ │ │ └─ ... (other page-level components)
│ │ ├─ hooks/
│ │ │ ├─ useContentAnalysis.ts          // Hook for calling AI analysis
│ │ │ └─ useFetchData.ts                // Generic data fetching hook
│ │ ├─ services/
│ │ │ └─ api.ts                         // Makes calls to AWS APIs (Lambda, etc.)
│ │ ├─ routes/
│ │ │ └─ index.tsx                      // React Router DOM configuration
│ │ ├─ styles/
│ │ │ ├─ bootstrap-custom.css           // Bootstrap customizations
│ │ │ ├─ globals.css                    // Global styling
│ │ │ └─ theme.css                      // Theme variables and overrides
│ │ └─ index.tsx                        // Frontend entry point
│ ├─ public/
│ │ └─ ... (static assets if needed)
│ ├─ package.json
│ └─ tsconfig.json
│
├─ backend/
│ ├─ lambdas/
│ │ ├─ ingestContent/
│ │ │ ├─ handler.ts                     // AWS Lambda for ingesting & storing content
│ │ │ └─ ... (tests, utils, etc.)
│ │ ├─ generateStrategy/
│ │ │ ├─ handler.ts                     // AWS Lambda calling AWS Bedrock for AI suggestions
│ │ │ └─ ... (tests, utils, etc.)
│ │ └─ ... (other Lambdas)
│ ├─ mocks/                             // Optional folder for local testing
│ ├─ package.json
│ └─ tsconfig.json
│
├─ ai/
│ ├─ prompts/                           // Bedrock prompt templates
│ │ ├─ content-analysis.json            // Prompt for content analysis
│ │ ├─ strategy-generation.json         // Prompt for strategy generation
│ │ └─ seo-optimization.json            // Prompt for SEO recommendations
│ ├─ configs/                           // AI service configurations
│ │ └─ bedrock-config.json              // AWS Bedrock configuration
│ └─ utils/                             // AI-specific utility functions
│   ├─ prompt-formatter.ts              // Formats data for AI prompts
│   └─ response-parser.ts               // Parses AI responses
│
├─ infrastructure/
│ ├─ amplify/                           // AWS Amplify config & scripts
│ ├─ templates/                         // CloudFormation or serverless templates
│ └─ pipeline/                          // CI/CD pipeline definitions
│
├─ docs/
│ ├─ project-info/
│ │ ├─ tech-stack.md                    // Tech stack reference
│ │ ├─ project-overview.md              // High-level overview
│ │ └─ user-flow.md                     // User journey and features
│ └─ rules/
│   ├─ codebase-best-practices.md       // (This file)
│   ├─ theme-rules.md
│   ├─ ui-rules.md
│   └─ ...
│
├─ tests/
│ ├─ integration/                       // Cross-component/service tests
│ │ └─ ai-integration/                  // Tests for AI service integration
│ │   ├─ bedrock-api.test.ts            // Tests for Bedrock API calls
│ │   └─ content-analysis.test.ts       // Tests for content analysis flow
│ └─ e2e/                               // End-to-end tests
│   └─ content-strategy-flow.test.ts    // Complete user flow tests
│
├─ .env.example
├─ package.json
├─ tsconfig.json
└─ README.md
```

### Folder Breakdown

1. **frontend/**  
   - Houses all React + TypeScript code.  
   - Uses **React Router DOM** for navigation.
   - **React-Bootstrap** for UI components.
   - Component folders include their own tests.

2. **backend/**  
   - Contains AWS Lambda functions and related code.  
   - Each Lambda resides in its own folder for easy maintenance.

3. **ai/**  
   - NEW: Dedicated directory for AI-related configurations and utilities.
   - Stores prompt templates, Bedrock configurations, and AI-specific utilities.
   - Separates AI concerns from general application logic.

4. **infrastructure/**  
   - Holds AWS Amplify configurations, CloudFormation templates, and pipeline scripts.  
   - Facilitates DevOps, CI/CD, and environment setups.

5. **docs/**  
   - Centralizes documentation files, including project information and rule sets.  
   - This fosters a single source of truth.

6. **tests/**  
   - Contains integration and E2E tests.
   - Component-specific tests live alongside their components.
   - AI-specific integration tests have their own dedicated section.

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
   - Adhere to [@tech-stack.md](../project-info/tech-stack.md) for best practices in calling AWS Lambda, DynamoDB, Cognito, and Bedrock.
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