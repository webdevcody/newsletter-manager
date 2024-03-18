import { type SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as wafv2 from "aws-cdk-lib/aws-wafv2";

export default {
  config(_input) {
    return {
      name: "newsletter-ui",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const certificate = acm.Certificate.fromCertificateArn(
        stack,
        "Certificate",
        `arn:aws:acm:us-east-1:493255580566:certificate/d13e3d50-9583-4379-a921-674bc31a6d2d`
      );

      const cfnWebACL = new wafv2.CfnWebACL(stack, "MyCDKWebAcl", {
        defaultAction: {
          allow: {},
        },
        scope: "CLOUDFRONT",
        visibilityConfig: {
          metricName: "MetricForWebACLCDK",
          cloudWatchMetricsEnabled: true,
          sampledRequestsEnabled: true,
        },
        rules: [
          {
            name: "LimitRequests",
            priority: 1,
            action: {
              block: {},
            },
            statement: {
              rateBasedStatement: {
                limit: 500,
                aggregateKeyType: "IP",
              },
            },
            visibilityConfig: {
              sampledRequestsEnabled: true,
              cloudWatchMetricsEnabled: true,
              metricName: "LimitRequests1000",
            },
          },
        ],
      });

      const site = new NextjsSite(stack, "site", {
        customDomain: {
          isExternalDomain: true,
          domainName: "newsletter.webdevcody.com",
          cdk: {
            certificate,
          },
        },
        cdk: {
          distribution: {
            webAclId: cfnWebACL.attrArn,
          },
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
