terraform {
 backend "s3" {
   bucket         = "wdc-newsletter-manager-terraform-state"
   key            = "state/terraform.tfstate"
   region         = "us-east-1"
   dynamodb_table = "terraform-state"
 }
}


resource "aws_s3_bucket" "terraform-state" {
 bucket = "wdc-newsletter-manager-terraform-state"
 acl    = "private"

 versioning {
   enabled = true
 }
}

resource "aws_s3_bucket_public_access_block" "block" {
 bucket = aws_s3_bucket.terraform-state.id

 block_public_acls       = true
 block_public_policy     = true
 ignore_public_acls      = true
 restrict_public_buckets = true
}

resource "aws_dynamodb_table" "terraform-state" {
 name           = "terraform-state"
 hash_key       = "LockID"
 billing_mode = "PAY_PER_REQUEST"

 attribute {
   name = "LockID"
   type = "S"
 }
}