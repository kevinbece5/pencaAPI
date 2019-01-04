const accessKeyId = process.env.PENCA_AWS_API_ACCESS_KEY;
const secretAccessKey = process.env.PENCA_AWS_API_SECRET_KEY;
const awsRegion = process.env.PENCA_AWS_API_REGION;
const appStage = process.env.PENCA_STAGE;

export const awsConfig = {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: awsRegion
};

export const globalConst = {
  stage: appStage
}
