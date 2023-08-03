import { which } from 'shelljs';
import { safeExec } from '../../../utils/safeExec';

export const ensureDeps = () => {
  console.log('Checking dependencies...');
  const dependencies = ['gh', 'gcloud'];
  dependencies.forEach((dep) => {
    if (!which(dep)) {
      console.log(`Sorry, this script requires ${dep} to be set up`);
      process.exit(1);
    }
  });
  // Check if we are logged into gh
  try {
    safeExec('gh auth status');
  } catch (e) {
    safeExec('gh auth login');
  }
  // Check if we are logged into gcloud
  const [_, stderr] = safeExec('gcloud config get-value account');
  if (stderr.startsWith('(unset)')) {
    safeExec('gcloud auth login');
  }
};
