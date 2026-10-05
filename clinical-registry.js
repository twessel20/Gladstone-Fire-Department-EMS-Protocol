(()=>{'use strict';
/*
  GFD Clinical Registry v1
  Purpose: establish a single machine-readable source for agency-specific clinical rules.
  IMPORTANT: this registry is currently non-authoritative for rendering/calculation output until each consumer is migrated.
  Do not add assumed concentrations or unverified formulary values.
*/
const registry={
  agency:{
    id:'gladstone-fire-ems-mo',
    name:'Gladstone Fire/EMS Department',
    schemaVersion:1
  },
  medications:{
    diltiazem:{
      id:'diltiazem',
      genericName:'Diltiazem HCl',
      tradeNames:['Cardizem'],
      formulary:{
        concentrationMgPerMl:null,
        concentrationStatus:'pending-formulary-confirmation'
      },
      rules:{
        indicationContext:'Qualifying atrial fibrillation / atrial flutter with RVR in the Narrow Complex Tachydysrhythmias protocol.',
        initialDose:{perKgMg:0.25,maxMg:20,route:'IV',administration:'SIVP',administrationMinutes:2},
        secondDose:{perKgMg:0.35,maxMg:20,route:'IV',administration:'SIVP',administrationMinutes:2,minimumDelayMinutes:10},
        ageAdjustment:{appliesWhenAgeYearsGreaterThan:70,subtractMgPerDose:5},
        contraindicationAgeYearsUnder:15
      },
      provenance:{
        protocol:'Narrow Complex Tachydysrhythmias',
        sourceType:'GFD protocol currently embedded in app',
        verificationStatus:'existing-app-rule-mapped',
        notes:'Concentration intentionally left null until hard formulary value is supplied.'
      }
    }
  }
};
Object.freeze(registry.agency);
Object.freeze(registry.medications.diltiazem.formulary);
window.GFD_CLINICAL_REGISTRY=registry;
})();