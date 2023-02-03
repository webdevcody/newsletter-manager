resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "webdevcody_newsletter"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "pk"
  range_key      = "sk"
  table_class    = "STANDARD"

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }
}