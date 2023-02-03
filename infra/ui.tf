module "cloudfront_s3_website_with_domain" {
    source                 = "./site"
    domain_name            = "newsletter.webdevcody.com"
    acm_certificate_domain = "*.webdevcody.com"
    upload_sample_file     = true    
}