const accessKeyId = process.env.AWS_API_ACCESS_KEY;
const secretAccessKey = process.env.AWS_API_SECRET_KEY;
const awsRegion = process.env.AWS_API_REGION;
const appStage = process.env.STAGE;

export const awsConfig = {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: awsRegion
};

export const globalConst = {
  stage: appStage
}
