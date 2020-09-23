import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "oscillators",
        children: [
          {
            path: "",
            loadChildren:
              "../oscillators/oscillators.module#OscillatorsPageModule",
          },
        ],
      },
      {
        path: "filters",
        children: [
          {
            path: "",
            loadChildren: "../filters/filters.module#FiltersPageModule",
          },
        ],
      },
      {
        path: "lfo",
        children: [
          {
            path: "",
            loadChildren: "../lfo/lfo.module#LfoPageModule",
          },
        ],
      },
      {
        path: "envelope",
        children: [
          {
            path: "",
            loadChildren: "../envelope/envelope.module#EnvelopePageModule",
          },
        ],
      },
      {
        path: "mixer",
        children: [
          {
            path: "",
            loadChildren: "../mixer/mixer.module#MixerPageModule",
          },
        ],
      },
      {
        path: "fx",
        children: [
          {
            path: "",
            loadChildren: "../fx/fx.module#FxPageModule",
          },
        ],
      },
      {
        path: "oscilloscope",
        children: [
          {
            path: "",
            loadChildren:
              "../oscilloscope/oscilloscope.module#OscilloscopePageModule",
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/oscillators",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/mixer",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
