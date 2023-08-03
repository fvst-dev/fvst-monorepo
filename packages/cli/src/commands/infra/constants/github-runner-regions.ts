/**
 * Right now, Github runners are all located in the US.
 * So it makes sense for our storage (e.g. terraform state, docker containers, turborepo etc) to be in the same region.
 */
export const githubRunnerRegionGroup = 'us';
export const githubRunnerRegionList = ['us-east1', 'us-west1'];
