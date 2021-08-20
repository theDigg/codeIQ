import { ServiceConfiguration } from 'meteor/service-configuration';

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      clientId: 'f2d3cf8001733a42da1f',
      loginStyle: 'popup',
      secret: '3c931c6c901678eb8e7ac520310ab610dc2383dd',
    },
  },
);

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      clientId: '697026241871-m0ad8n7rgisi9sjbuetgpuabcdeeuiup.apps.googleusercontent.com',
      loginStyle: 'popup',
      secret: 'aGPoFvyWOU7Qdc_REWuyn_Ej',
    },
  },
);
