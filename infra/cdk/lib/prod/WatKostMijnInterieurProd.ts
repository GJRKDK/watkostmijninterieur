import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class WatKostMijnInterieurProd extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, "StageEnvironmentFunction", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: "lambdaHandler.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../../../apps/backend/dist")),
      environment: {
        ENV: "prod",
      },
    });
  }
}
