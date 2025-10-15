import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

// Initialize Plotly globally
(window as any).Plotly = PlotlyJS;

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    (PlotlyModule as any).forRoot(PlotlyJS).providers
  ]
})
  .catch((err) => console.error(err));
