import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { Construct } from "constructs";
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";

export class NbbLambdaCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myFunction = new lambda.Function(this, "Function", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "src", "lambda")),
    });

    const fnUrl = myFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "TheUrl", {
      // The .url attributes will return the unique Function URL
      value: fnUrl.url,
    });
  }
}
