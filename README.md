# De-referer

This is a proof-of-concept de-referer service implemented as a CloudFront function.

It was inspired by https://www.lifeofguenter.de/2021/11/fasters-dereferer-service-with-aws-global-accelerator.html.

To deploy this to an AWS account, ensure you have valid AWS credentials set in your environment and then:

    yarn run cdk bootstrap
    yarn run cdk deploy

Once it's deployed, visit the CloudFront section of the AWS Management Console to find the URL of your distribution (it's labeled "Distribution domain name"), and open that URL in a browser to test the service.
