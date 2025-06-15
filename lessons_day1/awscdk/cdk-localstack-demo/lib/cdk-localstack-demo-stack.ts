import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkLocalstackDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new s3.Bucket(this, 'MyBucket', {
        bucketName: `my-unique-bucket-${id.toLowerCase()}`,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const role = new iam.Role(this, 'MyRole', {
        assumedBy: new iam.ServicePrincipal('s3.amazonaws.com'),
    });

    role.addToPolicy(new iam.PolicyStatement({
        actions: ['s3:*'],
        resources: [bucket.bucketArn],
    }));
  }
}
