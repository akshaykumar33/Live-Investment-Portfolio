# Technical Document – Dynamic Portfolio Dashboard

## Overview
This project delivers a real-time portfolio dashboard using **Next.js with TypeScript** on the frontend and **Node.js with TypeScript** on the backend.  
It fetches live stock data from Yahoo Finance (CMP), Financial Modelling ERP and Alpha Vantage (P/E ratio, latest earnings), and fallback APIs at fixed intervals, processes it, and presents it in an interactive, responsive interface.  

The backend is deployed on **Render**, and the frontend is hosted on **Vercel**. Styling is implemented with classical CSS modules instead of Tailwind due to initial integration issues.

---

## Key Challenges and My Solutions

### 1. Tailwind CSS Build Conflicts
- **Challenge:** When integrating Tailwind CSS with Next.js + TypeScript, I faced repeated build errors and configuration mismatches that blocked development.  
- **My Solution:** I replaced Tailwind with **classical CSS modules**, which removed all build issues and gave me more granular control over styles. I also leveraged CSS Grid and Flexbox to maintain responsiveness, making the UI consistent across devices without relying on Tailwind’s utility classes.

---

### 2. Multiple API Integrations & Fallback Complexity
- **Challenge:**  
  - Yahoo Finance and Google Finance have no official APIs.  
  - My first attempts with **yahoofinance** and **finnhub-ts** worked inconsistently.  
  - Further fallback trials with **financialmodellingerp** and **Alpha Vantage** exposed strict rate limits and data mismatches.  
- **My Solution:** I implemented a **layered API fallback strategy**:
  1. **Primary source:** Yahoo Finance  
  2. **Secondary source:** Financial Modelling ERP 
  3. **Tertiary source:**  Alpha Vantage  
  - Added a **rate limiter middleware** to control request bursts.  
  - Introduced **short-term server-side caching** to minimize API hits.  
  - Built a **graceful degradation mechanism** to show cached or placeholder data if all APIs failed.

---

### 3. WebSocket Polling & Interval Updates
- **Challenge:** Fetching latest earnings and CMP data in real time without hitting API limits.  
- **My Solution:**  
  - Initially implemented **setInterval**-based polling at safe intervals.  
  - Added **WebSocket** support where possible for push-based updates, drastically reducing redundant requests.  
  - Integrated an **automatic fallback** to polling if the WebSocket connection dropped.

---

### 4. No Design Mockup
- **Challenge:** With no Figma or reference design, visualizing and structuring the UI became guesswork.  
- **My Solution:** I designed the UI iteratively in the browser:
  - Focused first on **data clarity and table usability**.  
  - Grouped stocks by sector and added sector-level summaries.  
  - Used **incremental adjustments** after each test run to align with user experience goals.

---

### 5. Responsive UI Without Tailwind
- **Challenge:** Ensuring full responsiveness with only pure CSS was slower and required more manual work.  
- **My Solution:**  
  - Built layouts with **CSS Grid** for structure and **Flexbox** for alignment.  
  - Added **media queries** for breakpoint handling.  
  - Continuously tested across screen sizes to maintain a consistent look.

---

### 6. Error Handling & Logging
- **Challenge:** API failures occasionally caused broken UI states or unhandled errors.  
- **My Solution:**  
  - Developed a **centralized backend error-handling middleware** to standardize responses.  
  - Integrated a **logger** to capture request details and errors for debugging.  
  - Displayed **clear user messages** and placeholder values when data could not be fetched.

---

### 7. Testing & Dockerization
- **Challenge:** Validating reliability and setting up consistent environments across systems.  
- **My Solution:**  
  - Wrote **unit, integration, and E2E tests** for backend services, controllers, and middlewares.  
  - Added **frontend skeleton loaders** to handle slow API responses gracefully.  
  - Dockerized both frontend and backend, ensuring identical development and deployment environments.

---

### 8. Deployment
- **Challenge:** Frontend and backend had different deployment requirements and needed secure API communication.  
- **My Solution:**  
  - Deployed **backend to Render** with environment variables and caching enabled.  
  - Deployed **frontend to Vercel**, routing API requests through the backend to hide API keys and protect sensitive logic.

---

## Conclusion
Every challenge in this project was met with a targeted solution:
- From replacing Tailwind with CSS modules to building a multi-layer API fallback system.  
- From solving WebSocket-polling tradeoffs to designing without a mockup.  
- From creating responsive layouts manually to centralizing error handling.  

The result is a **robust, responsive, and maintainable** real-time portfolio dashboard that meets the assignment requirements while being resilient to API instability and deployment complexities.
