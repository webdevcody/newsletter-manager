resource "aws_ses_domain_identity" "ses_identity" {
  domain = "webdevcody.com"
}

resource "aws_ses_email_identity" "email_identity" {
  email = "webdevcody@gmail.com"
}