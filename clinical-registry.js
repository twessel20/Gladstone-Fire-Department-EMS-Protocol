(()=>{'use strict';
/*
  GFD Clinical Registry v2
  Purpose: single machine-readable source for agency-specific clinical rules.
  Consumers should read clinical constants from this registry rather than duplicate them.
*/
const diltBagDrugMg=100;
const diltBagVolumeMl=100;
const registry={
  agency:{
    id:'gladstone-fire-ems-mo',
    name:'Gladstone Fire/EMS Department',
    schemaVersion:2
  },
  medications:{
    diltiazem:{
      id:'diltiazem',
      genericName:'Diltiazem HCl',
      tradeNames:['Cardizem'],
      formulary:{
        preparation:{drugMg:diltBagDrugMg,bagVolumeMl:diltBagVolumeMl,description:'100 mg vial in 100 mL bag'},
        concentrationMgPerMl:diltBagDrugMg/diltBagVolumeMl,
        concentrationStatus:'confirmed-gfd-formulary'
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
        sourceType:'GFD protocol + confirmed department formulary',
        verificationStatus:'formulary-confirmed',
        notes:'GFD formulary preparation confirmed as one 100 mg vial in a 100 mL bag, yielding 1 mg/mL for app calculations.'
      }
    }
  }
};
Object.freeze(registry.agency);
Object.freeze(registry.medications.diltiazem.formulary.preparation);
Object.freeze(registry.medications.diltiazem.formulary);
window.GFD_CLINICAL_REGISTRY=registry;
})();