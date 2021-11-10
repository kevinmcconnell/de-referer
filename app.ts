import * as cdk from "@aws-cdk/core";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";
import * as deploy from "@aws-cdk/aws-s3-deployment";

class Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "Assets");

    new deploy.BucketDeployment(this, "AssetDeployment", {
      destinationBucket: bucket,
      sources: [deploy.Source.asset("static")],
    });

    const cfFunction = new cloudfront.Function(this, "Function", {
      code: cloudfront.FunctionCode.fromFile({ filePath: "handler.js" }),
    });

    new cloudfront.Distribution(this, "ServiceDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        functionAssociations: [
          {
            function: cfFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
    });
  }
}

const app = new cdk.App();
new Stack(app, "Dereferer");
